import React from 'react'
import Home from '~/pages/Home'
import Login from '~/pages/Auth/LoginPage'
import Signup from '~/pages/Auth/SignupPage'
import PlaylistDetails from '~/pages/PlayListDetails'
import Topic from '~/pages/Topic'
import ArtistDetails from '~/pages/ArtistDetails'
import Search from '~/pages/Search'
import Rank from '~/pages/Rank'
import Mylist from '~/pages/MyList'
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
  topic: '/topic',
  userDetails: '/user',
  rank: '/rank',
  playlistDetails: '/playlist',
  mylist: '/mylist',
  account: '/account',
  role: '/role',
  artistDetails: '/artist',
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
  {
    path: routes.playlistDetails,
    component: PlaylistDetails
  },
  { path: routes.topic, component: Topic },
  { path: routes.artistDetails, component: ArtistDetails },
  { path: routes.rank, component: Rank },
  { path: routes.userDetails, component: UserDetails },
  {
    path: routes.albumDetails,
    component: AlbumDetails
  }
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
