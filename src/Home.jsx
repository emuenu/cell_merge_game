import React from "react";
import "./style/App.css";

// トップページ用コンポーネント（Homeにルーティングされると表示）
function Home() {
    return (
        <div className="home-layout">
            <p>Welcome to the Cell Merge Game!</p>
            <p>Click "Game Start" to begin, or "Rules" to check the rules.</p>
        </div>
    );
}

export default Home;
