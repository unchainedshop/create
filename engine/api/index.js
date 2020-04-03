import configureGraphQLEndpoint from './endpoints/graphql';
import configureHooksEndpoint from './endpoints/__hooks';
import configureControlpanelEndpoint from './endpoints/root';

export default (options = {}) => {
  configureGraphQLEndpoint(options);
  configureHooksEndpoint(options);
  configureControlpanelEndpoint(options);
};
