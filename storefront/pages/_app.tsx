import React from "react";
import getConfig from "next/config";

import withApollo from "../modules/apollo/utils/withApollo";

const {
  publicRuntimeConfig: { GRAPHQL_ENDPOINT }
} = getConfig();

const UnchainedApp = ({ Component, pageProps, locale, messages, apollo }) => {
  return <Component {...pageProps} />;
};

export default withApollo(UnchainedApp);
