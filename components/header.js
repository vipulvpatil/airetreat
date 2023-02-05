
import Image from "next/image"
import styles from "@/styles/Home.module.css"
import {Grid, Stack} from "@mui/material"

const MenuItem = ({children}) => {
  return <div className={styles.menuItem}>{children}</div>
}

const ProfileIcon = ({children}) => {
  return <div className={styles.profileIcon}>{children}</div>
}

const Header = () => {
  return (
    <div className={styles.header}>
      <Grid container>
        <Grid item tablet={6}>
          <Stack spacing={0.5} direction="row">
            <MenuItem>
              <Image
                src="/AiRetreatLogo.png"
                alt="Ai Retreat"
                width={38} height={24}
                placeholder="blur"
                blurDataURL="/AiRetreatLogo.png"
              />
            </MenuItem>
            <MenuItem>Home</MenuItem>
            <MenuItem>Game</MenuItem>
            <MenuItem>Rules</MenuItem>
          </Stack>
        </Grid>
        <Grid item tablet={6}>
          <Stack spacing={0.5} direction="row" sx={{justifyContent:"end"}}>
            <ProfileIcon>VP</ProfileIcon>
            <MenuItem>Profile</MenuItem>
          </Stack>
        </Grid>
      </Grid>
    </div>
  )
}

export default Header
