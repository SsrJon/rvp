import { Modal } from 'bootstrap';
import React, { Component } from 'react';
import VideoDataService from "../services/video.service";
import {Link } from "react-router-dom";
var videos=[{nombre: 'paco', anos: 'ww'}];

export default class Videos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            link:"",
            videos:[]
        }   
       /*  console.log(this.props.location.state);  */
        if(this.props.location.state){
            localStorage.setItem('tipoVideo', JSON.stringify(this.props.location.state));
        }
        /* this.forceUpdateHandler = this.forceUpdateHandler.bind(this); */
        this.cargarModal = this.cargarModal.bind(this);
        this.cargaVideos = this.cargaVideos.bind(this);
        this.cargaVideos(JSON.parse(localStorage.getItem('tipoVideo')));
    }
    /* forceUpdateHandler(){
        this.forceUpdate();
        // hastalapolla(videos);
    }; */
    cargarModal(video){
        document.getElementById("modalPeliculas").style.display="block";
        document.getElementById("titulo").innerHTML = video['nombre'] ;
        document.getElementById("tipo").innerHTML =video['tipo'] ;
        document.getElementById("descripcion").innerHTML = video['descripcion'];
        this.setState({link: video['link'],}); 
    };
    cargaVideos(tipoVideo) {
        /* console.log(tipoVideo); */
        if(tipoVideo==="21:9"){
            VideoDataService.getUltraWide()
            .then(response => {
                /* console.log(response.data);
                console.log(videos); */
                videos=response.data;
                this.setState({videos: [response.data],});
                /* Videos.forceUpdateHandler();  */  
            })
            .catch(e => {
                console.log(e);
            });
        }
        else if(tipoVideo==="1440"){
            VideoDataService.getQHD()
            .then(response => {
                /* console.log(response.data);
                console.log(videos); */
                videos=response.data;
                this.setState({videos: [response.data],});
                /* Videos.forceUpdateHandler();    */ 
            })
            .catch(e => {
                console.log(e);
            });
        }
        else if(tipoVideo==="4k"){
            VideoDataService.getUHD()
            .then(response => {
                /*console.log(videos);
                console.log(response.data);*/
                videos=response.data;
                this.setState({videos: [response.data],});
                /* Videos.forceUpdateHandler(); */   
            })
            .catch(e => {
                console.log(e);
            });
        }
    }

    render() {
        return(  
            <div>
                {/* <p>{this.props.location.state}</p> */}
                {/* <button onClick= {this.forceUpdateHandler} >FORCE UPDATE</button> */}
                <h1 class="mb-5">Videos {this.props.location.state}</h1>
                <div class="d-flex flex-wrap flex-row justify-content-around">
                    {videos.map((video, i) => {     
                        console.log("Entered");                 
                        // Return the element. Also pass key   
                        return (  
                            <div class="tarjetaVideo" class="col-3" onClick={() => this.cargarModal(video)}>
                                <img width="280" height="250" class="img-fluid" id={i} src={video['miniatura']}/>
                                <video width="300" height="200">
                                    <source src={video['link']} type="video/mp4" />
                                </video>
                                <h2><p>{video['nombre']}</p></h2>
                            </div>   
                        ) 
                    })}
                     <div class='modal' id="modalPeliculas">
                        <button id="cerrarModal" onClick={()=>cerrarModal()}>Cerrar</button> 
                        <img></img>
                        <h5>Titulo = <label id="titulo"></label></h5>
                        <h5>Tipo = <label id="tipo"></label></h5>
                        <h5>Descripcion = <label id="descripcion"></label></h5>
                        <h5>Link = <label id="link"></label></h5>
                        <button><Link /* className="textobotones" */ to={{ pathname: "/play", state: this.state.link }} >Reproducir</Link></button> 
                    </div>
                </div>
            </div>
        )
    }
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
      
    




