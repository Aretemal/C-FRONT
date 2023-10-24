import React from 'react';
import { useParams } from 'react-router-dom';
import ProfileInfo from './ProfileInfo';
import { useAppSelector } from '../../../hook/hook';

const ProfileInfoContainer: React.FC = () => {
  const { profile } = useAppSelector((state) => state.profile);
  const { authLogin } = useAppSelector((state) => state.auth);
  const params = useParams();

  return (
    <ProfileInfo
      isAuthProfile={authLogin === params.login}
      profile={profile}
    />
  );
};
export default ProfileInfoContainer;
