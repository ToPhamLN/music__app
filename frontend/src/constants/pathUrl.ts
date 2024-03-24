import React from 'react'
import Home from '~/pages/Home'
import Login from '~/pages/Auth/LoginPage'
import Signup from '~/pages/Auth/SignupPage'
import PlaylistDetails from '~/pages/PlayListDetails'
import Topic from '~/pages/Topic'
import ArtistDetails from '~/pages/ArtistDetails'
import Search from '~/pages/Search'
import Demo from '~/components/features/demo'
import Rank from '~/pages/Rank'
import Mylist from '~/pages/MyList'
import UserDetails from '~/pages/UserDetails'
import Account from '~/pages/Account'
import Role from '~/pages/Auth/RolePage'
import ArtistAlbum from '~/pages/ArtistAlbum'
import ArtistBio from '~/pages/ArtistBio'
import ArtistAlbumDetails from '~/pages/ArtistAlbumDetails'
import ArtistCreateAlbum from '~/pages/ArtistCreateAlbum'
import ArtistCreateTrack from '~/pages/ArtistCreateTrack'
export const routes = {
  home: '/',
  login: '/login',
  signup: '/signup',
  search: '/search',
  albumDetails: '/album/:albumParam',
  albumCreate: '/album/create',
  trackCreate: '/track/create',
  topic: '/topic',
  userDetails: '/user',
  rank: '/rank',
  playlistDetails: '/playlist',
  mylist: '/mylist',
  demo: '/demo',
  account: '/account',
  role: '/role',
  artistDetails: '/artist',
  artistBio: '/mybio',
  artistPin: '/mypin',
  artistAlbum: '/myalbum'
} as const

export const authRoutes: {
  path: string
  component: React.ComponentType
}[] = [
  { path: routes.login, component: Login },
  { path: routes.signup, component: Signup },
  { path: routes.role, component: Role }
]

export const publicRoutes: {
  path: string
  component: React.ComponentType
}[] = [
  { path: routes.home, component: Home },
  { path: routes.search, component: Search },
  {
    path: routes.playlistDetails,
    component: PlaylistDetails
  },
  { path: routes.topic, component: Topic },
  { path: routes.artistDetails, component: ArtistDetails },
  { path: routes.rank, component: Rank },
  { path: routes.userDetails, component: UserDetails }
]

export const privateRoutes: {
  path: string
  component: React.ComponentType
}[] = [
  { path: routes.mylist, component: Mylist },
  { path: routes.account, component: Account }
]

export const artistRoutes: {
  path: string
  component: React.ComponentType
}[] = [
  { path: routes.home, component: ArtistDetails },
  { path: routes.account, component: Account },
  {
    path: routes.albumCreate,
    component: ArtistCreateAlbum
  },
  { path: routes.artistAlbum, component: ArtistAlbum },
  { path: routes.artistBio, component: ArtistBio },
  {
    path: routes.albumDetails,
    component: ArtistAlbumDetails
  },
  {
    path: routes.trackCreate,
    component: ArtistCreateTrack
  },
  { path: routes.demo, component: Demo }
]
