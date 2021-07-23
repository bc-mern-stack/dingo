import React from 'react';
import { Route } from 'react-router-dom';
import bluePattern from '../../assets/bluePattern.png'
import logo from '../../assets/dingoLogo.png'


 function Home(){
     return(
         <div className = "allHomeElements">
            <div className = "bluePat">
                <img className = "logo" src = {logo} alt = "logo"/>
                <Route render={({ history}) => (
                 <div className = "signUpBox"
                       type='button'
                       onClick={() => { history.push('/SignUp') }}
                   >

                First time User?</div>
                )}/>
                <div className = "navigation">
                    <div>Location</div>
                    <div>My Dog Walkers</div>
                    <div>My Schedule</div>
                    <div>Find New Dog Walkers</div>
                </div>
                
            </div>
            <div className = "orangeBox"></div>
            <div className = "bottomBorder">

            </div>
         </div>
     )
 };

 export default Home;