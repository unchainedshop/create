import {
  makeRemoteExecutableSchema,
  introspectSchema,
  transformSchema,
  FilterRootFields,
} from 'graphql-tools';
import fetch from 'isomorphic-unfetch';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { GETCOCKPIT_ENDPOINT },
  serverRuntimeConfig: { GETCOCKPIT_TOKEN },
} = getConfig();

console.log(`Connecting to GetCockpit API at: ${GETCOCKPIT_ENDPOINT}`);

const uri = `${GETCOCKPIT_ENDPOINT}/api/graphql/query?token=${GETCOCKPIT_TOKEN}`;
const httpLink = new HttpLink({ uri, fetch });

const contextLink = setContext((request, previousContext) => {
  const { graphqlContext: { locale } = {} } = previousContext;
  return {
    headers: {
      Locale: 'en' || locale.language.toUpperCase(),
    },
  };
});

const pathFix = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    const rawResponseDataString = JSON.stringify(response.data);
    const fixedDataString = rawResponseDataString
      // Fixes asset paths
      .replace(/"path":"\//g, `"path":"/storage/uploads/`)
      // Fixes image paths which have a path including storage/uplodas
      .replace(
        /"path":"(?:\/storage\/uploads){2}\//g,
        `"path":"/storage/uploads/`,
      );

    response.data = JSON.parse(fixedDataString);
    return response;
  }),
);

export const link = ApolloLink.from([pathFix, contextLink, httpLink]);

export default async () => {
  try {
    const schema = makeRemoteExecutableSchema({
      schema: await introspectSchema(link),
      link,
    });
    const transformedSchema = transformSchema(schema, [
      new FilterRootFields((operation) => {
        return operation !== 'Mutation';
      }),
    ]);
    return transformedSchema;
  } catch (error) {
    console.error(error);
    return null;
  }
};
