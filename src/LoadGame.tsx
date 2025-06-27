import type { Schema } from "../amplify/data/resource";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { useNavigate } from "react-router-dom";

const client = generateClient<Schema>()

function LoadGame() {

  const navigate = useNavigate()
  const [games, setGames] = useState<Array<Schema["Game"]["type"]>>([]);

  useEffect(() => {
    console.log("Available models:", Object.keys(client.models))

    const subscription = client.models.Game.observeQuery().subscribe({
      next: (data) => {
        console.log("observeQuery data:", data);
        setGames([...data.items]);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLoad = (score:number, pointsPerClick: number) => {
     navigate("/cookie", {
      state: { loadScore: score, loadUpgrade: pointsPerClick }  
    });

  }

  return (
    <div>
      <h2>Saved Games</h2>
      <ul>
        {games.map((game) => (
          <li onClick={()=>{handleLoad(game.gameScore ?? 0, game.upgrade ?? 0)}} key={game.id}>
            Score: {game.gameScore}, Click Points: {game.upgrade}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LoadGame;
