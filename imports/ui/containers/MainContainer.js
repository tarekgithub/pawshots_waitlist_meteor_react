import { createContainer } from 'meteor/react-meteor-data';
import AddPetPage from '../pages/AddPetPage/AddPet'

export default MainContainer = createContainer(({params}) => {
  const currentUser = Meteor.user();
  return {
    currentUser,
  };
}, AddPetPage);
