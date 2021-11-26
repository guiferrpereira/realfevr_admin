import React, { useContext } from "react"
import Typography from "@material-ui/core/Typography"
import { AuthContext } from "App"
import { makeStyles, Theme } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) => ({
  typography: {
    float: "right",
    paddingRight: "3rem"
  }
}))

const Footer: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext)
  const classes = useStyles()

  return (
    <>
      {
        isSignedIn && currentUser ? (
          <Typography className={classes.typography}>Logged in as: {currentUser?.name}</Typography>   
        ) : (
          <></>
        )
      }
    </>
  )
}

export default Footer;