#!/bin/bash
# -----------
# Redeploys new container versions to an environment based on an AWS profile; eg: ./deploy.sh shop-test gmb
# First argument is the 'Role' tag value of the targeted EC2 instance (eg: shop-test)
#------------

set -eo pipefail

[[ -z $1 ]] && echo "Command's first argument must be set to an environment value (shop-test or shop-prod); eg: ./deploy.sh shop-test gmb" && exit 1

env=$1

profile=""
if [[ $2 != "" ]]; then
  profile="--profile $2"
  echo "Set aws profile to: $2"
fi

instanceQueryResult=$(aws ec2 describe-instances --filter Name=tag:Role,Values=$env $profile --region eu-west-1)
instanceId=$(echo $instanceQueryResult | jq '.Reservations[].Instances[].InstanceId' | tr -d '"')
instanceName=$(echo $instanceQueryResult | jq '.Reservations[].Instances[] | [(.Tags[]|select(.Key=="Name")|.Value)][0]')

echo "Instance name: $instanceName. Instance Id: $instanceId"

echo Executing SSM command...
commandId=$(aws ssm send-command --document-name "AWS-RunShellScript" --instance-ids "$instanceId" $profile --comment "Deploy application" --max-concurrency "1" --max-errors "1" --parameters '{"commands":["./deploy-docker-fetch-and-restart.sh"],"executionTimeout":["120"],"workingDirectory":["/home/ec2-user/"]}' --timeout-seconds 120 --region eu-west-1 | jq '.Command.CommandId' | tr -d '"')
echo "Command Id: $commandId"
commandOutput=$(aws ssm get-command-invocation --command-id "$commandId" --instance-id "$instanceId" --output text $profile)
echo $commandOutput
until [ "$commandOutput" = *"InProgress"* ]
do
  echo "Command running..."
  sleep 3s
  commandOutput=$(aws ssm get-command-invocation --command-id "$commandId" --instance-id "$instanceId" --output text $profile)
  echo $commandOutput
  if [[ "$commandOutput" =~ "Success" ]]; then
    echo "All OK"
    exit 0
  fi
  if [[ "$commandOutput" =~ "Failed" ]]; then
    echo "Failed"
    exit 1
  fi
done