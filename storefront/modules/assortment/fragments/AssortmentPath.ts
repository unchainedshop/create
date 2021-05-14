import { gql } from '@apollo/client';

const AssortmentPathFragment = gql`
  fragment AssortmentPathFragment on AssortmentPath {
    links {
      assortmentId
      link {
        parent {
          _id
          texts {
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
