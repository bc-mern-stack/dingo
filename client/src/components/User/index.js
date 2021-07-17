import React from 'react';
import { Route } from 'react-router-dom';

 function User(){
     return(
         <div>
             
             <div className= "allUserElements">
                <div className = "userNav">
                    <h1>
                        Owner Profile
                    </h1>
                    <div className = "logoutAndHome">
                        <h2 className = "logout">
                            Logout /
                        </h2>
                        
                            <Route render={({ history}) => (
                        <h2
                            type='button'
                            onClick={() => { history.push('/') }}
                        >
                            Home
                        </h2>
                    
                        )} />

                    </div>
                </div>

                 <h1 className = "blackBar">John Smith</h1>

                 <div className = "leftAndRight">
                    
                    
                    <div className = "leftSideUser">
                            <div className = "text">
                            <h3>Milwaukee Wisconsin</h3>
                            <h3>Number of Dogs: 2</h3>
                            <div className = "contact">
                                <h3>Contact</h3>
                                <h4>JohnSmith@gmail.com</h4>
                            </div>
                            <h3>My Current Dog Walkers</h3>
                        </div>
                            <div className = "list">
                                
                                <ul className = "dogWalkersLeft scroll">
                                    <li>Jane Doe</li>
                                    <li>John Smith</li>
                                    <li>Steve Smith</li>
                                    <li>Jack White</li>
                                    <li>Jane Smith</li>
                                    <li>John White</li> 
                                </ul>
                            </div>
                        </div>

                 <div className = "rightSideUser">
                     
                    <div className = "text">
                            <div>
                                <h3>Dog Walkers in Your Area</h3>
                                <h3>Milwaukee Wisconsin</h3>
                                <ul className = "dogWalkersRight scroll">
                                    <li>Jane Doe</li>
                                    <li>John Smith</li>
                                    <li>Steve Smith</li>
                                    <li>Jack White</li>
                                    <li>Jane Smith</li>
                                    <li>John White</li> 
                                </ul>
                            </div>
                    </div> 
                    <form>
                        <input className = "newLocationSearchInput" placeholder = "New Search" type="text" name="name" />
                        <button className = "newLocationSearchButton" type="submit"></button>
                    </form>
                 </div>
                 
             </div>
                <h4>Your Dogs</h4>
             </div> 

             <div>
                 <div className = "bottomOrange"></div>
             </div>
         </div>
     )
 };

 export default User;