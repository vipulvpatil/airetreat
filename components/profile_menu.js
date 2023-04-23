const {Button, Typography, Menu, MenuItem} = require("@mui/material")
import {signIn, signOut} from "next-auth/react"
import Image from "next/image"
import styles from "@/styles/Home.module.css"
import {useState} from "react"

const ButtonContent = ({user}) => {
  if(user) {
    return <Image
      src={user.image}
      alt="user profile image"
      width={24} height={24}
      style={{borderRadius: "50%", display: "block"}}
    />
  } else {
    return <>?</>
  }
}

const ProfileMenuItem = ({user, handleClose}) => {
  if(user) {
    return (
      <MenuItem
        onClick={() => {
          signOut()
          handleClose()
        }}
      >
        <Typography variant="link">
          Logout
        </Typography>
      </MenuItem>
    )
  } else {
    return (
      <MenuItem
        onClick={() => {
          signIn("google")
          handleClose()
        }}
      >
        <Typography variant="link">
          Login with Google
        </Typography>
      </MenuItem>
    )
  }
}

const ProfileMenu = ({user}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={styles.profileMenu}>
      <Button
        className={styles.profileIcon}
        id="profile-button"
        aria-controls={open ? "profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Typography variant="link">
          <ButtonContent user={user}/>
        </Typography>
      </Button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "profile-button",
        }}
        PaperProps={{
          style: {
            color: "var(--mui-palette-secondary-main)",
            backgroundColor: "var(--mui-palette-secondary-contrastText)",
          },
        }}
      >
        <ProfileMenuItem user={user} handleClose={handleClose}/>
      </Menu>
    </div>
  )
}

export default ProfileMenu
