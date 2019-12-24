import React, { Component } from "react";
import queryString from 'query-string';
import axios from 'axios';
import img3 from '../images/3.jpg';

export class MovieInfo extends Component {


    buttonsNumber = 1;

    constructor(props) {
        super(props);
        this.state = {
            movie: ''
        }
        //TODO fetch data from db of our movie
        console.log(this.props.id);

        // getting movie info my movieId
        axios({
            method : 'get',
            url : `http://localhost/laravelTutorial/CinemaProject/public/api/movie/${this.props.id.id}`,
            headers : {'content-type' : 'application/json'}
        }).then(movieData=>{
            this.setState({
                movie : movieData.data
            });
        });


    }


    //-----------------TODO-------------//
    addDatesButtons(e) {
        // add a new element to our array
        //alert(this.buttonsNumber)
        this.myArray.push(this.buttonsNumber);
        this.setState({
            items: this.myArray
        });
        this.buttonsNumber++;
    }
    removeDateButton(e, index) {
        this.myArray.splice(index, 1);
        this.setState({
            items: this.myArray
        });
        this.buttonsNumber--;
    }
    uploadImage() {

    }

    AddingMovie() {

    }

    render() {
        return (
            <div className=" p-5  vertical-center" onSubmit={this.AddingMovie}>
                <div className='row'>

                    {/* --------1-----------Movie Image && upload button------------- */}
                    <div className='col-md-4'>
                    {/*<img className='col-md-10' height={400} src='https://via.placeholder.com/200X400' alt='Movie' />*/}                    
                        <img className='col-md-10' height={400} src={img3} alt='Movie' />
                    </div>


                    {/* ---------2----------Movie information------------------------ */}
                    <div className='col-md-4'>
                        {/* ------------movie name && movie description------------------ */}
                        <div className='ml-2'>
                            <h1 id="inputEmail" >{this.state.movie.MovieName}</h1>
                            <h3 className='mt-4'>{this.state.movie.Gere} </h3>
                            {/* -----------------------choose movie gere--------------------- */}
                            <div className="row mt-4">
                                <div className="col-md-12 col-sm-8">
                                <p>{this.state.movie.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-4 text-center'>
                        <h5 className=' mb-4'>Recommended movies</h5>
                        <div className='row d-flex justify-content-center'>
                                <img className='col-md-5 btn' height={140} width={200} src='https://via.placeholder.com/200X400' alt='Movie' />
                                <img className='col-md-5 btn' height={140} width={200} src='https://via.placeholder.com/200X400' alt='Movie' />
                        </div>
                        <div className='row d-flex justify-content-center mt-2'>
                                <img className='col-md-5 btn' height={140} width={200} src='https://via.placeholder.com/200X400' alt='Movie' />
                                <img className='col-md-5 btn' height={140} width={200} src='https://via.placeholder.com/200X400' alt='Movie' />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
