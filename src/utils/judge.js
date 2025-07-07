// 手番が終わった時、そのプレイヤーが勝利しているか勝利判定を行うアルゴリズム
// 配列を用いてハイライト位置の保持も行う

// -1, -2を処理して、0か1か2を返す関数（結合セルの実体の値を返す関数）
export const getStatus = (table, r, c) => {
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

// 横の列をチェックする関数（ハイライト部分収集機能付き）
export const checkRows = (table, win_number, currentPlayer) => {
    const highlights = []; // ハイライト部分の収集用配列

    // table.lengthは縦の行数、table[0].lengthは横の列数になる
    for (let r = 0; r < table.length; r++) {
        let count = 0; // 連続数のカウント
        let positions = []; // ハイライトを付ける位置を配列で管理

        for (let c = 0; c <= table[0].length; c++) {
            
            let status = getStatus(table, r, c); // 縦結合されたセル（-2の値）の場合も考慮できるようにする

            // 各行を左から右へ走査して横連続部分をカウントし、横連続部分が終わったら毎回elseに落ちる
            if (status === currentPlayer) {

                // 横結合の部分（値として-1が入っている）はカウントしないようにする
                // 横結合セルは左から走査した時に2マス分とならないようにする設定
                if (table[r][c] !== -1) {
                    count++; // 横の連続数をカウント
                }

                positions.push([r, c]); // ハイライトを付ける位置を記録

            } else {
                
                if (count >= 2) {
                    highlights.push(...positions); // positionsを展開してhighlightsに入れる
                }

                // 連続数がwin_number以上となればゲーム終了で勝利とする
                if (count >= win_number) {
                    return { win: true, highlights }; // win_number分だけ連続した数が見つかればtrue
                }
                count = 0; // カウント数のリセット
                positions = []; // ハイライト位置をリセット
            }
        }
        if (count >= 2) {
            highlights.push(...positions);
        }
        if (count >= win_number) {
            return { win: true, highlights }; // 勝利判定（true）とハイライト位置を返す
        }
    }
    return { win: false, highlights }; // win_number以上の連続部分が見つからなければ未勝利（false）で、ハイライト部分は保持
};

// 縦の列をチェックする関数（ハイライト部分収集機能付き）
export const checkColumns = (table, win_number, currentPlayer) => {
    const highlights = [];

    for (let c = 0; c < table[0].length; c++) {
        let count = 0;
        let positions = [];

        for (let r = 0; r < table.length; r++) {

            let status = getStatus(table, r, c); // 横結合されたセル（-1の値）の場合も考慮できるようにする

            if (status === currentPlayer) {

                // 縦結合の部分（値として-2が入っている）はカウントしないようにする
                // 縦結合セルは上から走査した時に2マス分とならないようにする設定
                if (table[r][c] !== -2) {
                    count++; // 縦の連続数をカウント
                }

                positions.push([r, c]);

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

// 斜めをチェックする関数（ハイライト部分収集機能付き）
export const checkDiagonals = (table, win_number, currentPlayer) => {
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