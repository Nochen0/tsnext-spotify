import {
  Album,
  Artist,
  ArtistRelatedArtists,
  ArtistsAlbums,
  ArtistsTopTracks,
  Playlist,
  SavedTracks,
  SearchAlbum,
  SearchArtist,
  SearchPlaylist,
  SearchTrack,
  SearchI,
  UserPlaylist,
  Categories,
  CategoryPlaylists,
  Category,
  Error,
} from "../Interfaces/interfaces"

const spotify = {
  getCurrentUsersPlaylists: async (token: string | unknown) => {
    const response = await fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const jsonResponse = await response.json()
    const responseItems: UserPlaylist[] = jsonResponse.items
    return responseItems
  },
  getPlaylist: async (
    playlistId: string | string[] | undefined,
    token: string | unknown
  ) => {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const jsonResponse: Playlist = await response.json()
    return jsonResponse
  },
  getUserSavedTracks: async (token: string | unknown) => {
    const response = await fetch("https://api.spotify.com/v1/me/tracks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const jsonResponse: SavedTracks = await response.json()
    return jsonResponse
  },
  getArtist: async (
    artistId: string | string[] | undefined,
    token: string | unknown
  ) => {
    const response = await fetch(
      ` https://api.spotify.com/v1/artists/${artistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const jsonResponse: Artist = await response.json()
    return jsonResponse
  },
  getArtistsTopTracks: async (
    artistId: string | string[] | undefined,
    token: string | unknown
  ) => {
    const response = await fetch(
      ` https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const jsonResponse: ArtistsTopTracks = await response.json()
    return jsonResponse
  },
  getArtistsAlbums: async (
    artistId: string | string[] | undefined,
    token: string | unknown
  ) => {
    const response = await fetch(
      ` https://api.spotify.com/v1/artists/${artistId}/albums`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const jsonResponse: ArtistsAlbums = await response.json()
    return jsonResponse
  },
  getArtistRelatedArtists: async (
    artistId: string | string[] | undefined,
    token: string | unknown
  ) => {
    const response = await fetch(
      ` https://api.spotify.com/v1/artists/${artistId}/related-artists`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const jsonResponse: ArtistRelatedArtists = await response.json()
    return jsonResponse
  },
  getAlbum: async (
    albumId: string | string[] | undefined,
    token: string | unknown
  ) => {
    const response = await fetch(
      ` https://api.spotify.com/v1/albums/${albumId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const jsonResponse: Album = await response.json()
    return jsonResponse
  },
  searchAll: async (term: string, token: string | unknown) => {
    let searchTrackResults: SearchTrack[] = []
    let searchAlbumResults: SearchAlbum[] = []
    let searchArtistResults: SearchArtist[] = []
    let searchPlaylistResults: SearchPlaylist[] = []

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?type=track,album,playlist,artist&q=${term}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const jsonResponse: SearchI = await response.json()

      if (jsonResponse.tracks && jsonResponse.tracks.items) {
        searchTrackResults = jsonResponse.tracks.items.map(item => {
          return { track: item }
        })
      }
      if (jsonResponse.albums && jsonResponse.albums.items) {
        searchAlbumResults = jsonResponse.albums.items.map(album => {
          return {
            id: album.id,
            name: album.name,
            image: album.images[0].url,
            release_date: album.release_date,
          }
        })
      }

      if (jsonResponse.artists && jsonResponse.artists.items) {
        searchArtistResults = jsonResponse.artists.items.map(artist => {
          return {
            id: artist.id,
            name: artist.name,
            image: artist.images.map(image => image.url)[0],
            followers: artist.followers.total,
            genres: artist.genres.join(", "),
            popularity: artist.popularity,
          }
        })
      }

      if (jsonResponse.playlists && jsonResponse.playlists.items) {
        searchPlaylistResults = jsonResponse.playlists.items.map(playlist => {
          return {
            image: playlist.images[0].url,
            id: playlist.id,
            name: playlist.name,
            owner: playlist.owner.display_name,
            ownerId: playlist.owner.id,
            description: playlist.description,
          }
        })
      }
      return {
        albums: searchAlbumResults,
        playlists: searchPlaylistResults,
        tracks: searchTrackResults,
        artists: searchArtistResults,
      }
    } catch (e) {
      console.log("Error occured in search")
    }

    // To workaround for returning Promise<never[]>
    const result = {
      albums: [],
      artists: [],
      playlists: [],
      tracks: [],
    }
    return result
  },
  getCategories: async (token: string | unknown) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    }
    const response = await fetch(
      `https://api.spotify.com/v1/browse/categories`,
      {
        headers: headers,
        method: "GET",
      }
    )
    const jsonResponse: Categories = await response.json()
    return jsonResponse
  },
  getCategoryPlaylists: async (
    categoryId: string | string[] | undefined,
    token: string | unknown
  ) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    }
    const response = await fetch(
      `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`,
      {
        headers: headers,
        method: "GET",
      }
    )
    const jsonResponse: CategoryPlaylists = await response.json()
    return jsonResponse
  },
  getFeaturedPlaylists: async (token: string | unknown) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    }
    const response = await fetch(
      `https://api.spotify.com/v1/browse/featured-playlists`,
      {
        headers: headers,
        method: "GET",
      }
    )
    const jsonResponse = await response.json()
    return jsonResponse
  },
  getNewReleases: async (token: string | unknown) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    }
    const response = await fetch(
      `https://api.spotify.com/v1/browse/new-releases`,
      {
        headers: headers,
        method: "GET",
      }
    )
    const jsonResponse = await response.json()
    return jsonResponse
  },
  getCategory: async (
    categoryId: string | string[] | undefined,
    token: string | unknown
  ) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    }

    const response = await fetch(
      `https://api.spotify.com/v1/browse/categories/${categoryId}`,
      {
        headers: headers,
        method: "GET",
      }
    )
    const jsonResponse: Category = await response.json()
    return jsonResponse
  },

  getUsersTopItems: async (type: string, token: string | unknown) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    }
    const response = await fetch(`https://api.spotify.com/v1/me/top/${type}`, {
      headers: headers,
      method: "GET",
    })
    const jsonResponse = await response.json()
    return jsonResponse
  },
}

export default spotify
