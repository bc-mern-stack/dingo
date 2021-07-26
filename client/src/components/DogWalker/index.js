import { React,useState } from 'react';
import { Route } from 'react-router-dom';
import Calendar from 'react-calendar'
/*import 'react-calendar/dist/Calendar.css';*/
 function DogWalker(){
    const [value, onChange] = useState(new Date());
     return(   
         <div>
        <div className= "allUserElements">
           <div className = "userNav">
               <h1>
                   Dog Walking Availability
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
               
               
                <div className = "leftSideUser">
                    <div className = "text">
                        <h4>Appointments That YOU are walking.</h4>
                        <Calendar 
                        onChange={onChange}
                        value={value}
                        />
                    </div>    
                </div>

            <div className = "rightSideUser">
                   <div className = "text alignRightSide">
                       <h3>Milwaukee Wisconsin</h3>
                       <div className = "about">
                           <h3>About Me</h3>
                           <p>
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                           </p>
                        </div>
                   </div>
                        <div className = "contactDogWalker text">
                           <h3>Contact</h3>
                           <h4>JohnSmith@gmail.com</h4>
                        </div>
            </div>
                 
            </div> 

            <h4 className = "yourDogs"></h4> 

           
        </div> 
            <div className = "bottomOrange"></div>
        </div>
     )
 };

 export default DogWalker;