import { getRandomInt } from "./ramdom";

const FAIL_LIMIT = 100; //セル結合が何回失敗したらそれ以上の結合セルの生成を諦めるか

// 座標が盤上にあるか
export const isOnBoard = (row, col, row_count, col_count) => {
    if (0 <= row && row < row_count && 0 <= col && col < col_count) {
        return true;
    }
    return false;
};

//セル結合したテーブルを生成する;
export const createBoard = (
    row_count,
    col_count,
    horizontal_merge_count,
    vertical_merge_count,
) => {
    // if (!row_count || !col_count) return; // row_countやcol_countがundefinedなら何もしない //TODO: 違う場所に移す。

    // row_count*col_countの0埋め配列を生成
    let table = Array.from({ length: row_count }, () =>
        Array(col_count).fill(0),
    );

    //結合を生成
    let fail_count = 0;
    while (
        horizontal_merge_count + vertical_merge_count > 0 &&
        fail_count <= FAIL_LIMIT
    ) {
        if (
            getRandomInt(0, horizontal_merge_count + vertical_merge_count) <
            horizontal_merge_count
        ) {
            let row = getRandomInt(0, row_count);
            let col = getRandomInt(1, col_count);

            // 被っていないかチェック
            if (
                table[row][col - 1] == -1 || // 左のセルが既に水平結合されている
                table[row][col] == -1 || // 現在のセルが既に水平結合されている
                (isOnBoard(row, col + 1, row_count, col_count) &&
                    table[row][col + 1] == -1) || // 右のセルが既に水平結合されている
                table[row][col - 1] == -2 || // 左のセルが既に垂直結合されている
                table[row][col] == -2 || // 現在のセルが既に垂直結合されている
                (isOnBoard(row + 1, col - 1, row_count, col_count) &&
                    table[row + 1][col - 1] == -2) || // 左下のセルが既に垂直結合されている
                (isOnBoard(row + 1, col, row_count, col_count) &&
                    table[row + 1][col] == -2) // 下のセルが既に垂直結合されている
            ) {
                //被っていたとき
                fail_count += 1;
            } else {
                //被っていなかったとき
                table[row][col] = -1;
            }
        } else {
            // 垂直結合を生成
            let row = getRandomInt(1, row_count); // 上に飛び出してはいけないので1から開始
            let col = getRandomInt(0, col_count);

            if (
                table[row - 1][col] == -2 || // 上のセルが既に垂直結合されている
                table[row][col] == -2 || // 現在のセルが既に垂直結合されている
                (isOnBoard(row + 1, col, row_count, col_count) &&
                    table[row + 1][col] == -2) || // 下のセルが既に垂直結合されている
                table[row - 1][col] == -1 || // 上のセルが既に水平結合されている
                table[row][col] == -1 || // 現在のセルが既に水平結合されている
                (isOnBoard(row, col + 1, row_count, col_count) &&
                    table[row - 1][col + 1] == -1) || // 右上のセルが水平結合されている
                (isOnBoard(row, col + 1, row_count, col_count) &&
                    table[row][col + 1] == -1) // 右のセルが水平結合されている
            ) {
                // 被っていたとき
                fail_count += 1;
            } else {
                // 被っていなかったとき
                table[row][col] = -2; // 現在のセルを垂直結合セルとしてマーク
            }
        }
    }

    return table;
};
