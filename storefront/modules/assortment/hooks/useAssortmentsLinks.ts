import { useQuery, gql } from '@apollo/client';
import AssortmentFragment from '../fragments/assortment';
import AssortmentThreeLevelLinksFragment from '../fragments/assortmentThreeLevelLinks';

export const AssortmentsLinksQuery = gql`
  query AssortmentsLinksQuery($includeLeaves: Boolean = true) {
    assortment(includeLeaves: $includeLeaves) {
      ...AssortmentFragment
      linkedAssortments {
        ...AssortmentThreeLevelLinksFragment
      }
    }
  }
  ${AssortmentFragment}
  ${AssortmentThreeLevelLinksFragment}
`;

const useAssortmentsLinks = () => {
  const { data, loading, error } = useQuery(AssortmentsLinksQuery);

  return {
    loading,
    error,
    assortments: data?.assortments,
  };
};

export default useAssortmentsLinks;
