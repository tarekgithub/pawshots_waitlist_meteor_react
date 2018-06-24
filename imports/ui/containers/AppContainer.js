import React, { Component } from 'react';
import { withHistory } from 'react-router-dom';

import AddPetPage from '../pages/AddPetPage/AddPet';
import PreFooter from '../components/PreFooter/PreFooter';
import MainFooter from '../components/MainFooter/MainFooter';

export default class AppContainer extends Component {
  constructor(props){
    super(props);
    this.state = this.getMeteorData();
  }

  getMeteorData(){
    return { isAuthenticated: Meteor.userId() !== null };
  }

  loginHandler = () => {
    this.props.history.push('/login');
  }

  logoutHandler = () => {
    Meteor.logout( (err) => {
      if (err) {
        console.log("logout err: ", err.reason );
      } else {
        this.setState({isAuthenticated: false});
      }
    });
    this.props.history.push('/');
  }

  render(){
    const { isAuthenticated } = this.state;
    return (
      <div>
        <AddPetPage isAuthenticated = {isAuthenticated}/>
        {isAuthenticated ? <MainFooter onLogout={this.logoutHandler}/> : <PreFooter onLogin={this.loginHandler}/>}
      </div>
    );
  }
}
