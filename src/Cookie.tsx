import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"
import type { Schema } from "../amplify/data/resource"
import { generateClient } from "aws-amplify/data"

const client = generateClient<Schema>()

const Cookie = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const { loadScore, loadUpgrade } = location.state || {}

    console.log("Load State: ", loadScore, loadUpgrade)

    const [score, setScore] = useState(() => loadScore ?? 0);
    const [scorePerClick, setScorePerClick] = useState(() => loadUpgrade ?? 1);
    const [scorePerClickPrice, setScorePerClickPrice] = useState(10)
    const [gambleOdds, setGambleOdds] = useState(1)

    const handleClick = () => {setScore(score + scorePerClick)}

    const handlePointsPerClickUpgrade = () => {

        if (score >= scorePerClickPrice) {
            setScore(score - scorePerClickPrice)
            setScorePerClick(scorePerClick + 1)
            if (scorePerClick < 10) {setScorePerClickPrice(scorePerClickPrice + 10)}
            else {setScorePerClickPrice(Math.round(scorePerClickPrice * 1.2))}
        
        } 
    }
    
    const gamble = () => {
    const random = Math.floor(Math.random() * gambleOdds);
    if (random === 1) {setScore(score * gambleOdds)}
    else (setScore(Math.round(score - score/gambleOdds))) 

    }

    const oddsUp = () => {
      setGambleOdds(gambleOdds + 1)
    }

    const oddsDown = () => {
      setGambleOdds(gambleOdds - 1)
    }

    const handleSave = async (score: number, scorePerClick: number) => {
      const result = await client.models.Game.create({
        gameScore: score,
        upgrade: scorePerClick
      })
      console.log("Saved Game:", result.data)
      alert("Saved Game")
    }

    const handleExit = () => {navigate('/')}


    return (
  <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#fff3e0", // warm cookie background
    fontFamily: "Comic Sans MS, cursive, sans-serif",
    color: "#5a3825",
    padding: "2rem",
  }}
>
  <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Score: {score}</h1>

  <button
    onClick={handleClick}
    style={{
      all: "unset",
      fontSize: "120px",
      cursor: "pointer",
      margin: "20px 0",
      textShadow: "2px 2px #e0b285",
    }}
  >
    🍪
  </button>

  <div
    style={{
      backgroundColor: "#fbe6c2",
      border: "2px solid #d6b88d",
      borderRadius: "12px",
      padding: "1rem",
      marginBottom: "1rem",
      width: "80%",
      maxWidth: "400px",
      textAlign: "center",
      boxShadow: "0 0 8px rgba(0,0,0,0.1)",
    }}
  >
    <h2 style={{ marginBottom: "0.5rem" }}>Upgrades:</h2>
    <p>
      Points per Click: lvl {scorePerClick}{" "}
      <button
        onClick={handlePointsPerClickUpgrade}
        style={{
          backgroundColor: "#d6a15e",
          border: "none",
          borderRadius: "6px",
          padding: "4px 10px",
          cursor: "pointer",
          color: "white",
          fontWeight: "bold",
          boxShadow: "2px 2px 4px #aa7f4f",
        }}
      >
        {scorePerClickPrice}
      </button>
    </p>
  </div>

  <button
    onClick={gamble}
    style={{
      backgroundColor: "#bc544b",
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "10px 20px",
      margin: "10px",
      cursor: "pointer",
      fontWeight: "bold",
      boxShadow: "2px 2px 5px #8a3e36",
    }}
  >
    🎲 Gamble
  </button>

  <p>
    Odds 1/{gambleOdds}{" "}
    <button
      onClick={oddsUp}
      style={{
        marginLeft: "5px",
        backgroundColor: "#a05f2c",
        color: "white",
        border: "none",
        borderRadius: "6px",
        padding: "4px 10px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      ⬆
    </button>
    <button
      onClick={oddsDown}
      style={{
        marginLeft: "5px",
        backgroundColor: "#a05f2c",
        color: "white",
        border: "none",
        borderRadius: "6px",
        padding: "4px 10px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      ⬇
    </button>
  </p>

  <button
    onClick={() => handleSave(score, scorePerClick)}
    style={{
      backgroundColor: "#6b3e26",
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "10px 20px",
      marginTop: "10px",
      cursor: "pointer",
      fontWeight: "bold",
      boxShadow: "2px 2px 5px #422515",
    }}
  >
    💾 Save Game
  </button>

  <button
    onClick={handleExit}
    style={{
      backgroundColor: "#555",
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "10px 20px",
      marginTop: "10px",
      cursor: "pointer",
      fontWeight: "bold",
      boxShadow: "2px 2px 5px #222",
    }}
  >
    🚪 Exit
  </button>
</div>

);

}



export default Cookie