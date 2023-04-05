import {Button, Fade, Menu, MenuItem} from "@mui/material"
import {useEffect, useState} from "react"
import styles from "@/styles/Home.module.css"

const BotSelector = ({defaultBot, otherBots, direction, botSelectionCallback}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedBot, setSelectedBot] = useState(null)
  const [menuItems, setMenuItems] = useState(null)
  const [open, setOpen] = useState(false)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    setOpen(true)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setOpen(false)
  }

  const handleBotSelection = (bot) => ()=> {
    setSelectedBot(bot)
    botSelectionCallback(bot)
  }

  const handleScroll = () => {
    handleClose()
  }

  useEffect(()=>{
    if(open) {
      window.addEventListener("scroll", handleScroll, {passive: true})
    } else {
      window.removeEventListener("scroll", handleScroll)
    }
    return () => window.removeEventListener("scroll", handleScroll)
  })

  useEffect(()=>{
    setSelectedBot(defaultBot)
  },[defaultBot])

  useEffect(() => {
    const items = []
    if(defaultBot !== selectedBot) {
      items.push(
        <MenuItem onClick={handleClose} className={styles.menuItem} key={defaultBot.id}>
          <Button
            className={`${styles.poppingButton} ${styles.botSelectorButton}`}
            variant="contained"
            color={defaultBot.style.theme}
            onClick={handleBotSelection(defaultBot)}
          >
            {defaultBot.name}
          </Button>
        </MenuItem>
      )
    }
    otherBots.forEach(bot => {
      if(bot !== selectedBot) {
        items.push(
          <MenuItem onClick={handleClose} className={styles.menuItem} key={bot.id}>
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
