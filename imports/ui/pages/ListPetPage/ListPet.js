import React, { Component } from 'react';
import MainFooter from '../../components/MainFooter/MainFooter';

import { withTracker } from 'meteor/react-meteor-data';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { Pets } from "../../../api/pets/index";
import DogList from "../../components/DogList/DogList";
import './ListPet.css';

import DetailPet from "../DetailPetPage/DetailPet";

class ListPet extends Component {
  constructor(props) {
    super(props);
    this.state = { tabIndex: 0 };
  }

  onClickHandler(pet) {
    console.log('selected pet info ==>', pet);
    this.props.history.push({
      pathname: `/listpet/${pet._id}`,
      state: { pet: pet }
    });
  }

  logoutHandler = () => {
    Meteor.logout( (err) => {
      if (err) {
      } else {
        this.setState({isAuthenticated: false});
      }
    });
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
          <TabList>
            <Tab >Current</Tab>
            <Tab>Completed</Tab>
            <Tab>Scheduled</Tab>
            <Tab>Deleted</Tab>
          </TabList> 
          <TabPanel>
            <div className="list-div">
              {this.props.scheduledPets.length ? <p>Scheduled Queue: </p> : <div/>}
              {this.props.scheduledPets.length ? this.props.scheduledPets.map((pet, idx) => (
                <div className="list-group" key={`dogs-${idx.toString()}`}>
                  <div className="list-group-item list-group-item-action flex-column align-items-start" onClick={() => this.onClickHandler(pet)}>
                    <div className="d-flex w-100 justify-content-between">
                      <div layout="row" layout-align="space-between">
                        <div layout="row">
                          <h4 className="mb-1">{pet.owner.firstName} {pet.owner.lastName}</h4>
                        </div>
                      </div>
                      <DogList pet={pet} />
                    </div>
                    <h4 className="mb-1">
                      {pet.scheduledTime}
                    </h4>
                  </div>
                </div>
              )) : <div className="no-events"></div>}
              {this.props.inQueuePets.length ? <p>Normal Queue: </p> : <div/>}
              {this.props.inQueuePets.length ? this.props.inQueuePets.map((pet, idx) => (
                <div className="list-group" key={`dogs-${idx.toString()}`}>
                  <div className="list-group-item list-group-item-action flex-column align-items-start" onClick={() => this.onClickHandler(pet)}>
                    <div className="d-flex w-100 justify-content-between">
                      <div layout="row" layout-align="space-between">
                        <div layout="row">
                          <h4 className="mb-1">{pet.owner.firstName} {pet.owner.lastName}</h4>
                        </div>
                      </div>
                      <DogList pet={pet} />
                    </div>
                  </div>
                </div>
              )) : <div className="no-events"></div>}
            </div>  
          </TabPanel>
          <TabPanel>
            {this.props.completedPets.length ? this.props.completedPets.map((pet, idx) => (
                <div className="list-group" key={`dogs-${idx.toString()}`}>
                  <div className="list-group-item list-group-item-action flex-column align-items-start" onClick={() => this.onClickHandler(pet)}>
                    <div className="d-flex w-100 justify-content-between">
                      <div layout="row" layout-align="space-between">
                        <div layout="row">
                          <h4 className="mb-1">{pet.owner.firstName} {pet.owner.lastName}</h4>
                        </div>
                      </div>
                      <DogList pet={pet} />
                    </div>
                  </div>
                </div>
              )) : <div className="no-events"></div>}
          </TabPanel>
          <TabPanel>
            {this.props.scheduledPets.length ? this.props.scheduledPets.map((pet, idx) => (
                <div className="list-group" key={`dogs-${idx.toString()}`}>
                  <div className="list-group-item list-group-item-action flex-column align-items-start" onClick={() => this.onClickHandler(pet)}>
                    <div className="d-flex w-100 justify-content-between">
                      <div layout="row" layout-align="space-between">
                        <div layout="row">
                          <h4 className="mb-1">{pet.owner.firstName} {pet.owner.lastName}</h4>
                        </div>
                      </div>
                      <DogList pet={pet} />
                    </div>
                  </div>
                </div>
              )) : <div className="no-events"></div>}
          </TabPanel>
          <TabPanel>
            {this.props.deletedPets.length ? this.props.deletedPets.map((pet, idx) => (
                <div className="list-group" key={`dogs-${idx.toString()}`}>
                  <div className="list-group-item list-group-item-action flex-column align-items-start" onClick={() => this.onClickHandler(pet)}>
                    <div className="d-flex w-100 justify-content-between">
                      <div layout="row" layout-align="space-between">
                        <div layout="row">
                          <h4 className="mb-1">{pet.owner.firstName} {pet.owner.lastName}</h4>
                        </div>
                      </div>
                      <DogList pet={pet} />
                    </div>
                  </div>
                </div>
              )) : <div className="no-events"></div>}
          </TabPanel>
        </Tabs>
        <MainFooter onLogout={this.logoutHandler}/>
      </div>
    );
  }
}

const App = withTracker(() => {
  return {
    pets: Pets.find({}).fetch(),
    inQueuePets: Pets.find({ clientStatus: { inQueue: true, scheduled: false, completed: false, deleted: false } }).fetch(),
    scheduledPets: Pets.find({ clientStatus: { inQueue: false, scheduled: true, completed: false, deleted: false } }).fetch(),
    completedPets: Pets.find({ clientStatus: { inQueue: false, scheduled: false, completed: true, deleted: false } }).fetch(),
    deletedPets: Pets.find({ clientStatus: { inQueue: false, scheduled: false, completed: false, deleted: true } }).fetch()
  }
})(ListPet);

export default App;