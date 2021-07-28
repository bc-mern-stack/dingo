import { React,useState } from 'react';
import { Route } from 'react-router-dom';
import Calendar from 'react-calendar'
import dogHouse from '../../assets/dogHouse.png'
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../../utils/queries';


function User() {
    const { loading, data } = useQuery(QUERY_USERS);
        const users = data?.users || [];
        
        console.log(users);
    
    
    const [value, onChange] = useState(new Date());
    const [isOpened, setIsOpened] = useState(false);
    
        function toggle() {
            setIsOpened(true);
          }
          function toggleOff() {
            setIsOpened(false);
          }

     return(
         <div>
            
             <div className= "allUserElements">
                <div className = "userNav">
                    <h1>
                        Owner Profile
                    </h1>
                    <div className = "logoutAndHome">
                    <Route render={({ history}) => (
                    <h2 className = "logout"
                        type='button'
                        onClick={() => { history.push('/Login') }}
                    >
                       Logout /
                   </h2>
                    )}/>
                        
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
                    
                 {!isOpened ? 
                    <div className = "leftSideUserProfile">
                     <img  onClick = {toggle} className = "arrow-down-blue" src="https://img.icons8.com/ios-filled/50/000000/year-of-dog.png"/>
                            <div className = "text">
                            <h3>Milwaukee Wisconsin</h3>
                            <h3>Number of Dogs: 2</h3>
                            <div className = "contact">
                                <h3>Contact</h3>
                                <h4>JohnSmith@gmail.com</h4>
                            </div>
                            
                        </div>
                        
                            <div className = "list"> 
                            <h2 className = "current">My Current Dog Walkers</h2>
                                <ul className = "dogWalkersLeft scroll">
                                    <li>Jane Doe</li>
                                    <li>John Smith</li>
                                    <li>Steve Smith</li>
                                    <li>Jack White</li>
                                    <li>Jane Smith</li>
                                    <li>John White</li> 
                                </ul>
                            </div>
                            
                        </div>:
                        <div className = "rightSideUser">
                     <img  onClick = {toggleOff} className = "arrow-down-orange" src="https://img.icons8.com/ios-filled/50/000000/year-of-dog.png"/>
                     <div className = "text">
                             <div>
                                 <h2>Find Dog Walkers in Your Area</h2>
                                 <h3>Milwaukee Wisconsin</h3>
                                
                             </div> 
                             
                     </div>
                        <div>
                                <ul className = "dogWalkersRight scroll text">
                                     <li>Jane Doe</li>
                                     <li>John Smith</li>
                                     <li>Steve Smith</li>
                                     <li>Jack White</li>
                                     <li>Jane Smith</li>
                                     <li>John White</li> 
                                 </ul>
                     <form>
                         <input className = "newLocationSearchInput" placeholder = "New Search" type="text" name="name" />
                         <button className = "newLocationSearchButton" type="submit"></button>
                        
                     </form>
                     </div>
                  </div>}
                        <div className = "rightSideUserCalender">
                    <div className = "text">
                        <h4>Appointments for OTHERS walking your dog(s).</h4>
                        <Calendar 
                        onChange={onChange}
                        value={value}
                        />
                    </div>    
                </div>
                
                 
             </div>

                 <div>
                     <div className = "completeTitle">
                        <h4 className="dogTitle" >Your Dogs</h4>
                         
                         <img className = "add" src={dogHouse} alt="dog house"></img>
                     </div>
             <div className = "yourDogs">
                
                <div className = "dogBlock">
                    
                    <div className = "eachDog">
                        
                        <div className = "dogInfo">
                            <p>Name: Bruno</p>
                            <p>Age: 3</p>
                            <p>Size: 60lbs</p>
                            <p>Breed: German Shepherd</p>
                            <p>Behavior: Freindly</p>
                            <p>Temperament: Territorial</p>
                            <p>Special Instructions:</p>
                        </div>
                        <div className = "dogPic"></div>
                    </div>
                </div>
                <div className = "dogBlock">
                    
                    <div className = "eachDog">
                        <div className = "dogInfo">
                            <p>Name: Mars</p>
                            <p>Age: 2</p>
                            <p>Size: 50lbs</p>
                            <p>Breed: Doberman</p>
                            <p>Behavior: Aggressive</p>
                            <p>Temperament: Territorial</p>
                            <p>Special Instructions:</p>
                        </div>
                        <div className = "dogPic"></div>

                    </div>
                </div>
            </div>
            
        
                </div>
             </div> 

                 <div className = "bottomOrange"></div>
         </div>
     )
 };

 export default User;
