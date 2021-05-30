import { Modal } from 'bootstrap';
import React, { Component } from 'react';
import VideoDataService from "../services/video.service";
import captureVideoFrame from 'capture-video-frame';
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
                                
                                <div class="tarjetaVideo" class="col-3" onClick={() => cargarModal(video)}>
                                    <img width="280" height="250" class="img-fluid" id={i} src={video['miniatura']}/>
                                    <video width="300" height="200">
                                        <source src={video['link']} type="video/mp4" />
                                    </video>
                                    <h2><p>{video['nombre']}</p></h2>
                                    <h3><p>{video['descripcion']}</p></h3>
                                    
                                </div>
                              
                        ) 
                    })}
                     <div class='modal fade' id="modalPeliculas">
                        <button id="cerrarModal" onClick={()=>cerrarModal()}>Cerrar</button> 
                        <img></img>
                        <h5>Titulo = <label id="titulo"></label></h5>
                        <h5>Tipo = <label id="tipo"></label></h5>
                        <h5>Descripcion = <label id="descripcion"></label></h5>
                        <button>Reproducir</button> 
                    </div>
                </div>
               
            </div>
        )
    }}

    function cargarModal(video){
        document.getElementById("modalPeliculas").style.display="block";
        document.getElementById("titulo").innerHTML = video['nombre'] ;
        document.getElementById("tipo").innerHTML =video['tipo'] ;
        document.getElementById("descripcion").innerHTML = video['descripcion'];
    }
    function cerrarModal(){
        document.getElementById("modalPeliculas").style.display="none";
    }
     
    function egtVideoImage(path, secs, callback) {
        var me = this, video = document.createElement('video');
        video.onloadedmetadata = function() {
          if ('function' === typeof secs) {
            secs = secs(this.duration);
          }
          this.currentTime = Math.min(Math.max(0, (secs < 0 ? this.duration : 0) + secs), this.duration);
        };
        video.onseeked = function(e) {
          var canvas = document.createElement('canvas');
          canvas.height = video.videoHeight;
          canvas.width = video.videoWidth;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          var img = new Image();
          img.src = canvas.toDataURL();
          callback.call(me, img, this.currentTime, e);
        };
        video.onerror = function(e) {
          callback.call(me, undefined, undefined, e);
        };
        video.src = path;
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




