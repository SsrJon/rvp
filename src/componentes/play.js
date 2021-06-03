import React, { Component } from 'react';
import 'video-react/dist/video-react.css';
import { Player, ControlBar, PlaybackRateMenuButton, ClosedCaptionButton, LoadingSpinner } from 'video-react';

export default class Play extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.location.state); 
        if(this.props.location.state){
            localStorage.setItem('playVideo', JSON.stringify(this.props.location.state));
        }
    }

    render() {
        return(  
        <div id="play">
            <Player fluid  autoPlay>
                <source src={"Videos/"+JSON.parse(localStorage.getItem('playVideo'))} />
                <LoadingSpinner />
                {/* Subtitulos, opcional */}
                {/* <track
                    kind="captions"
                    src=""
                    srcLang="es"
                    label="Spanish"
                    default
                />
                <track
                    kind="captions"
                    src=""
                    srcLang="en"
                    label="English"
                /> */}
                <ControlBar>
                    <PlaybackRateMenuButton rates={[2, 1.5, 1, 0.75, 0.5, 0.25]} order={8} />
                    <ClosedCaptionButton order={7} />
                </ControlBar>
            </Player>
        </div>
        )
    }


}