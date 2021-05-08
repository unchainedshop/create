import { useQuery, gql } from '@apollo/client';
import AssortmentFragment from '../fragments/assortment';
import AssortmentThreeLevelLinksFragment from '../fragments/assortmentThreeLevelLinks';

export const AssortmentsLinksQuery = gql`
  query AssortmentsLinksQuery($includeLeaves: Boolean = true) {
    assortments(includeLeaves: $includeLeaves) {
      ...AssortmentFragment
      linkedAssortments {
        ...AssortmentThreeLevelLinksFragment
      }
    }
  }
  ${AssortmentFragment}
  ${AssortmentThreeLevelLinksFragment}
`;

const useAssortmentsLinks = ({ includeLeaves = true }) => {
  const { data, loading, error } = useQuery(AssortmentsLinksQuery, {
    variables: {
      includeLeaves,
    },
  });

  return {
    loading,
    error,
    assortments: data?.assortments,
  };
};

export default useAssortmentsLinks;
