import React, { Component } from "react";
import axios from 'axios';


export class LoginForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            UserName : '',
            FirstName : '',
            LastName : '',
            Password : '',
            Email : '',
            BirthDate : '',
            Type : ''
            }

        this.login = this.login.bind(this);

    }

    login(e){
        e.preventDefault();  


        axios({
            method : 'post',
            url : 'http://localhost/laravelTutorial/CinemaProject/public/api/userLogin',
            data : this.state,
            headers : {'cotent-type': 'application/json'}
        }).then(res=>{
            
            this.setState(res.data[0])
            this.props.something(this.state); // updating our parent component

            if(this.state.Type === 2) {
                console.log('admin logged in', this.state.UserName)
                this.props.history.push({
                    pathname: '/AdminPage',
                    data: this.state // your data array of objects
                  });
            } else {
                console.log('user logged in', this.state.UserName)
                this.props.history.push({
                    pathname: '/IndexPage',
                    data: this.state // your data array of objects
                  });
            }
        })


        //-------- send our login request -------------//

        //--------Admin----------//
        

    }

    handleDataChange(ev) {
        this.setState({
            [ev.target.name] : ev.target.value
        });
    }


    render() {
        return (
            <form className="text-center p-5 col-5" method='post'   onSubmit={(e)=>this.login(e)}>
                
                <div className="text-center mb-4">
                    <h1 className="h3 mb-3 font-weight-normal">Login Form</h1>
                </div>

                <div className="form-label-group mt-4">
                    <input onChange={(e) => this.handleDataChange(e)} name='UserName' type="text" id="inputEmail" className="form-control " placeholder="User Name" required  />
                </div>

                <div className="form-label-group mt-4">
                    <input onChange={(e) => this.handleDataChange(e)} name='Password' type="password" id="inputPassword" className="form-control " placeholder="Password" required />
                </div>
                <div className="mt-4">
                    <button className="btn btn-lg btn-primary btn-block " type="submit">Sign in</button>
                </div>

            </form>


        );
    }
}
