import { gql } from '@apollo/client';

const AssortmentPathFragment = gql`
  fragment AssortmentPathFragment on AssortmentPath {
    links {
      assortmentId
      link {
        parent {
          _id
          texts(forceLocale: $forceLocale) {
            _id
            title
            slug
          }
        }
      }
    }
  }
`;

export const ProductAssortmentPathFragment = gql`
  fragment ProductAssortmentPathFragment on ProductAssortmentPath {
    links {
      assortmentId
      link {
        parent {
          _id
          texts(forceLocale: $forceLocale) {
            _id
            title
            slug
          }
        }
      }
    }
  }
`;

export default AssortmentPathFragment;
