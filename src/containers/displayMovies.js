import React, { Component } from "react";
import { BrowserRouter as Router, NavLink, Route, Switch } from "react-router-dom";
import axios from 'axios';

//---------------- react components---------------//
import { AddMovie } from '../containers/AddMovie';
import { MovieInfo } from '../containers/MovieInfo';
//import Shave from 'react-shave';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from '../images/1.jpg';
import img2 from '../images/2.jpg';
import img3 from '../images/3.jpg';
let MoviesInfo = [{
    id: 1,
    MovieName: 'The Witcher1',
    image: img1,
    description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    Gere : 'fantasy',
    Length : '1:30:30'
},
{
    id: 2,
    MovieName: 'The Witcher2',
    image: img2,
    description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    Gere : 'fantasy',
    Length : '1:30:30'
},
{
    id: 3,
    MovieName: 'The Witcher3',
    image: img3,
    description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    Gere : 'fantasy',
    Length : '1:30:30'
},
{
    id: 4,
    MovieName: 'The Witcher4',
    image: img1,
    description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    Gere : 'fantasy',
    Length : '1:30:30'
},
{
    id: 5,
    MovieName: 'The Witcher5',
    image: img2,
    description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    Gere : 'fantasy',
    Length : '1:30:30'
},
{
    id: 6,
    MovieName: 'The Witcher6',
    image: img3,
    description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    Gere : 'fantasy',
    Length : '1:30:30'
}]
export class DisplayMovies extends Component {
    UserData;
    id;
    constructor(props) {
        super(props);

        this.state = {
            MovieList: [],
            selector: 1
        }

        //-------- Getting movies from database ------------//
        axios({
            method: 'get',
            url: 'http://localhost/laravelTutorial/CinemaProject/public/api/movie',
            headers: { 'content-type': 'application/json' }
        }).then(movies => {
            console.log('recieved movies', movies.data)
            this.id = movies.data[0].id
            this.setState({
                MovieList : movies.data,
                selector : 1
            });
        })



        this.UserData = this.props.user;
        console.log('User data:', this.UserData)
    }

    SwitchComponents(selector) {

        this.setState({
            MovieList: MoviesInfo,
            selector: selector
        })
    }


    render() {
        return (
            <div className="container" id='root'>
                {/* -------Display badge if it is a guest or a customer else hide---------- */}
                {!(this.UserData?.Type === 2) && <h2 className='badge badge-success p-3'>New Movies</h2>}
                {/* ---------------- display add button if it is an admin----------------- */}
                {(this.UserData?.Type === 2) &&
                    <div className='row'>
                        <div className='col-12 text-right'>
                            <button onClick={(e) => this.SwitchComponents(2)} className='btn btn-success mt-5'> <i className='fa fa-plus'></i> Add </button>
                        </div>
                    </div>
                }
                {/* (1).------------------------- Display our movies cards component------------------------- */}
                {(this.state.selector === 1) && <div className='row'>
                    {/* ---------------------Movie card start------------------------------------------------ */}
                    {this.state.MovieList.map((movie, index) => {
                        return (
                            <div key={index} className='col-md-4 mt-5 col-sm-12'>
                                <div className="card">
                                    <img src={img3} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h3 className='text-center'>{movie.MovieName}</h3>
                                        <p className="card-text">{movie.description}</p>
                                    </div>

                                    <div className='text-center p-2'>
                                        {!(this.UserData?.Type === 2) && <NavLink activeClassName="active" to={'/IndexPage/MovieReservation/' + movie.id}
                                            className={!(this.UserData?.Type === 2) ? 'btn btn-info mt-1 mr-2 btn-block' : ' btn btn-info mt-1 mr-2'}>
                                            <i className="fa fa-search"></i>View</NavLink>}
                                        {(this.UserData?.Type === 2) && <button onClick={(e) => { this.SwitchComponents(3) }} className="btn btn-primary  mt-1 mr-2"><i className="fa fa-search"></i>View</button>}
                                        {(this.UserData?.Type === 2) && <button onClick={(e) => { this.SwitchComponents(2) }} className="btn btn-primary  mt-1 mr-2"><i className="fa fa-edit"></i>Edit</button>}
                                        {(this.UserData?.Type === 2) && <button className="btn btn-danger mt-1"><i className="fa fa-trash"></i> Delete</button>}
                                    </div>

                                </div>
                            </div>


                        );

                    })}
                    {/* ---------------------Movie card end------------------------------------------------- */}
                </div>}
                {/* 2.--------------------------Add Movie Component---------------------------------- */}
                {(this.state.selector == 2) && <AddMovie />}
                {/* 2.--------------------------Add Movie Component---------------------------------- */}
                {(this.state.selector == 3) && <MovieInfo id={{id : this.id}}/>}

                <p className='text-center mt-5'>All copy rights are reserved to Mohamed Jamal Hussin 2020</p>
            </div>
        );
    }
};
