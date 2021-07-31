import { React,useState } from 'react';
import { Route } from 'react-router-dom';
import Calendar from 'react-calendar'
import dogHouse from '../../assets/dogHouse.png'
import { useQuery, gql, useMutation } from '@apollo/client';
import { QUERY_USERS, QUERY_ME } from '../../utils/queries';
import { ADD_DOGGO } from '../../utils/mutations';
import Auth from '../../utils/auth';


function User() {

    /***************************************************************************************/
        const {  loading, data, error } = useQuery(QUERY_ME);
    
        const me = data?.me || {};

        const { data: userData } = useQuery(QUERY_USERS);
    
       // console.log(userData)
    
    /*****************************************************************************************/
    const [value, onChange] = useState(new Date());

    /************************switch between dog walkers and current*********************************/
    const [isOpened, setIsOpened] = useState(false);

    function newDog() {
        createNewDog(true);
        }

        function toggle() {
            setIsOpened(true);
          }
          function toggleOff() {
            setIsOpened(false);
          }
      
    

   
    /************************add new dog*********************************/
    const [addNewDog, createNewDog] = useState(false);
    const [dogFormState, setDogState] = useState({
        name: "",
        size: "",
        age: "",
        breed: "",
        behavior: "",
        temperament: "",
        picture: ""
      });
    
    /*************************location search*********************************/
    const [newEntry, setNewentry] = useState(false);
    
      const [addressSearch, newAddressSearch] = useState({
            city:""
      });
    const [totalSearch, setTotalSearch] = useState(
        []
    );
    
    const handleSearchAddress = (event) => {
        const { name, value } = event.target;
        console.log(name, value)
        newAddressSearch({
            ...addressSearch,
            [name]: value
        });
        }
    const handleNewSearchForWalkers = async event => {
        event.preventDefault();
        const peopleInMyCity = []
        const myCity = data.me.address.city;
        console.log(addressSearch.city);
        userData.users.forEach(element => {
        
           
            if (newEntry === true) {
                    setNewentry(false)
            }
            
            if (element.address.city === addressSearch.city
                && element.username != data.me.username) {
                totalSearch.push(element.username);
                setNewentry(true)
            
           }

            
        });
    }
    /***********************************************************/

    const dogData = { ...dogFormState };
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "picture") {
            console.log(event.target.files[0])

            const formData = new FormData();
            formData.append('file', event.target.files[0]);
            formData.append('upload_preset', 'l9bmcax8');
            fetch('https://api.cloudinary.com/v1_1/kingsley-illustration/upload', {
                method: 'POST',
                body: formData
            }).then(res => res.json())
                .then(res => 
                    //console.log(res.secure_url)
                    setDogState({
                      ...dogFormState, 
                        picture: res.secure_url.toString(),
                
            })
            );
            
        } else {
            setDogState({
                ...dogFormState,
                [name]: value,
            });
        }
        console.log(dogFormState);
  };

    const [addDoggo, { addDogError }] = useMutation(ADD_DOGGO, {
        update(cache, { data: { addDoggo } }) {
            // read what's currently in the cache
            const { dogData } = cache.readQuery({ query: QUERY_ME });

            // prepend the newest thought to the front of the array
            cache.writeQuery({
                query: QUERY_ME,
                data: { doggos: addDoggo }
            });
            window.location.reload();

        }
    });
    
                const handleFormSubmit = async event => {
                event.preventDefault();
                        dogData.size = parseInt(dogData.size);
                        dogData.age = parseInt(dogData.age);
                        console.log(dogData)
            // use try/catch instead of promises to handle errors
            try {
                // execute addUser mutation and pass in variable data from form
                await addDoggo({
                    variables: {
                        ...dogData
                            }
                
                });
                if (data) {
                    
                    console.log(data)
                }
                } catch (e) {
                console.error(e);
                }
            
                };

     return(
         
         <div>
             
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

                 <h1 className="blackBar">{me.username}</h1>

                 <div className = "leftAndRight">
                    
                 {!isOpened  ? 
                    <div className = "leftSideUserProfile">
                        
                     <img  onClick = {toggle} className = "arrow-down-blue" src="https://img.icons8.com/ios-filled/50/000000/year-of-dog.png"/>
                           
                               { loading ? (<div>...Loading</div>
                         ) : (
                                 <div className="text contact">
                                         <h2>Address</h2>
                                         
                                     <h4>{me.address.street}</h4>
                                
                                     <h4>{me.address.city} {me.address.state}</h4>

                                     <div className="contact">
                                         <h2>Contact</h2>
                                         <h4>{me.email}</h4>
                                         <h4>{me.address.phone_number}</h4>
                                     </div>
                                 </div> )}
                             
                                {data ?
                             <div className="list">
                                 

                            <h2 className = "current">My Current Dog Walkers</h2>
                                 <ul className="dogWalkersLeft scroll">
                                     {loading ? (<li>...Loading</li>
                                 ) : (
                                           
                                     me.favorites.map(favorites => (
                                        
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
                                     {newEntry ?
                                         totalSearch.map(person => (
                                        
                                             <li key={person.toString()}>{person}</li>
                                             
                                        
                                         )):<div></div>
                                        }
                                 </ul>
                     <form onSubmit = {handleNewSearchForWalkers}>
                         <input name="city" autoComplete="" value={addressSearch.name} onChange= {handleSearchAddress} className = "newLocationSearchInput" placeholder = "New Search" type="text" />
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
                         <h4 className="dogTitle" >Your Dogs: { me.doggos.length}</h4>
                         }
                         <img onClick = {newDog} className = "add" src={dogHouse} alt="add buton"></img>
                     </div>
                     <div className="yourDogs">
                         {addNewDog ?
                     <div className="dogBlock">
                         <div className="eachDogNew">
                             <form onSubmit={handleFormSubmit} >
                                <div>
                                 <label htmlFor="doggo">name: <input
                                     type="text"
                                     name="name"
                                     autoComplete=""
                                     value={dogFormState.name}
                                     onChange={handleChange}
                                 /></label>
                                 
                             
                                 <label htmlFor="doggo">size: <input
                                     type="text"
                                     name="size"
                                     autoComplete=""
                                     value={dogFormState.size}
                                     onChange={handleChange}
                                 /></label>
                                
                                 <label htmlFor="doggo">age: <input
                                     type="text"
                                     name="age"
                                     autoComplete=""
                                     value={dogFormState.age}
                                     onChange={handleChange}
                                 /></label>
                                 
                                 <label htmlFor="doggo">breed: <input
                                     type="text"
                                     name="breed"
                                     autoComplete=""
                                     value={dogFormState.breed}
                                     onChange={handleChange}
                                 /></label>
                                 
                                 <label htmlFor="doggo">behavior: <input
                                     type="text"
                                     name="behavior"
                                     autoComplete=""
                                     value={dogFormState.behavior}
                                     onChange={handleChange}
                                 /></label>
                              
                                 <label htmlFor="doggo">temperament:<input
                                     type="text"
                                     name="temperament"
                                     autoComplete=""
                                     value={dogFormState.temperament}
                                     onChange={handleChange}
                                 /></label>
                                 
                                 <label htmlFor="doggo">picture: <input
                                     type="file"
                                     name="picture"
                                     autoComplete=""
                                     
                                     onChange={handleChange}
                                 /></label>
                                </div>
                                 <button className="submitNewDog" type="submit">
                                     Add Dog
                                         </button>

                                {addDogError && <div className="error">{addDogError.toString()}</div>}


                             </form>
                         </div>
                     </div> : ""}
                         { loading ? (<div>...Loading</div>
                         ) : (
                            
                             me.doggos.map(doggos => (
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

                                         <div className="dogPic">

                                             <img src={doggos.picture} alt={"picture of " + `${doggos.name}`}/>
                                           </div>
                                     </div>
                                 </div>)))}
                
                            </div>
                        </div>
                    </div> 
             <div>
                 
                 </div>
                    
                 <div className = "bottomOrange"></div>
         </div>
     )
 };

 export default User;
