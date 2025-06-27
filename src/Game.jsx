import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GameBoard from './GameBoard';
import './style/Game.css';

function Game() {

    // 縦がverticalで横がhorizontalのマス目用の二次元配列を用意する
    // セルのクリックで対応する要素に1(O)か2(X)を入れるようにする
    // 0: 空、1: X→player: 1, 2: O→player: 2（最初は全て0）

    // vertical、horizontal、win_numberの数値を受け取る
    const location = useLocation();
    const { vertical, horizontal, win_number } = location.state || {};
    
    const [table, setTable] = useState([]); // ゲーム盤を二次元配列として保持する
    const [currentPlayer, setCurrentPlayer] = useState(1); // 手番の来ているプレイヤー（1 = X側, 2 = O側で先手はX側）

    const navigate = useNavigate();

    // マス目を生成する
    useEffect(() => {

        if (!vertical || !horizontal) return; // verticalやhorizontalがundefinedなら何もしない

        // typeをnumber（文字列）としてinputしたので、数値に変換する
        const v = parseInt(vertical, 10);
        const h = parseInt(horizontal, 10);
        
        // vとhを用いて、二次元配列を生成する（ゲーム盤を初期化）
        const newTable = Array.from({ length: v }, () =>
            Array(h).fill(0)
        );

        setTable(newTable); // tableを更新

    }, [vertical, horizontal]); // verticalとhorizontalに依存する

    // 手番が終わった時、そのプレイヤーが勝利しているか勝利判定を行うアルゴリズム

    // 横の列をチェック
    const checkRows = (table, win_number, currentPlayer) => {

        // table.lengthは縦の行数、table[0].lengthは横の列数になる
        for (let r = 0; r < table.length; r++) {

            for (let c = 0; c <= table[0].length - win_number; c++) {

                if (table[r][c] !== currentPlayer) continue; // 先頭が違う場合はスキップ（countの初期値は1）

                let count = 1; // 横に連続した数のカウント（毎回リセット）

                for (let i = 1; i < win_number; i++) {

                    // 横方向に順番に見て行って、要素がcurrentPlayerと同じならcountをインクリメントしていく
                    // table[r][c]が注目しているセルに入っている数（0、1、2のいずれか）
                    if (table[r][c + i] === currentPlayer) {
                        count++;
                    } else {
                        break; // それ以外（連続していない場合）は即breakする→countはリセットしてその次からまたセルをチェック
                    }

                }

                // 横方向にwin_number分だけ連続した数が見つかった場合にtrue
                if (count === win_number) return true;

            }

        }

        return false;

    };

    // 縦の列をチェック
    const checkColumns = (table, win_number, currentPlayer) => {

        for (let c = 0; c < table[0].length; c++) {
            for (let r = 0; r <= table.length - win_number; r++) {
                if (table[r][c] !== currentPlayer) continue;
                let count = 1;

                for (let i = 1; i < win_number; i++) {
                    if (table[r + i][c] === currentPlayer) {
                        count++;
                    } else {
                        break;
                    }
                }

                // 縦方向にwin_number分だけ連続した数が見つかればtrue
                if (count === win_number) return true;  
            }
        }

        return false;

    };

    // 斜めをチェック
    const checkDiagonals = (table, win_number, currentPlayer) => {

        // 「⇗」と「⇙」の斜めをチェック
        for (let r = 0; r <= table.length - win_number; r++) {

            for (let c = 0; c <= table[0].length - win_number; c++) {

                if (table[r][c] !== currentPlayer) continue;
                let count = 1;

                for (let i = 1; i < win_number; i++) {
                    if (table[r + i][c + i] === currentPlayer) {
                        count++;
                    } else {
                        break;
                    }
                }

                // win_number分だけ連続した数が見つかればtrue
                if (count === win_number) return true;
            }

        }

        // 「⇘」と「⇖」の斜めをチェック
        for (let r = win_number - 1; r < table.length; r++) {

            for (let c = 0; c <= table[0].length - win_number; c++) {

                if (table[r][c] !== currentPlayer) continue;
                let count = 1;

                for (let i = 1; i < win_number; i++) {
                    if (table[r - i][c + i] === currentPlayer) {
                        count++;
                    } else {
                        break;
                    }
                }

                // win_number分だけ連続した数が見つかればtrue
                if (count === win_number) return true; 
            }
        }

        return false;

    };

    // その時のマス目の状態と手番のプレイヤーに対応して勝利判定を行う（勝ったらtrue）
    const wasWin = (table, win_number, currentPlayer) => {

        // 縦、横、斜めのいずれかでtrueになっていれば勝利としてtrueを返す
        if (checkRows(table, win_number, currentPlayer) || 
            checkColumns(table, win_number, currentPlayer) || 
            checkDiagonals(table, win_number, currentPlayer))  return true;

        return false;
        
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

        // 勝利判定を行う（win_numberは数値に型変換する）
        if(wasWin(newTable, parseInt(win_number, 10), currentPlayer)) {
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

    // 初期値の確認
    if (!vertical || !horizontal || !win_number) {
    return <p>初期値が設定されていません。</p>;
    }

    // GameBoardコンポーネントを使い、propsにtableとonCellClickを渡す
    // GameBoardコンポーネントで二次元配列に対応させてHTMLのテーブルとしてO、Xの表示を含めてゲーム盤を表示させる
    return (
        <div className='game-layout'>
            <p>縦: {vertical} / 横: {horizontal} / 勝利条件: {win_number} マス揃える</p>
            <GameBoard table={table} onCellClick={handleCellClick} />
            <Link to="/">Back to Home</Link>
        </div>
    );

}

export default Game;