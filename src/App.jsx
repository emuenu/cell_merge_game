import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate} from 'react-router-dom';
import './style/App.css';
import Home from './Home';
import Game from './Game';
import Rule from './Rule';

function App() {
  return (
    <div>
      <Router>
        <Main />
      </Router>
    </div>
  )
}

function Main() {

  // それぞれの状態を定義（変更時に再レンダリングさせる）
  const [vertical, setVertical] = useState('');
  const [horizontal, setHorizontal] = useState('');
  const [win_number, setWin_number] = useState('');
  
  // ページ遷移をスクリプトから管理するための変数navigateを取得
  const navigate = useNavigate();

  // 現在いるページのパスを取得
  const location = useLocation();

  // 現在のパスが「/」の時にisHomeがTrueになるようにする
  const isHome = location.pathname === '/';

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

  // ゲームを開始するイベントハンドラ関数
  const handleStartGame = () => {

    if (vertical === '' || horizontal === '' || win_number === '') {
      alert('ゲームを始めるには全ての項目に値を入力してください');
      return; // 遷移を止める
    }

    // typeをnumber（文字列）としてinputしたので、数値に変換する
    const v = Number(vertical);
    const h = Number(horizontal);
    const w = Number(win_number);

    if (v < w && h < w) {
      alert('縦横のマス数は、どちらかが揃えるマス数以上の値である必要があります');
      return; // 遷移を止める
    }

    if (v < 3 || h < 3 || w < 3) {
      alert('各値は3以上の数に設定してください');
      return; // 遷移を止める
    }
    
    // Game.jsx（/game）にページ遷移させる
    // vertical(v), horizontal(h), win_number(w)をpropsとして渡す
    navigate('/game', {state: { v, h, w }});

  };

  // ルールを表示するイベントハンドラ関数
  const handleRules = () => {
    navigate('/rule'); // Rule.jsx（/rule）にページ遷移させる
  };

  // 数値を入力してゲーム開始とルール説明を見る
  return (
    <div className="home-layout">

      {/* isHomeがTrueの時（'/'にいる時）のみ以下は表示させる */}
      {isHome && (

        <div>

          <p>Welcome</p>

          <div className="inputs">
            <label>
              縦: <input type="number" min='3' value={vertical} onChange={handleVerticalInput} />
            </label>
            <label>
              横: <input type="number" min='3' value={horizontal} onChange={handleHorizontalInput} />
            </label>
            <label>
              何文字揃えたら勝利か: <input type="number" min='3' value={win_number} onChange={handleWin_numberInput} />
            </label>
          </div>

          {/* ボタンでイベントハンドラ関数を呼んで遷移制御を行う */}
          <div className='button-group'>
            <button onClick={handleStartGame}>Game Start</button>
            <button onClick={handleRules}>Rules</button>
          </div>

        </div>

      )}

      {/* 各パスに関してのルーティング設定 */}
      <Routes>
        {/* ルートディレクトリにはHomeをルーティングする */}
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/rule" element={<Rule />} />
      </Routes>

    </div>

  );

}

export default App;