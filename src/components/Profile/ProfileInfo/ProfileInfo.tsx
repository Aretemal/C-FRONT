import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import styles from './ProfileInfo.module.css';
import DefaultAva from '../../../assets/images/DefaultAva.webp';
import { IProfileInfoProps } from '../ProfileInterface';

const ProfileInfo: React.FC<IProfileInfoProps> = ({ profile, isAuthProfile }) => {
  if (!profile) {
    return <Preloader />;
  }
  return (
    <div className={styles.container}>
      <img
        className={styles['block-ava']}
        src={DefaultAva}
        alt="Ava"
      />
      <div className={styles['block-description']}>
        <span className={styles['block-description_name']}>
          {`${profile.firstName} ${profile.lastName} ${isAuthProfile}`}
        </span>
      </div>
    </div>
  );
};
export default ProfileInfo;
