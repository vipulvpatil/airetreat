
import Image from "next/image"
import styles from "@/styles/Home.module.css"
import {Button, Grid, Stack} from "@mui/material"
import Link from "next/link"

const MenuItem = ({children, href}) => {
  if(href) {
    return (
      <Link href={href}>
        <Button className={styles.menuItem} href={href}>
          {children}
        </Button>
      </Link>
    )
  } else {
    return (
      <Button className={styles.menuItem} href={href}>
        {children}
      </Button>
    )
  }
}

const ProfileIcon = ({children}) => {
  return <Button className={styles.profileIcon}>{children}</Button>
}

const Header = () => {
  return (
    <div className={styles.header}>
      <Grid container>
        <Grid item tablet={6}>
          <Stack spacing={0.5} direction="row">
            <MenuItem href="/">
              <Image
                src="/AiRetreatLogo.png"
                alt="Ai Retreat"
                width={38} height={24}
                placeholder="blur"
                blurDataURL="/AiRetreatLogo.png"
              />
            </MenuItem>
            <MenuItem href="/">Home</MenuItem>
            <MenuItem href="/game">Game</MenuItem>
            <MenuItem>Rules</MenuItem>
          </Stack>
        </Grid>
        <Grid item tablet={6}>
          <Stack spacing={0.5} direction="row" sx={{justifyContent:"end"}}>
            <ProfileIcon>VP</ProfileIcon>
          </Stack>
        </Grid>
      </Grid>
    </div>
  )
}

export default Header
