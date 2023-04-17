import Link from "next/link"
import {Typography} from "@mui/material"

const GameList = ({gameIds}) => {


  if (!gameIds) {
    return <Typography variant="h3">No games found. Please Create or Join one.</Typography>
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
