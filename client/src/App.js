import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import User from './components/User';
import DogWalker from './components/DogWalker';
import Login from './components/Login';
import SignIn from './components/SignIn';

function App() {
  return (
    <div className="App">
    <Home />
    <DogWalker />
    <User />
    <Login />
    <SignIn />
    </div>
  );
}

export default App;
