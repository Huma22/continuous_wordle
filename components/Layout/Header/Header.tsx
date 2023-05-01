import { Fragment, useState } from "react";
import { gameActions } from "../../../store/game-slice";
import { useAppDispatch } from "../../../store/hooks";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  const resetClickHandler = () => {
    dispatch(gameActions.resetGame());
  };

  const sixLetterHandler = () => {
    dispatch(gameActions.sixLetterGame());
  };

  const sevenLetterHandler = () => {
    dispatch(gameActions.sevenLetterGame());
  };

  const eightLetterHandler = () => {
    dispatch(gameActions.eightLetterGame());
  };
  return (
    <Fragment>
      <header className="flex items-center text-white border-b-2 border-gray-700 h-14 justify-between px-4">
      <div className="font-nyt-karnakcondensed font-bold text-2xl tracking-tighter leading-none">Wordle</div>
      <div>
        <button className="cursor-pointer px-2" onClick={resetClickHandler}>5</button>
        <button className="cursor-pointer px-2" onClick={sixLetterHandler}>6</button>
        <button className="cursor-pointer px-2" onClick={sevenLetterHandler}>7</button>
        <button className="cursor-pointer px-2" onClick={eightLetterHandler}>8</button>
      </div>
    </header> 
    </Fragment>
  );
};

export default Header;
