import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import Loader from 'react-loader-spinner'
export default class App extends React.Component {
 //other logic
   render() {
    return(
     <Loader
        type="ThreeDots"
        color="rgb(92,160,248)"
        height={100}
        width={100}
        timeout={3000} //3 secs

     />
    );
   }
}

// Notes on Loader styles
// Oval = classic spinner
// Audio = wifi bars
// Puff = cool circle thing but very React-y
// Rings = tiny circles
// TailSpin = I like, more dynamic and faster than Oval
// ThreeDots = most modern