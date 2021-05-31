import { gql } from '@apollo/client';

const ProductFragment = gql`
  fragment ProductFragment on Product {
    _id
    media {
      _id
      file {
        _id
        name
        url
      }
    }
    ... on SimpleProduct {
      simulatedPrice {
        _id
        isTaxable
        isNetPrice
        amount
        currency
      }
      dimensions {
        width
        height
        length
        weight
      }
      texts(forceLocale: $forceLocale) {
        _id
        title
        subtitle
        description
        slug
      }
    }
    ... on PlanProduct {
      texts(forceLocale: $forceLocale) {
        _id
        title
        subtitle
        description
        slug
      }
    }
    ... on BundleProduct {
      texts(forceLocale: $forceLocale) {
        _id
        title
        subtitle
        description
        slug
      }
    }
    ... on ConfigurableProduct {
      texts(forceLocale: $forceLocale) {
        _id
        title
        subtitle
        description
        slug
      }
    }
  }
`;

export default ProductFragment;
