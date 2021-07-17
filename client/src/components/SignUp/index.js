import React from 'react';
import { Route } from 'react-router-dom';

 function SignUp(){
     return(
         <section className = 'totalLayout'>
         <div className = 'leftLayout'>
             <div className = 'blueOutline'>
                <h1>
                Sign up to find dog walkers in your area or  walk dogs for others.             
                </h1>
             </div>
         </div>

         <div className = 'rightLayout'>

             <div className= 'alignForm'>

            
             <Route render={({ history}) => (
            <h1
                type='button'
                onClick={() => { history.push('/Login') }}
            >
                Login Instead
            </h1>
        
            )} />
            
                <form>
                    <label>Username</label>

                    <input type="text" name="name" />
                   
                    <label>Password</label>
                    
                    <input type="text" name="password" />
                    
                    <label>Where do you live?</label>
                    
                    <input type="text" name="location" />
                    
                    <label>Enter your email.</label>
                    
                    <input type="text" name="email" />
                    
                    <label>How many dogs do you have?</label>
                    
                    <input className="dogsNum" type="number" name="dogs" />

                    
                </form>
            </div>
            <div className = "buttonDiv"><button className = "yellowButton" type="submit">Sign Up</button></div>
            
         </div>
         
         <div className= "bottomBlue">

         </div>
         </section>
     )
 };

 export default SignUp;