import React from 'react';
import GameCell from './GameCell';

function GameBoard({ table, mergeRowIndex_H, mergeRowIndex_V, mergeColIndex_H, mergeColIndex_V, onCellClick }) {

    return (
        <table className="game-table">
            <tbody>
            {table.map((row, rowIndex) => (
                <tr key={rowIndex}>
                {row.map((cell, colIndex) => {
                    
                    /** ==============================
                     *  1) 両方結合セル（縦結合と横結合が交わる位置）
                     * ============================== */
                    if (
                        rowIndex === mergeRowIndex_H &&
                        colIndex === mergeColIndex_H &&
                        rowIndex === mergeRowIndex_V &&
                        colIndex === mergeColIndex_V &&
                        rowIndex < table.length - 1 &&  // 下に1行分空きがある
                        colIndex < row.length - 1       // 右に1列分空きがある
                    ) {
                    return (
                        <GameCell
                            key={`mergeHV-${rowIndex}-${colIndex}`}
                            value={`${cell} + ${row[colIndex + 1]} + ${table[rowIndex + 1][colIndex]}`}
                            colSpan={2}
                            rowSpan={2}
                            onClick={() => onCellClick(rowIndex, colIndex)}
                        />
                    );
                    }

                    /** ==============================
                     *  2) 横結合セル（縦結合とは交わらない）
                     * ============================== */
                    if (
                        rowIndex === mergeRowIndex_H &&
                        colIndex === mergeColIndex_H &&
                        !(rowIndex === mergeRowIndex_V && colIndex === mergeColIndex_V) && // 両方結合セル除外
                        colIndex < row.length - 1 // 右に1列空きが必要
                    ) {
                    return (
                        <GameCell
                            key={`mergeH-${rowIndex}-${colIndex}`}
                            value={`${cell} + ${row[colIndex + 1]}`}
                            colSpan={2}
                            onClick={() => onCellClick(rowIndex, colIndex)}
                        />
                    );
                    }

                    /** ==============================
                     *  3) 縦結合セル（横結合とは交わらない）
                     * ============================== */
                    if (
                        rowIndex === mergeRowIndex_V &&
                        colIndex === mergeColIndex_V &&
                        !(rowIndex === mergeRowIndex_H && colIndex === mergeColIndex_H) && // 両方結合セル除外
                        rowIndex < table.length - 1 // 下に1行空きが必要
                    ) {
                    return (
                        <GameCell
                            key={`mergeV-${rowIndex}-${colIndex}`}
                            value={`${cell} + ${table[rowIndex + 1][colIndex]}`}
                            rowSpan={2}
                            onClick={() => onCellClick(rowIndex, colIndex)}
                        />
                    );
                    }

                    /** ==============================
                     *  4) 横結合セルの右隣セルは描画しない
                     * ============================== */
                    if (
                        rowIndex === mergeRowIndex_H &&
                        colIndex === mergeColIndex_H + 1 &&
                        !(rowIndex === mergeRowIndex_V && colIndex === mergeColIndex_V + 1)
                    ) {
                    return null;
                    }

                    /** ==============================
                     *  5) 縦結合セルの下隣セルは描画しない
                     * ============================== */
                    if (
                        rowIndex === mergeRowIndex_V + 1 &&
                        colIndex === mergeColIndex_V &&
                        !(rowIndex === mergeRowIndex_H + 1 && colIndex === mergeColIndex_H)
                    ) {
                    return null;
                    }

                    /** ==============================
                     *  6) 両方結合セルの右隣・下隣も描画しない
                     * ============================== */
                    if (
                        rowIndex === mergeRowIndex_H &&
                        colIndex === mergeColIndex_H + 1 &&
                        rowIndex === mergeRowIndex_V &&
                        colIndex === mergeColIndex_V + 1
                    ) {
                    return null;
                    }

                    if (
                        rowIndex === mergeRowIndex_V + 1 &&
                        colIndex === mergeColIndex_V &&
                        rowIndex - 1 === mergeRowIndex_H &&
                        colIndex === mergeColIndex_H
                    ) {
                    return null;
                    }

                    /** ==============================
                     *  7) その他のセルはそのまま描画
                     * ============================== */
                    return (
                    <GameCell
                        key={`cell-${rowIndex}-${colIndex}`}
                        value={cell}
                        onClick={() => onCellClick(rowIndex, colIndex)}
                    />
                    );
                })}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default GameBoard;