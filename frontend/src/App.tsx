import { Routes, Route } from 'react-router-dom'
import { useAppSelector } from '~/hooks/redux'
import { publicRoutes, privateRoutes } from '~/constants/pathUrl'
import DefaultLayout from '~/layouts/DefaultLayout'
import LoginPage from './pages/Auth/LoginPage'
import NotFound from './pages/Error/NotFound'

const App: React.FC = () => {
  const { userInfo } = useAppSelector((state) => state.user)
  return (
    <Routes>
      <Route path='/' element={<DefaultLayout />}>
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
              element={userInfo ? <Page /> : <LoginPage />}
            ></Route>
          )
        })}
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
