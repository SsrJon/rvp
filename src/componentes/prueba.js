import React, { Component } from 'react';
import VideoDataService from "../services/video.service";
import { Link } from "react-router-dom";

export default class Prueba extends Component {

    constructor(props) {super(props);}

    render() {
        return(  
        <div>
            <h1>Hola</h1>
            <p>Click en el boton para mostrar videos. (console.log)</p>
            
            <button class="btn btn-primary" onClick={hola}>Click aqui</button>
        </div>
        )
    }


}

function hola() {
    console.log("esto es una prueba");

    VideoDataService.getAll()
    .then(response => {
        console.log(response.data);
    })
    .catch(e => {
        console.log(e);
    });
      

  
        
}