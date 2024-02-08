import HomePage from '~/pages/Home/HomePage'
import LoginPage from '~/pages/Auth/LoginPage'
import SignupPage from '~/pages/Auth/SignupPage'
import PlayList from '~/pages/PlayList/PlayList'
import React from 'react'

export const routes = {
  home: '/',
  login: '/login',
  signup: '/signup',
  playlist: '/playlist'
} as const

export const publicRoutes: {
  path: string
  component: React.ComponentType
}[] = [
  { path: routes.home, component: HomePage },
  { path: routes.login, component: LoginPage },
  { path: routes.signup, component: SignupPage },
  { path: routes.playlist, component: PlayList }
]

export const privateRoutes: {
  path: string
  component: React.ComponentType
}[] = []
