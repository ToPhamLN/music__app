import React from 'react'
import Home from '~/pages/Home'
import Login from '~/pages/Auth/LoginPage'
import Signup from '~/pages/Auth/SignupPage'
import PlaylistDetails from '~/pages/PlayListDetails'
import Topic from '~/pages/Topic'
import Search from '~/pages/Search'
import Rank from '~/pages/Rank'
import UserMylist from '~/pages/UserMyList'
import UserDetails from '~/pages/UserDetails'
import Account from '~/pages/Account'
import Role from '~/pages/Auth/RolePage'
import ArtistAlbum from '~/pages/ArtistAlbum'
import ArtistAlbumCreate from '~/pages/ArtistAlbumCreate'
import ArtistAlbumUpdate from '~/pages/ArtistAlbumUpdate'
import ArtistBioCreate from '~/pages/ArtistBioCreate'
import ArtistTrackCreate from '~/pages/ArtistTrackCreate'
import ArtistTrackUpdate from '~/pages/ArtistTrackUpdate'
import AlbumDetails from '~/pages/AlbumDetails'
import ArtistHome from '~/pages/ArtistHome'
import ArtistTrack from '~/pages/ArtistTrack'
import UserMyListCreate from '~/pages/UserMyListCreate'
import WishTrack from '~/pages/WishTrack'

export const routes = {
  home: '/',
  login: '/login',
  signup: '/signup',
  search: '/search',
  albumDetails: '/album/:albumParam',
  albumCreate: '/album/create',
  albumUpdate: '/album/:albumParam/edit',
  trackCreate: '/track/create',
  trackUpdate: '/track/:trackParam/edit',
  playlistDetails: '/playlist/:albumParam',
  playlistUpdate: '/playlist/:playlistParam/edit',
  createlist: '/mylist/create',
  rank: '/rank',
  topic: '/topic',
  userDetails: '/user/:userParam',
  mylist: '/mylist',
  wishTrack: '/wishTrack',
  account: '/account',
  role: '/role',
  artistDetails: '/artist/:artistParam',
  artistBioCreate: '/mybio',
  artistPin: '/mypin',
  artistAlbum: '/myalbum',
  artistTrack: '/mytrack'
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

  { path: routes.topic, component: Topic },
  { path: routes.artistDetails, component: ArtistHome },
  { path: routes.rank, component: Rank },
  { path: routes.userDetails, component: UserDetails },
  {
    path: routes.albumDetails,
    component: AlbumDetails
  },
  {
    path: routes.playlistDetails,
    component: AlbumDetails
  }
]

export const privateRoutes: {
  path: string
  component: React.ComponentType
}[] = [
  { path: routes.mylist, component: UserMylist },
  { path: routes.account, component: Account },
  { path: routes.createlist, component: UserMyListCreate },
  { path: routes.wishTrack, component: WishTrack }
]

export const artistRoutes: {
  path: string
  component: React.ComponentType
}[] = [
  { path: routes.home, component: ArtistHome },
  { path: routes.account, component: Account },
  {
    path: routes.albumCreate,
    component: ArtistAlbumCreate
  },
  { path: routes.artistAlbum, component: ArtistAlbum },
  {
    path: routes.artistBioCreate,
    component: ArtistBioCreate
  },
  {
    path: routes.albumUpdate,
    component: ArtistAlbumUpdate
  },
  {
    path: routes.trackCreate,
    component: ArtistTrackCreate
  },
  {
    path: routes.trackUpdate,
    component: ArtistTrackUpdate
  },
  { path: routes.artistTrack, component: ArtistTrack }
]
