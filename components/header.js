
import {Button, Grid, Typography} from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import styles from "@/styles/Home.module.css"

const MenuItem = ({children, href}) => {
  if(href) {
    return (
      <Link className={styles.menuLink} href={href}>
        <Typography variant="link">{children}</Typography>
      </Link>
    )
  } else {
    return
  }
}

const ProfileIcon = ({children}) => {
  return <Button className={styles.profileIcon}>{children}</Button>
}

const Header = () => {
  return (
    <div className={styles.header}>
      <MenuItem href="/">
        <Image
          src="/ai-retreat-logo.png"
          alt="Ai Retreat"
          width={38} height={24}
          blurDataURL="/ai-retreat-logo.png"
        />
      </MenuItem>
      <Grid container className={styles.headerMenuLinks}>
        <Grid item mobile={4} tablet={2}>
          <MenuItem href="/">Home</MenuItem>
        </Grid>
        <Grid item mobile={4} tablet={2}>
          <MenuItem href="/rules">Rules</MenuItem>
        </Grid>
        <Grid item mobile={4} tablet={2}>
          <MenuItem href="/background">About</MenuItem>
        </Grid>
      </Grid>
      <MenuItem href="/background"><ProfileIcon><Typography variant="link">G</Typography></ProfileIcon></MenuItem>
    </div>
  )
}

export default Header
