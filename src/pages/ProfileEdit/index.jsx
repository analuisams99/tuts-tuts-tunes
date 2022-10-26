import React from 'react';
import Footer from '../../components/Footer';
import FormProfileEdit from '../../components/FormProfileEdit';
import Header from '../../components/Header';

class ProfileEdit extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <FormProfileEdit />
        <Footer />
      </div>
    );
  }
}

export default ProfileEdit;
