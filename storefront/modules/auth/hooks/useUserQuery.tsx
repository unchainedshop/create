import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import CurrentUserFragment from '../fragments/CurrentUserFragment';

export const UserQuery = gql`
  query UserQuery {
    me {
      ...CurrentUserFragment
    }
  }
  ${CurrentUserFragment}
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
