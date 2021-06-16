import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image } from "react-bootstrap";


class Home extends Component{
 render(){
     return(
    <div className = "home">
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
    )
  }
}

export default Home;