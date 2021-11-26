import React, { useState, useEffect, createContext } from "react"
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom"

import CommonLayout from "components/layouts/CommonLayout"
import Home from "components/pages/Home"
import SignUp from "components/pages/SignUp"
import SignIn from "components/pages/SignIn"

import { getCurrentUser } from "lib/api/auth"
import { User } from "interfaces/index"

export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
})

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()

  useEffect(() => {
    const handleGetCurrentUser = async () => {
      try {
        const res = await getCurrentUser()

        if (res?.data.isLogin === true) {
          setIsSignedIn(true)
          setCurrentUser(res?.data.data)
        } else {
          // No user
          // console.log("no user")
        }
      } catch (err) {
        // Error
        console.log(err)
      }

      setLoading(false)
    }

    handleGetCurrentUser()
  }, [setCurrentUser])

  const PrivateRoute = ({ children }: any) => {
    if (!loading) {
      if (isSignedIn) {
        return children
      } else {
        return <Redirect to="/signin" />
      }
    } else {
      return <></>
    }
  }

  const PublicRoute = ({ children }: any) => {
    if (!loading) {
      if (isSignedIn) {
        return <Redirect to="/" />
      } else {
        return children
      }
    } else {
      return <></>
    }
  }
  return (
    <Router>
      <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser}}>
        <CommonLayout>
          <Switch>
            <PublicRoute path="/signup">
              <SignUp />
            </PublicRoute>
            <PublicRoute path="/signin">
              <SignIn />
            </PublicRoute>
            <PrivateRoute path="/">
              <Home />
            </PrivateRoute>
          </Switch>
        </CommonLayout>
      </AuthContext.Provider>
    </Router>
  )
}

export default App
