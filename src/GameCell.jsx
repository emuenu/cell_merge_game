import React from 'react';
import './style/game.css';

function GameCell({ value, onClick }) {

    // 1つのセルについて、値0、1、2に対して0は空欄、1はX、2はOを表示させる
    
    const display = value === 1 ? 'X' : value === 2 ? 'O' : '';

    return (
    <td className="game-cell" onClick={onClick}>
        {display}
    </td>
    );

}

export default GameCell;