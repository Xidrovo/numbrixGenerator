import React from 'react';

function Board({ board }) {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="p-2 flex flex-row">
          {row.map((cell, cellIndex) => (
            <p key={cellIndex} className={`p-2 border text-center text-white min-w-cell ${cell > 0 && 'bg-teal-700'}`}>
              {cell}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
