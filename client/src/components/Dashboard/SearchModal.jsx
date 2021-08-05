import { React,useState } from 'react';
import close from "../../assets/close.png";
import StateList from "../SignUp/StateList";
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import { QUERY_USERS} from '../../utils/queries';

export default function SearchModal({ searchModalOpen, setSearchModal }) {
  
    const { data: userData } = useQuery(QUERY_USERS);
  const [totalSearch, setTotalSearch] = useState(
        []
    );
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
              && addressFormState.state === element.address.state &&
                element.availability.length > 0) {
                totalSearch.push(element.username);
                setNewentry(true);
                 
            }
           
        });
           
    }
  return (
    <div className="bothDropDowns">
      <div className="dropDownlocation">
        <img
          onClick={() => setSearchModal(false)}
          className="close"
          src={close}
          alt="close"
        />

        <div>
          <p className="textLocation">New Location Search</p>

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
      </div>

 
      
      <div className="homeSearch">
        
                            <div >
                            <img
                              onClick={() => setSearchModal(false)}
                              className="closeRight"
                              src={close}
                              alt="close"
                            />
                          </div>
                     <div className = "text">
                             <div>
                                     <h2>Find Dog Walkers in Your Area</h2>
                                     {!newEntry ?
                                          
                                         <h3>Nothing Found</h3>:<h3>{totalSearch.length} results for {addressSearch.city} {addressFormState.state}</h3>
                                     }
                             </div> 
                             
                     </div>
                        <div>
                                     <div className="contentHome">
                                 
                                  <div className="list">
                                    <ul className="dogWalkers scroll">
                                      
                                     {newEntry ?
                                         totalSearch.map(person => (
                                        
                                        <Link to={`/DogWalker/${person}`} key={person.toString()}>
                                             <li>{person}</li>     
                                        </Link>
                                         )):<div></div>
                                         }
                                     
                                   </ul>
                                  </div>
                                </div>
                     
                     </div>
      </div>
      

    </div>
  );
}
