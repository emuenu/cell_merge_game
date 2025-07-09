import GameBoard from "./GameBoard";
import React from "react";
import { Link } from "react-router-dom";
import "./style/App.css";
import {
    Routes,
    Route,
} from "react-router-dom";
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

function Tutorial() {
    return (

        <Container className="tutorial-layout">
            <h2 className="my-3">🧭 チュートリアル</h2>
            <Routes>
                {/* ルートディレクトリにはHomeをルーティングする */}
                <Route path="/" element={<Page0 />} />
                <Route path="/page0" element={<Page0 />} />
                <Route path="/page1" element={<Page1 />} />
            </Routes>
        <Button href="/" className="my-3" variant="outline-success" size="sm">
          タイトルに戻る
        </Button>
        </Container>
    );
}

function Page0() {
return (
    <div>
                                            <p className="mb-3 text-muted">
                                                初めてプレイする方へ
    </p>
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
)
}

function Page1() {
    const table1 = [
        [1, 0, 0, 0, 0],
        [0,1,0,0,0],
        [0,0,1,0,0],
        [0,0,0,1,0],
        [0,0,0,0,1]
    ];
    const table2 = [
        [1, 1, 1, 1,1],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ];
    const table3 = [
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0]
    ];
    const highlightCellsP1_1 = [[0,0],[1,1],[2,2],[3,3],[4,4]];
    const highlightCellsP1_2 = [[0,0],[0,1],[0,2],[0,3],[0,4]];
    const highlightCellsP1_3 = [[0,0],[1,0],[2,0],[3,0],[4,0]];
    const highlightCellsP2 = [];
return (
<div>
            <p>基本ルールは普通のマルバツゲームと同じ!</p>
        <p>先に縦か横か斜めに自分の記号を並べたら勝ちです</p>
    <Carousel variant="dark" interval={2000}>
      <Carousel.Item className="py-3" >
            <GameBoard
                table={table1}
                highlightCellsP1={highlightCellsP1_1}
                highlightCellsP2={highlightCellsP2}
                highlightEnabled={true}
                onCellClick={() => {}}
            />
      </Carousel.Item>
      <Carousel.Item className="py-3" >
            <GameBoard
                table={table2}
                highlightCellsP1={highlightCellsP1_2}
                highlightCellsP2={highlightCellsP2}
                highlightEnabled={true}
                onCellClick={() => {}}
            />
      </Carousel.Item>
      <Carousel.Item className="py-3" >
            <GameBoard
                table={table3}
                highlightCellsP1={highlightCellsP1_3}
                highlightCellsP2={highlightCellsP2}
                highlightEnabled={true}
                onCellClick={() => {}}
            />
      </Carousel.Item>
    </Carousel>


                                            <Button
                                                className="px-2 py-2 mb-3 fw-bold "
                                                variant="primary"
    href="../page2"
                                            >
                                                <i className="bi bi-arrow-right-circle-fill"></i>
                                                &ensp;次へ
                                            </Button>

    </div>
)
}

export default Tutorial;
