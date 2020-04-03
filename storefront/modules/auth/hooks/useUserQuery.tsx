import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const UserQuery = gql`
  query UserQuery {
    me {
      _id
      cart {
        _id
        items {
          _id
        }
        total {
          amount
          currency
        }
      }
    }
  }
`;

const useUserQuery = () => {
  const { data, loading, error } = useQuery(UserQuery);

  return {
    loading,
    error,
    user: data?.me,
  };
};

export default useUserQuery;
