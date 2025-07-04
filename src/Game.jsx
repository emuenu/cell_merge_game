import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GameBoard from './GameBoard';
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

    // 乱数生成関数（min, maxの間の乱数を生成）
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

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

    // 手番が終わった時、そのプレイヤーが勝利しているか勝利判定を行うアルゴリズム

    // -1, -2を処理して、0か1か2を返す関数
    const getStatus = (table, r, c) => {
        if (table[r][c] == 0) {
            return 0; // 空欄（未入力）
        }
        if (table[r][c] == 1) {
            return 1; // 'X'の方のプレイヤー
        }
        if (table[r][c] == 2) {
            return 2; // 'O'の方のプレイヤー
        }
        if (table[r][c] == -1) {
            return table[r][c-1]; // 横結合されていたら左のセルを見る
        }
        if (table[r][c] == -2) {
            return table[r-1][c]; // 縦結合されていたら上のセルを見る
        }
    }

    // 横の列をチェック（ハイライト部分収集機能付き）
    const checkRows = (table, win_number, currentPlayer) => {
        const highlights = []; // ハイライト部分の収集用配列

        // table.lengthは縦の行数、table[0].lengthは横の列数になる
        for (let r = 0; r < table.length; r++) {
            let count = 0; // 連続数のカウント
            let start = 0; // 横連続をカウントし始めるセルの位置

            for (let c = 0; c <= table[0].length; c++) {

                let v = table[r][c];

                // 各行を左から右へ走査して横連続部分をカウントし、横連続部分が終わったら毎回elseに落ちる
                if (v == currentPlayer || (v == -2 && table[r-1][c] == currentPlayer)) {
                    if (count === 0) start = c; // 連続開始位置の再設定
                    count += 1; // 縦結合されたセル（-2の値）の場合も考慮して横の連続数をカウント
                } else if (v == -1) {
                    // なにもしない（横結合の部分は2個分でカウントしない）
                } else {

                    // 連続数が2マス以上であったらその場所をhighlight配列に保持（ハイライト用）
                    if (count >= 2) {
                        for (let i = 0; i < count; i++) {
                            highlights.push([r, start + i]);
                        }
                    }

                    // 連続数がwin_number以上となればゲーム終了で勝利とする（win: trueとハイライト位置のhighlightを返す）
                    if (count >= win_number) {
                        return { win: true, highlights }; // win_number分だけ連続した数が見つかればtrue
                    }

                    count = 0; // カウント数はリセット
                }

            }
        }
        return { win: false, highlights }; // win_number以上の連続部分が見つからなければ未勝利（ハイライト部分は保持）
    };

    // 縦の列をチェック（ハイライト部分収集機能付き）
    const checkColumns = (table, win_number, currentPlayer) => {
        const highlights = [];

        for (let c = 0; c < table.length; c++) {
            let count = 0;
            let start = 0;

            for (let r = 0; r < table[0].length; r++) {

                let v = table[r][c];

                if (v == currentPlayer || (v == -1 && table[r][c-1] == currentPlayer)) {
                    if (count === 0) start = r;
                    count += 1; // 横結合されたセル（-1の値）の場合も考慮して縦の連続数をカウント
                } else if (v == -2) {
                    // なにもしない（縦結合の部分は2個分でカウントしない）
                } else {
                    if (count >= 2) {
                        for (let i = 0; i < count; i++) {
                            highlights.push([start + i, c]);
                        }
                    }
                    if (count >= win_number) {
                        return { win: true, highlights };
                    }
                    count = 0;
                }
            }
        }
        return { win: false, highlights };
    };

    // 斜めをチェック（ハイライト部分収集機能付き）
    const checkDiagonals = (table, win_number, currentPlayer) => {
        const highlights = [];

        // 「⇗」と「⇙」の斜めをチェック
        for (let i = 0; i <= table.length + table[0].length -2; i++) {
            let count = 0;
            let positions = [];

            for (let r = 0; r < table.length && r <= i; r++) {
                let c = i - r;
                if (getStatus(table, r, c) === currentPlayer){
                    positions.push([r, c]);
                    count++; // 斜めの場合も結合されたセル（値-1か-2）を考慮して連続数をカウント
                } else {
                    if (count >= 2) {
                        highlights.push(...positions);
                    }
                    if (count >= win_number) {
                        return { win: true, highlights };
                    }

                    //値をリセット
                    count = 0;
                    positions = [];   
                }
            }
            if (count >= 2) {
                highlights.push(...positions);
            }
            if (count >= win_number) {
                return { win: true, highlights };
            }
        }

        // 「⇘」と「⇖」の斜めをチェック
        for (let i = 0; i <= table.length + table[0].length -2; i++) {
            let count = 0;
            let positions = [];

            for (let r = 0; r < table.length && r <= i; r++) {
                let c = table[0].length - (i - r);
                if (getStatus(table, r, c) == currentPlayer){
                    positions.push([r, c]);
                    count++; // 斜めの場合も結合されたセル（値-1か-2）を考慮して連続数をカウント
                } else {
                    if (count >= 2) {
                        highlights.push(...positions);
                    }
                    if (count >= win_number) {
                        return { win: true, highlights };
                    }
                    count = 0;
                    positions = [];
                }
            }
            if (count >= 2) {
                highlights.push(...positions);
            }
            if (count >= win_number) {
                return { win: true, highlights };
            }
        }

        return { win: false, highlights };
    };

    // セルがクリックされたときのイベントハンドラ関数
    const handleCellClick = (row, col) => {

        if (table[row][col] !== 0) return; // 既にOかXが入力されていれば無視
        
        // クリックした位置のセルに対応する配列の要素に1(O)か2(X)を入れた新しい配列newTableを作成
        const newTable = table.map((r, rowIndex) =>
            r.map((cell, colIndex) =>
                rowIndex === row && colIndex === col ? currentPlayer : cell
            )
        );

        // ゲーム盤を更新させる
        setTable(newTable);

        newTable[mergeRowIndex_H][mergeColIndex_H + 1] = -1; // 横方向に結合されたセルには-1を入れておく
        newTable[mergeRowIndex_V + 1][mergeColIndex_V] = -2; // 縦方向に結合されたセルには-2を入れておく

        // セルが結合されて表示されている時、結合セルをクリックすると'O'か'X'が表示され、配列としては拡張する側のセル（左か上）の位置にcurrentPlayerの値が入っている
        // 結合セルの表示は、その拡張する側のセルを2マス分の表示に拡張し、結合された側のセルの表示をスキップすることで実現している
        // その時、表示されなくなり使われなくなった結合された側のセル（右か下）の位置には配列としては横結合なら-1、縦結合なら-2を入れておく

        // newTableについて、縦・横・斜めで勝利判定及びハイライト位置の取得を行う
        const { win: winRow, highlights: highlightsRow } = checkRows(newTable, win_number, currentPlayer);
        const { win: winCol, highlights: highlightsCol } = checkColumns(newTable, win_number, currentPlayer);
        const { win: winDiag, highlights: highlightsDiag } = checkDiagonals(newTable, win_number, currentPlayer);

        // ハイライト位置を全て統合
        const allHighlights = [...highlightsRow, ...highlightsCol, ...highlightsDiag];

        // 重複部分があったら削除するユニーク化処理
        const unique = [...new Set(allHighlights.map(pos => pos.join(',')))]
            .map(str => str.split(',').map(Number));

        // プレイヤーごとにハイライト情報を保存
        if (currentPlayer === 1) {
            setHighlightCellsP1(unique);
        } else {
            setHighlightCellsP2(unique);
        }

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