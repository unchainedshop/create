import { gql } from '@apollo/client';

const AssortmentFragment = gql`
  fragment AssortmentFragment on Assortment {
    _id
    texts {
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
