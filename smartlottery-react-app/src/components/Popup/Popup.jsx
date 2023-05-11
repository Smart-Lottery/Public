


import React from "react";
import './Popup.scss';

export const Popup = ({message,  pRef}) =>  {

    return (
      <>
      {(message !== "") && (
      <div className="popup" ref={pRef}>
      <div>
       {message}
      </div>
    </div>
    )} 
</>
    

    );
  }

