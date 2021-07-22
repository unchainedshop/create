import { useQuery, gql } from '@apollo/client';
import { useIntl } from 'react-intl';

import CurrentUserFragment from '../fragments/CurrentUserFragment';

export const UserQuery = gql`
  query user($forceLocale: String) {
    me {
      ...CurrentUserFragment
    }
  }
  ${CurrentUserFragment}
`;

const useUser = () => {
  const intl = useIntl();
  const { data, loading, error, refetch } = useQuery(UserQuery, {
    variables: {
      forceLocale: intl.locale,
    },
  });

  return {
    loading,
    error,
    user: data?.me,
    cart: data?.me?.cart,
    refetch,
  };
};

export default useUser;
