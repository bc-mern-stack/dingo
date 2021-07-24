import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(){
    return(
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/User">User</Link></li>
            <li><Link to="/DogWalker">Dogwalker</Link></li>
            <li><Link to="/SignUp">SignUp</Link></li>
            <li><Link to="/Login">Login</Link></li>
        </ul>
    )
}
export default Navbar;