import React from 'react';
import { Route } from 'react-router-dom'


function Login(){
    
     return(
        <section className = 'totalLayout'>
        <div className = 'leftSwitchedLayout'>
            <div className = 'blueOutline'>
               <h1>
                    Login to view your details and find dog walkers in your area.
                </h1>
            </div>
        </div>

        <div className = 'rightSwitchedLayout'>

            <div className= 'alignFormAltered'>

           
           
               <form className = "alignSwitchedForm">
            <Route render={({ history}) => (
           <h1
               type='button'
               onClick={() => { history.push('/SignUp') }}
           >
               Sign up Instead
           </h1>
       
           )} />
           <div className = "mainDiv">
                   <div className ="controlDiv">
                        <p>Username</p>
                        {"\n"}
                        <p>Password</p>
                   </div>
                   <div className ="controlDiv">
                        <input type="text" name="name" />
                        <input type="text" name="password" />
                   </div>
            </div>
               </form>
           </div>
           <div className = "buttonDiv"><button className = "greenSwitchedButton" type="submit">Login</button></div>
           
        </div>
        
        <div className= "bottomSwitchedBlue">

        </div>
        </section>
     )
 };

 export default Login;