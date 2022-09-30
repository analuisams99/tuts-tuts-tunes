import React from 'react';
import { Redirect } from 'react-router';
// import Loading from '../components/Loading';
import { createUser } from '../../services/userAPI';
import './styles.css';

const logo = require('../../assets/logo.png');
const meioCirculo = require('../../assets/meioCirculo.png');
const notaMusicalDark = require('../../assets/notaMusicalDark.png');
const notaMusicalLigth = require('../../assets/notaMusicalLigth.png');

const iconEmail = require('../../assets/iconEmail.png');
const iconNameUser = require('../../assets/iconUser.png');
const iconLogin = require('../../assets/iconLogin.png');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      loading: false,
      enabledButton: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const { name, email } = this.state;
    this.setState({ loading: true });
    await createUser({ name, email });
    this.setState({
      loading: false,
      enabledButton: true,
    });
  }

  render() {
    const { name, email, loading, enabledButton } = this.state;
    const MIN_CARACTHERS = 3;
    const emailRegex = /^\S+@\S+\.\S+$/.test(email);
    // if (loading) return <Loading />;
    if (enabledButton) return <Redirect to="/search" />;
    return (
      <div data-testid="page-login" className="login-container">
        <img src={ logo.default } alt="logo" className="logo" />
        <img src={ meioCirculo.default } alt="meio circulo" className="img-circulo" />
        <img
          src={ notaMusicalDark.default }
          alt="nota musical vermelho escuro"
          className="img-nota img-nota-esquerda"
        />
        <img
          src={ notaMusicalLigth.default }
          alt="nota musical vermelho claro"
          className="img-nota img-nota-direita"
        />
        <div className="login-form">
          <div className="login-text">
            <h2>Faça login na sua conta</h2>
            <p>Ouça um pedacinho das musicas e escolha a sua favorita</p>
          </div>

          <form onSubmit={ this.handleClick } className="form">
            <label htmlFor="login-name">
              <input
                className="text-form"
                type="text"
                data-testid="login-name-input"
                id="login-name"
                onChange={ this.handleChange }
                name="name"
                value={ name }
                placeholder="Nome"
              />
              <img
                src={ iconNameUser.default }
                alt="icone de usuario"
                className="icon"
              />
            </label>

            <label htmlFor="login-email">
              <input
                className="text-form"
                type="email"
                id="login-email"
                onChange={ this.handleChange }
                name="email"
                value={ email }
                placeholder="Email"
              />
              <img
                src={ iconEmail.default }
                alt="icone de email"
                className="icon"
              />
            </label>

            <label htmlFor="login-btn-submit">
              <input
                className="btn-submit"
                type="submit"
                id="login-btn-submit"
                value="Faça login na sua conta"
                data-testid="login-submit-button"
                disabled={ name.length < MIN_CARACTHERS || !emailRegex }
              />
              <img
                src={ iconLogin.default }
                alt="icone de fazer login"
                className="icon-buttom"
              />
            </label>
          </form>
        </div>

      </div>

    );
  }
}

export default Login;
