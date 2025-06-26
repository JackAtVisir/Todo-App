import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';

const App = () => {

    const navigate = useNavigate()

    const { user, signOut } = useAuthenticator();
    const newGame = () => {navigate("/cookie")}
    const loadGame = () => {navigate('/loadGame')}

    return (

        <div>
          <h1>{user?.signInDetails?.loginId}</h1>
          <button onClick={loadGame}>Load Game</button>
          <button onClick={newGame}>New Game</button>
          <button onClick={signOut}>Sign out</button>
        </div>
        
    )
}

export default App