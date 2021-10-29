import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import UserContext from './UserContext';

function App() {
  const [cookies] = useCookies();
  const [user, setUser] = useState(cookies.token ? {token: cookies.token} : null);

  return (
    <UserContext.Provider value={{
      user,
      setUser
    }}>
      <Router>
        <Switch>
          <Route path="/login" component={LogIn} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
