import React from 'react';
import { Link } from 'react-router-dom';
import './notFound.css';

const logo = require('../../assets/logo.png');

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found" className="page-not-found">
        <img src={ logo.default } alt="logo" className="logo-page-not-found" />
        <div className="text-page">
          <h1>Ops!</h1>
          <p>A página que você está procurando não foi encontrada.</p>
        </div>
        <nav>
          <Link to="/search">
            Retornar à Home
          </Link>
        </nav>
      </div>
    );
  }
}

export default NotFound;
