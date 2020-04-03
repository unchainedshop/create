/* eslint-disable react/display-name */
import withApollo from 'next-with-apollo';
import { ApolloProvider } from '@apollo/react-hooks';
import initApollo from './initApollo';

export default withApollo(initApollo, {
  render: ({ Page, props }) => {
    return (
      <ApolloProvider client={props.apollo}>
        <Page {...props} />
      </ApolloProvider>
    );
  },
});
