import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const LoginPage: React.FC = () => {
  const yourToken = Cookies.get('your_cookie_name')
  console.log('Token from cookie:', yourToken)

  const handleClick = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auths/test',
        {
          username: 'toneat'
        }
      )
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      LoginPage
      <button onClick={handleClick}>test api</button>
    </div>
  )
}

export default LoginPage
