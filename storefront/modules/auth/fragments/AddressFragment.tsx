import gql from 'graphql-tag';

const AddressFragment = gql`
  fragment AddressFragment on Address {
    firstName
    lastName
    company
    addressLine
    postalCode
    city
  }
`;

export default AddressFragment;
