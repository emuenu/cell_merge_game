import React from 'react';
import GameCell from './GameCell';

function GameBoard({ table, onCellClick, mergeRowIndex_H, mergeRowIndex_V, mergeColIndex }) {

    return (
        <table className="game-table">
            <tbody>
                {table.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => {

                            // 縦横両方での結合セル
                            if (
                                rowIndex === mergeRowIndex_H &&
                                rowIndex === mergeRowIndex_V &&
                                colIndex === mergeColIndex &&
                                rowIndex < table.length - 1 &&
                                colIndex < row.length - 1
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

                            // 右隣セルは描画しない（横結合部分）
                            if (
                                rowIndex === mergeRowIndex_H &&
                                colIndex === mergeColIndex + 1 &&
                                rowIndex === mergeRowIndex_V
                            ) {
                                return null;
                            }

                            // 下隣セルは描画しない（縦結合部分）
                            if (
                                rowIndex === mergeRowIndex_V + 1 &&
                                colIndex === mergeColIndex &&
                                rowIndex - 1 === mergeRowIndex_H
                            ) {
                                return null;
                            }

                            // 横結合セル
                            if (
                                rowIndex === mergeRowIndex_H &&
                                colIndex === mergeColIndex &&
                                !(rowIndex === mergeRowIndex_V && colIndex === mergeColIndex) // 上の縦横両方の条件を除外
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
                            if (
                                rowIndex === mergeRowIndex_H &&
                                colIndex === mergeColIndex + 1
                            ) {
                                return null;
                            }

                            // 縦結合セル
                            if (
                                rowIndex === mergeRowIndex_V &&
                                colIndex === mergeColIndex &&
                                !(rowIndex === mergeRowIndex_H && colIndex === mergeColIndex) // 上の縦横両方の条件を除外
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
                            if (
                                rowIndex === mergeRowIndex_V + 1 &&
                                colIndex === mergeColIndex
                            ) {
                                return null;
                            }
                            
                            // その他のセル
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