import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import { getUser } from '../../services/userAPI';

import './profile.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      userName: '',
      userEmail: '',
      userDescription: '',
      userImg: '',
    };
    this.getUserName = this.getUserName.bind(this);
  }

  componentDidMount() {
    this.getUserName();
  }

  async getUserName() {
    this.setState({ loading: true });
    const user = await getUser();
    const { name, email, image, description } = user;
    if (name) {
      this.setState({
        loading: false,
        userName: name,
        userEmail: email,
        userDescription: description,
        userImg: image,
      });
    }
  }

  renderUserName() {
    const { userName, userEmail, userDescription, userImg } = this.state;
    return (
      <div className="profile-container">
        <div className="profile-edit-box">
          <img
            src={
              userImg === ''
                ? 'https://icon-library.com/images/white-profile-icon/white-profile-icon-6.jpg'
                : userImg
            }
            className="img-profile"
            alt={ userName }
          />
          <nav>
            <Link to="/profile/edit" className="link">Editar perfil</Link>
          </nav>
        </div>
        <div className="profile-content">
          <h4>Nome</h4>
          <p>{ userName }</p>
          <h4>Email</h4>
          <p>{ userEmail }</p>
          <h4>Descrição</h4>
          <p>{ userDescription === '' ? '...' : userDescription }</p>
        </div>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="profile-body">
        <Header />
        { loading ? <Loading /> : this.renderUserName() }
      </div>
    );
  }
}

export default Profile;
