import { Button, Stack, Typography } from "@mui/material"
import { useSession, signOut } from "next-auth/react"
import styles from "@/styles/Home.module.css"

const Debug = () => {
  const { data: session } = useSession({required: true})
  console.log(session)
  if(session){
    return (
      <div className={styles.indexContent}>
        <Stack spacing={2} sx={{alignItems: "center"}}>
          <Typography className={styles.mainText}>Signed in as {session.user.email}</Typography>
          <Button className={styles.primaryButton} variant="contained"  onClick={() => signOut()}>Sign out</Button>
        </Stack>
      </div>
    )
  } else {
    return <></>
  }
}

export default Debug
