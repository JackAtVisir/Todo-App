import { useNavigate } from "react-router-dom"
import { useState } from "react"
import type { Schema } from "../amplify/data/resource"
import { generateClient } from "aws-amplify/data"

const client = generateClient<Schema>()

const Cookie = () => {

    const navigate = useNavigate()
    const [score, setScore] = useState(0)

    const [scorePerClick, setScorePerClick] = useState(1)
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
  console.log("Created todo:", result.data);
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
    <button onClick={gamble}>Gamble</button>
    <p>Odds 1/{gambleOdds}<button onClick={oddsUp}>⬆</button><button onClick={oddsDown}>⬇</button></p>
      
    <button onClick={()=>{handleSave(score, scorePerClick)}}>Save Game</button>
    <button onClick={handleExit}>Exit</button>
  </div>
);

}



export default Cookie