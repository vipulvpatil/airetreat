import {Button, Fade, Menu, MenuItem} from "@mui/material"
import styles from "@/styles/Home.module.css"
import {useState} from "react"

const BotSelector = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return<div>
    <Button
      className={`${styles.poppingButton} ${styles.botSelectorButton}`}
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
          className={`${styles.poppingButton} ${styles.botSelectorButton}`}
          variant="contained"
        >GLaDOSE</Button>
      </MenuItem>
      <MenuItem onClick={handleClose} className={styles.menuItem}>
        <Button
          className={`${styles.poppingButton} ${styles.botSelectorButton}`}
          variant="contained"
        >T-800X</Button>
      </MenuItem>
      <MenuItem onClick={handleClose} className={styles.menuItem}>
        <Button
          className={`${styles.poppingButton} ${styles.botSelectorButton}`}
          variant="contained"
        >EVE-a-L</Button>
      </MenuItem>
      <MenuItem onClick={handleClose} className={styles.menuItem}>
        <Button
          className={`${styles.poppingButton} ${styles.botSelectorButton}`}
          variant="contained"
        >B.O.B.Z</Button>
      </MenuItem>
    </Menu>
  </div>
}

export default BotSelector
