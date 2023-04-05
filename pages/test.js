import {Button, Fade, Grid, Menu, MenuItem, Stack, Typography} from "@mui/material"
import Image from "next/image"
import JoinGameDialog from "@/components/join_game_dialog"
import api from "@/lib/api"
import {loadPlayerData} from "@/lib/local_storage"
import mainImage from "../public/ai-retreat-main-image.png"
import styles from "@/styles/Home.module.css"
import {useRouter} from "next/router"
import {useState} from "react"

const Test = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        className={styles.poppingButton}
        variant="contained"
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        EVE-a-L
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        className={styles.invisibleMenu}
        elevation={0}
        classes={{
          paper: styles.menuPaper,
          list: styles.menuList,
        }}
      >
        <MenuItem onClick={handleClose} className={styles.menuItem}>
          <Button
            className={styles.poppingButton}
            variant="contained"
          >GLaDOSE</Button>
        </MenuItem>
        <MenuItem onClick={handleClose} className={styles.menuItem}>
          <Button
            className={styles.poppingButton}
            variant="contained"
          >T-800X</Button>
        </MenuItem>
        <MenuItem onClick={handleClose} className={styles.menuItem}>
          <Button
            className={styles.poppingButton}
            variant="contained"
          >EVE-a-L</Button>
        </MenuItem>
        <MenuItem onClick={handleClose} className={styles.menuItem}>
          <Button
            className={styles.poppingButton}
            variant="contained"
          >B.O.B.Z</Button>
        </MenuItem>
      </Menu>

    </div>
  )
}

export default Test
