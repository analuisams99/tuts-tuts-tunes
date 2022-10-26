import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Loading from '../Loading';
import { getUser, updateUser } from '../../services/userAPI';

import './formProfileEdit.css';

class FormProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      enabledButton: false,
      user: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.getUserName = this.getUserName.bind(this);
  }

  componentDidMount() {
    this.getUserName();
  }

  handleChange({ target: { value, name } }) {
    this.setState(({ user }) => ({
      user: { ...user, [name]: value } }));
  }

  async handleSubmit() {
    const { user: { name, email, description, image } } = this.state;
    this.setState({ loading: true });
    await updateUser({ name, email, description, image });
    this.setState({
      loading: false,
      enabledButton: true,
    });
  }

  async getUserName() {
    const user = await getUser();
    if (user) {
      this.setState({
        user,
        loading: false,
      });
    }
  }

  renderForm() {
    const { user: { name, email, description, image } } = this.state;
    return (
      <div className="profile-edit-container">
        <form className="profile-edit-form" onSubmit={ this.handleSubmit }>
          <label htmlFor="inputImg">
            <input
              type="image"
              src={
                image === ''
                  ? 'https://icon-library.com/images/white-profile-icon/white-profile-icon-6.jpg'
                  : image
              }
              alt={ name }
              id="inputImg"
              className="img-profile-edit"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="imgLink">
            Alterar imagem:
            <input
              type="text"
              name="image"
              value={ image }
              onChange={ this.handleChange }
              id="imgLink"
              placeholder="Adicione um link..."
              required
            />
          </label>
          <label htmlFor="inputName">
            Alterar nome:
            <input
              type="text"
              name="name"
              value={ name }
              id="inputName"
              onChange={ this.handleChange }
              required
            />
          </label>
          <label htmlFor="inputEmail">
            Alterar email:
            <input
              type="email"
              name="email"
              value={ email }
              id="inputEmail"
              onChange={ this.handleChange }
              required
            />
          </label>
          <label htmlFor="inputDescription">
            Alterar descrição:
            <input
              type="text"
              name="description"
              value={ description }
              id="inputDescription"
              onChange={ this.handleChange }
              required
            />
          </label>
          <input
            type="submit"
            value="Salvar informações"
            className="submit-input"
          />
        </form>
      </div>
    );
  }

  render() {
    const { loading, enabledButton } = this.state;
    if (enabledButton) return <Redirect to="/profile" />;
    return (
      loading ? <Loading /> : this.renderForm()
    );
  }
}

export default FormProfileEdit;
