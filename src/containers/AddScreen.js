import React, { Component } from "react";
import axios from 'axios';



export class AddScreen extends Component {
    Screens = [];
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            MaxCol: '',
            MaxRow: '',
            Screens: this.Screens
        }

        //---------- Displaying added screens----------//
        console.log('fired our component')
        axios({
            method: 'get',
            url: 'http://localhost/laravelTutorial/CinemaProject/public/api/screen',
        }).then(res => {
            this.Screens = res.data;
            this.setState({
                id: '',
                MaxCol: '',
                MaxRow: '',
                Screens: this.Screens
            });
            console.log(this.state, 'setted state');
        });
      
    }

    //-----------------TODO-------------//
    AddingScreen(e) {
        e.preventDefault();

        axios({
            method: 'post',
            url: 'http://localhost/laravelTutorial/CinemaProject/public/api/screen',
            data: {
                id : this.state.id,
                MaxCol : this.state.MaxCol,
                MaxRow : this.state.MaxRow
            }
        }).then(res => {
            this.Screens.push(res.data)
            this.setState({
                id : '',
                MaxCol : '',
                MaxRow : ''
            })
            console.log(res.data)
        })
    }


    handleDataChange(ev) {
        this.setState({
            [ev.target.name]: ev.target.value
        });
    }

    render() {
        return (
            <React.Fragment>
                <form className="text-center p-5  vertical-center" onSubmit={(e) => this.AddingScreen(e)}>

                    <div className="text-center mb-4">
                        <h1 className="h3 mb-5 font-weight-normal">Add A Screen</h1>
                    </div>
                    <div className='container'>
                        <div className='row'>
                            {/* ------------movie name && movie description------------------ */}
                            <div className="form-label-group col-md-12 d-flex justify-content-center mt-5">
                                <input onChange={(e) => this.handleDataChange(e)} name='id' type="number"  className="form-control col-md-5 " placeholder="Screen Number" required />
                            </div>
                            <div className="form-label-group  mt-3  col-md-12 d-flex justify-content-center">
                                <input onChange={(e) => this.handleDataChange(e)} name='MaxCol' type="number"  className="form-control col-md-5" placeholder="Screen colums" required />
                            </div>
                            <div className="form-label-group mt-3  col-md-12 d-flex justify-content-center">
                                <input onChange={(e) => this.handleDataChange(e)} name='MaxRow' type="number"  className="form-control col-md-5" placeholder="Screen rows" required />
                            </div>
                        </div>
                    </div>

                    {/* -------3-------submit button-------------------- */}
                    <div className="d-flex mt-3 justify-content-center">
                        <button className="btn btn-lg btn-primary btn-block col-md-2 mt-2" type="submit"><i className='fa fa-plus-square'></i> Add</button>
                    </div>

                </form>

                {/* -------------------------Table of our screens-------------------- */}
                <table className="table container  table-striped table-bordered" style={{ width: 900 + 'px' }}>
                    <thead>
                        <tr>
                            <th scope="col">Number</th>
                            <th scope="col">cols</th>
                            <th scope="col">rows</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.Screens.map((screen) => {
                            return (
                                <tr key={screen.id}>
                                    <th scope="row">{screen.id}</th>
                                    <td>{screen.MaxCol}</td>
                                    <td>{screen.MaxRow}</td>
                                </tr>
                            );
                        })}


                    </tbody>
                </table>
            </React.Fragment>



        );
    }
}
