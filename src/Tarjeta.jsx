import React from 'react';
import "./App.css";

const Tarjeta = ({children, ...props}) => {
  return(
    <div style={{
      border: '1px solid #000',
      boxShadow: '5px 5px 15px 5px #000000',
      padding: 24,
      marginBottom: 16
    }}
    {...props}
    >
      {children}
    </div>
  );
}
export default Tarjeta;