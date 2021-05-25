import { gql } from '@apollo/client';

const AssortmentMediaFragment = gql`
  fragment AssortmentMediaFragment on AssortmentMedia {
    _id
    file {
      _id
      name
      url
    }
  }
`;

export default AssortmentMediaFragment;
