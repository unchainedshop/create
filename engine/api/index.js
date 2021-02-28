import configureGraphQLEndpoint from './endpoints/graphql';
import configureControlpanelEndpoint from './endpoints/root';

export default (options = {}) => {
  configureGraphQLEndpoint(options);
  configureControlpanelEndpoint();
};
