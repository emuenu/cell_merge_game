import React from 'react';
import GameCell from './GameCell';

function GameBoard({ table, onCellClick }) {

    // 受け取った二次元配列tableに従ってHTMLのテーブルとしてゲーム盤を表示させる
    return (
        <table className='game-table'>
            <tbody>
                {table.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                        // 一つ一つのセルについての表示をGameCellコンポーネントで行う
                            <GameCell
                                key={colIndex}
                                value={cell}
                                onClick={() => onCellClick(rowIndex, colIndex)}
                            />
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );

}

export default GameBoard;