import React from "react";
import "./style/Game.css";

function GameCell({
    value,
    onClick,
    colSpan,
    rowSpan,
    isP1Highlight,
    isP2Highlight,
}) {
    let display = "";

    // 値1、2に対して1=X, 2=Oを対応させてセルに表示させる（0の場合は変更なしで空欄となる）
    if (value === 1) display = "X";
    else if (value === 2) display = "O";

    // クラス名をプレイヤーに合わせて分岐
    const highlightClass = isP1Highlight
        ? "highlight-p1"
        : isP2Highlight
          ? "highlight-p2"
          : ""; // ハイライトを付けないセル

    return (
        <td
            className={`game-cell ${highlightClass}`}
            colSpan={colSpan}
            rowSpan={rowSpan}
            onClick={onClick}
        >
            {display}
        </td>
    );
}

export default GameCell;
