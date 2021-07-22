import { ApolloLink } from '@apollo/client';

const loginMutations = [
  'loginWithPassword',
  'loginAsGuest',
  'verifyEmail',
  'createUser',
  'resetPassword',
];
const logoutMutations = ['logout'];

const extractMutationFromDataObject = (
  // eslint-disable-next-line no-undef
  data?: object,
  mutations: string[] = [],
) => {
  return mutations.reduce((acc, mutationName) => {
    if (data && data[mutationName]) {
      return {
        ...data[mutationName],
        __mutationName: mutationName,
      };
    }
    return acc;
  }, null);
};

export default () =>
  new ApolloLink((operation, forward) => {
    // Middleware: This block does actually nothing, it just forwards the operation,
    // thus hands over to the http link.
    return forward(operation).map((response) => {
      // Afterware: This block evaluates after the http link fetched data from the remote

      // Here, getContext is the ApolloServer's context defined below
      // where new ApolloServer is created. Usually we have req, res + custom props.
      // We need the res object which is of type ServerResponse to set the Set-Cookie header
      const { graphqlContext: responseContext } = operation.getContext();

      // And we need the actual result from the current graphql operation (response)
      // that has been sent to the remote
      const { data } = response;
      const loginMethodResponse = extractMutationFromDataObject(
        data,
        loginMutations,
      );
      const logoutMethodResponse = extractMutationFromDataObject(
        data,
        logoutMutations,
      );

      // Set the token and expiration if the user successfully called loginWithPassword, or clear the
      // current cookie if the user called logout
      if (loginMethodResponse) {
        const { token, tokenExpires, __mutationName, ...rest } =
          loginMethodResponse;
        if (!tokenExpires || !token) {
          throw new Error(
            `Query token & tokenExpires on ${loginMethodResponse} so we can set the cookie server-side for you`,
          );
        }
        const formattedExpires = new Date(tokenExpires).toUTCString();

        responseContext.res.setHeader(
          'Set-Cookie',
          `token=${token};  HttpOnly; Expires=${formattedExpires};`,
        );
        response.data[__mutationName] = {
          token: '',
          tokenExpires,
          ...rest,
        };
      } else if (logoutMethodResponse) {
        responseContext.res.setHeader(
          'Set-Cookie',
          `token=; HttpOnly; Expires=-1; `,
        );
      }
      return response;
    });
  });
