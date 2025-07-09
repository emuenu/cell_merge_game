import GameBoard from "./GameBoard";
import React from "react";
import "./style/App.css";
import { Routes, Route } from "react-router-dom";
import {
    Button,
    Carousel,
    Col,
    Card,
    Row,
    Accordion,
    Form,
    Container,
} from "react-bootstrap";
import "./style/Tutorial.css";

function Tutorial() {
    return (
        <Container className="tutorial-layout">
            <h2 className="my-3">🧭 チュートリアル</h2>
            <Routes>
                {/* ルートディレクトリにはHomeをルーティングする */}
                <Route path="/" element={<Page0 />} />
                <Route path="/page0" element={<Page0 />} />
                <Route path="/page1" element={<Page1 />} />
                <Route path="/page2" element={<Page2 />} />
                <Route path="/page3" element={<Page3 />} />
                <Route path="/page4" element={<Page4 />} />
                <Route path="/page5" element={<Page5 />} />
            </Routes>
            <Button
                href="/"
                className="my-3"
                variant="outline-success"
                size="sm"
            >
                タイトルに戻る
            </Button>
        </Container>
    );
}

function Page0() {
    return (
        <div>
            <p className="mb-3 text-muted">初めてプレイする方へ</p>
            <p>
                <span
                    style={{
                        display: "inline-block",
                    }}
                >
                    『セル結合○×ゲーム』の
                </span>
                <span
                    style={{
                        display: "inline-block",
                    }}
                >
                    プレイ方法についてのガイドです。
                </span>
            </p>
            <Button
                className=" mb-3 fw-bold"
                variant="success"
                href="/tutorial/page1"
            >
                <span
                    style={{
                        display: "inline-block",
                    }}
                >
                    チュートリアルを
                </span>
                <span
                    style={{
                        display: "inline-block",
                    }}
                >
                    始める
                </span>
            </Button>
        </div>
    );
}

function Page1() {
    const table1 = [
        [2, 0, 0, 0, 0],
        [0, 2, 0, 0, 0],
        [0, 0, 2, 0, 0],
        [0, 0, 0, 2, 0],
        [0, 0, 0, 0, 2],
    ];
    const table2 = [
        [2, 2, 2, 2, 2],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ];
    const table3 = [
        [2, 0, 0, 0, 0],
        [2, 0, 0, 0, 0],
        [2, 0, 0, 0, 0],
        [2, 0, 0, 0, 0],
        [2, 0, 0, 0, 0],
    ];
    const highlightCellsP2_1 = [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
    ];
    const highlightCellsP2_2 = [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
    ];
    const highlightCellsP2_3 = [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
    ];
    const highlightCellsP1 = [];
    return (
        <div>
            <p>基本ルールは普通のマルバツゲームと同じ!</p>
            <p>先に縦か横か斜めに自分の記号を並べたら勝ちです</p>
            <Carousel variant="dark" interval={1000}>
                <Carousel.Item className="py-5">
                    <GameBoard
                        table={table1}
                        highlightCellsP1={highlightCellsP1}
                        highlightCellsP2={highlightCellsP2_1}
                        highlightEnabled={true}
                        onCellClick={() => {}}
                    />
                </Carousel.Item>
                <Carousel.Item className="py-5">
                    <GameBoard
                        table={table2}
                        highlightCellsP1={highlightCellsP1}
                        highlightCellsP2={highlightCellsP2_2}
                        highlightEnabled={true}
                        onCellClick={() => {}}
                    />
                </Carousel.Item>
                <Carousel.Item className="py-5">
                    <GameBoard
                        table={table3}
                        highlightCellsP1={highlightCellsP1}
                        highlightCellsP2={highlightCellsP2_3}
                        highlightEnabled={true}
                        onCellClick={() => {}}
                    />
                </Carousel.Item>
            </Carousel>

            <Button
                className="px-2 py-2 mb-3 fw-bold "
                variant="primary"
                href="./page2"
            >
                <i className="bi bi-arrow-right-circle-fill"></i>
                &ensp;次へ
            </Button>
        </div>
    );
}

function Page2() {
    const table = [
        [0, 0, 0, 0, -1],
        [1, -1, 0, 0, 0],
        [0, 0, -2, -2, 2],
        [1, -2, 0, -1, -2],
        [0, -1, 2, 0, -1],
    ];
    return (
        <div>
            <p>ただし、盤面は『セル結合』されています..!</p>
            <p>結合したセルを含むときの並びの判定はちょっと特殊です</p>
            <GameBoard
                table={table}
                highlightCellsP1={[]}
                highlightCellsP2={[]}
                highlightEnabled={true}
                onCellClick={() => {}}
            />
            <Button
                className="mt-3 px-2 py-2 mb-3 fw-bold "
                variant="primary"
                href="./page3"
            >
                <i className="bi bi-arrow-right-circle-fill"></i>
                &ensp;次へ
            </Button>
        </div>
    );
}

function Page3() {
    const table = [
        [0, 0, 0, 0, -1],
        [2, -1, 2, 2, 2],
        [0, 0, -2, 0, 0],
        [0, -2, 0, -1, -2],
        [0, -1, 0, 0, -1],
    ];
    const highlightCellsP2 = [
        [1, 0],
        [1, 2],
        [1, 3],
        [1, 4],
    ];
    return (
        <div>
            <p>
                縦・横の判定は、
                <br />
                <span className="fw-bold">
                    『記号(OかX)が直線でいくつ並んでいるか』
                </span>
                <br />
                でカウントします
            </p>
            <p>この盤面は、「Oが4つ並んでいる」と判定されます</p>
            <GameBoard
                table={table}
                highlightCellsP1={[]}
                highlightCellsP2={highlightCellsP2}
                highlightEnabled={true}
                onCellClick={() => {}}
            />
            <Button
                className="px-2 py-2 my-3 fw-bold "
                variant="primary"
                href="./page4"
            >
                <i className="bi bi-arrow-right-circle-fill"></i>
                &ensp;次へ
            </Button>
        </div>
    );
}
function Page4() {
    const table = [
        [2, 0, 0, 0, -1],
        [2, -1, 2, 0, 0],
        [0, 0, -2, 0, 0],
        [0, -2, 2, -1, -2],
        [0, -1, 0, 2, -1],
    ];
    const highlightCellsP2 = [
        [0, 0],
        [1, 0],
        [1, 2],
        [3, 2],
        [4, 3],
    ];
    return (
        <div>
            <p>
                斜めの判定は、
                <br />
                <span className="bold">
                    『斜め(45度)の線を引いたときに何マス連続で通るか』
                </span>
                <br />
                でカウントします
            </p>
            <p>この盤面は、「Oが5つ並んでいる」と判定されます</p>
            <div className="line-45 multi-base-5x5">
                <GameBoard
                    table={table}
                    highlightCellsP1={[]}
                    highlightCellsP2={highlightCellsP2}
                    highlightEnabled={true}
                    onCellClick={() => {}}
                />
            </div>
            <Button
                className="px-2 py-2 my-3 fw-bold "
                variant="primary"
                href="./page5"
            >
                <i className="bi bi-arrow-right-circle-fill"></i>
                &ensp;次へ
            </Button>
        </div>
    );
}

function Page5() {
    return (
        <div>
            <p>以上でチュートリアルは終わりです!</p>
            <p>『セル結合○×ゲーム』を楽しんでください!!</p>
        </div>
    );
}

export default Tutorial;
