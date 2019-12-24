import React, { Component } from "react";
import './graph.css';
export class GraphicalRepresentation extends Component {

    index = 1; // global variable
    // create arrays columns and rows
    AllSeats = [];

    /* Sockets */
    //----- max number of rows and columns of screen-------//
    rows = 10; // socket1 from db
    cols = 8;  // socket2 from db
    //------------socket 3 from db---(users seats)---------//
    reservedSeats = [{row : 1,col : 1}, {row : 1,col : 5},{row : 4,col : 4} ];


    //------ creating our matrix (grid of seats) ------//
    constructor(props) {

        super(props);

        //---------- recieved id from movie--------//
        console.log(this.props.id);
        //--------------1.intializing our Array--------------//
        for( let i = 0 ;i<this.rows;i++){
            this.AllSeats.push( new  Array(this.cols).fill('btn-primary'));
        }


        //--------------2.setting our reserved seats-------------//
        for(let i = 0; i<this.reservedSeats.length; i++){
            let resrvedRow = this.reservedSeats[i].row
            let resrvedCol = this.reservedSeats[i].col
            console.log(resrvedRow)

            console.log(resrvedCol)
            this.AllSeats[resrvedRow-1][resrvedCol-1] ='btn-danger';

            console.log(this.AllSeats)
        }

        this.state = {
            AllSeats : this.AllSeats,
            // reserved seats recieved from db
            reservedSeats : this.reservedSeats,
            Myseats : []
        }

    }
    // when user clicks a button we take his col and row info and reserve it in database
    Reserve(e, colIndex, RowIndex) {

    //1.---------------Check Clicked seat validation----------------//
        this.index = 1;
        
        //1.1---------check if reserved before-------//
        if(this.state.reservedSeats.find(seat => (seat.row === RowIndex && seat.col === colIndex))){
            alert('It is reserved select anothe seact')
            return true;
        }


        //1.2---------check if seat exists in my reservation----if yes change color to primary 
        //--------------------and delete element from reservation--------------------//
        if(  this.state.Myseats.find(seat => (seat.row === RowIndex && seat.col === colIndex))){
            console.log('alreaady exists so change color to primary');
            this.AllSeats[RowIndex-1][colIndex-1] = 'btn-primary';
            //----Note when you delete an object do this vars can not do the job :D-----//
            let indexOfSeat = this.state.Myseats.indexOf(this.state.Myseats.find(seat =>
                 (seat.row === RowIndex && seat.col === colIndex)));

            this.state.Myseats.splice(indexOfSeat,1);
            this.setState({
                AllSeats : this.AllSeats
            });
            return true;
        } else {
            //---------------- seat is new to be inserted ----------------//



            this.state.Myseats.push({col : colIndex, row : RowIndex});
            this.AllSeats[RowIndex-1][colIndex-1] = 'btn-dark';

            //--------Allow max 5 to be booked---------//
            //----We remove the first added element-------//
            if(this.state.Myseats.length > 5 ){
               let last = this.state.Myseats.splice(0,1);
                console.log('last', last);
                this.AllSeats[last[0].row-1][last[0].col-1] = 'btn-primary';
                this.setState({
                    AllSeats : this.AllSeats
                });
                console.log(this.state)
                return true;
            }
            this.setState({
                AllSeats : this.AllSeats,
                Myseats : this.state.Myseats
            });
            console.log(colIndex, RowIndex)
            console.log('MySeats', this.state.Myseats)
            return true;
        }

    }

    //-----------TODO---------//
    SubmitReservation(e){

    }


    render() {

        return (
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-6'>
                        <h4 className='badge badge-info p-2 col-md-4'>Max seats: {5 - this.state.Myseats.length}</h4>
                    </div>
                    <div className='col-md-3 mb-2'>
                    <select className='form-control'>
                        <option value='1'>date</option>
                    </select>
                    </div>

                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        <table className="table">
                            <thead></thead>
                            {/* -----convert each array element into ------- */}
                            {/* ----------map throw each element in 2d array we created--------*/}
                            <tbody>
                                {this.state.AllSeats.map((row, RowIndex) => {
                                    return (<tr key={RowIndex}>
                                        {row.map((col, ColIndex) =>
                                            // storing our seatNumber With indxes I don not understand binding
                                            <td key={ColIndex}><button onClick={(e) =>
                                                this.Reserve(e, ColIndex + 1, RowIndex + 1)}
                                                /* ------check if our seat is reserved or not----- */
                                                /* ----------TODO convert bt-danger && btn-primary into variable string */
                                                className={"btn  btn-block " + this.state.AllSeats[RowIndex][ColIndex]} 
                                                 value={this.index}>
                                                {this.index++}</button></td>
                                        )}
                                    </tr>);
                                }
                                )}
                            </tbody>

                        </table>
                        <div className='text-center mb-5'>
                            <button className='btn btn-success btn-lg' onClick={ (e) => this.SubmitReservation(e)}>Get your ticket</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
