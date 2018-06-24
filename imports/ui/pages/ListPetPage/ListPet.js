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
  constructor() {
    super();
    this.state = { tabIndex: 0 };
  }

  onClickHandler(pet) {
    console.log('pet info ==>', pet);
    this.props.history.push({
      pathname: `/listpet/${pet._id}`,
      state: {pet: pet}
    });
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
              <p>Normal Queue: </p>
              {this.props.pets.length ? this.props.pets.map((pet) => (
                <div className="list-group" key={pet._id}>
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
            <h2>Completed items</h2>
          </TabPanel>
          <TabPanel>
            <h2>Scheduled items</h2>
          </TabPanel>
          <TabPanel>
            <h2>Deleted items</h2>
          </TabPanel>
        </Tabs>
        <MainFooter onLogout={this.logoutHandler}/>
      </div>
    );
  }
}

const App = withTracker(() => {
  return {
    pets: Pets.find({}).fetch()
  }
})(ListPet);

export default App;