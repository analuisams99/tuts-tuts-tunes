import React from 'react';
import { Link } from 'react-router-dom';

import './search.css';

import Header from '../../components/Header';
import Loading from '../../components/Loading';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';

const iconLupa = require('../../assets/iconLupa.png');
const iconSeta = require('../../assets/iconSeta.png');

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.carousel = React.createRef();
    this.state = {
      artistName: '',
      loading: false,
      required: false,
      haveAnAnswer: false,
      albums: [],
      artistFound: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleHaveAnAnswer = this.handleHaveAnAnswer.bind(this);
    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    // this.handleButtons = this.handleButtons.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const { artistName } = this.state;
    this.setState({ loading: true });

    const albumsFetch = await searchAlbumsAPI(artistName);

    if (albumsFetch.length > 0) {
      this.setState({
        artistName: '',
        loading: false,
        required: true,
        haveAnAnswer: true,
        albums: albumsFetch,
        artistFound: artistName,
      });
    } else {
      this.setState({
        artistName: '',
        loading: false,
        haveAnAnswer: false,
        artistFound: '',
      });
    }
  }

  handleHaveAnAnswer(artistFound, required) {
    if (artistFound) {
      return `Resultado: Álbuns de ${artistFound}`;
    }
    if (required) {
      return 'Nenhum resultado foi encontrado :(';
    }
    return 'Pesquise o nome do seu artista primeiro :)';
  }

  handleLeftClick() {
    this.carousel.current.scrollLeft -= this.carousel.current.offsetWidth;
  }

  handleRightClick() {
    this.carousel.current.scrollLeft += this.carousel.current.offsetWidth;
  }

  render() {
    const MIN_CARACTHERS = 2;
    const {
      artistName,
      loading,
      required,
      haveAnAnswer,
      albums,
      artistFound,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading /> : (
          <main className="page-search-main">
            <div className="container-search">
              <label htmlFor="search">
                <input
                  className="search-text"
                  type="text"
                  id="search"
                  data-testid="search-artist-input"
                  onChange={ this.handleChange }
                  value={ artistName }
                  name="artistName"
                  placeholder="Nome do artista..."
                />
                <img
                  src={ iconLupa.default }
                  alt="icone de fazer login"
                  className="icon-lupa"
                />
              </label>
              <button
                className="search-button"
                type="button"
                data-testid="search-artist-button"
                value="Procurar"
                id="search-btn"
                disabled={ artistName.length < MIN_CARACTHERS }
                onClick={ this.handleClick }
              >
                Procurar
              </button>
            </div>

            <section>
              <h3 className="results-h3">
                { this.handleHaveAnAnswer(artistFound, required) }
              </h3>
              <div className="carousel" ref={ this.carousel }>
                {haveAnAnswer && albums.map((album) => {
                  const {
                    collectionId, collectionName, artworkUrl100, artistName: name,
                  } = album;
                  return (
                    <div key={ collectionId } className="results-item">
                      <Link
                        to={ `/album/${collectionId}` }
                        data-testid={ `link-to-album-${collectionId}` }
                      >
                        <div className="carousel-item">
                          <img src={ artworkUrl100 } alt={ collectionName } />
                          <p className="colecao">{collectionName}</p>
                          <p className="nome-artista">{name}</p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
              { haveAnAnswer && (
                <div className="buttons">
                  <button
                    type="button"
                    onClick={ this.handleLeftClick }
                    className="seta seta-esquerda"
                  >
                    <img
                      src={ iconSeta.default }
                      alt="Scroll Left"
                      className="icon-setas icon-esquerdo"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={ this.handleRightClick }
                    className="seta seta-direita"
                  >
                    <img
                      src={ iconSeta.default }
                      alt="Scroll Right"
                      className="icon-setas"
                    />
                  </button>
                </div>
              ) }
            </section>
          </main>
        )}
      </div>
    );
  }
}

export default Search;
