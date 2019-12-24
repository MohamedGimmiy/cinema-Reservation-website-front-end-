import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect,NavLink } from "react-router-dom";
import { LoginForm } from '../containers/login';
import { SignupForm } from '../containers/SignUp';
import { AdminDashboard } from '../containers/Admin';
import { Index } from './indexPage';
import { MovieReservation } from './MovieReservationPage';


export class PageOFpages extends Component {
    //-----------------TODO-----------------//
    constructor(props) {

        super(props);
        this.state = {
            UserData : {}
        }
        this.handleStateChange = this.handleStateChange.bind(this);
    }

    handleStateChange(value) {
        console.log('fired', value);
        this.setState({ UserData : value });
    }


    render() {

        return <Router>
            <div className={this.state.UserData.Type===2? '' : 'container'}>
                {/* ----------Router UI Links----------- */}
                {this.state.UserData.Type != 2 && <div className="row">
                    <div className="col-md-12 bg-dark mb-3">
                        <NavLink className='btn btn-primary block m-2' to="/IndexPage">Home</NavLink>
                        {/* if user if register or logged in hide login and signUp and display his name */}
                        <div className='float-right text-white'>{this.state.UserData.UserName && <h2>Welcome {this.state.UserData.UserName}</h2>}</div>

                        {!this.state.UserData.UserName && <div className='float-right'>
                            <NavLink  className='btn btn-info block m-2' to="/LoginForm" >Login</NavLink>
                            <NavLink className='btn btn-info block m-2 ' to="/SignupForm" >SignUp</NavLink>
                        </div>}
                    </div>
                </div>}
                {/* -----------Router navigation---------- */}
                <div className='row d-flex justify-content-center'>
                    <Switch>
                        {/* ------------------1.Customers and Guests------------------- */}
                        <Route path="/IndexPage" exact component={Index} />
                        <Route path="/LoginForm" exact render={ props => <LoginForm {...props} something={this.handleStateChange} />} />
                        <Route path="/SignupForm" exact render={ props => <SignupForm {...props} something={this.handleStateChange} />} />
                        <Route path="/IndexPage/MovieReservation/:id" exact={true} component={MovieReservation} />
                        {/* ------------------2.Admin Routers-------------------------- */}
                        <Route path="/AdminPage" exact={true} component={AdminDashboard} />

                        <Redirect from='/' to='/IndexPage' /> 
                    </Switch>
                </div>
            </div>
        </Router>
    }
}
