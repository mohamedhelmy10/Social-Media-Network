import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image } from "react-bootstrap";
import Bar from './Bar.js';

class Welcome extends Component{
 render(){
     return(
         <div>
             <Bar/>
    <div className = "welcome">
        <div className = "title">       
            <h1 >Welcome In Friends Network</h1>
        </div>
        <div className = "backgroundImage">       
            <Image src="images/home3.png" fluid roundedCircle />
        </div>
        <div className = "side">
            <div id = "contacts"> 
                <p><b>Email: </b>friends@yahoo.com</p>
                <p><b>Phone: </b>5846789</p>     
            </div>
            <div id = "about">       
                <p><b>Friends</b> is a social media website in which you can make friends
                and share your activities with them, Also you can react and comment on their posts.</p>
            </div>
        </div>

    </div>
    </div>
    )
  }
}

export default Welcome;