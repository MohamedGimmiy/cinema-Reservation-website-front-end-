import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, NavLink } from "react-router-dom";
import { AddScreen } from '../containers/AddScreen';
import './Admin.css';
import { DisplayMovies } from "./displayMovies";
export class AdminDashboard extends Component {

    Data;
    constructor(props) {
        super(props);
        this.state = {
            selector: 1
        }

        this.Data = this.props.location.data;

    }

    SwitchComponents(selector) {

        this.setState({
            selector: selector
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <aside className="col-2  px-0 fixed-top" id="left">
                        <div className="list-group w-100">
                            <NavLink to='#' className=" bg-light text-dark list-group-item active pt-5 pb-5 text-center">UserAdmin</NavLink>
                            <button onClick={(e) => this.SwitchComponents(1)} className="bg-info list-group-item text-center pt-4 pb-4">My Profile</button>
                            <button onClick={(e) => this.SwitchComponents(2)} className="bg-dark text-white list-group-item text-center pt-4 pb-4">Movies</button>
                            <button onClick={(e) => this.SwitchComponents(3)} className="text-white bg-success list-group-item text-center pt-4 pb-4">Screens</button>
                            <NavLink to='/' className=" bg-danger text-white list-group-item text-center pt-4 pb-4">LogOut</NavLink>
                        </div>
                    </aside>
                    <main className="col-10 invisible">
                    </main>
                    <main className="col offset-2 h-100">
                        <div className="row bg-dark">
                            <div className="col-12 py-4 text-white text-center">
                                Admin DashBoard
                            </div>
                        </div>

                        {/* ---------start------- Show Admin Capabilities -------------- */}

                        {this.state.selector === 1 &&
                            <div className="row bg-white">
                                <div className="col-12 py-4">

                                    <p>Admin (profile info) here (database querying)</p>

                                </div>
                            </div>}

                        {this.state.selector === 2 && <DisplayMovies user={this.Data} />}

                        {this.state.selector === 3 && <AddScreen />}

                        {/* ---------end------- Show Admin Capabilities -------------- */}


                    </main>
                </div>
            </div>


        );
    }
}
