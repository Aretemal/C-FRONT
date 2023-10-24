import React, { useEffect, useState } from 'react';
import styles from './ProfileStatus.module.css';
import { IProfileStatusProps } from '../../ProfileInterface';

const ProfileStatus: React.FC<IProfileStatusProps> = ({ status, onUpdateStatus }) => {
  const [editMode, setEditMode] = useState(false);
  const [newStatus, setStatus] = useState(status);
  useEffect(() => {
    setStatus(status);
  }, [status]);
  const activateMode = () => {
    setEditMode(true);
  };
  const deactivateEditMode = () => {
    setEditMode(false);
    onUpdateStatus(newStatus);
  };
  const onStatusChange = (value: string) => {
    setStatus(value);
  };
  return (
    <div className={styles.container}>
      { !editMode
        && (
          <div className={styles.status} onClick={activateMode}>
            <span className={styles.spanStatus}>{ newStatus }</span>
          </div>
        )}
      { editMode && (
      <div>
        <textarea
          className={styles.inputStatus}
          onChange={(e) => onStatusChange(e.currentTarget.value)}
          autoFocus
          onBlur={deactivateEditMode}
          value={newStatus}
        />
      </div>
      )}
    </div>
  );
};
export default ProfileStatus;
