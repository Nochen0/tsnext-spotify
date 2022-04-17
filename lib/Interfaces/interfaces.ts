export interface Image {
  height: number
  url: string
  width: number
}

interface Artist {
  external_urls: any
  href: string
  id: string
  name: string
  type: string
  uri: string
}

export interface Track {
  album: {
    album_type: string
    artists: Artist[]
    available_markets: string[]
    external_urls: any
    href: string
    id: string
    images: Image[]
    name: string
    release_date: string
    release_date_precision: string
    total_tracks: number
    type: string
    uri: string
  }
  artists: Artist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  episodes: boolean
  explicit: boolean
  external_ids: any
  external_urls: any
  href: string
  id: string
  is_local: boolean
  name: string
  popularity: number
  preview_url: string
  track: boolean
  track_number: number
  type: string
  uri: string
}

export interface PlaylistTrack {
  added_at: string
  added_by: {
    href: string
    id: string
    type: string
    uri: string
    name?: string
  }
  is_local: boolean
  primary_color: any
  track: Track
  video_thumbnail: { url: any }
}

interface PlaylistTracks {
  href: string
  items: PlaylistTrack[]
  limit: number
  next: any
  offset: number
  previous: any
  total: number
}

export interface Owner {
  display_name: string
  external_urls: any
  id: string
  type: string
  uri: string
}

export interface CurrentUsersPlaylist {
  collaborative: boolean
  description: string
  external_urls: any
  href: string
  id: string
  images: Image[]
  name: string
  owner: Owner
  primary_color: any
  public: boolean
  snapshot_id: string
  tracks: PlaylistTracks
  type: string
  uri: string
}

export interface ArtistData {
  external_urls: any
  followers: {
    href: any
    total: number
  }
  genres: string[]
  href: string
  id: string
  images: Image[]
  name: string
  popularity: number
  type: string
  uri: string
}

export interface ArtistAlbum {
  album_group: string
  album_type: string
  artists: Artist[]
  available_markets: string[]
  external_urls: any
  href: string
  id: string
  images: Image[]
  name: string
  release_date: string
  release_date_precision: string
  total_tracks: number
  type: string
  uri: string
}

export interface AlbumTrack {
  artists: Artist[]
  available_markets: any[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_urls: any
  href: string
  id: string
  is_local: boolean
  name: string
  preview_url: string
  track_number: number
  type: string
  uri: string
}

export interface Album {
  album_type: string
  artists: Artist[]
  available_markets: string[]
  copyrights: any
  external_ids: any
  external_urls: any
  genres: any[]
  href: string
  id: string
  images: Image[]
  label: string
  name: string
  popularity: number
  release_date: string
  release_date_precision: string
  total_tracks: number
  tracks: {
    href: string
    items: AlbumTrack[]
    limit: number
    next: any
    offset: number
    previous: any
    total: number
  }
}

export interface ArtistAlbums {
  href: string
  items: ArtistAlbum[]
  limit: number
  next: any
  offset: number
  previous: any
  total: number
}

export interface Album {
  album_type: string
  artists: Artist[]
  id: string
  images: Image[]
  name: string
  release_date: string
  total_tracks: number
  type: string
}

export interface Playlist {
  id: string
  images: Image[]
  name: string
  owner: {
    display_name: string
    href: string
    id: string
    type: string
  }
  type: string
  tracks: {
    href: string
    total: string
  }
  description: string
}

export interface Image {
  height: number
  url: string
  width: number
}

export interface ISearch {
  albums: {
    href: string
    items: Album[]
  }
  artists: {
    href: string
    items: Artist[]
  }
  tracks: {
    href: string
    items: Track[]
  }
  playlists: {
    href: string
    items: Playlist[]
  }
}

export type SearchTrackResults = {
  id: string
  name: string
  artists: { id: string; name: string }[]
  duration: number
  album: string
  albumId: string
}

export type SearchArtistResults = {
  id: string
  name: string
  image: string
  followers: number
  genres: string
  popularity: number
}

export type SearchAlbumResults = {
  id: string
  name: string
  image: string
}

export type SearchPlaylistResults = {
  image: string
  id: string
  name: string
  owner: string
  ownerId: string
  description: string
}

export interface GetTracks {
  href: string
  items: {
    added_at: string
    track: Track
  }[]
  total: number
}

export interface Category {
  href: string
  icons: Image[]
  id: string
  name: string
}

export interface Categories {
  categories: {
    href: string
    items: Category[]
  }
}

export interface CategoryPlaylists {
  playlists: {
    href: string
    items: Playlist[]
  }
}

export interface FeaturedPlaylists extends CategoryPlaylists {
  message: string
}

export interface NewReleases {
  albums: {
    href: string
    items: Album[]
  }
}

export interface ArtistsTopTracks {
  tracks: Track[]
}

export interface SavedAlbums {
  href: string
  items: {
    added_at: string
    album: Album
  }[]
}
