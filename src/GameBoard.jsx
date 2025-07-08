import React from "react";
import GameCell from "./GameCell";
import { isOnBoard } from "./utils/board.js";

// table[mergeRowIndex_V][mergeColIndex_V] と table[mergeRowIndex_V + 1][mergeColIndex_V] を結合させる（縦方向のvertical）
// table[mergeRowIndex_H][mergeColIndex_H] と table[mergeRowIndex_H][mergeColIndex_H + 1] を結合させる（横方向のhorizontal）

function GameBoard({
    table,
    // mergeRowIndex_V,
    // mergeColIndex_V,
    // mergeRowIndex_H,
    // mergeColIndex_H,
    highlightCellsP1,
    highlightCellsP2,
    highlightEnabled,
    onCellClick,
}) {
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
                            // highlightEnabledがfalse（ハイライト機能がOFF）ならこれに何も入れないようにする
                            const isP1Highlight =
                                highlightEnabled &&
                                highlightCellsP1.some(
                                    ([r, c]) =>
                                        r === rowIndex && c === colIndex,
                                );

                            const isP2Highlight =
                                highlightEnabled &&
                                highlightCellsP2.some(
                                    ([r, c]) =>
                                        r === rowIndex && c === colIndex,
                                );

                            // 横方向のセル結合
                            if (
                                isOnBoard(
                                    rowIndex,
                                    colIndex + 1,
                                    table.length,
                                    table[0].length,
                                ) &&
                                table[rowIndex][colIndex + 1] == -1
                            ) {
                                return (
                                    <GameCell
                                        key={`mergeH-${rowIndex}-${colIndex}`}
                                        value={cell}
                                        colSpan={2} // 横方向にこのセルが2つ分の幅へ拡張される
                                        isP1Highlight={isP1Highlight}
                                        isP2Highlight={isP2Highlight}
                                        onClick={() =>
                                            onCellClick(rowIndex, colIndex)
                                        }
                                    />
                                );
                            }

                            // 縦方向のセル結合
                            if (
                                isOnBoard(
                                    rowIndex + 1,
                                    colIndex,
                                    table.length,
                                    table[0].length,
                                ) &&
                                table[rowIndex + 1][colIndex] == -2
                            ) {
                                return (
                                    <GameCell
                                        key={`mergeV-${rowIndex}-${colIndex}`}
                                        value={cell}
                                        rowSpan={2} // 縦方向にこのセルが2つ分の幅へ拡張される
                                        isP1Highlight={isP1Highlight}
                                        isP2Highlight={isP2Highlight}
                                        onClick={() =>
                                            onCellClick(rowIndex, colIndex)
                                        }
                                    />
                                );
                            }

                            if (cell == -1 || cell == -2) {
                                return null;
                            }

                            // その他のセルは通常通り描画させる
                            return (
                                <GameCell
                                    key={`cell-${rowIndex}-${colIndex}`}
                                    value={cell}
                                    isP1Highlight={isP1Highlight}
                                    isP2Highlight={isP2Highlight}
                                    onClick={() =>
                                        onCellClick(rowIndex, colIndex)
                                    }
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
