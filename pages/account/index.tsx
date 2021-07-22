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
import useRemoveEmail from '../../modules/auth/hooks/useRemoveEmail';
import useAddEmail from '../../modules/auth/hooks/useAddEmail';
import useResendVerificationEmail from '../../modules/auth/hooks/useResendVerificationEmail';

const Account = () => {
  const { user } = useUser();
  const [updateUsername, setUpdateUserName] = useState(false);
  const intl = useIntl();
  const [username, setUserName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const { setUsername } = useSetUsername();
  const { removeEmail } = useRemoveEmail();
  const { addEmail } = useAddEmail();

  const { resendVerificationEmail } = useResendVerificationEmail();
  const [updateProfile, setUpdateProfile] = useState(false);
  const showDebugInfo = false;
  const showUsername = user?.roles?.includes('admin');
  const onProfileUpdateComplete = (value) => {
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
            <h1>{intl.formatMessage({ id: 'account' })}</h1>
            {updateProfile ? (
              <UpdateProfileForm
                user={user}
                onSuccess={onProfileUpdateComplete}
                onCancel={onProfileUpdateComplete}
              />
            ) : (
              <div>
                {showUsername && (
                  <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                    <span className="mb-1">
                      {intl.formatMessage({ id: 'username' })}
                    </span>
                    {!updateUsername ? (
                      <>
                        <span className="mb-1">
                          {user?.username ||
                            intl.formatMessage({ id: 'no_username_set' })}
                        </span>
                        <button
                          type="button"
                          className=" button button--secondary"
                          onClick={() => setUpdateUserName(!updateUsername)}
                        >
                          {intl.formatMessage({ id: 'change_username' })}
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          className="form-control ml-2"
                          type="text"
                          onChange={(e) => setUserName(e.target.value)}
                          value={username}
                        />
                        <button
                          type="button"
                          className="button button--primary ml-2"
                          onClick={() => updateName(username)}
                        >
                          {intl.formatMessage({ id: 'save_username' })}
                        </button>
                        <button
                          type="button"
                          className="button text-danger ml-2"
                          onClick={() => setUpdateUserName(!updateUsername)}
                        >
                          {intl.formatMessage({ id: 'cancel' })}
                        </button>
                      </>
                    )}
                  </div>
                )}

                <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                  <span className="mb-1">
                    {intl.formatMessage({ id: 'password' })}
                  </span>
                  <span className="mb-1">
                    <Link href="account/change-password">
                      <a className="button button--secondary">
                        {intl.formatMessage({ id: 'change_password' })}
                      </a>
                    </Link>
                  </span>
                </div>
                <div>
                  {user?.emails?.map((e, i) => (
                    <div
                      key={e.address}
                      className="d-flex flex-column flex-sm-row justify-content-between mb-2"
                    >
                      <span className="mb-1">
                        {i + 1}. {intl.formatMessage({ id: 'email' })}
                      </span>
                      <span className="mb-1">
                        {e.address}
                        {user?.emails?.length > 1 && (
                          <button
                            type="button"
                            className="button ml-2"
                            onClick={() => removeEmail(e.address)}
                          >
                            {intl.formatMessage({
                              id: 'remove_email',
                            })}
                          </button>
                        )}
                        {e.verified ? (
                          <>
                            <b> {intl.formatMessage({ id: 'verified' })}</b>
                          </>
                        ) : (
                          <>
                            <b> {intl.formatMessage({ id: 'not_verified' })}</b>
                            <button
                              type="button"
                              className="button ml-2"
                              onClick={() => resendVerificationEmail(e.address)}
                            >
                              {intl.formatMessage({
                                id: 'resend_verification',
                              })}
                            </button>
                          </>
                        )}
                      </span>
                    </div>
                  ))}
                  <input
                    className="form-control ml-2"
                    type="text"
                    onChange={(e) => setNewEmail(e.target.value)}
                    value={newEmail}
                  />
                  <button
                    type="button"
                    className="button button--primary ml-2"
                    onClick={() => addEmail(newEmail)}
                  >
                    {intl.formatMessage({ id: 'add_email' })}
                  </button>
                </div>

                <h3>Address</h3>
                <div className="d-flex justify-content-between mb-5">
                  {!updateProfile && (
                    <button
                      type="button"
                      className="button button--primary"
                      onClick={() => setUpdateProfile(true)}
                    >
                      {intl.formatMessage({ id: 'change_address' })}
                    </button>
                  )}
                </div>
                {showDebugInfo && (
                  <>
                    <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                      <span className="mb-1">
                        {intl.formatMessage({ id: 'guest' })}
                      </span>
                      <span className="mb-1">
                        {user?.isGuest ? (
                          <b>{intl.formatMessage({ id: 'yes' })}</b>
                        ) : (
                          <b>{intl.formatMessage({ id: 'no' })}</b>
                        )}
                      </span>
                    </div>
                    <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                      <span className="mb-1">
                        {intl.formatMessage({ id: 'number_of_orders' })}
                      </span>
                      <span className="mb-1"> {user?.order?.length || 0}</span>
                    </div>
                  </>
                )}

                <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                  <span className="mb-1">
                    {intl.formatMessage({ id: 'first_name' })}
                  </span>
                  <span className="mb-1">
                    {' '}
                    {user?.profile?.address?.firstName}{' '}
                  </span>
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                  <span className="mb-1">
                    {intl.formatMessage({ id: 'last_name' })}
                  </span>
                  <span className="mb-1">
                    {' '}
                    {user?.profile?.address?.lastName}{' '}
                  </span>
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                  <span className="mb-1">
                    {intl.formatMessage({ id: 'company' })}
                  </span>
                  <span className="mb-1">
                    {' '}
                    {user?.profile?.address?.Company}{' '}
                  </span>
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                  <span className="mb-1">
                    {intl.formatMessage({ id: 'address' })}
                  </span>
                  <span className="mb-1">
                    {' '}
                    {user?.profile?.address?.addressLine}{' '}
                    {user?.profile?.address?.addressLine2 && (
                      <>
                        <br />
                        {user?.profile?.address?.addressLine2}
                      </>
                    )}
                  </span>
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                  <span className="mb-1">
                    {intl.formatMessage({ id: 'telephone' })}
                  </span>
                  <span className="mb-1"> {user?.profile?.phoneMobile} </span>
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                  <span className="mb-1">
                    {intl.formatMessage({ id: 'postal_code' })}
                  </span>
                  <span className="mb-1">
                    {' '}
                    {user?.profile?.address?.postalCode}{' '}
                  </span>
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                  <span className="mb-1">
                    {intl.formatMessage({ id: 'city' })}
                  </span>
                  <span className="mb-1"> {user?.profile?.address?.city} </span>
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                  <span className="mb-1">
                    {intl.formatMessage({ id: 'region' })}
                  </span>
                  <span className="mb-1">
                    {' '}
                    {user?.profile?.address?.regionCode}{' '}
                  </span>
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                  <span className="mb-1">
                    {intl.formatMessage({ id: 'country' })}
                  </span>
                  <span className="mb-1">
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
