import React, { Component } from 'react';
import { Pets } from "../../../api/pets/index";
import { Counts } from 'meteor/tmeasday:publish-counts';
// import FormValidator from '../ValidatorPage/FormValidator';
import logo from './logo.svg';
import './AddPet.css';

import Alert from 'react-s-alert';

class AddPet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      created: '',
      owner: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      },
      dogs: [{ dogName: '' }],
      note: '',
      paymentStatus : {
        noneStatus: true,
        cardStatus: false,
        cashStatus: false
      },
      dogsNum: [{ dogNum: 0 }],
      clientStatus : {
        inQueue: true,
        scheduled: false,
        completed: false,
        deleted: false
      },
      scheduledTime: ''
    };
    this.submitted = false;
  }

  handleChange = (event) => {
    const field = event.target.name;
    let { owner } = this.state;
    owner = {
      ...owner,
      [field]: event.target.value,
    }
    this.setState({owner});
  }

  handleDogNameChange = (idx) => (evt) => {
    const newDogs = this.state.dogs.map((dog, sidx) => {
      if (idx !== sidx) return dog;
      return { ...dog, dogName: evt.target.value };
    });
    this.setState({ dogs: newDogs });
  }

  handleAddDog = () => {
    this.setState({
      dogs: this.state.dogs.concat([{ dogName: '' }]),
      dogsNum: this.state.dogsNum.concat([{ dogNum: 0 }])
    });
  }

  handleRemoveDog = (idx) => () => {
    this.setState({
      dogs: this.state.dogs.filter((s, sidx) => idx !== sidx),
      dogsNum: this.state.dogsNum.filter((s, sidx) => idx !== sidx)
    });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.setState({
      status: 'started',
      created: Date.now()
    }, () => {
      Pets.insert(this.state);

      // clears input fields onSubmit
      this.setState({
        status: '',
        created: '',
        owner: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        },
        dogs: [{ dogName: '' }],
        note: '',
        paymentStatus : {
          noneStatus: true,
          cardStatus: false,
          cashStatus: false
        },
        dogsNum: [{ dogNum: 0 }],
        clientStatus : {
          inQueue: true,
          scheduled: false,
          completed: false,
          deleted: false
        },
        scheduledTime: ''
      });
    });

    Alert.success('<h2>Successful submit.</h2>', {
      position: 'top',
      effect: 'bouncyflip',
      onShow: function () {
        console.log('aye!')
      },
      beep: false,
      timeout: 5000,
      html: true
    });
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
      <div className="form">
        <header className="form-header">
          <img src={logo} className="form-logo" alt="logo" />
          <h3 className="form-title">Waitlist</h3>
        </header>

        <form className="input-form" onSubmit={this.handleSubmit}>

          <input className="input-full form-control" type="text" onChange={this.handleChange} value={this.state.firstName} name="firstName" placeholder={'First Name'} />
          
          <input className="input-full form-control" type="text" onChange={this.handleChange} value={this.state.lastName} name="lastName" placeholder={'Last Name'} />
          
          <input className="input-full form-control" type="email" onChange={this.handleChange} value={this.state.email} name="email" placeholder={'Email'} />
          
          <input className="input-full form-control" type="tel" onChange={this.handleChange} value={this.state.phone} name="phone" placeholder={'Phone'} />
          
          {this.state.dogs.map((dog, idx) => (
            <div className="dog" key={`dogs-${idx.toString()}`}>
              <input className="input-full" type="text" placeholder={`${this.addSuffix(idx+1)} Dog's Name`} value={dog.name} onChange={this.handleDogNameChange(idx)} />

              {(idx !== 0) && <button className="small" type="button" onClick={this.handleRemoveDog(idx)}>X</button>}
            </div>
          ))}
          <button className="btn-full" type="button" onClick={this.handleAddDog}>Add Additional Photo</button>

          <button className="btn-submit" type="submit">Submit (Total is ${ this.state.dogs.length * 10 })</button>
        </form>
      </div>
    );
  }
}

export default AddPet;
