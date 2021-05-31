import React, { Component } from 'react';
import 'video-react/dist/video-react.css';
import { Player } from 'video-react';

export default class Play extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.location.state); 
        if(this.props.location.state){
            localStorage.setItem('playVideo', JSON.stringify(this.props.location.state));
        }
        /* cargaVideos(JSON.parse(localStorage.getItem('playVideo'))); */
    }

    render() {
        return(  
        <div>
            <Player>
                <source autoPlay src={JSON.parse(localStorage.getItem('playVideo'))} />
            </Player>
        </div>
        )
    }


}

function hola() {
    console.log("esto es una prueba");
    
}