import React from 'react';
import badDog from "../../assets/badDog.png"
function NotFound() {
    return (
        <div className="badlink">
            <div><img src={badDog} alt="not found img" /></div>
            
            <h1>Page Not Found</h1>
        </div>
    )
}
export default NotFound;