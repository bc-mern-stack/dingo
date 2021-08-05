import { React,useState } from 'react';
import { Route, Link,useParams, Redirect} from 'react-router-dom';
import Calendar from 'react-calendar';
import dogHouse from '../../assets/dogHouse.png';
import subtract from '../../assets/subtract.png';
import deleteDog from '../../assets/deleteWhite.png'
import { useQuery, gql, useMutation } from '@apollo/client';
import { QUERY_USERS, QUERY_ME, QUERY_USER } from '../../utils/queries';
import { ADD_DOGGO, REMOVE_DOGGO } from '../../utils/mutations';
import StateList from "../SignUp/StateList";

import Auth from '../../utils/auth';
import camera from '../../assets/camera.png'
import { element, object } from 'prop-types';
import { differenceInCalendarDays } from 'date-fns';
import dateFormat from 'dateformat';
function User() {

    /***************************************************************************************/
    const { username: userParam } = useParams();

    const { loading, data, error } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam }
    });
    
    const user = data?.me || data?.user || {};
    // console.log(userData)
    const { data: userData } = useQuery(QUERY_USERS);


    /******************************************************************************************/
    
    const [theAppointments, setTotalSearchAppoint] = useState(
        []
    );
    const [date, setDate] = useState(new Date());
    const [dateCheck, setDateCheck] = useState(true);
    const [dateCheckMatch, setDateCheckMatch] = useState(false);


    const onChange = date => {
        setDate(date)
        setContent(date)
    }
    const setContent = (date) => {
        const newDate = dateFormat(date, "dddd, mmmm dd, yyyy")
        
        
            //console.log(user.appointments)
           const hourSet = [];
        for (var i = 0; i < user.appointments.length; i++) {
               
            //console.log(user.appointments.date)
            let newdate = new Date(parseInt(user.appointments[i].date)).toLocaleDateString("en-en", {
                year: "numeric",
                month: "long",
                day: "2-digit",
                weekday: "long"
            })

            //console.log(newdate)
            const favorites = []
            //dateArray.push(user.appointments[i].date);
            let newHour = 0;
            /*console.log(parseUser)*/
            console.log(newDate)
            
            console.log(hourSet)
            if (newDate === newdate) {
                
                if (user.appointments[i].hour === 12) {
                    newHour = 12 + "pm"
                }
                else if (user.appointments[i].hour > 12) {
                    newHour = user.appointments[i].hour;
                    newHour = newHour -= 12;
                    newHour = newHour + "pm"
                }
                else if (user.appointments[i].hour < 12) {
                    newHour = user.appointments[i].hour + "am"
                }
                else if (user.appointments[i].hour === 0)
                    { newHour = 12 + " am"
            }
                
                /*if (!favorites.includes(user.appointments[i].walker.username)) {
                    favorites.push(user.appointments[i].walker.username)

                }*/
                if (!hourSet.length) {
                    hourSet.push(newHour)
                }
                else {
                     hourSet.push("-" + newHour)
                }
                console.log(hourSet)
                console.log("match")
                setDateCheckMatch(true)
                console.log(user.appointments[i])
                setTotalSearchAppoint({
                    ...theAppointments,
                    date: newDate,
                    walker: user.appointments[i].walker.username,
                    doggos: user.appointments[i].doggos,
                    hour: hourSet,
                    /*hour: newHour,*/
                    pic: user.appointments[i].doggos.picture,
                   /* favorites: favorites*/
                })
            }
            
       
        }
    }
   

    const setClass = (date, view) => {
        const falsedateArray = [ { date:  "Friday, September 10, 2021", colorName: "highlight" }, { date: "2021-06-16T09:47:17.456000Z", colorName: "blue" }]
      
        if (user.appointments && dateCheck) {
            const dateArray = []
            
        
            //console.log(user.appointments)
           
            for (var i = 0; i < user.appointments.length; i++) {
                if (user.appointments[i].walker.username != user.username) {
                    //console.log("no name match")
                    
                    const obj = {
                        date: "",
                        colorName: "highlight"
                    }
                
                    //console.log(user.appointments.date)
                    let newdate = new Date(parseInt(user.appointments[i].date)).toLocaleDateString("en-en", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                        weekday: "long"
                    })
                    obj.date = newdate

            
                    dateArray.push(obj)
                
                
                }
            }
            if (dateArray.length) {
                const dateobj =
                    dateArray.find((x) => {
                        return (
                            date.getDay() === new Date(x.date).getDay() &&
                            date.getMonth() === new Date(x.date).getMonth() &&
                            date.getDate() === new Date(x.date).getDate()
               
                        );
                    });
            
            
           
                return dateobj ? dateobj.colorName : "";
            }
        }

        }
    

        const logout = (event) => {
            event.preventDefault();
            Auth.logout();
        };
    
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
      
    function goBackToCal() {
        setDateCheckMatch(false)
    }
    

    const checkFav = () => {
        const favorites = []
        for (var i = 0; i < user.appointments.length; i++)
        {
            if (user.appointments[i].walker.username != user.username) {
                if (!favorites.includes(user.appointments[i].walker.username)) {
                    favorites.push(user.appointments[i].walker.username)
                }
            }
        }
        //console.log(favorites);
       
        
        return favorites;
  };
        
    
    /************************add new dog*********************************/
    const [errorValue, setErrorValue] = useState(
        false
    )
    const [errorForDog, setError] = useState({
        error: ""
    })
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
    /**********************************************************/
    const [hoverOver, setNewEvent] = useState(false);
    
    /*************************location search*********************************/
    const [newEntry, setNewentry] = useState(false);
    
    const [addressSearch, newAddressSearch] = useState({
        city: ""
    });
     const [addressFormState, setAddressFormState] = useState({

    state: ""
   
  });
     const handleChangeAddress = (event) => {
    const { name, value } = event.target;

    setAddressFormState({
      ...addressFormState,
      [name]: value,
    });
        //console.log(addressFormState);

  };
    const [totalSearch, setTotalSearch] = useState(
        []
    );
    
    const handleSearchAddress = (event) => {

        const { name, value } = event.target;
        setNewentry( false )
        //console.log(name, value)
        newAddressSearch({
            
            ...addressSearch,
            [name]: value
        });
        //event.target.value = '';
    }
    const handleNewSearchForWalkers = async event => {
        event.preventDefault();
        
        if(totalSearch.length > 0){totalSearch.length = 0}
        userData.users.forEach(element => {
           
           
           
            if (element.address.city.toLowerCase() === addressSearch.city.toLowerCase().trim()
                && element.username != data.me.username && addressFormState.state
                === element.address.state && element.availability.length > 0) {
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
        let nullify = false;
        event.preventDefault();
        dogData.size = parseInt(dogData.size);
        dogData.age = parseInt(dogData.age);
        console.log(dogData)
        Object.keys(dogData).forEach(key => {
            if (!dogData[key]) {
                console.log(key + " is null")
                nullify = true;
                console.log(nullify);
                //alert(key + " is required")
                 setError({
                     errorForDog: (key + " required"),
                     
    });
                setErrorValue( true )
            }
                
            
          
        //console.log(key, dogData[key]);
});
            
        if (!nullify) {
            setErrorValue( false )
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
  if (error) {
    return <div>{error.toString()}</div>;
  }

     return(
         
         <div>
             
             <div className="allUserElements">
                <div className = "userNav">
                    <h1>
                        Owner Profile
                    </h1>
                    <div className = "logoutAndHome">
                         <Link
                        to={`/SignUp`}
                        
                        className="text-light"
                        >
                         <h2 className = "logout"
                        type='button'
                        
                    >
                       Logout <span className = "reveal">/</span>
                   </h2>
                        </Link>
                    <Link
                        to={`/`}
                        
                       
                        >
                         <h2 
                        type='button'
                        
                    >
                       Home
                   </h2>
                        </Link>
                        
                        

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
                                          
                                     checkFav().map(walker => (
                                        <Link to={`/DogWalker/${walker}`} key={walker}>
                                              <li key = {walker}>{walker}</li> 
                                     </Link>
                                             
                                             
                                        
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
                                     {!newEntry ?
                                          
                                         <h3>Nothing Found</h3>:<h3>{totalSearch.length} results for {addressSearch.city} {addressFormState.state}</h3>
                                     }
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
                     <form className = "buttomSearch" onSubmit = {handleNewSearchForWalkers}>
                        <input name="city" autoComplete="" value={addressSearch.name} onChange= {handleSearchAddress} className = "newLocationSearchInput" placeholder = "New City Search" autoComplete ="off" type="text" />
                         <div className = "secondRow">
                        <label name="state"></label>
                            <StateList className = "stateSelect"
                            addressFormState={addressFormState}
                            handleChangeAddress={handleChangeAddress}/>
                            <button className = "newLocationSearchButton" type="submit"></button>
                        </div>
                     </form>
                     </div>
                         </div>}
                     {!dateCheckMatch ?
                        <div  className = "userCalender">
                             {userParam ?
                                 <h4 className="text">{user.username} dog's appointments.</h4>
                                : <h4 className="text">Your dog's appointments.</h4>}
                         <Calendar className="cal"
                             onChange={onChange}
                             value={date}
                             tileClassName={({ date, view }) => setClass(date, view)}
                            
                              
                                />
                         
                        </div>:
                         <div className="userCalender hoverOverCal">
                             
                             <div className="text contact">
                                         <h2>Your Appointment</h2>
                                         
                                 
                                 <Link to={`/DogWalker/${theAppointments.walker}`} key={theAppointments.walker.toString()}>
                                             <h3>{theAppointments.walker}</h3>   
                                     </Link>

                                     <h3>{theAppointments.date} at {theAppointments.hour}</h3>
                                    <h4></h4>
                                     <div className="doggosAppoint">
                                        
                                    
                                     {loading ? (<div>...Loading</div>
                                     ) : (
                                             theAppointments.doggos.map(doggos => (
                                            <div key={doggos.name}className = "yourDogsAppoint">
                                             
                                             <img  className ="dogPic" src={doggos.picture}></img>
                                                     <h4 >{doggos.name}</h4>
                                                 </div>
                                         )))}
                                     </div>
                                 </div> 
                             <img className = "schedule" onClick ={goBackToCal} src="https://img.icons8.com/ios-filled/50/000000/planner.png"/>
                         </div>}
                 
             </div>

                 <div>
                     <div className="completeTitle">
                         {userParam ? <h4 className="dogTitle" >{user.username}'s dogs: {user.doggos.length}</h4> :
                         
                          
                             <h4 className="dogTitle" >Your Dogs: {user.doggos.length}</h4>
                         }
                         <div>
                            
                         {userParam ? "":<img onClick={removeDog} className="delete" src={deleteDog} alt="delete button"></img>}
                        ({userParam ? "": 
                         (!addNewDog ?
                             <img onClick={newDog} className="add" src={dogHouse} alt="add button"></img>
                             :
                             <img onClick={cancelNewDog} className="sub" src={subtract} alt="subtract button"></img>)}
                         
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
                                         {errorValue ? 
                                                 <p className = "error">Missing info</p>:<p></p>
                                         }
                                </div>


                             </form>
                         </div>
                     </div> : ""}
                         { loading ? (<div>...Loading</div>
                         ) : (
                            
                             user.doggos.map(doggos => (
                                 <div key={doggos._id} className="dogBlock">
                                     
                                     <div className="eachDog">
                                    <div className = "topDog">
                                         <div className="dogInfo">
                                             <p>Name: {doggos.name}</p>
                                             <p>Age: {doggos.age}</p>
                                             <p>Size: {doggos.size}</p>
                                             <p >Breed: {doggos.breed}</p>
                                            </div>
                                    <div className="dogPic">

                                             <img src={doggos.picture} alt={"picture of " + `${doggos.name}`} />
                                             {dogRemoval ?
                                                 <button onClick={() => removeDogComplete({ doggos })} className="removeDog" type = "click">
                                                     Remove Dog
                                                 </button>: <div></div>}
                                         </div>
                                           </div>
                                        <div className="dogInfo adjust">
                                             <p>Behavior: {doggos.behavior}</p>
                                             <p>Temperament: {doggos.temperament}</p>
                                             <div className = "fixer">Special Instructions:</div>
                                             <p className = "instructions scroll">{doggos.instructions}</p>
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
