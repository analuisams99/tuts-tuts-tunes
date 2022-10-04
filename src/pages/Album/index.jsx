import React from 'react';
import PropTypes from 'prop-types';

import { getFavoriteSongs, addSong, removeSong } from '../../services/favoriteSongsAPI';
import getMusics from '../../services/musicsAPI';

import Header from '../../components/Header';
import Loading from '../../components/Loading';
import MusicCard from '../../components/MusicCard';

import './album.css';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      musics: [],
      favorites: [],
    };
    this.handleFavoriteMusic = this.handleFavoriteMusic.bind(this);
  }

  componentDidMount() {
    this.getMusicsFetch();
    this.getFetchFavoritesSongs();
  }

  async handleFavoriteMusic(value, music) {
    this.setState({
      loading: true,
    });
    if (value) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
    this.getFetchFavoritesSongs();
  }

  async getMusicsFetch() {
    const { match: { params: { id } } } = this.props;
    const musicList = await getMusics(id);
    this.setState({
      musics: musicList,
    });
  }

  async getFetchFavoritesSongs() {
    const favoritesSongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      favorites: favoritesSongs,
    });
  }

  render() {
    const { loading, musics, favorites } = this.state;
    return (
      <div>
        <Header />
        { loading ? <Loading />
          : (
            <div className="page-album">
              <div className="album-container1">
                <img src={ musics[0].artworkUrl100 } alt={ musics[0].collectionName } />
                <h2 className="album-name">{ musics[0].collectionName }</h2>
                <p className="artist-name">{ musics[0].artistName }</p>
              </div>

              <div className="album-container2">
                <ul>
                  {musics.slice(1).map((music) => (
                    <MusicCard
                      music={ music }
                      checked={
                        favorites.some((favorite) => favorite.trackId === music.trackId)
                      }
                      onChange={ this.handleFavoriteMusic }
                      key={ music.trackId }
                    />
                  ))}
                </ul>
              </div>
            </div>
          )}
      </div>
    );
  }
}

Album.propTypes = PropTypes.shape({
  match: { params: { id: PropTypes.number } },
}).isRequired;

export default Album;
