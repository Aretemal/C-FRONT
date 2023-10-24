import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import Login from './components/Login/LoginContainer';
import Header from './components/Header/Header';
import Registration from './components/Registration/RegistrationContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import RouletteContainer from './components/Roulette/RouletteContainer';

const App:React.FC = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route
        path="/profile/:login"
        element={<ProfileContainer />}
      />
      <Route
        path='/login'
        element={<Login />}
      />
      <Route
        path='/roulette'
        element={<RouletteContainer />}
      />
      <Route
        path=''
        element={<Login />}
      />
      <Route
        path='/registration'
        element={<Registration />}
      />
    </Routes>
  </BrowserRouter>
);

export default App;
