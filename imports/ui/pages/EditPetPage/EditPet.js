import React, { Component } from 'react';
import './EditPet.css';
import leftArrow from '../../../resources/imgs/left.png';

class EditPet extends Component {
	constructor(props) {
		super(props);
		console.log("@@received props: ", this.props);
	}

	handleLeftArrow = (event) => {
		this.props.history.goBack();
	}

	handleChangeFirstName = (event) => {

	}

	handleChangeLastName = (event) => {

	}

	handleChangeEmail = (event) => {

	}

	handleChangePhone = (event) => {

	}

	handleDogNameChange = (idx) => (evt) => {

  }

  handleChange = () => {

  }

  handleRemoveDog = (idx) => () => {

  }

	handleAddDog = () => {

  }

  handleNoteChange = (event) => {

	}

	handleNoneClick = (event) => {

	}

	handleCardClick = (event) => {

	}

	handleCashClick = (event) => {

	}

	handleInQueueClick = (event) => {

	}

	handleScheduledClick = (event) => {

	}

	handleCompletedClick = (event) => {

	}

	handleDeletedClick = (event) => {

	}

	handleScheduledTimeChange = (event) => {

	}

	handleSaveClick = (event) => {

	}

	addSuffix(i) {
    var j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
  }

	render() {
	    return (
	      <div className="detail-div">
	      	<div className="nav-div">
		      	<img src={ leftArrow } className="nav-img" alt="leftArrow" onClick={this.handleLeftArrow} />
	      	</div>

	      	<div className="gen-input">
	      		<input className="edit-input" type="text" onChange={this.handleChangeFirstName} name="firstName" placeholder={'First Name'} />	
	    			<input className="edit-input" type="text" onChange={this.handleChangeLastName} name="lastName" placeholder={'Last Name'} />
	    			<input className="edit-input" type="email" onChange={this.handleChangeEmail} name="email" placeholder={'Email'} />
	    			<input className="edit-input" type="tel" onChange={this.handleChangePhone} name="phone" placeholder={'Phone'} />
	      	</div>
	      	{this.props.location.state.pet.dogs.map((dog, idx) => (
            <div className="dog">
              <input className="dogname-input" type="text" placeholder={`${this.addSuffix(idx+1)} Dog's Name`} value={dog.name} onChange={this.handleDogNameChange(idx)} />
              <input className="dognumber-input" type="number" onChange={this.handleChange} name="dogName" placeholder={'Number'} />
              {(idx !== 0) && <button className="small" type="button" onClick={this.handleRemoveDog(idx)}>X</button>}
            </div>
          ))}
          <button className="btn-full" type="button" onClick={this.handleAddDog}>Add Additional Photo</button>

	    		<p className="notes-title">Notes:</p>
	    		<input className="notes-val" type="text" onChange={this.handleNoteChange} name="note" placeholder={'Notes'} />

	    		<p className="payment-title">Payment Method:</p>
	    		<div className="payment-btns">
	    			<button className="none-btn" type="button" onClick={this.handleNoneClick}>None</button>
	    			<button className="card-btn" type="button" onClick={this.handleCardClick}>Card</button>
	    			<button className="cash-btn" type="button" onClick={this.handleCashClick}>Cash</button>
	    		</div>

	    		<p className="total-title">Total: $30</p>

	    		<p className="status-title">Client Status:</p>
	    		<div className="status-btns">
	    			<button className="status-btn" type="button" onClick={this.handleInQueueClick}>In Queue</button>
	    			<button className="scheduled-status-btn" type="button" onClick={this.handleScheduledClick}>Scheduled</button>
	    			<button className="status-btn" type="button" onClick={this.handleCompletedClick}>Completed</button>
	    			<button className="status-btn" type="button" onClick={this.handleDeletedClick}>Deleted</button>
	    		</div>

	    		<p className="">Scheduled Time:</p>
	    		<input className="scheduledtime-input" type="text" onChange={this.handleScheduledTimeChange} />
	    		<button className="last-save-btn" type="button" onClick="this.handleSaveClick">Save</button>
	      </div>
	    );
	}
}

export default EditPet;