interface Image {
  height: any;
  url: string;
  width: any;
}

interface UserPlaylist {
  description: string;
  id: string;
  images: Image[];
  name: string;
  owner: {
    display_name: string;
    id: string;
  };
  tracks: {
    total: number;
  };
}

interface Artist {
  id: string;
  name: string;
}

interface TrackAlbum {
  album_type: string
  artists: Artist[];
  id: string;
  images: Image[];
  name: string;
  release_date: string;
}

interface AlbumTrack {
  artists: Artist[];
  duration_ms: number
  id: string;
  name: string;
}

export interface Track {
  album: TrackAlbum;
  artists: Artist[];
  duration_ms: number;
  id: string;
  name: string;
}

export interface PlaylistTrack {
  added_at?: string;
  track: Track;
}

export interface UserPlaylists {
  items: UserPlaylist[];
}

export interface Playlist extends UserPlaylist {
  tracks: {
    items: PlaylistTrack[];
    total: number;
  };
}

export interface ExternalArtist extends Artist {
  followers: {
    total: number;
  };
  genres: any[];
  images: Image[];
}

export interface ArtistsTopTracks {
  tracks: Track[];
}

export interface ArtistRelatedArtists {
  artists: ExternalArtist[];
}

export interface ArtistsAlbums {
  items: TrackAlbum[];
}

export interface Album extends TrackAlbum {
  copyrights: {text:string; type: string}[]
  genres: any[] 
  label: string
  total_tracks: number
  tracks: {
    items: AlbumTrack[]
  }
}
