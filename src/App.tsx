import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';

const App = () => {

    const navigate = useNavigate()

    const { user, signOut } = useAuthenticator();
    const playGame = () => {navigate("/cookie")}

    return (

        <div>
          <h1>{user?.signInDetails?.loginId}</h1>
          <button onClick={playGame}>Play Game</button>
          <button onClick={signOut}>Sign out</button>
        </div>
        
    )
}

export default App