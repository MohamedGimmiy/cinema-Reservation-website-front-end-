import React, { Component } from "react";
import axios from 'axios';

export class AddMovie extends Component {

    // setting our variables fields
    //1. 
    Screens = [];
    constructor(props) {
        super(props);
        this.state = {
            MovieName: '',
            image: 'My image',
            description: '',
            Gere: '',
            Length: '',
            MovieShowDate0: '',
            screen_id: '',
            Screens: this.Screens,
            //1. array of added buttons numbers
        }

        axios({
            method: 'get',
            url: 'http://localhost/laravelTutorial/CinemaProject/public/api/screen',
            headers: { 'content-type': 'application/json' }
        }).then(screen => {
            console.log('getting all screens', screen.data)
            this.Screens = [...screen.data];
            this.setState({
                MovieName: this.state.MovieName,
                image: this.state.image,
                description: this.state.description,
                Gere: this.state.Gere,
                Length: this.state.Length,
                MovieShowDate0: this.state.MovieShowDate0,
                screen_id: this.state.screen_id,
                Screens: this.Screens,
            });
        });




    }


    //-----------------TODO-------------//
    /*     addDatesButtons(e) {
            // add a new element to our array
            //alert(this.buttonsNumber)
            let len = this.state.items.push(this.buttonsNumber);
            this.buttonsNumber++;
        } */
    /*     removeDateButton(ev,index) {
            this.state.items.splice(index,1);
            this.myArray.splice(index,1);
            this.buttonsNumber--;
        } */
    /*     uploadImage() {
    
        } */

    AddingMovie(e) {
        e.preventDefault();
        console.log(this.state)
        axios({
            method: 'post',
            url: 'http://localhost/laravelTutorial/CinemaProject/public/api/movie',
            data:{
                MovieName: this.state.MovieName,
                image: this.state.image,
                description: this.state.description,
                Gere: this.state.Gere,
                Length: this.state.Length,
                MovieShowDate0: this.state.MovieShowDate0,
                screen_id: this.state.screen_id
            },
            headers: { 'content-type': 'application/json' }
        }).then(() => {
            alert('successfully added');
        }).catch(err => {
            alert('error adding your movie');
        })
    }
    handleDataChange(ev) {
        this.setState({
            [ev.target.name]: ev.target.value,
            Screens: this.Screens
        });
    }
    render() {
        return (
            <form className="text-center p-2  vertical-center" onSubmit={(e) => this.AddingMovie(e)}>

                <div className="text-center mb-4">
                    <h1 className="h3 mb-3 font-weight-normal">Add A Movie</h1>
                </div>
                <div className='row'>
                    {/* --------1-----------Movie Image && upload button------------- */}
                    <div className='col-md-4'>
                        <div className='col-md-12'>
                            <img name='image' className='col-md-12' height={400} src='https://via.placeholder.com/200X400' alt='Movie' />
                            {/* ------TODO---uploading an image-- */}
                            <button onClick={this.uploadImage} className='mt-3 mb-2 btn btn-success col-md-9'><i className="fa fa-upload"></i> Upload pictire</button>
                        </div>
                    </div>
                    {/* ---------2----------Movie information------------------------ */}
                    <div className='col-md-8'>
                        {/* ------------movie name && movie description------------------ */}
                        <div className="form-label-group d-flex ">
                            <input onChange={(e) => this.handleDataChange(e)} type="text" name="MovieName" className="form-control col-md-8" placeholder="Movie Name" required />
                        </div>
                        <div className="form-label-group d-flex mt-4 ">
                            <textarea onChange={(e) => this.handleDataChange(e)} name='description' style={{ overflow: 'hidden' }} className='form-control rounded-5 col-md-8' placeholder={'Movie description'} rows={5} cols={20} required></textarea>
                        </div>
                        {/* -----------------------choose movie gere--------------------- */}
                        <div className="form-label-group mt-4 d-flex ">
                            <select onChange={(e) => this.handleDataChange(e)} name='Gere' className='form-control col-md-8' defaultValue={'DEFAULT'}>
                                <option value='DEFAULT' disabled >Choose Movie Gere</option>
                                <option value='Fantasy' >Fantasy</option>
                                <option value='Horor' >Horor</option>
                                <option value='Action' >Action</option>
                                <option value='Adventure' >Adventure</option>
                                <option value='Comedy' >Comedy</option>
                                <option value='Crime' >Crime</option>
                                <option value='Drama' >Drama</option>
                                <option value='Historical' >Historical</option>
                            </select>
                        </div>
                        <div className="form-label-group mt-4 d-flex ">
                            <input onChange={(e) => this.handleDataChange(e)} type="time" name='Length' id="inputEmail" className="form-control col-md-8" placeholder="Movie Length" required />
                        </div>
                        {/* --------------Choose movie screen---------------- */}
                        <div className="form-label-group mt-4 d-flex ">
                            <select name='screen_id' onChange={(e) => this.handleDataChange(e)} className='form-control col-md-8' defaultValue={'DEFAULT'} required>
                                <option value="DEFAULT" disabled  >Choose Movie Screen</option>
                                {this.state.Screens.map((screen, index) => {
                                    console.log(screen)
                                    return (
                                        <option key={index} value={screen.id} >{index + 1}</option>
                                    );
                                })}
                            </select>
                        </div>
                        {/* ------------movie date with adding button--------------- */}
                        <div className="form-label-group mt-4 d-flex ">
                            <input onChange={(e) => this.handleDataChange(e)} type="date" id="date0" name='MovieShowDate0' className="form-control col-md-8" placeholder="Movie date" required />
                            {/*                             <button onClick={(e) => this.addDatesButtons(e)} className='btn btn-success col-md-1 ml-2'><i className='fa fa-plus'></i></button>
 */}                        </div>
                        {/* -------TODO adding dynamic dates fields------------ */}
                        {/*                         {this.state.items.map((ele,index) => {
                            return (
                                <div key={index+1} className="form-label-group mt-4 d-flex ">
                                    <input  onChange={(e) => this.handleDataChange(e)} type="date" name={'MovieShowDate' + index+1 } id="inputEmail" className="form-control col-md-8" placeholder="Movie date" required />
                                    <button onClick={(e) => this.removeDateButton(e,index)} className='btn btn-danger col-md-1 ml-2'><i className='fa fa-minus'></i></button>
                                </div>
                            );
                        })} */}
                        {/* -----------------end of TODO---------------------- */}
                    </div>
                </div>
                {/* -------3-------submit button-------------------- */}
                <div className="d-flex mt-3 justify-content-center">
                    <button className="btn btn-lg btn-primary btn-block col-md-2 mt-2" type="submit"><i className='fa fa-plus-square'></i> Add</button>
                </div>

            </form>
        );
    }
}
