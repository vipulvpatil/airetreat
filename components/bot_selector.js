import {Button, Fade, Menu, MenuItem} from "@mui/material"
import {useEffect, useState} from "react"
import styles from "@/styles/Home.module.css"

const BotSelector = ({defaultBot, otherBots, direction}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedBot, setSelectedBot] = useState(null)
  const [menuItems, setMenuItems] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleBotSelection = (bot) => ()=> {
    setSelectedBot(bot)
  }

  useEffect(()=>{
    setSelectedBot(defaultBot)
  },[defaultBot])

  useEffect(() => {
    const items = []
    if(defaultBot !== selectedBot) {
      items.push(
        <MenuItem onClick={handleClose} className={styles.menuItem}>
          <Button
            className={`${styles.poppingButton} ${styles.botSelectorButton}`}
            variant="contained"
            color={defaultBot.style.theme}
            onClick={handleBotSelection(defaultBot)}
          >{defaultBot.name}</Button>
        </MenuItem>
      )
    }
    otherBots.forEach(bot => {
      if(bot !== selectedBot) {
        items.push(
          <MenuItem onClick={handleClose} className={styles.menuItem}>
            <Button
              className={`${styles.poppingButton} ${styles.botSelectorButton}`}
              variant="contained"
              color={bot.style.theme}
              onClick={handleBotSelection(bot)}
            >{bot.name}</Button>
          </MenuItem>
        )
      }
    })
    setMenuItems(items)
  },[defaultBot, otherBots, selectedBot])

  return<div>
    <Button
      className={`${styles.poppingButton} ${styles.botSelectorButton}`}
      variant="contained"
      id="fade-button"
      aria-controls={open ? "fade-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={open ? "true" : undefined}
      onClick={handleClick}
      color={selectedBot && selectedBot.style.theme || "primary"}
    >
      {selectedBot && selectedBot.name}
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
      anchorOrigin={
        (direction === "up") && {
          horizontal: "left",
          vertical: "top"
        } || {
          horizontal: "left",
          vertical: "bottom"
        }
      }
      transformOrigin={
        (direction === "up") && {
          horizontal: "left",
          vertical: "bottom"
        } || {
          horizontal: "left",
          vertical: "top"
        }
      }
    >
      {menuItems}
    </Menu>
  </div>
}

export default BotSelector
