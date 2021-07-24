import React from 'react';
import { Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import bluePattern from '../../assets/bluePattern.png';
import logo from '../../assets/dingoLogo.png';
import illustration from '../../assets/illustration.png';
import dog1 from '../../assets/dog1.png';
import dog2 from '../../assets/dog2.png';
import dog3 from '../../assets/dog3.png';
import user from '../../assets/user.png';
import { element } from 'prop-types';
const customStyles = {
     overlay : {
        backgroundColor: null,
        position: 'absolute',
        
        top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    content : {
        backgroundColor: '#F7931E',
        borderRadius: '20px',
        outline: 'none',
        width: '270px',
        height: '325px',
        borderRadius: '20px',
        
        boxShadow: '0 7px 10px rgb(0, 0, 0)',
        border: 'none',
        position:'none',
        
        
    }
  

};
 function Home(){

///**************modal**********************/
Modal.setAppElement('#root');


let subtitle;
const [modalIsOpen, setIsOpen] = React.useState(false);

function openModal() {
  setIsOpen(true);
}

function afterOpenModal() {
  // references are now sync'd and can be accessed.
  subtitle.style.color = 'red';
}

function closeModal() {
  setIsOpen(false);
}
 
/**********************************************/
     return(
         <div className = "allHomeElements">

<div class="container">
 <div class="path">
    <span id="elem" class="shape trail"></span> 
  </div>
</div>

            <div className = "bluePat">
                <div className = "logoAndLogin">
                    <img className = "logo" src = {logo} alt = "logo"/>
                    <Route render={({ history}) => (
                    <div className = "signUpBox"
                        type='button'
                        onClick={() => { history.push('/SignUp') }}
                    >

                        First time user?
                        <img className = "user" src = {user} alt = "user"/>
                        
                    </div>
                    )}/>
                    
                </div>
                <div className = "navigation">
                    <div className = "element left">
                        Location
                   
                    </div>
                        <element className = "line"></element>

                        <Route render={({ history}) => (
                    <div className = "element"
                        type='button'
                        onClick={() => { history.push('/User') }}
                    >
                        My dog walkers
                        
                        </div>
                    )}/>
                    
                        <element className = "line"></element>
                        <Route render={({ history}) => (
                    <div className = "element"
                        type='button'
                        onClick={() => { history.push('/DogWalker') }}
                    >
                        My schedule</div>
                    )}/>
                    
                        <element className = "line"></element>
                    <div onClick={openModal} className  = "endNav element right">Find new dog walkers</div>
                   
                     <Modal 
                        isOpen={modalIsOpen}
                        //onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
                        <button onClick={closeModal}>close</button>
                        <div className = "contentHome">
                        <p>Dog Walkers In Your Area</p>
                        <p>Milwaukee Wisconsin</p>
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
                    </Modal>
                    
      <element className = "seacrhCircle"></element>
                </div>
              
     
                
            </div>
            <div className = "orangeBox">
                <img className = "illustration" src = {illustration} alt = "illustration"/>

            </div>
            <div className = "dogsRow">
                <img  src = {dog1} alt = "dog1"/>
                <img  src = {dog2} alt = "dog2"/>
                <img  src = {dog3} alt = "dog3"/>
            
            </div>
            <div className = "bottomBorder">

            </div>
         </div>
     )
 };

 export default Home;
 