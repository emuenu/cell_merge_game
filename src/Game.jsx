import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GameBoard from './GameBoard';
import { checkRows, checkColumns, checkDiagonals } from './utils/judge.js';
import { getRandomInt } from './utils/ramdom.js'
import './style/Game.css';

function Game() {

    // 縦がverticalで横がhorizontalの二次元配列を用意してゲームボードを作りn目並べを行う
    // セルのクリックで対応する要素に1(O)か2(X)を入れるようにする
    // 0: 空, 1: X→player: 1, 2: O→player: 2（最初は全て0）
    // 乱数で決めた値でボード上のランダムな位置に2セル分の結合セルを生成するようにする
    // -1: ←横結合の際に左隣の(c-1)を参照させる, -2: ←縦結合の際に上の(r-1)を参照させる 

    const location = useLocation();
    const { v, h, w } = location.state || {}; // 数値型に変換済みで送られてくるv、h、wを受け取る
    const navigate = useNavigate();

    const [table, setTable] = useState([]); // ゲーム盤を二次元配列として保持する（table[縦の行数][横の列数]）
    const [currentPlayer, setCurrentPlayer] = useState(1); // 手番の来ているプレイヤー（1 = X側, 2 = O側で先手はX側）

    const [mergeRowIndex_V, setMergeRowIndex_V] = useState(null); // 乱数を使って決める縦結合位置
    const [mergeColIndex_V, setMergeColIndex_V] = useState(null);
    const [mergeRowIndex_H, setMergeRowIndex_H] = useState(null); // 乱数を使って決める横結合位置
    const [mergeColIndex_H, setMergeColIndex_H] = useState(null);
    
    const [highlightCellsP1, setHighlightCellsP1] = useState([]); // player1のハイライト状態を保持
    const [highlightCellsP2, setHighlightCellsP2] = useState([]); // player2のハイライト状態を保持

    // 名前解決
    const vertical = v;
    const horizontal = h;
    const win_number = w;

    // tableを初期化してマス目を生成する
    useEffect(() => {

        if (!vertical || !horizontal) return; // verticalやhorizontalがundefinedなら何もしない
        
        // vとhを用いて、二次元配列を生成する（ゲーム盤を初期化）
        const newTable = Array.from({ length: vertical }, () =>
            Array(horizontal).fill(0)
        );
        setTable(newTable); // tableを更新

        let mergeRowV, mergeColV; // 縦方向結合位置（行数がmergeRowVで列数がmergeColV）
        let mergeRowH, mergeColH; // 横方向結合位置（行数がmergeRowHで列数がmergeColH）

        // 乱数を生成
        while(true){

            mergeRowV = getRandomInt(0, vertical - 2); // 下に飛び出してはいけないのでvertical-2まで
            mergeColV = getRandomInt(0, horizontal - 1);
            mergeRowH = getRandomInt(0, vertical - 1);
            mergeColH = getRandomInt(0, horizontal - 2); // 右に飛び出してはいけないのでhorizontal-2まで

            // 値が適切でない場合は乱数生成をやり直す
            if(
                !(mergeRowV === mergeRowH && (mergeColV === mergeColH || mergeColV === mergeColH + 1)) &&  // 横方向の結合セルのどちらか2つから下に縦方向の結合セルを伸ばすのはダメ
                !(mergeRowV === mergeRowH - 1 && (mergeColV === mergeColH || mergeColV === mergeColH + 1)) && // 縦方向の結合セルが横方向の結合セルと被るのはダメ
                !(mergeColH === mergeColV && (mergeRowH === mergeRowV || mergeRowH === mergeRowV + 1)) && // 縦方向の結合セルのどちらか2つから右に横方向の結合セルを伸ばすのはダメ
                !(mergeColH === mergeColV -1 && (mergeRowH === mergeRowV || mergeRowH === mergeRowV + 1)) // 横方向の結合セルが縦方向の結合セルと被るのはダメ
            ) break;

        }
        
        // 値を設定
        setMergeRowIndex_V(mergeRowV);
        setMergeColIndex_V(mergeColV);
        setMergeRowIndex_H(mergeRowH);
        setMergeColIndex_H(mergeColH);
        
    }, [vertical, horizontal]); // verticalとhorizontalに依存する

    // セルがクリックされたときのイベントハンドラ関数
    const handleCellClick = (row, col) => {

        if (table[row][col] !== 0) return; // 既にOかXが入力されていれば無視
        
        // クリックした位置のセルに対応する配列の要素に1(O)か2(X)を入れた新しい配列newTableを作成
        const newTable = table.map((r, rowIndex) =>
            r.map((cell, colIndex) =>
                rowIndex === row && colIndex === col ? currentPlayer : cell
            )
        );

        // 結合セルのフラグは毎回更新
        newTable[mergeRowIndex_H][mergeColIndex_H + 1] = -1; // 横方向に結合されたセルには-1を入れておく
        newTable[mergeRowIndex_V + 1][mergeColIndex_V] = -2; // 縦方向に結合されたセルには-2を入れておく

        // ゲーム盤を更新させる
        setTable(newTable);

        // セルが結合されて表示されている時、結合セルをクリックすると'O'か'X'が表示され、配列としては拡張する側のセル（左か上）の位置にcurrentPlayerの値が入っている
        // 結合セルの表示は、その拡張する側のセルを2マス分の表示に拡張し、結合された側のセルの表示をスキップすることで実現している
        // その時、表示されなくなり使われなくなった結合された側のセル（右か下）の位置には配列としては横結合なら-1、縦結合なら-2を入れておく

        // 盤面の状態のスキャンは両プレイヤー分毎回行う

        // Player1の連続セルをスキャン
        const p1Row = checkRows(newTable, win_number, 1);
        const p1Col = checkColumns(newTable, win_number, 1);
        const p1Diag = checkDiagonals(newTable, win_number, 1);

        // Player1のハイライト位置の情報を統合
        const p1Highlights = [...p1Row.highlights, ...p1Col.highlights, ...p1Diag.highlights];

        // 重複している部分は消すユニーク化処理を行う
        const p1Unique = [...new Set(p1Highlights.map(pos => pos.join(',')))]
            .map(str => str.split(',').map(Number));

        setHighlightCellsP1(p1Unique); // 配列をセット

        // Player2の連続セルをスキャン
        const p2Row = checkRows(newTable, win_number, 2);
        const p2Col = checkColumns(newTable, win_number, 2);
        const p2Diag = checkDiagonals(newTable, win_number, 2);

        // Player2のハイライト位置の情報を統合
        const p2Highlights = [...p2Row.highlights, ...p2Col.highlights, ...p2Diag.highlights];

        // 重複している部分は消すユニーク化処理を行う
        const p2Unique = [...new Set(p2Highlights.map(pos => pos.join(',')))]
            .map(str => str.split(',').map(Number));

        setHighlightCellsP2(p2Unique); // 配列をセット

        // 手番のプレイヤーの縦・横・斜めでの勝利判定
        const winRow = currentPlayer === 1 ? p1Row.win : p2Row.win;
        const winCol = currentPlayer === 1 ? p1Col.win : p2Col.win;
        const winDiag = currentPlayer === 1 ? p1Diag.win : p2Diag.win;

        // 最終的な勝利判定を行う
        if(winRow || winCol || winDiag) {
            alert(`Player ${currentPlayer} wins!`);
            navigate("/");  // ホームにリダイレクトさせる
            return; // ゲームは終了
        }

        // 引き分け判定（すべてのセルが埋まっているか）
        const isDraw = newTable.every(row => row.every(cell => cell !== 0));

        // 引き分けの場合もホームにリダイレクトさせてゲーム終了
        if (isDraw) {
            alert("Draw!");
            navigate("/");
            return;
        }

        // （勝利していない場合）プレイヤーの手番を次へ交代させる
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);

    };

    // GameBoardコンポーネントへpropsに渡す
    // 二次元配列に対応させてHTMLのテーブルとしてO、Xの表示を含めてゲーム盤を表示させる
    return (
        <div className='game-layout'>
            <p>縦: {vertical} / 横: {horizontal} / 勝利条件: {win_number} マス揃える</p>
            <GameBoard
                table={table}
                mergeRowIndex_V={mergeRowIndex_V}
                mergeColIndex_V={mergeColIndex_V}
                mergeRowIndex_H={mergeRowIndex_H}
                mergeColIndex_H={mergeColIndex_H}
                highlightCellsP1={highlightCellsP1}
                highlightCellsP2={highlightCellsP2}
                onCellClick={handleCellClick}
            />
            <Link to="/">Back to Home</Link>
        </div>
    );

}

export default Game;