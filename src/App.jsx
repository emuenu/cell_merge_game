import { Button, Col, Card, Row, Accordion, Form, Container } from "react-bootstrap";
import { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
    useNavigate,
} from "react-router-dom";
import "./style/App.css";
import Home from "./Home";
import Game from "./Game";
import Tutorial from "./Tutorial";
import logo from './assets/logo.svg';

const DEFAULT_ROW_COUNT = "10";
const DEFAULT_COL_COUNT = "10";
const DEFAULT_WIN_LENGTH = "10";
const DEFAULT_HORIZONTAL_MERGE_COUNT = "20";
const DEFAULT_VERTICAL_MERGE_COUNT = "20";


function App() {
    return (
        <div>
            <Router>
                <Main />
            </Router>
        </div>
    );
}

function Main() {
    // それぞれの状態を定義（変更時に再レンダリングさせる）
    const [vertical, setVertical] = useState(DEFAULT_ROW_COUNT);
    const [horizontal, setHorizontal] = useState(DEFAULT_COL_COUNT);
    const [win_number, setWin_number] = useState(DEFAULT_WIN_LENGTH);
    const [horizontal_merge_count_st, setHorizontalMergeCount] = useState(DEFAULT_HORIZONTAL_MERGE_COUNT);
    const [vertical_merge_count_st, setVerticalMergeCount] = useState(DEFAULT_VERTICAL_MERGE_COUNT);

    // ページ遷移をスクリプトから管理するための変数navigateを取得
    const navigate = useNavigate();

    // 現在いるページのパスを取得
    const location = useLocation();

    // 現在のパスが「/」の時にisHomeがTrueになるようにする
    const isHome = location.pathname === "/";
    // input入力時のイベントハンドラ関数
    const handleVerticalInput = (e) => {
        setVertical(e.target.value); // 入力値をverticalへセット
    };

    const handleHorizontalInput = (e) => {
        setHorizontal(e.target.value); // 入力値をhorizontalへセット
    };

    const handleWin_numberInput = (e) => {
        setWin_number(e.target.value); // 入力値をwin_numberへセット
    };

    const handleHorizontalMergeCountInput = (e) => {
        setHorizontalMergeCount(e.target.value); // 入力値をwin_numberへセット
    };

    const handleVerticalMergeCountInput = (e) => {
        setVerticalMergeCount(e.target.value); // 入力値をwin_numberへセット
    };

    // ゲームを開始するイベントハンドラ関数
    const handleStartGame = () => {
        if (vertical === "" || horizontal === "" || win_number === "" || vertical_merge_count_st === "" || horizontal_merge_count_st === "" || win_number === "") {
            alert("ゲームを始めるには全ての項目に値を入力してください");
            return; // 遷移を止める
        }

        // typeをnumber（文字列）としてinputしたので、数値に変換する
        const row_count = Number(vertical); //行数
        const col_count = Number(horizontal); //列数
        const win_length = Number(win_number); //勝利に必要な長さ
        const horizontal_merge_count = Number(horizontal_merge_count_st)
        const vertical_merge_count = Number(vertical_merge_count_st)

        if (row_count < win_length && col_count < win_length) {
            alert(
                "縦横のマス数は、どちらかが揃えるマス数以上の値である必要があります",
            );
            return; // 遷移を止める 
        }

        if (row_count < 3 || col_count < 3 || win_length < 3) {
            alert("各値は3以上の数に設定してください");
            return; // 遷移を止める
        }

        // Game.jsx（/game）にページ遷移させる
        // vertical(v), horizontal(h), win_number(w)をpropsとして渡す
        navigate("/game", { state: { row_count, col_count, win_length, horizontal_merge_count, vertical_merge_count } });
    };

    // ルールを表示するイベントハンドラ関数
    const handleTutorial = () => {
        navigate("/tutorial"); // Tutorial.jsx（/tutorial）にページ遷移させる
    };

    // 数値を入力してゲーム開始とルール説明を見る
    return (
        <Container fluid="md" className="text-center mx-auto" >
            {isHome && (
                <div>
                    <img className="mt-5 mb-3" src={logo} alt="ロゴ"/>
                    <h1 className="mt-4">セル結合○×ゲーム</h1>
<Container fluid="sm" className="p-3">
    <Container fluid className="p-3">
      <Row>
        <Col md={6} className=" p-3">
    <Card>
      <Card.Body>
        <Card.Title className="mb-2">🧭 チュートリアル</Card.Title>
        <Card.Subtitle className="mb-3 text-muted">初めてプレイする方へ</Card.Subtitle>
        <Card.Text>
          <span style={{display: "inline-block"}}>『セル結合○×ゲーム』の</span><span style={{display: "inline-block"}}>プレイ方法についてのガイドです。</span>
        </Card.Text>
                        <button onClick={handleTutorial}>チュートリアルを始める</button>
      </Card.Body>
    </Card>
        </Col>
        <Col md={6} className="text-white p-3">
    <Card>
      <Card.Body>
        <Card.Title className="mb-2">📌 ゲームスタート</Card.Title>
        <Card.Subtitle className="mb-3 text-muted">※ 最初はチュートリアルを推奨 ※</Card.Subtitle>
                    <Button className="px-5 py-3 mb-3 fw-bold " variant="primary" onClick={handleStartGame}>
<i className="bi bi-arrow-right-circle-fill"></i>
                        &ensp;ゲームスタート
                    </Button>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>オプション</Accordion.Header>
                            <Accordion.Body>
                                <div className="inputs">
                                    <Form.Group>
                                        <Form.Label>縦:</Form.Label>
                                        <Form.Control
                                            type="number"
                                            min="3"
                                            value={vertical}
                placeholder={DEFAULT_ROW_COUNT}
                                            onChange={handleVerticalInput}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>横:</Form.Label>
                                        <Form.Control
                                            type="number"
                                            min="3"
                placeholder={DEFAULT_COL_COUNT}
                                            value={horizontal}
                                            onChange={handleHorizontalInput}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>何文字揃えたら勝利か:</Form.Label>
                                        <Form.Control
                                            type="number"
                                            min="3"
                                            placeholder={DEFAULT_WIN_LENGTH}
                                            value={win_number}
                                            onChange={handleWin_numberInput}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>横で結合するマスの数:</Form.Label>
                                        <Form.Control
                                            type="number"
                                            min="0"
                                            placeholder={DEFAULT_HORIZONTAL_MERGE_COUNT}
                                            value={horizontal_merge_count_st}
                                            onChange={handleHorizontalMergeCountInput}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>縦で結合するマスの数:</Form.Label>
                                        <Form.Control
                                            type="number"
                                            min="0"
                                            placeholder={DEFAULT_VERTICAL_MERGE_COUNT}
                                            value={vertical_merge_count_st}
                                            onChange={handleVerticalMergeCountInput}
                                        />
                                    </Form.Group>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
      </Card.Body>
    </Card>
        </Col>
      </Row>
    </Container>
                </Container>

                </div>
            )}

            {/* 各パスに関してのルーティング設定 */}
            <Routes>
                {/* ルートディレクトリにはHomeをルーティングする */}
                <Route path="/" element={<Home />} />
                <Route path="/game" element={<Game />} />
                <Route path="/tutorial" element={<Tutorial />} />
            </Routes>
        </Container>
    );
}

export default App;
