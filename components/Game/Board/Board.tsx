import { useAppSelector } from "../../../store/hooks";
import Row from "./Row";

const Board: React.FC = () => {
  const [boardState, numberOfLetters, currentRow, boardStyles] = useAppSelector(
    ({ game: { numberOfLetters, boardState, currentRow, boardStyles } }) => {
      return [boardState, numberOfLetters, currentRow, boardStyles];
    }
  );

  return (
    <div className="flex justify-center items-center flex-grow-1 overflow-hidden">
      <div className="w-350 h-420 grid grid-rows-6 grid-gap-5 p-10 box-border">
        {boardState.map((row, index) => {
          return (
            <Row
              key={index}
              rowContent={row}
              numberOfLetters={numberOfLetters}
              boardStyle={boardStyles[index]}
              isCurrent={currentRow === index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Board;
