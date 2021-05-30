import { useQuery, gql } from '@apollo/client';
import { useIntl } from 'react-intl';

import AssortmentFragment from '../fragments/assortment';
import AssortmentMediaFragment from '../fragments/AssortmentMedia';

export const AssortmentsQuery = gql`
  query AssortmentsQuery(
    $includeLeaves: Boolean = false
    $forceLocale: String
  ) {
    assortments(includeLeaves: $includeLeaves) {
      ...AssortmentFragment
      media {
        ...AssortmentMediaFragment
      }
    }
  }
  ${AssortmentFragment}
  ${AssortmentMediaFragment}
`;

const useAssortments = ({ includeLeaves = false } = {}) => {
  const intl = useIntl();
  const { data, loading, error } = useQuery(AssortmentsQuery, {
    variables: {
      includeLeaves,
      forceLocale: intl.locale,
    },
  });

  return {
    loading,
    error,
    assortments: data?.assortments || [],
  };
};

export default useAssortments;
