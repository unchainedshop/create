import {
  makeRemoteExecutableSchema,
  introspectSchema,
  transformSchema,
  FilterRootFields,
  RenameTypes,
  RenameRootFields,
} from 'graphql-tools';
import fetch from 'isomorphic-unfetch';
import { HttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { GETCOCKPIT_ENDPOINT },
  serverRuntimeConfig: { GETCOCKPIT_TOKEN },
} = getConfig();

console.log(`Connecting to GetCockpit API at: ${GETCOCKPIT_ENDPOINT}`); // eslint-disable-line

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
      // fixes asset paths
      .replace(/"path":"\//g, `"path":"/storage/uploads/`)
      // fixes image paths which have a path including storage/uplodas
      .replace(
        /"path":"\/storage\/uploads\/storage\/uploads\//g,
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
      new RenameTypes((name) => `Cms${name}`),
      new RenameRootFields(
        (_, name) => `cms${name.charAt(0).toUpperCase() + name.slice(1)}`,
      ),
    ]);

    return transformedSchema;
  } catch (e) {
    console.error(e); // eslint-disable-line
    return null;
  }
};
