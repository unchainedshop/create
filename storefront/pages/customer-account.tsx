import { useState } from 'react';
import UpdateProfileForm from '../modules/auth/components/UpdateProfileForm';

import useSetUsername from '../modules/auth/hooks/useSetUsername';
import useUserQuery from '../modules/auth/hooks/useUserQuery';
import COUNTRIES from '../modules/common/data/countries-list';
import Footer from '../modules/layout/components/Footer';
import Header from '../modules/layout/components/Header';

const Account = () => {
  const { user } = useUserQuery();
  const [updateUsername, setUpdateUserName] = useState(false);
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
    <div className="container">
      <Header />
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="d-flex justify-content-between mb-5">
            <b>Profile</b>
            {updateProfile ? (
              <button
                type="button"
                className="button text-danger"
                onClick={() => setUpdateProfile(false)}
              >
                Cancel
              </button>
            ) : (
              <button
                type="button"
                className="button button--primary"
                onClick={() => setUpdateProfile(true)}
              >
                Update Profile
              </button>
            )}
          </div>
          {updateProfile ? (
            <UpdateProfileForm user={user} onSuccess={onProfileUpdateSuccess} />
          ) : (
            <div>
              <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                <span> Username </span>
                {!updateUsername ? (
                  <>
                    <span> {user?.username} </span>
                    <button
                      className=" button button--primary"
                      onClick={() => setUpdateUserName(!updateUsername)}
                    >
                      Change
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      onChange={(e) => setUserName(e.target.value)}
                      value={username}
                    />
                    <button
                      className="button button--primary"
                      onClick={() => updateName(username)}
                    >
                      Update
                    </button>
                    <button
                      className=" button  text-danger"
                      onClick={() => setUpdateUserName(!updateUsername)}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>

              <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                <span>Guest </span>
                <span> {user?.isGuest ? <b>Yes</b> : <b>No</b>}</span>
              </div>
              <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                <span> name </span> <span> {user?.name} </span>
              </div>
              {user?.emails?.map((e, i) => (
                <div
                  key={e.address}
                  className="d-flex flex-column flex-sm-row justify-content-between mb-2"
                >
                  <span>{i + 1}. Email </span>
                  <span>
                    {e.address}
                    {e.verified ? <b> Verified</b> : <b> Not Verified</b>}
                  </span>
                </div>
              ))}

              <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                <span>Number of orders </span>
                <span> {user?.order?.length || 0}</span>
              </div>
              <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                <span>Display name</span>
                <span> {user?.profile?.displayName} </span>
              </div>
              <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                <span>First name</span>
                <span> {user?.profile?.address?.firstName} </span>
              </div>
              <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                <span>Last name</span>
                <span> {user?.profile?.address?.lastName} </span>
              </div>
              <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                <span>Company</span>
                <span> {user?.profile?.address?.Company} </span>
              </div>
              <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                <span>Main address</span>
                <span> {user?.profile?.address?.addressLine} </span>
              </div>
              <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                <span>Secondary address</span>
                <span> {user?.profile?.address?.addressLine2} </span>
              </div>
              <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                <span>Phone</span> <span> {user?.profile?.phoneMobile} </span>
              </div>
              <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                <span>Postal Code</span>
                <span> {user?.profile?.address?.postalCode} </span>
              </div>
              <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                <span>City</span> <span> {user?.profile?.address?.city} </span>
              </div>
              <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                <span>Region</span>
                <span> {user?.profile?.address?.regionCode} </span>
              </div>
              <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                <span>Country</span>
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
      <Footer />
    </div>
  );
};

export default Account;
