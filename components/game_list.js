import styles from "@/styles/Home.module.css"
import { Typography } from "@mui/material"
import Link from "next/link"

const GameList = ({gameIds}) => {


  if (!gameIds) {
    return <Typography variant="h8">No games found. Please Create or Join one.</Typography>
  }
  return (
    gameIds.map((gameId, index) => {
      return (
        <div key={index}>
          <Link href={`/game/${gameId}`}>{gameId}</Link>
        </div>
      )
    })
  )
}

export default GameList
