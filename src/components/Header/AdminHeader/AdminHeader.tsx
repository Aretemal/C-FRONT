import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AdminHeader.module.css';
import ProfileIcon from '../../../assets/images/icons/ProfileIcon.png';
import SettingsIcon from '../../../assets/images/icons/SettingsIcon.png';
import FindUsersIcon from '../../../assets/images/icons/FindUsersIcon.png';
import MessagesIcon from '../../../assets/images/icons/MessagesIcon.png';
import HomeIcon from '../../../assets/images/icons/HomeIcon.png';
import RouletteIcon from '../../../assets/images/icons/RouletteIcon.png';
import { useAppDispatch, useAppSelector } from '../../../hook/hook';
import { toggleToken } from '../../../store/slices/authSlice';
import {Button} from "antd";
import Icon from '@mdi/react';
import {mdiChartLine, mdiTable} from '@mdi/js';

const Header:React.FC = () => {
  const { isAuth, authLogin } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  if (isAuth) {
    return (
      <div className={styles.nav}>
        {/*<NavLink to={`/profile/${authLogin}`} className={styles.item}>*/}
        {/*  <img className={styles.icon} src={HomeIcon} alt="HomeIcon" />*/}
        {/*</NavLink>*/}
        <NavLink to={`/admin/charts`} className={styles.item} style={{ paddingLeft: 12 }}>
            <Icon path={mdiChartLine} color={"black"} size={1} />
        </NavLink>
        {/*<NavLink to="/dialogs" className={styles.item}>*/}
        {/*  <img className={styles.icon} src={MessagesIcon} alt="MessagesIcon" />*/}
        {/*</NavLink>*/}
        {/*<NavLink to="/roulette" className={styles.item}>*/}
        {/*  <img className={styles.icon} src={RouletteIcon} alt="RouletteIcon" />*/}
        {/*</NavLink>*/}
        <NavLink to="/admin/users" className={styles.item} style={{ paddingLeft: 12 }}>
            <Icon path={mdiTable} color={"black"} size={1} />
        </NavLink>
        <div
          className={styles.logout}
          onClick={() => {
            dispatch(toggleToken());
          }}
        >
          Log out
        </div>
      </div>
    );
  }
  return <div />;
};
export default Header;
