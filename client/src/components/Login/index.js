import React from 'react';
import { Route } from 'react-router-dom'


function Login(){
    
     return(
        <section className = 'totalLayout'>
        <div className = 'leftSwitchedLayout'>
            <div className = 'blueOutline'>
               <h1>
               Login to view your details and find dog walkers in your area.               </h1>
            </div>
        </div>

        <div className = 'rightSwitchedLayout'>

            <div className= 'alignForm'>

           
            <Route render={({ history}) => (
           <h1
               type='button'
               onClick={() => { history.push('/SignUp') }}
           >
               Sign up Instead
           </h1>
       
           )} />
           
               <form className = "alignSwitchedForm">
                   <label>Username

                   <input type="text" name="name" />

                  </label>
                   <label>Password
                   
                   <input type="text" name="password" />

                   </label>
               </form>
           </div>
           <div className = "buttonDiv"><button className = "yellowSwitchedButton" type="submit">Login</button></div>
           
        </div>
        
        <div className= "bottomSwitchedBlue">

        </div>
        </section>
     )
 };

 export default Login;