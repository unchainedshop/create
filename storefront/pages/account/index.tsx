import Link from 'next/link';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import UpdateProfileForm from '../../modules/auth/components/UpdateProfileForm';
import useSetUsername from '../../modules/auth/hooks/useSetUsername';
import useUser from '../../modules/auth/hooks/useUser';
import MetaTags from '../../modules/common/components/MetaTags';
import COUNTRIES from '../../modules/common/data/countries-list';
import Footer from '../../modules/layout/components/Footer';
import Header from '../../modules/layout/components/Header';

const Account = () => {
  const { user } = useUser();
  const [updateUsername, setUpdateUserName] = useState(false);
  const intl = useIntl();
  const [username, setUserName] = useState('');
  const { setUsername } = useSetUsername();
  const [updateProfile, setUpdateProfile] = useState(false);

  const onProfileUpdateSuccess = (value) => {
    if (value) setUpdateProfile(false);
  };

  const updateName = async (name) => {
    await setUsername({ username: name, userId: user._id });
    setUpdateUserName(!updateUsername);
  };

  return (
    <>
      <MetaTags
        title={user?.username || intl.formatMessage({ id: 'account' })}
      />
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>{intl.formatMessage({ id: 'profile' })}</h1>
            <div className="d-flex justify-content-between mb-5">
              {updateProfile ? (
                <button
                  type="button"
                  className="button text-danger"
                  onClick={() => setUpdateProfile(false)}
                >
                  {intl.formatMessage({ id: 'cancel' })}
                </button>
              ) : (
                <button
                  type="button"
                  className="button button--primary"
                  onClick={() => setUpdateProfile(true)}
                >
                  {intl.formatMessage({ id: 'update' })}
                </button>
              )}
              <Link href="account/change-password">
                <a className="button button--secondary">
                  {intl.formatMessage({ id: 'change_password' })}
                </a>
              </Link>
            </div>
            {updateProfile ? (
              <UpdateProfileForm
                user={user}
                onSuccess={onProfileUpdateSuccess}
              />
            ) : (
              <div>
                <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                  <span> {intl.formatMessage({ id: 'username' })} </span>
                  {!updateUsername ? (
                    <>
                      <span> {user?.username} </span>
                      <button
                        type="button"
                        className=" button button--secondary"
                        onClick={() => setUpdateUserName(!updateUsername)}
                      >
                        {intl.formatMessage({ id: 'change' })}
                      </button>
                    </>
                  ) : (
                    <>
                      <input
                        className="form-control"
                        type="text"
                        onChange={(e) => setUserName(e.target.value)}
                        value={username}
                      />
                      <button
                        type="button"
                        className="button button--primary"
                        onClick={() => updateName(username)}
                      >
                        {intl.formatMessage({ id: 'update' })}
                      </button>
                      <button
                        type="button"
                        className=" button  text-danger"
                        onClick={() => setUpdateUserName(!updateUsername)}
                      >
                        {intl.formatMessage({ id: 'cancel' })}
                      </button>
                    </>
                  )}
                </div>

                <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                  <span>{intl.formatMessage({ id: 'guest' })}</span>
                  <span>
                    {' '}
                    {user?.isGuest ? (
                      <b>{intl.formatMessage({ id: 'yes' })}</b>
                    ) : (
                      <b>{intl.formatMessage({ id: 'no' })}</b>
                    )}
                  </span>
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                  <span> {intl.formatMessage({ id: 'username' })} </span>{' '}
                  <span> {user?.name} </span>
                </div>
                {user?.emails?.map((e, i) => (
                  <div
                    key={e.address}
                    className="d-flex flex-column flex-sm-row justify-content-between mb-2"
                  >
                    <span>
                      {i + 1}. {intl.formatMessage({ id: 'email' })}{' '}
                    </span>
                    <span>
                      {e.address}
                      {e.verified ? (
                        <b> {intl.formatMessage({ id: 'verified' })}</b>
                      ) : (
                        <b> {intl.formatMessage({ id: 'not_verified' })}</b>
                      )}
                    </span>
                  </div>
                ))}

                <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                  <span>{intl.formatMessage({ id: 'number_of_orders' })}</span>
                  <span> {user?.order?.length || 0}</span>
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                  <span>{intl.formatMessage({ id: 'displayname' })}</span>
                  <span> {user?.profile?.displayName} </span>
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                  <span>{intl.formatMessage({ id: 'first_name' })}</span>
                  <span> {user?.profile?.address?.firstName} </span>
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                  <span>{intl.formatMessage({ id: 'last_name' })}</span>
                  <span> {user?.profile?.address?.lastName} </span>
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                  <span>{intl.formatMessage({ id: 'company' })}</span>
                  <span> {user?.profile?.address?.Company} </span>
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                  <span>{intl.formatMessage({ id: 'address' })}</span>
                  <span> {user?.profile?.address?.addressLine} </span>
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                  <span>{intl.formatMessage({ id: 'secondary_message' })}</span>
                  <span> {user?.profile?.address?.addressLine2} </span>
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                  <span>{intl.formatMessage({ id: 'telephone' })}</span>{' '}
                  <span> {user?.profile?.phoneMobile} </span>
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                  <span>{intl.formatMessage({ id: 'postal_code' })}</span>
                  <span> {user?.profile?.address?.postalCode} </span>
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                  <span>{intl.formatMessage({ id: 'city' })}</span>{' '}
                  <span> {user?.profile?.address?.city} </span>
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                  <span>{intl.formatMessage({ id: 'region' })}</span>
                  <span> {user?.profile?.address?.regionCode} </span>
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                  <span>{intl.formatMessage({ id: 'country' })}</span>
                  <span>
                    {
                      COUNTRIES.filter(
                        (c) => c.code === user?.profile?.address?.countryCode,
                      )[0]?.name
                    }
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Account;
