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
    const currentPathname = window.location.pathname;

    return (
      <header className="header">
        {
          (loading)
            ? <Loading /> : (
              <main>
                <section className="header-component">
                  <Link to="/search">
                    <img src={ logo.default } alt="logo" className="logo-header" />
                  </Link>
                  <Link to="/profile" className="box-user">
                    <img
                      src={ iconNameUser.default }
                      alt="icone de usuario"
                      className="icon-header"
                    />
                    <h3>{ userName }</h3>
                  </Link>
                </section>
                <nav className="header-nav">
                  <Link
                    to="/search"
                    className={
                      currentPathname === '/search'
                        ? 'links-header selected-path'
                        : 'links-header'
                    }
                  >
                    Pesquisar
                  </Link>
                  <Link
                    to="/favorites"
                    className={
                      currentPathname === '/favorites'
                        ? 'selected-path links-header'
                        : 'links-header'
                    }
                  >
                    Favoritos
                  </Link>
                  <Link
                    to="/profile"
                    className={
                      currentPathname === '/profile'
                        ? 'selected-path links-header'
                        : 'links-header'
                    }
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
