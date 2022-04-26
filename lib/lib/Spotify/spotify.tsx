import {
  ArtistRelatedArtists,
  ArtistsAlbums,
  ArtistsTopTracks,
  UserPlaylists,
} from "../Interfaces/interfaces";

const spotify = {
  async getUserPlaylists(token: unknown) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch("https://api.spotify.com/v1/me/playlists", {
      headers,
    });
    const jsonResponse: UserPlaylists = await response.json();
    return jsonResponse;
  },
  async getPlaylist(playlistId: string | string[] | undefined, token: unknown) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers,
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  },
  async getArtist(artistId: string | string[] | undefined, token: unknown) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers,
    });

    const jsonResponse = await response.json();
    return jsonResponse;
  },
  async getArtistsTopTracks(artistId: string | string[] | undefined, token: unknown) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`,
      {
        headers,
      }
    );

    const jsonResponse: ArtistsTopTracks = await response.json();
    return jsonResponse;
  },
  async getArtistsAlbums(artistId: string | string[] | undefined, token: unknown) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
      headers,
    });

    const jsonResponse: ArtistsAlbums = await response.json();
    return jsonResponse;
  },
  async getArtistRelatedArtists(artistId: string | string[] | undefined, token: unknown) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/related-artists`, {
      headers,
    });

    const jsonResponse: ArtistRelatedArtists = await response.json();
    return jsonResponse;
  },
  async getAlbum(albumId: string | string[] | undefined, token: unknown) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
      headers,
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  },
};

export default spotify;
