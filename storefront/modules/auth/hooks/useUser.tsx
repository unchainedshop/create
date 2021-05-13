import { useQuery, gql } from '@apollo/client';

import CurrentUserFragment from '../fragments/CurrentUserFragment';

export const UserQuery = gql`
  query user {
    me {
      ...CurrentUserFragment
    }
  }
  ${CurrentUserFragment}
`;

const useUser = () => {
  const { data, loading, error } = useQuery(UserQuery);

  return {
    loading,
    error,
    user: data?.me,
  };
};

export default useUser;
