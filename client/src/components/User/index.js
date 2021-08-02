import { React,useState } from 'react';
import { Route, Link,useParams, Redirect} from 'react-router-dom';
import Calendar from 'react-calendar';
import dogHouse from '../../assets/dogHouse.png';
import subtract from '../../assets/subtract.png';
import deleteDog from '../../assets/deleteWhite.png'
import { useQuery, gql, useMutation } from '@apollo/client';
import { QUERY_USERS, QUERY_ME, QUERY_USER } from '../../utils/queries';
import { ADD_DOGGO, REMOVE_DOGGO } from '../../utils/mutations';
import Auth from '../../utils/auth';
import camera from '../../assets/camera.png'

function User() {

    /***************************************************************************************/
    const { username: userParam } = useParams();

    const { loading, data, error } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam }
    });

    const user = data?.me || data?.user || {};
    // console.log(userData)
    const { data: userData } = useQuery(QUERY_USERS);

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    /*****************************************************************************************/
    const [value, onChange] = useState(new Date());

    /************************switch between dog walkers and current*********************************/
    const [isOpened, setIsOpened] = useState(false);

    function newDog() {
        createNewDog(true);
    }
    function cancelNewDog() {
        createNewDog(false);
    }
    function removeDog() {
        if (dogRemoval) { oneLessDog(false) }
        else (oneLessDog(true));
    }
   
    

    function toggle() {
        setIsOpened(true);
    }
    function toggleOff() {
        setIsOpened(false);
    }
      
    

   
    /************************add new dog*********************************/
    const [dogRemoval, oneLessDog] = useState(false)
    const [dogToRemove, removeDogState] = useState({
        id: ""
    });

    const [addNewDog, createNewDog] = useState(false);
    const [dogFormState, setDogState] = useState({
        name: "",
        size: "",
        age: "",
        breed: "",
        behavior: "",
        temperament: "",
        picture: "",
        instructions: ""
    });
    
    /*************************location search*********************************/
    const [newEntry, setNewentry] = useState(false);
    
    const [addressSearch, newAddressSearch] = useState({
        city: ""
    });
    const [totalSearch, setTotalSearch] = useState(
        []
    );
    
    const handleSearchAddress = (event) => {
        const { name, value } = event.target;
        //console.log(name, value)
        newAddressSearch({
            ...addressSearch,
            [name]: value
        });
    }
    const handleNewSearchForWalkers = async event => {
        event.preventDefault();
        userData.users.forEach(element => {
           
            if (newEntry === true) {
                setNewentry(false);
            }
           
            if (element.address.city.toLowerCase() === addressSearch.city.toLowerCase().trim()
                && element.username != data.me.username && element.availability.length > 0) {
                totalSearch.push(element.username);
                setNewentry(true);
            }

            
        });
    }
    /***********************************************************/
    const [photoStatus, uploadPhoto] = useState(false);

    function uploadedComplete() {
        uploadPhoto(true);
    }

    const dogData = { ...dogFormState };
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "picture") {
            uploadedComplete()
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
    const [removeDoggo, { removeDogError }] = useMutation(REMOVE_DOGGO, {
        
        update(cache, { data: { removeDoggo } }) {
            // read what's currently in the cache
            const { dogData } = cache.readQuery({ query: QUERY_ME });

            // prepend the newest thought to the front of the array
            cache.writeQuery({
                query: QUERY_ME,
                data: { doggos: removeDoggo }
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

    const removeDogComplete = async (doggo) => {
        
         removeDogState({
                dogToRemove:
                 doggo.doggos._id,
            });
            //oneLessDog(false);
        console.log(doggo.doggos._id.toString())
            //console.log(dogToRemove.id);
                  const dogId = doggo.doggos._id      
        // use try/catch instead of promises to handle errors
       try {
            // execute addUser mutation and pass in variable data from form
            await removeDoggo({
                variables:
                    { doggoId:dogId }
                     
                
                
            });
            if (data) {
                    
                console.log(data)
            }
        } catch (e) {
            console.error(e);
        
        }
            
    };


  if (loading) {
    return <div>Loading...</div>;
  }

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

                 <h1 className="blackBar">{user.username}</h1>

                 <div className = "leftAndRight">
                    
                 {!isOpened  ? 
                    <div className = "leftSideUserProfile">
                        
                     <img  onClick = {toggle} className = "arrow-down-blue" src="https://img.icons8.com/ios-filled/50/000000/year-of-dog.png"/>
                           
                              
                                 <div className="text contact">
                                         <h2>Address</h2>
                                         
                                     <h4>{user.address.street}</h4>
                                
                                     <h4>{user.address.city} {user.address.state}</h4>

                                     <div className="contact">
                                         <h2>Contact</h2>
                                         <h4>{user.email}</h4>
                                         <h4>{user.address.phone_number}</h4>
                                     </div>
                                 </div> 
                             
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
                                     <h3>{ user.address.city } { user.address.state }</h3>
                                
                             </div> 
                             
                     </div>
                        <div>
                                 <ul className="dogWalkersRight scroll text">
                                     
                                     {newEntry ?
                                         totalSearch.map(person => (
                                        
                                        <Link to={`/DogWalker/${person}`} key={person.toString()}>
                                             <li>{person}</li>     
                                        </Link>
                                         )):<div></div>
                                         }
                                     
                                 </ul>
                     <form onSubmit = {handleNewSearchForWalkers}>
                         <input name="city" autoComplete="" value={addressSearch.name} onChange= {handleSearchAddress} className = "newLocationSearchInput" placeholder = "New Search" type="text" />
                         <button className = "newLocationSearchButton" type="submit"></button>
                        
                     </form>
                     </div>
                         </div>}
                     
                        <div className = "userCalender">
                          
                                <h4 className = "text">Your dog's appointments.</h4>
                                <Calendar  className = "cal"
                                onChange={onChange}
                                value={value}
                                />
                               
                        </div>
                
                 
             </div>

                 <div>
                     <div className="completeTitle">
                          {data &&
                         <h4 className="dogTitle" >Your Dogs: { user.doggos.length}</h4>
                         }
                         <div>
                            
                            <img onClick={removeDog} className="delete" src={deleteDog} alt="delete button"></img>

                         {!addNewDog ?
                             <img onClick={newDog} className="add" src={dogHouse} alt="add button"></img>
                             :
                             <img onClick={cancelNewDog} className="sub" src={subtract} alt="subtract button"></img>}
                         
                         </div>
                     </div>

                     <div className="yourDogs">
                         {addNewDog ?
                     <div className="dogBlock">
                         <div className="eachDogNew">
                             <form onSubmit={handleFormSubmit} >
                                <div className = "insideForm">
                                 <label htmlFor="doggo">Name: <input
                                     type="text"
                                     name="name"
                                     autoComplete="off"
                                     value={dogFormState.name}
                                     onChange={handleChange}
                                 /></label>
                                 
                             
                                 <label htmlFor="doggo">Size: <input
                                     type="text"
                                     name="size"
                                     autoComplete="off"
                                     value={dogFormState.size}
                                     onChange={handleChange}
                                 /></label>
                                
                                 <label htmlFor="doggo">Age: <input
                                     type="text"
                                     name="age"
                                     autoComplete="off"
                                     value={dogFormState.age}
                                     onChange={handleChange}
                                 /></label>
                                 
                                 <label htmlFor="doggo">Breed: <input
                                     type="text"
                                     name="breed"
                                     autoComplete="off"
                                     value={dogFormState.breed}
                                     onChange={handleChange}
                                 /></label>
                                 
                                 <label htmlFor="doggo">Behavior: <input
                                     type="text"
                                     name="behavior"
                                     autoComplete="off"
                                     value={dogFormState.behavior}
                                     onChange={handleChange}
                                 /></label>
                              
                                 <label htmlFor="doggo">Temperament:<input
                                     type="text"
                                     name="temperament"
                                     autoComplete="off"
                                     value={dogFormState.temperament}
                                     onChange={handleChange}
                                             /></label>
                                             
                                 <label htmlFor="doggo">Special Instructions: </label>
                                    <textarea className = "scroll"
                                     type="textarea"
                                     name="instructions"
                                     autoComplete="off"
                                     value={dogFormState.instructions}
                                     onChange={handleChange}
                                 />
                                </div>
                                         <div className="alignButtons">
                                             {!photoStatus ?
                                                 <div>
                                         <div className="dogPic">
                                                 <label htmlFor="doggo"></label>
                                            <input
                                                className="file"
                                                type="file"
                                                name="picture"
                                                autoComplete="off"
                                                
                                                onChange={handleChange}
                                                 />
                                                 
                                             </div>
                                    
                                             <div className = "cameraDiv">
                                                 <img className="camera" src={camera} alt="pictureIcon" />
                                                 <p>Add picture</p>
                                                     </div>
                                                 </div>
                                        :<div className = "successPhoto">
                                         <div className="dogPicSuccess">
                                                

                                             </div>
                                    
                                             <div className = "cameraDiv">
                                                 <img className="camera" src={camera} alt="pictureIcon" />
                                                    <p>Uploaded</p>

                                                     </div>
                                                 </div>
                                                }
                                 <button className="submitNewDog" type="submit">
                                     Add Dog
                                         </button>
                                </div>
                                {addDogError && <div className="error">{addDogError.toString()}</div>}


                             </form>
                         </div>
                     </div> : ""}
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
                                             <div className = "fixer">Special Instructions:</div>
                                             <p className = "instructions scroll">{doggos.instructions}</p>
                                         </div>

                                         <div className="dogPic">

                                             <img src={doggos.picture} alt={"picture of " + `${doggos.name}`} />
                                             {dogRemoval ?
                                                 <button onClick={() => removeDogComplete({ doggos })} className="removeDog" type = "click">
                                                     Remove Dog
                                                 </button>: <div></div>}
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
