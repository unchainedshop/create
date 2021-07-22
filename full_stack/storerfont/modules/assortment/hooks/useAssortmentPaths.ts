import { useQuery, gql } from '@apollo/client';
import { useIntl } from 'react-intl';

import AssortmentFragment from '../fragments/assortment';
import AssortmentPathFragment from '../fragments/AssortmentPath';

export const AssortmentPathsQuery = gql`
  query AssortmentPathsQuery($assortmentId: ID!, $forceLocale: String) {
    assortment(assortmentId: $assortmentId) {
      ...AssortmentFragment
      assortmentPaths {
        ...AssortmentPathFragment
      }
    }
  }
  ${AssortmentFragment}
  ${AssortmentPathFragment}
`;

const useAssortmentPaths = ({ assortmentId }) => {
  const intl = useIntl();
  const { data, loading, error } = useQuery(AssortmentPathsQuery, {
    variables: {
      assortmentId,
      forceLocale: intl.locale,
    },
  });

  return {
    loading,
    error,
    assortment: data?.assortment,
  };
};

export default useAssortmentPaths;
