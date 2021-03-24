import { gql } from '@apollo/client';

const ProductFragment = gql`
  fragment ProductFragment on Product {
    _id
    texts {
      _id
      title
      subtitle
      description
      slug
    }
    ... on SimpleProduct {
      dimensions {
        weight
      }
      simulatedPrice {
        price {
          amount
          currency
        }
      }
    }
  }
`;

export default ProductFragment;
