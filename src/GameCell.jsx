import React from 'react';
import './style/game.css';

function GameCell({ value, onClick, colSpan, rowSpan }) {
    
    let display = '';

    // 値0、1、2に対して 0=空欄, 1=X, 2=Oを対応させてセルに表示させる
    if (value === 1) display = 'X';
    else if (value === 2) display = 'O';

    return (
        <td
            className="game-cell"
            colSpan={colSpan}
            rowSpan={rowSpan}
            onClick={onClick}
        >
            {display}
        </td>
    );

}

export default GameCell;