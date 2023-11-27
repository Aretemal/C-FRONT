import React, {useEffect} from 'react';
import {
  BrowserRouter,
  Route,
  Routes, redirect,
} from 'react-router-dom';
import Login from './components/Login/LoginContainer';
import UserHeader from './components/Header/UserHeader/UserHeader';
import Registration from './components/Registration/RegistrationContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import RouletteContainer from './components/Roulette/RouletteContainer';
import UsersTable from "./components/UsersTable/UsersTable";
import {useAppDispatch, useAppSelector} from "./hook/hook";
import {getUserRole} from "./store/slices/selectors/authSelectors";
import AdminHeader from "./components/Header/AdminHeader/AdminHeader";
import {NotificationContainer} from "react-notifications";
import ActivityBoard from "./components/ ActivityBoard/ ActivityBoard.jsx";
import Payments from "./components/Payments/Payments.jsx";
import Main from "./components/Main/Main.jsx";
import {Col} from "antd";
import bg from "./assets/images/bg.jpg";
import AdminCharts from "./components/AdminCharts/AdminCharts.jsx";
import {toggleToken} from "./store/slices/authSlice";

const Header = () => {
    const dispatch = useAppDispatch();
    const role = useAppSelector(getUserRole);
    if (role === 'user') {
        return <UserHeader/>
    } else {
        return <AdminHeader/>
    }
}

const App = () => {
    const role = useAppSelector(getUserRole);

    const styleApp = {
        width: '100%',
        height: '100vh',
    }
    if (role === 'user') styleApp.backgroundImage = `url(./bg.jpg)`;
    if (role === 'admin') styleApp.background = '#F0F0F0';

    return (
     <Col style={styleApp}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
              path='/login'
              element={<Login />}
          />
          <Route
              path='/main'
              element={<Main />}
          />
            <Route
                path='/admin/users'
                element={<UsersTable />}
            />
          <Route
              path='/registration'
              element={<Registration />}
          />
          <Route
              path='/payments'
              element={<Payments />}
          />
            <Route
                path='/roulette'
                element={<RouletteContainer />}
            />
            <Route
                path='/admin/activity'
                element={<ActivityBoard />}
            />
            <Route
                path='/admin/charts'
                element={<AdminCharts />}
            />
        </Routes>
        <NotificationContainer />
      </BrowserRouter>
      </Col>
  );
}

export default App;
