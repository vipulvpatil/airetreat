
import Image from "next/image"
import styles from "@/styles/Home.module.css"
import {Button, Grid, Stack, Typography} from "@mui/material"
import Link from "next/link"

const MenuItem = ({children, href}) => {
  if(href) {
    return (
      <Link className={styles.menuItem} href={href}>
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
            <MenuItem href="/">HOME</MenuItem>
            <MenuItem href="/games">GAMES</MenuItem>
            <MenuItem href="/rules">RULES</MenuItem>
            <MenuItem href="/background">BACKGROUND</MenuItem>
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
