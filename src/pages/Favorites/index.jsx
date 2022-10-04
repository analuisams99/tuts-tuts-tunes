import React from 'react';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import MusicCard from '../../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';

import './favorites.css';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      favorites: [],
    };

    this.handleFavorite = this.handleFavorite.bind(this);
    this.renderFavorites = this.renderFavorites.bind(this);
  }

  componentDidMount() {
    this.getFetchFavoritesSongs();
  }

  async handleFavorite(value, music) {
    this.setState({
      loading: true,
    });
    if (!value) {
      await removeSong(music);
    }
    this.getFetchFavoritesSongs();
  }

  async getFetchFavoritesSongs() {
    this.setState({ loading: true });
    const favoritesSongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      favorites: favoritesSongs,
    });
    console.log(favoritesSongs);
  }

  renderFavorites() {
    const { favorites } = this.state;
    return (
      <div className="favorites-container">
        <h3 className="favorites-h3">Músicas favoritas:</h3>
        <div className="container-musics-fav">
          {favorites.map((music) => (
            <div
              className="div-img-fav"
              key={ music.trackId }
            >
              <div className="container-image">
                <img
                  className="img-fav"
                  src={ music.artworkUrl60 }
                  alt="music"
                />
              </div>
              <MusicCard
                music={ music }
                checked={
                  favorites.some((favorite) => favorite.trackId === music.trackId)
                }
                onChange={ this.handleFavorite }
                key={ music.trackId }
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="page-favorites">
        <Header />
        { loading ? <Loading /> : this.renderFavorites() }
      </div>
    );
  }
}

export default Favorites;
