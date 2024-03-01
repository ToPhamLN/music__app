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
export const routes = {
  home: '/',
  login: '/login',
  signup: '/signup',
  search: '/search',
  playlistDetails: '/playlist',
  topic: '/topic',
  artistDetails: '/artist',
  rank: '/rank',
  mylist: '/mylist',
  demo: '/demo'
} as const

export const publicRoutes: {
  path: string
  component: React.ComponentType
}[] = [
  { path: routes.home, component: Home },
  { path: routes.login, component: Login },
  { path: routes.signup, component: Signup },
  { path: routes.search, component: Search },
  {
    path: routes.playlistDetails,
    component: PlaylistDetails
  },
  { path: routes.topic, component: Topic },
  { path: routes.artistDetails, component: ArtistDetails },
  { path: routes.demo, component: Demo },
  { path: routes.rank, component: Rank },
  { path: routes.mylist, component: Mylist }
]

export const privateRoutes: {
  path: string
  component: React.ComponentType
}[] = []
