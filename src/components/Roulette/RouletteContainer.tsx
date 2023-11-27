import React from 'react';
import Roulette from './Roulette';
import { useAppDispatch, useAppSelector } from '../../hook/hook';
import { getRouletteResult } from '../../store/slices/thunks/rouletteThunks';
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";

const RouletteContainer: React.FC = () => {
  const { token } = useAppSelector((state) => state.auth);
  const { isWin, result } = useAppSelector((state) => state.roulette);
  const dispatch = useAppDispatch();

  const onSelectNumber = ({ selectedNumber }: { selectedNumber: string }) => {
    dispatch(getRouletteResult({ token, selectedNumber }));
  };
  return (
    <Roulette
      onSelectNumber={onSelectNumber}
      isWin={isWin}
      result={result}
    />
  );
};
export default withAuthRedirect(RouletteContainer);
