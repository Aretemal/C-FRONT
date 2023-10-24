import React, { useLayoutEffect } from 'react';
import { withAuthRedirect } from '../../hoc/WithAuthRedirect';
import Profile from './Profile';
import { useAppDispatch, useAppSelector } from '../../hook/hook';
import { getInfoAuthUser } from '../../store/slices/thunks/profileThunks';

const ProfileContainer: React.FC = () => {
  const { token, authId } = useAppSelector((state) => state.auth);
  const { id } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    if (!id) {
      dispatch(getInfoAuthUser({ token, id: authId }));
    } else if (id === authId) {
      dispatch(getInfoAuthUser({ token, id: authId }));
    } else {
      dispatch(getInfoAuthUser({ token, id }));
    }
  }, [id]);

  return (
    <Profile />
  );
};
const ProfileWithRedirect = withAuthRedirect(ProfileContainer);
export default ProfileWithRedirect;
