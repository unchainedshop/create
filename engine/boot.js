import { Meteor } from 'meteor/meteor';
import { startPlatform } from 'meteor/unchained:platform';
import './lib/plugins';
import { WebApp } from 'meteor/webapp';
import { embedControlpanelInMeteorWebApp } from '@unchainedshop/controlpanel';
import seed from './lib/seed';

Meteor.startup(async () => {
  await startPlatform({
    introspection: true,
    playground: true,
  });
  seed();
  embedControlpanelInMeteorWebApp(WebApp);
});
