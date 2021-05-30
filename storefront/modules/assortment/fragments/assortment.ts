import { gql } from '@apollo/client';

const AssortmentFragment = gql`
  fragment AssortmentFragment on Assortment {
    _id
    texts(forceLocale: $forceLocale) {
      _id
      slug
      title
      subtitle
      description
    }
    isBase
    isRoot
  }
`;

export default AssortmentFragment;
