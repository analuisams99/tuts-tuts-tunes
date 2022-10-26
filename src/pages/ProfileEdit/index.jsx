import React from 'react';
import FormProfileEdit from '../../components/FormProfileEdit';
import Header from '../../components/Header';

class ProfileEdit extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <FormProfileEdit />
      </div>
    );
  }
}

export default ProfileEdit;
