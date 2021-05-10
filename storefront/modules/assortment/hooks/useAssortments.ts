import { useQuery, gql } from '@apollo/client';
import AssortmentFragment from '../fragments/assortment';

export const AssortmentsQuery = gql`
  query AssortmentsQuery($includeLeaves: Boolean = true) {
    assortments(includeLeaves: $includeLeaves) {
      ...AssortmentFragment
    }
  }
  ${AssortmentFragment}
`;

const useAssortments = ({ includeLeaves = false } = {}) => {
  const { data, loading, error } = useQuery(AssortmentsQuery, {
    variables: {
      includeLeaves,
    },
  });

  return {
    loading,
    error,
    assortments: data?.assortments || [],
  };
};

export default useAssortments;
