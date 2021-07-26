import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import User from './components/User';
import DogWalker from './components/DogWalker';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {Route, Link} from 'react-router-dom';
function App() {
  return (
    <div className="App">
    
    <Route exact path= "/" component = {Home}/>
    <Route exact path= "/User" component = {User}/>
    <Route exact path= "/DogWalker" component = {DogWalker}/>
    <Route exact path= "/Login" component = {Login}/>
    <Route exact path= "/SignUp" component = {SignUp}/>
    <Footer/>
    </div>
  );
}
/*<Navbar />*/
export default App;
