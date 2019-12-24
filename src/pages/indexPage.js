import React, { Component } from "react";
import { CarouselComponent } from '../containers/carosul';
import {DisplayMovies} from '../containers/displayMovies';
export class Index extends Component {

    //-----------------TODO-------------//
    Data;
    constructor(props){
        super(props);
        // Recieved data from login and signup page
        console.log('user data in index page',this.props.location.data);
        this.Data = this.props.location.data;

        // persisting data in local storage
        localStorage.setItem('UserData',JSON.stringify(this.Data));
    }
    render() {
        return (
            <React.Fragment>
                <CarouselComponent />
                <DisplayMovies user={this.Data} />
            </React.Fragment>

        );
    }
}
