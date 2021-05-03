import React, { Component } from 'react';
import VideoDataService from "../services/video.service";
var videos=[{nombre: 'paco', anos: 'ww'}];

export default class Videos extends Component {

    constructor(props) {
        super(props);
       /*  console.log(this.props.location.state);  */
        cargaVideos(this.props.location.state);
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
         
    }
 
    forceUpdateHandler(){
        this.forceUpdate();
      };
    render() {
        return(  
        <div>
            <h1>Hola</h1>
            <p>{this.props.location.state}</p>
            <button onClick= {this.forceUpdateHandler} >FORCE UPDATE</button>
        
            {JSON.stringify(videos)}
            
        </div>
        )
    }
    


}

function cargaVideos(tipoVideo) {
    /* console.log(tipoVideo); */
    if(tipoVideo==="21:9"){
        VideoDataService.getUltraWide()
        .then(response => {
            console.log(response.data);
            videos=response.data;
            console.log(videos);
            Videos.forceUpdateHandler();            

        })
        .catch(e => {
            console.log(e);
        });
    }else if(tipoVideo==="1440"){
        VideoDataService.getQHD()
        .then(response => {
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });

    }else if(tipoVideo==="4k"){
        VideoDataService.getUHD()
        .then(response => {
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });

    }
    
}

