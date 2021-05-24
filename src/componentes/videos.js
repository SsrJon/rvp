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
        // hastalapolla(videos);
      };
    render() {
        return(  
            <div>

                <p>{this.props.location.state}</p>
                <button onClick= {this.forceUpdateHandler} >FORCE UPDATE</button>
            
               
                <h1 class="mb-5">Videos {this.props.location.state}</h1>
                
                <div class="d-flex flex-wrap flex-row justify-content-around">
                    {videos.map((video, i) => {     
                        console.log("Entered");                 
                        // Return the element. Also pass key     
                        return (
                                
                                <div class="col-3">
                                    <img width="280" height="250" class="img-fluid" src={video['miniatura']}/>
                                    <h2><p>{video['nombre']}</p></h2>
                                </div>
                              
                        ) 
                    })}
                </div>
        
            </div>
        )
    }}




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
            videos=response.data;
            console.log(videos);
            Videos.forceUpdateHandler();    
        })
        .catch(e => {
            console.log(e);
        });

    }else if(tipoVideo==="4k"){
        VideoDataService.getUHD()
        .then(response => {
            console.log(response.data);
            videos=response.data;
            console.log(videos);
            Videos.forceUpdateHandler();    
        })
        .catch(e => {
            console.log(e);
        });

    }
    
}

