import { Routes, Route } from 'react-router-dom'
import { useAppSelector } from '~/hooks'
import {
  publicRoutes,
  privateRoutes,
  authRoutes,
  artistRoutes
} from '~/constants/pathUrl'
import DefaultLayout from '~/layouts/DefaultLayout'
import LoginPage from './pages/Auth/LoginPage'
import NotFound from './pages/Error/NotFound'
import AuthLayout from './layouts/AuthLayout'
import ArtistLayout from './layouts/ArtistLayout'

const App: React.FC = () => {
  const { userInfo } = useAppSelector((state) => state.user)
  return (
    <Routes>
      <Route path='/' element={<ArtistLayout />}>
        {artistRoutes.map((route) => {
          const Page = route.component
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<Page />}
            ></Route>
          )
        })}
      </Route>
      {/* <Route path='/' element={<DefaultLayout />}>
        {publicRoutes.map((route) => {
          const Page = route.component
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<Page />}
            ></Route>
          )
        })}
        {privateRoutes.map((route) => {
          const Page = route.component
          return (
            <Route
              key={route.path}
              path={route.path}
              element={userInfo ? <Page /> : <Page />}
            ></Route>
          )
        })}
      </Route> */}
      <Route path='/' element={<AuthLayout />}>
        {authRoutes.map((route) => {
          const Page = route.component
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<Page />}
            ></Route>
          )
        })}
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
