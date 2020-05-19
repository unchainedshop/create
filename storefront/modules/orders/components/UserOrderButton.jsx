import Link from 'next/link';

import useUserQuery from '../../auth/hooks/useUserQuery';

const OrderButton = () => {
  const { user } = useUserQuery();
  console.log(user);
  if (!user) return null;

  return (
    <Link href="/order">
      <a className="color-brand">
        <h3 className="my-2 mr-2">Meine Bestellungen</h3>
      </a>
    </Link>
  );
};

export default OrderButton;
