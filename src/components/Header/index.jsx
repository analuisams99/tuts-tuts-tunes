import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading';
import './header.css';

const logo = require('../../assets/logo.png');
const iconNameUser = require('../../assets/iconUser.png');

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      loading: true,
    };
    this.getUserName = this.getUserName.bind(this);
  }

  componentDidMount() {
    this.getUserName();
  }

  async getUserName() {
    const user = await getUser();
    const { name } = user;
    if (name) {
      this.setState({
        userName: name,
        loading: false,
      });
    }
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component" className="header">
        {
          (loading)
            ? <Loading /> : (
              <main>
                <section className="header-component">
                  <img src={ logo.default } alt="logo" className="logo-header" />
                  <div className="box-user">
                    <img
                      src={ iconNameUser.default }
                      alt="icone de usuario"
                      className="icon-header"
                    />
                    <h3 data-testid="header-user-name">{ userName }</h3>
                  </div>
                </section>
                <nav className="header-nav">
                  <Link
                    to="/search"
                    className="links-header link-to-search"
                  >
                    Pesquisar
                  </Link>
                  <Link
                    to="/favorites"
                    className="links-header link-to-favorites"
                  >
                    Favoritos
                  </Link>
                  <Link
                    to="/profile"
                    className="links-header link-to-profile"
                  >
                    Perfil
                  </Link>
                </nav>
              </main>
            )
        }
      </header>
    );
  }
}

export default Header;
