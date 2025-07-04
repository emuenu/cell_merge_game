import React from 'react';
import GameCell from './GameCell';

// table[mergeRowIndex_V][mergeColIndex_V] と table[mergeRowIndex_V + 1][mergeColIndex_V] を結合させる（縦方向のvertical）
// table[mergeRowIndex_H][mergeColIndex_H] と table[mergeRowIndex_H][mergeColIndex_H + 1] を結合させる（横方向のhorizontal）

function GameBoard({ table, mergeRowIndex_V, mergeColIndex_V, mergeRowIndex_H, mergeColIndex_H, highlightCellsP1, highlightCellsP2, onCellClick }) {

    return (
        <table className="game-table">
            <tbody>
                
                {/* table.mapで行を走査 */}
                {table.map((row, rowIndex) => (
                    // それぞれの行（table row)にrowIndexとして一意のkey属性を設定
                    <tr key={rowIndex}>
                        {/* row.mapでセル（各列）を走査 */}
                        {row.map((cell, colIndex) => {

                            // rowIndexが縦方向の行番号でcolIndexが横方向の列番号

                            // プレイヤーごとに分けて現在のセルがハイライト対象かどうかを見る
                            const isP1Highlight = highlightCellsP1.some(
                                ([r, c]) => r === rowIndex && c === colIndex
                            );

                            const isP2Highlight = highlightCellsP2.some(
                                ([r, c]) => r === rowIndex && c === colIndex
                            );

                            // 横方向のセル結合
                            if (
                                rowIndex === mergeRowIndex_H &&
                                colIndex === mergeColIndex_H
                            ) {
                            return (
                                <GameCell
                                    key={`mergeH-${rowIndex}-${colIndex}`}
                                    value={cell}
                                    colSpan={2} // 横方向にこのセルが2つ分の幅へ拡張される
                                    isP1Highlight={isP1Highlight}
                                    isP2Highlight={isP2Highlight}
                                    onClick={() => onCellClick(rowIndex, colIndex)}
                                />
                            );
                            }

                            // 横にセル結合した時、結合された右隣のセルは表示させないようにする
                            if (
                                rowIndex === mergeRowIndex_H &&
                                colIndex === mergeColIndex_H + 1 &&
                                !(rowIndex === mergeRowIndex_V && colIndex === mergeColIndex_V + 1)
                            ) {
                                return null; // 描画をスキップ
                            }

                            // 縦方向のセル結合
                            if (
                                rowIndex === mergeRowIndex_V &&
                                colIndex === mergeColIndex_V
                            ) {
                            return (
                                <GameCell
                                    key={`mergeV-${rowIndex}-${colIndex}`}
                                    value={cell}
                                    rowSpan={2} // 縦方向にこのセルが2つ分の幅へ拡張される
                                    isP1Highlight={isP1Highlight}
                                    isP2Highlight={isP2Highlight}
                                    onClick={() => onCellClick(rowIndex, colIndex)}
                                />
                            );
                            }

                            // 縦にセル結合した時、結合された1つ下のセルは表示させないようにする
                            if (
                                rowIndex === mergeRowIndex_V + 1 &&
                                colIndex === mergeColIndex_V &&
                                !(rowIndex === mergeRowIndex_H + 1 && colIndex === mergeColIndex_H)
                            ) {
                                return null; // 描画をスキップ
                            }

                            // その他のセルは通常通り描画させる
                            return (
                                <GameCell
                                    key={`cell-${rowIndex}-${colIndex}`}
                                    value={cell}
                                    isP1Highlight={isP1Highlight}
                                    isP2Highlight={isP2Highlight}
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