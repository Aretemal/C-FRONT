import React from 'react';
import styles from './Profile.module.css';
import ProfileInfoContainer from './ProfileInfo/ProfileInfoContainer';

const Profile: React.FC = () => (
  <div className={styles.container}>
    <ProfileInfoContainer />
  </div>
);
export default Profile;
