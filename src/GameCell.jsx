import React from 'react';
import './style/Game.css';

function GameCell({ value, onClick, colSpan, rowSpan }) {
    
    let display = '';

    // 値1、2に対して1=X, 2=Oを対応させてセルに表示させる（0の場合は変更なしで空欄となる）
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