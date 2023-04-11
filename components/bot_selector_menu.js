import {Button, Fade, Menu, MenuItem} from "@mui/material"
import {useEffect, useRef, useState} from "react"
import styles from "@/styles/Home.module.css"

const BotSelectorMenu = ({bots, botSelectionCallback, handleClose}) => {
  const [menuItems, setMenuItems] = useState(null)
  const [open, setOpen] = useState(true)
  const anchorRef = useRef(null)

  const onClose = () => {
    setOpen(false)
    anchorRef.current = null
    handleClose()
  }

  useEffect(() => {
    const items = []
    const handleBotSelection = (bot) => ()=> {
      onClose()
      botSelectionCallback(bot)
    }
    bots.forEach(bot => {
      items.push(
        <MenuItem className={styles.menuItem} key={bot.id}>
          <Button
            className={`${styles.poppingButton} ${styles.botSelectorButton}`}
            variant="contained"
            color={bot.style.theme}
            onClick={handleBotSelection(bot)}
          >{bot.name}</Button>
        </MenuItem>
      )
    })
    setMenuItems(items)
  },[bots, botSelectionCallback])

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
    }}>
      <div ref={anchorRef} style={{width: "90px", height: "143px"}}></div>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        open={open}
        onClose={onClose}
        anchorEl={anchorRef.current}
        transitionDuration={1}
        TransitionComponent={Fade}
        elevation={0}
        classes={{
          paper: styles.menuPaper,
          list: styles.menuList,
        }}
        anchorOrigin={{horizontal: "left", vertical: "top"}}
        transformOrigin={{horizontal: "left", vertical: "top"}}
      >
        {menuItems}
      </Menu>
    </div>
  )
}

export default BotSelectorMenu
