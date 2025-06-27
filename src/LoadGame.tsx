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

   function handleDelete(id: string) {
    client.models.Game.delete({ id })
  }

  return (
   <div>
    <h2>Saved Games</h2>
      {games.length > 0 ? (
        <ul>
          {games.map((game) => (
            <li key={game.id}>
              Score: {game.gameScore}, Click Points: {game.upgrade}
              <button onClick={() => handleLoad(game.gameScore ?? 0, game.upgrade ?? 0)}>Load</button>
              <button onClick={() => handleDelete(game.id)}>Delete</button>
            </li>
          ))}
       </ul>
      ) : (
        <p>No Saved Games</p>
     )}
     <button onClick={()=>{navigate("/")}}>Home</button>
    </div>
  )
}

export default LoadGame;
