import { useNavigate } from "react-router-dom"
import { useState } from "react"

const Cookie = () => {

    const navigate = useNavigate()
    const [score, setScore] = useState(0)

    const [scorePerClick, setScorePerClick] = useState(1)
    const [scorePerClickPrice, setScorePerClickPrice] = useState(10)

    const handleClick = () => {setScore(score + scorePerClick)}

    const handlePointsPerClickUpgrade = () => {

        if (score >= scorePerClickPrice) {
            setScore(score - scorePerClickPrice)
            setScorePerClick(scorePerClick + 1)
            if (scorePerClick < 10) {setScorePerClickPrice(scorePerClickPrice + 10)}
            else {setScorePerClickPrice(Math.round(scorePerClickPrice * 1.2))}
        
        } 
    }

    const handleSave = () => {}
    const handleExit = () => {navigate('/')}


    return (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    }}
  >
    <h1>Score: {score}</h1>
    <button
      onClick={handleClick}
      style={{
        all: "unset",
        fontSize: "100px",
        cursor: "pointer",
        margin: "20px 0",
      }}
    >
      🍪
    </button>
    <div>
        <h2>Upgrades:</h2>
        <p>Points per Click: lvl {scorePerClick} <button onClick={handlePointsPerClickUpgrade}>{scorePerClickPrice}</button></p>
    </div>
    <button onClick={handleSave}>Save Game</button>
    <button onClick={handleExit}>Exit</button>
  </div>
);

}

export default Cookie