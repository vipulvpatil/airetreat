import {useEffect, useState} from "react"
import ChatContainer from "@/components/chat_container"
import ErrorChecker from "@/common/error_checker"
import GameStatusBox from "@/components/game_status_box"
import {Stack} from "@mui/material"
import UserInput from "@/components/user_input"
import api from "@/lib/api"
import {createFullConversationForGame} from "@/common/chat_formatter"
import {loadPlayerData} from "@/lib/local_storage"
import usePoll from "react-use-poll"
import {useRouter} from "next/router"

const botStyles = [
  {
    theme: "botStyle1",
    color: "var(--mui-palette-botStyle1-main)",
  },
  {
    theme: "botStyle2",
    color: "var(--mui-palette-botStyle2-main)",
  },
  {
    theme: "botStyle3",
    color: "var(--mui-palette-botStyle3-main)",
  },
  {
    theme: "botStyle4",
    color: "var(--mui-palette-botStyle4-main)",
  },
  {
    theme: "botStyleSelf",
    color: "var(--mui-palette-botStyleSelf-main)",
  },
]

const Game = () => {
  const router = useRouter()

  const [bots, setBots] = useState([])
  const [currentGame, setCurrentGame] = useState(null)
  const [playerBot, setPlayerBot] = useState(null)
  const [gameId, setGameId] = useState(null)
  const [statusMessage, setStatusMessage] = useState(null)
  const [fullConversation, setFullConversation] = useState(null)

  useEffect(() => {
    if(router.query && router.query.id) {
      setGameId(router.query.id)
    }
  }, [router])

  const updateCurrentGameIfStateChanged = async (gameId, existingGameState) => {
    const game = await getGame(gameId)
    if (game && existingGameState !== game.state){
      setCurrentGame(game)
    }
  }

  const getGame = async (gameId) => {
    const playerData = await loadPlayerData()
    const resp = await api.call("getGame", {gameId, playerId: playerData.id})
    if(resp.error) {
      if(ErrorChecker.errorIsNotFound(resp.error)){
        router.push("/games")
      }
      console.log(resp.error)
    } else {
      const game = Object.assign(resp.result.game, {id: gameId})
      return game
    }
  }

  usePoll(() => {
    if(gameId) {
      const currentGameState = currentGame && currentGame.state
      updateCurrentGameIfStateChanged(gameId, currentGameState)
    }
  }, [gameId, currentGame], {interval: 1000})

  useEffect(() => {
    if(currentGame && currentGame.bots && currentGame.myBotId) {
      const otherBots = []
      currentGame.bots.forEach(bot => {
        if (bot.id === currentGame.myBotId) {
          Object.assign(bot, {style: botStyles[4]})
          setPlayerBot(bot)
        } else {
          otherBots.push(bot)
        }
      })
      const botList = otherBots.map((bot, index) => {
        return Object.assign(bot, {style: botStyles[index]})
      })
      setBots(botList)
      if(currentGame.state === "WAITING_ON_YOU_TO_ASK_A_QUESTION" || currentGame.state === "WAITING_ON_YOU_TO_ANSWER") {
        setStatusMessage("waiting on you")
      } else {
        setStatusMessage("please wait")
      }
    }
  }, [currentGame])

  useEffect(() => {
    if(currentGame && bots && playerBot) {
      setFullConversation(createFullConversationForGame(currentGame.conversation, bots, playerBot))
    }
  }, [currentGame, bots, playerBot])


  return (
    <div>
      <Stack sx={{alignItems: "center"}}>
        <GameStatusBox game={currentGame} statusMessage={statusMessage}/>
        <ChatContainer playerBot={playerBot} fullConversation={fullConversation}/>
        <UserInput game={currentGame} playerBot={playerBot} bots={bots}/>
      </Stack>
    </div>
  )
}

export default Game
