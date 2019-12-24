import React, { Component } from "react";
//import { BrowserRouter as Router, NavLink, Route, Switch } from "react-router-dom";
import axios from 'axios';

export class SignupForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            UserName : '',
            FirstName : '',
            LastName : '',
            Password : '',
            Email : '',
            BirthDate : '',
            Type : '' // get it from response
        }
        console.log(this.props.state);
        this.RegisterUser = this.RegisterUser.bind(this);
    }

    RegisterUser(e){
        e.preventDefault();  



        // Inserting our data into database
        axios({
            method : 'post',
            url : 'http://localhost/laravelTutorial/CinemaProject/public/api/user',
            data : this.state,
            headers : {'content-type' : 'application/json'}

        }).then(data=> {
            
            console.log(data)
            this.setState(data.data)
            //1.1 TODO make an http request to our api
            console.log('sent', this.state)
            this.props.something(this.state); // updating our parent component
            this.props.history.push({
                pathname: '/IndexPage',
                data: this.state // your data array of objects
              }); 
        })
    }

    handleDataChange(ev) {
        this.setState({
            [ev.target.name] : ev.target.value
        });
    }

    render() {
        return (
                <form className="text-center p-2 col-5" method='post'   onSubmit={(e)=>this.RegisterUser(e)}>

                    <div className="text-center mb-5">
                        <h1 className="h3 mb-3 font-weight-normal">SignUp Form</h1>
                    </div>

                    <div className="form-label-group">
                        <input  onChange={(e) => this.handleDataChange(e)} type="text" name='UserName' id="inputUser" className="form-control" placeholder="User Name" required />
                    </div>

                    <div className="form-label-group  mt-4">
                        <input onChange={(e) => this.handleDataChange(e)} type="email" name='Email' id="inputEmail" className="form-control" placeholder="Email" required />
                    </div>
                    <div className="form-label-group mt-4">
                        <input onChange={(e) => this.handleDataChange(e)} type="password" name='Password' id="inputPassword" className="form-control " placeholder="Password" required />
                    </div>
                    <div className="form-label-group mt-4">
                        <input onChange={(e) => this.handleDataChange(e)} type="text" name='FirstName' id="inputFname" className="form-control" placeholder="First Name" required />
                    </div>
                    <div className="form-label-group mt-4">
                        <input onChange={(e) => this.handleDataChange(e)} type="text" name='LastName' id="inputLname" className="form-control " placeholder="Last Name" required  />
                    </div>
                    <div className="form-label-group mt-4  ">
                        <input onChange={(e) => this.handleDataChange(e)} type="date" name='BirthDate' id="inputDate" className="form-control " placeholder="Birth Date" required />
                    </div>


                    <div className=" mt-4">
                        <button  className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
                    </div>
                </form>

        );
    }
}
