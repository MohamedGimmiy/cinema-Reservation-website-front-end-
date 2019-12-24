import React, { Component } from "react";
import { MovieInfo } from '../containers/MovieInfo';
import {GraphicalRepresentation} from '../containers/graphicalRepresentation';
export class MovieReservation extends Component {

    //-----------------TODO-------use window object (userData)------//
    UserData;
    constructor(props){
        super(props);
        // receiving id of our Movie
        console.log( this.props.match.params);

        try{
            this.UserData = JSON.parse(localStorage.getItem('UserData'));
        }
        catch(e){
            // do nothing
        }
         console.log('User Data is',this.UserData);
    }
    render() {
        return (
            <React.Fragment>
                <MovieInfo id={this.props.match.params}/>
                {this?.UserData?.Type===1 && <GraphicalRepresentation id={this.props.match.params}/> }      
            </React.Fragment>
        );
    }
}
