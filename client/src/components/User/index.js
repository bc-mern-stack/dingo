import { React,useState } from 'react';
import { Route } from 'react-router-dom';
import Calendar from 'react-calendar'
import dogHouse from '../../assets/dogHouse.png'
import { useQuery, gql, useMutation } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { ADD_DOGGO } from '../../utils/mutations';


function User() {
    const { loading, error, data } = useQuery(QUERY_USER, {
  variables: { username: "Darby.Orn" }
});
    const user = data?.user || [];
    /*console.log(user);*/
    
    const [addDoggo, { addDogError }] = useMutation(ADD_DOGGO);
    
    const handleFormSubmit = async event => {
    event.preventDefault();

  // use try/catch instead of promises to handle errors
  try {
    // execute addUser mutation and pass in variable data from form
      const { data } = await addDoggo({
          variables: {
              username:"Darby.Orn",
              doggos: {
                    name: "Mars",
                    size: 50,
                    age: 5,
                    breed: "Husky",
                    behavior: "Gentle",
                    temperament: "Calm",
                    picture: "placeholder",
      }
    }
    });
    console.log(data);
  } catch (e) {
      console.error(e);
      console.log("error")
  }
};

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

                    <div>
                    <p className="m-0">
                        Character Count: 0/280
                    </p>
                    <form onSubmit = {handleFormSubmit} className="flex-row justify-center justify-space-between-md align-stretch">
                        <textarea
                        placeholder="Here's a new thought..."
                        className="form-input col-12 col-md-9"
                        ></textarea>
                        <button className="btn col-12 col-md-3" type="submit">
                        Submit
                     </button>
                     {error && <div>Sign up failed</div>}

                    </form>
                    </div>
             

             <div className="allUserElements">
                 
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
                    
                 {!isOpened  ? 
                    <div className = "leftSideUserProfile">
                        
                     <img  onClick = {toggle} className = "arrow-down-blue" src="https://img.icons8.com/ios-filled/50/000000/year-of-dog.png"/>
                           
                             {data &&
                                 <div className="text contact">
                                     <h2>Address</h2>
                                     <h4>{user.address.street}</h4>
                                
                                     <h4>{user.address.city} {user.address.state}</h4>

                                     <div className="contact">
                                         <h2>Contact</h2>
                                         <h4>{user.email}</h4>
                                         <h4>{user.address.phone_number}</h4>
                                     </div>
                                 </div> }
                             
                                {data ?
                             <div className="list">
                                 

                            <h2 className = "current">My Current Dog Walkers</h2>
                                 <ul className="dogWalkersLeft scroll">
                                     {loading ? (<li>...Loading</li>
                                 ) : (
                                           
                                     user.favorites.map(favorites => (
                                        
                                             <li key={favorites._id}>{ favorites.username}</li>
                                             
                                        
                                     )))}
                                         </ul>
                            </div> : <div></div>}
                            
                         </div> 

                         :
                        
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
                     <div className="completeTitle">
                          {data &&
                         <h4 className="dogTitle" >Your Dogs: { user.doggos.length}</h4>
                         }
                         <img className = "add" src={dogHouse} alt="dog house"></img>
                     </div>
             <div className = "yourDogs">
                         { loading ? (<div>...Loading</div>
                         ) : (
                            
                             user.doggos.map(doggos => (
                                 <div key={doggos._id} className="dogBlock">
                                     
                                     <div className="eachDog">
                        
                                         <div className="dogInfo">
                                             <p>Name: {doggos.name}</p>
                                             <p>Age: {doggos.age}</p>
                                             <p>Size: {doggos.size}</p>
                                             <p>Breed: {doggos.breed}</p>
                                             <p>Behavior: {doggos.behavior}</p>
                                             <p>Temperament: {doggos.temperament}</p>
                                             <p>Special Instructions:</p>
                                         </div>
                                         <div className="dogPic"></div>
                                     </div>
                                 </div>)))}
                
            </div>
            
        
                </div>
             </div> 

                 <div className = "bottomOrange"></div>
         </div>
     )
 };

 export default User;
