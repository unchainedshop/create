import { useQuery, gql } from '@apollo/client';
import AssortmentFragment from '../fragments/assortment';
import AssortmentThreeLevelLinksFragment from '../fragments/assortmentThreeLevelLinks';

export const AssortmentLinksQuery = gql`
  query AssortmentLinksQuery($includeLeaves: Boolean = true) {
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

const useAssortmentLinks = () => {
  const { data, loading, error } = useQuery(AssortmentLinksQuery);

  return {
    loading,
    error,
    assortments: data?.assortments,
  };
};

export default useAssortmentLinks;
