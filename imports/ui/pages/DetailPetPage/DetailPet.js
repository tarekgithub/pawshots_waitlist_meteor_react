import React, { Component } from 'react';
import './DetailPet.css';
import leftArrow from '../../../resources/imgs/left.png';
import rightArrow from '../../../resources/imgs/right.png';

class DetailPet extends Component {
	constructor(props) {
		super(props);
		console.log("received props: ", this.props);
	}

	handleChange = (event) => {
		console.log("event: ", event);
	}

	handleNoteChange = (event) => {

	}

	handleNone = (event) => {

	}

	handleCard = (event) => {
		
	}

	handleCash = (event) => {
		
	}

	handleSave = (event) => {
		
	}

	handleDone = (event) => {

	}

	handleLeftArrow = () => {
		console.log("leftArrow click");
		this.props.history.goBack();
	}

	handleRightArrow = () => {
		console.log("rightArrow click + pet props: ", this.props.location.state.pet);
		this.props.history.push({
      pathname: '/editpet',
      state: {pet: this.props.location.state.pet}
    });
	}

	render() {
    return (
      <div className="detail-div">
      	<div className="nav-div">
	      	<img src={ leftArrow } className="nav-img" alt="leftArrow" onClick={this.handleLeftArrow} />
	      	<img src={ rightArrow } className="nav-img" alt="rightArrow" onClick={this.handleRightArrow} />
      	</div>
      	<div className="gen-info">
      		<ul className="detail-ul">
			  	<li className="detail-li">Name:</li>
			  	<li className="detail-li">Phone:</li>
			  	<li className="detail-li">Email:</li>
			</ul>
			<ul className="detail-num-ul">
			  	<li className="detail-li">{this.props.location.state.pet.firstName} {this.props.location.state.pet.lastName}</li>
			  	<li className="detail-li">{this.props.location.state.pet.phone}</li>
			  	<li className="detail-li">{this.props.location.state.pet.email}</li>
			</ul>
      	</div>
      	<p className="dog-names"> Dog's Names: </p>
      	{this.props.location.state.pet.dogs.map((dog, idx) => (
      		<div className="dog-name-div">
      			<p className="dog-name-title">{idx+1}. {dog.dogName}</p>
      			<input className="dog-name-num" type="number" onChange={this.handleChange} name="dogName" placeholder={'Number'} />
    			</div>
    		))}
    		<p className="notes-title">Notes:</p>
    		<input className="notes-val" type="text" onChange={this.handleNoteChange} name="note" placeholder={'Notes'} />
    		<p className="payment-title">Payment Method:</p>
    		<div className="payment-btns">
    			<button className="none-btn" type="button" onClick={this.handleNone}>None</button>
    			<button className="card-btn" type="button" onClick={this.handleCard}>Card</button>
    			<button className="cash-btn" type="button" onClick={this.handleCash}>Cash</button>
    		</div>
    		<p className="total-title">Total: $30</p>
    		<div className="total-btns">
    			<button className="save-btn" type="button" onClick={this.handleSave}>Save</button>
    			<button className="done-btn" type="button" onClick={this.handleDone}>Done</button>
    		</div>
      </div>
    );
	}
}

export default DetailPet;