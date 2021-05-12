import { useQuery, gql } from '@apollo/client';
import AssortmentFragment from '../fragments/assortment';
import AssortmentThreeLevelLinksFragment from '../fragments/assortmentThreeLevelLinks';

export const AssortmentLinksQuery = gql`
  query AssortmentLinksQuery($slug: String!) {
    assortment(slug: $slug) {
      ...AssortmentFragment
      linkedAssortments {
        ...AssortmentThreeLevelLinksFragment
      }
    }
  }
  ${AssortmentFragment}
  ${AssortmentThreeLevelLinksFragment}
`;

const useAssortmentLinks = (
  { slug }: { slug: string } = {
    slug: '',
  },
) => {
  const { data, loading, error } = useQuery(AssortmentLinksQuery, {
    variables: {
      slug,
    },
  });

  return {
    loading,
    error,
    assortment: data?.assortment,
  };
};

export default useAssortmentLinks;
