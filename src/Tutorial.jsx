import React from "react";
import { Link } from "react-router-dom";
import "./style/App.css";

function Tutorial() {
    return (
        <div className="home-layout">
            {/* ルートディレクトリへのリンク設定（既にルーティング済み） */}
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default Tutorial;
