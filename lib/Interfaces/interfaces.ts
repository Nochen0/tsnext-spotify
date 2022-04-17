export interface Image {
  height: number
  url: string
  width: number
}

export interface UserPlaylist {
  description: string
  id: string
  images: Image[]
  name: string
  owner: {
    display_name: string
    id: string
  }
  tracks: { total: number }
  type: string
}

interface _Artist {
  id: string
  name: string
  type: string
}

export interface Track {
  album?: _Album
  artists: _Artist[]
  duration_ms: number
  id: string
  name: string
  type: string
}

export interface PlaylistTrack {
  added_at: string
  track: Track
}

export interface Playlist extends UserPlaylist {
  followers: {
    total: number
  }
  tracks: {
    items: PlaylistTrack[]
    total: number
  }
}

export interface SavedTracks {
  items: PlaylistTrack[] | []
  total: number
}

export interface Artist {
  followers: {
    total: number
  }
  genres: string[] | []
  id: string
  images: Image[]
  name: string
  type: string
  popularity: number
}

export interface ArtistsTopTracks {
  tracks: PlaylistTrack[]
}

export interface _Album {
  artists: _Artist[]
  id: string
  images: Image[]
  name: string
  release_date: string
  total_tracks: number
  type: string
}

export interface ArtistsAlbums {
  items: _Album[]
  total: number
}

export interface ArtistRelatedArtists {
  artists: Artist[]
}

export interface Album extends _Album {
  copyrights: string[] | []
  label: string
  tracks: {
    items: PlaylistTrack[]
    total: number
  }
}

export interface SearchAlbum {
  id: string
  image: string
  name: string
  release_date: string
}

export interface SearchArtist {
  followers: number
  genres: string
  id: string
  image: string
  name: string
  popularity: number
}

export interface SearchPlaylist {
  description: string
  id: string
  image: string
  name: string
  owner: string
  ownerId: string
}

export interface SearchTrack {
  track: Track
}

export interface SearchI {
  albums: {
    items: _Album[]
  }
  artists: {
    items: Artist[]
  }
  playlists: {
    items: UserPlaylist[]
  }
  tracks: {
    items: Track[]
  }
}

export interface Category {
  href: string
  icons: Image[]
  id: string
  name: string
}

export interface Categories {
  categories: {
    items: Category[]
    total: number
  }
}

export interface CategoryPlaylists {
  playlists: {
    items: UserPlaylist[]
    total: number
  }
}

export interface Error {
  error: {
    status: number
    message: string
  }
}
