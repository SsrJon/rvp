import { Modal } from 'bootstrap';
import React, { Component } from 'react';
import VideoDataService from "../services/video.service";
import {Link } from "react-router-dom";
import $ from "jquery";
import HoverVideoPlayer from 'react-hover-video-player';
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
        this.buscar();
        this.cargarModal = this.cargarModal.bind(this);
        this.cargaVideos = this.cargaVideos.bind(this);
        this.cargaVideos(JSON.parse(localStorage.getItem('tipoVideo')));
    }
    
    cargarModal(video){
        /* document.getElementById("modalPeliculas").style.display="block"; */
        document.getElementById("titulo").innerHTML = video['nombre'] ;
        /* document.getElementById("tipo").innerHTML =video['tipo'] ; */
        document.getElementById("descripcion").innerHTML = video['descripcion'];
        document.getElementById("miniatura").src = "Imagenes/miniaturas/"+video['miniatura'];
        this.setState({link: video['link'],}); 
    };
    buscar () {

        $('#botonBusqueda').on('click',function () {
        
            var textoBusqueda;
        
            var tolosvideos=[];
        
            
            // console.log(textoBusqueda);
            VideoDataService.getAll().then(response => {
                
                tolosvideos = response.data;
                textoBusqueda =  $('#barraBusqueda').val();
                // alert(tolosvideos['titulo']);
                tolosvideos.forEach(videob => {
                console.log(videob['nombre']);
                    if (textoBusqueda == videob['nombre']) {
                        console.log("EXITO EXITO EXITO EXITO");
                        
                    }
                });
            })
        });
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
            <div id="videos">
                {/* <p>{this.props.location.state}</p> */}
                {/* <button onClick= {this.forceUpdateHandler} >FORCE UPDATE</button> */}
                <h1 class="mb-5">Videos {this.props.location.state}</h1>
                <div class="d-flex flex-wrap flex-row justify-content-around">
                    {videos.map((video, i) => {     
                        console.log("Entered");                 
                        // Return the element. Also pass key   
                        return (  
                            <div class="tarjetaVideo" class="col-3"  data-toggle="modal" data-target="#modalVideo" onClick={() => this.cargarModal(video)}>
                                {/* <img width="280" height="250" class="img-fluid" id={i} src={video['miniatura']}/> */}
                                <HoverVideoPlayer
                                    videoSrc={"Videos/"+video['link']}
                                    restartOnPaused
                                    controlsList="nodownload nofullscreen"
                                    disablePictureInPicture={true}
                                    pausedOverlay={
                                        <img
                                        src={"Imagenes/miniaturas/" + video['miniatura']}
                                        
                                        alt=""
                                        style={{
                                            // Make the image expand to cover the video's dimensions
                                            
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "fill",
                                        }}
                                        />
                                    }
                                    loadingOverlay={
                                        <div className="loading-spinner-overlay" />
                                    }
                                />
                                {/* <video width="300" height="200">
                                    <source src={video['link']} type="video/mp4" />
                                </video> */}
                                <h2><p>{video['nombre']}</p></h2>
                            </div>   
                        ) 
                    })}

                    <div class="modal fade fondo" id="modalVideo" tabindex="-1" aria-labelledby="titulo" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered modal-lg">
                            <div class="modal-content ">
                                <div class="modal-header border-0">
                                    <h5 class="modal-title" id="titulo"></h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body ">

                                <div class="row">
                                    <div class="col-sm">
                                        <img width="280" id="miniatura" height="250" class="img-fluid" />
                                    </div>
                                    <div class="col-sm">
                                        <div class="float-left mt-5">
                                            <label id="descripcion"></label>
                                            <br/>
                                            <button class="btn btn-info" onClick={() => cerrarModal()}><Link class="btnModal" to={{ pathname: "/play", state: this.state.link }}>Reproducir</Link></button>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                <div class="modal-footer border-0">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                     {/* <div class='modal' id="modalPeliculas">
                        <button id="cerrarModal" onClick={()=>cerrarModal()}>Cerrar</button> 
                        <img></img>
                        <h5>Titulo = <label id="titulo"></label></h5>
                        <h5>Tipo = <label id="tipo"></label></h5>
                        <h5>Descripcion = <label id="descripcion"></label></h5>
                        <h5>Link = <label id="link"></label></h5>
                        <h5>Miniatura = <label id="miniatura"></label></h5>
                        <button><Link to={{ pathname: "/play", state: this.state.link }} >Reproducir</Link></button> 
                    </div> */}
                </div>
            </div>
        )
    }
}


    
 








function cerrarModal(){
    /* document.getElementById("modalPeliculas").style.display="none"; */
    $('#modalVideo').modal('hide'); 
}

      
    




