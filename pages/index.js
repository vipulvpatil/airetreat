import {Button, Grid, Stack, Typography} from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import {createGame} from "@/common/actions"
import mainImage from "../public/ai-retreat-main-image.png"
import styles from "@/styles/Home.module.css"
import {useRouter} from "next/router"

const Index = () => {
  const router = useRouter()

  return (
    <div>
      <Stack sx={{alignItems: "center"}}>
        <div className={styles.title}>
          <Typography variant="h1">Ai Retreat</Typography>
        </div>
        <div className={styles.subtitle}>
          <Typography variant="h2">A two-player game of deduction.</Typography>
        </div>
        <Image
          className={styles.mainImage}
          src={mainImage}
          alt="Ai Retreat"
        />
        <Grid container className={styles.homePageButtons} justifyContent="space-evenly">
          <Grid item>
          <Link href={"/rules"}>
            <Button className={`${styles.poppingButton} ${styles.resizeableButton}`} variant="contained">
              <Typography variant="h2">
                Rules
              </Typography>
            </Button>
            </Link>
          </Grid>
          <Grid item>
            <Button className={`${styles.poppingButton} ${styles.resizeableButton}`} variant="contained" onClick={() => createGame(router)}>
              <Typography variant="h2">
                Create a Game
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </div>
  )
}

export default Index
