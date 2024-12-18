import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake, faPen } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import Avatar from '../../components/Avatar/Avatar';
import EditProfileForm from './EditProfileForm';
import ProfileBio from './ProfileBio';

const UserProfile = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter((user) => user._id === id)[0];
  let currentUser = useSelector((state) => state.currentUserReducer);
  const [Switch, setSwitch] = useState(false);

  return (
    <div className='flex min-h-screen bg-gray-50 '>
      <LeftSidebar />
      <div className='flex-1 p-8 mt-14 pl-10'>
        {' '}
        {/* Added left padding to the content */}
        <section className='bg-white shadow-lg rounded-lg p-6 h-full'>
          <div className='flex items-start justify-between'>
            <div className='flex items-start'>
              {/* Bigger Avatar */}
              <Avatar
                backgroundColor='#915BD4'
                color='white'
                fontSize='40px'
                px='40px'
                py='40px'
              >
                {currentProfile?.name.charAt(0).toUpperCase()}
              </Avatar>
              <div className='ml-6'>
                <h1 className='text-4xl font-bold text-gray-800'>
                  {currentProfile?.name}
                </h1>
                <p className='text-gray-600 mt-1'>
                  <FontAwesomeIcon
                    icon={faBirthdayCake}
                    className='mr-2 text-indigo-500'
                  />
                  {console.log('-----------------', currentProfile?.joinedOn)}
                  {console.log(moment(currentProfile?.joinedOn).toString())}
                  {console.log(moment(currentProfile?.joinedOn))}
                  Joined {moment(currentProfile?.joinedOn).fromNow()}
                </p>
              </div>
            </div>
            {currentUser?.result._id === id && (
              <button
                type='button'
                onClick={() => setSwitch(true)}
                className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200'
              >
                <FontAwesomeIcon icon={faPen} className='mr-2' /> Edit Profile
              </button>
            )}
          </div>

          <div className='mt-6'>
            {Switch ? (
              <EditProfileForm
                currentUser={currentUser}
                setSwitch={setSwitch}
              />
            ) : (
              <ProfileBio currentProfile={currentProfile} />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
