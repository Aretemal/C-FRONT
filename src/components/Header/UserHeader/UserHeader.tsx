import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import styles from './UserHeader.module.css';
import ProfileIcon from '../../../assets/images/icons/ProfileIcon.png';
import SettingsIcon from '../../../assets/images/icons/SettingsIcon.png';
import FindUsersIcon from '../../../assets/images/icons/FindUsersIcon.png';
import MessagesIcon from '../../../assets/images/icons/MessagesIcon.png';
import RouletteIcon from '../../../assets/images/icons/RouletteIcon.png';
import { useAppDispatch, useAppSelector } from '../../../hook/hook';
import { toggleToken } from '../../../store/slices/authSlice';
import Icon from '@mdi/react';
import {mdiCashMultiple, mdiHome, mdiWalletBifold} from '@mdi/js';
import {getBalance} from "../../../store/slices/thunks/paymentsThunks";
import {getBalanceFromStore} from "../../../store/slices/selectors/paymentsSelectors";
import {Button, Modal, Row} from "antd";

const UserHeader:React.FC = () => {
  const { isAuth, authLogin, token } = useAppSelector((state) => state.auth);
  const balance = useAppSelector(getBalanceFromStore);

  const dispatch = useAppDispatch();

  const [isModalOpen, setModalOpen] = useState(false)

  useEffect(() => {
      dispatch(getBalance({ token }));
  }, [token]);

  if (isAuth) {
    return (
      <div className={styles.nav}>
        <NavLink to={`/main`} className={styles.item}>
            Главная
        </NavLink>
        {/*<NavLink to="/roulette" className={styles.item}>*/}
        {/*  <img className={styles.icon} src={RouletteIcon} alt="RouletteIcon" />*/}
        {/*</NavLink>*/}
        <NavLink to="/payments" className={styles.wallet}>
            <Row>
            <div style={{ color: "white", marginTop: 10, marginLeft: 12, marginRight: 16 }}>{balance} BYN</div>
            <Icon path={mdiCashMultiple} color={"white"} size={1.4} />
            </Row>
        </NavLink>
        <div
          className={styles.logout}
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Log out
        </div>
          <Modal
            open={isModalOpen}
            onCancel={() => setModalOpen(false)}
            title={"Вы уверены, что хотите выйти?"}
            footer={false}
            width={"400px"}
            centered
          >
              <Button onClick={() => dispatch(toggleToken())} style={{ marginLeft: 230, marginTop: 10 }} type={"primary"}>Да</Button>
              <Button onClick={() => setModalOpen(false)} style={{ marginLeft: 10 }}>Нет</Button>
          </Modal>
      </div>
    );
  }
  return <div />;
};
export default UserHeader;
