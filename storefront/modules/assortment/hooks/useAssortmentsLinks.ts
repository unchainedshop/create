import { useQuery, gql } from '@apollo/client';
import AssortmentFragment from '../fragments/assortment';
import AssortmentThreeLevelLinksFragment from '../fragments/assortmentThreeLevelLinks';

export const AssortmentsLinksQuery = gql`
  query AssortmentsLinksQuery(
    $slugs: [String!] = []
    $includeLeaves: Boolean = false
  ) {
    assortments(slugs: $slugs, includeLeaves: $includeLeaves) {
      ...AssortmentFragment
      linkedAssortments {
        ...AssortmentThreeLevelLinksFragment
      }
    }
  }
  ${AssortmentFragment}
  ${AssortmentThreeLevelLinksFragment}
`;

const useAssortmentsLinks = ({ includeLeaves = false, slugs = [] }) => {
  const { data, loading, error } = useQuery(AssortmentsLinksQuery, {
    variables: {
      includeLeaves,
      slugs,
    },
  });

  return {
    loading,
    error,
    assortments: data?.assortments,
  };
};

export default useAssortmentsLinks;
