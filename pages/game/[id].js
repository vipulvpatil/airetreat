import {gameHasEnded, gameIsWaitingForPlayer, gameTurnIsUsers, getGameResult} from "@/model/game"
import {useEffect, useRef, useState} from "react"
import ChatContainer from "@/components/chat_container"
import ErrorChecker from "@/common/error_checker"
import GameEndPopup from "@/components/game_end_popup"
import GameInvitePopup from "@/components/game_invite_popup"
import GameStatusBox from "@/components/game_status_box"
import {Stack} from "@mui/material"
import TagDialog from "@/components/tag_dialog"
import UserInput from "@/components/user_input"
import api from "@/lib/api"
import {loadPlayerData} from "@/lib/local_storage"
import styles from "@/styles/Home.module.css"
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
  const [gameMessages, setGameMessages] = useState(null)
  const [tagDialogOpen, setTagDialogOpen] = useState(false)
  const [gameEndPopupOpen, setGameEndPopupOpen] = useState(false)
  const [gameInvitePopupOpen, setGameInvitePopupOpen] = useState(false)
  const [gameResult, setGameResult] = useState(null)
  const [awaitingMessage, setAwaitingMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const timerRef = useRef()

  useEffect(() => {
    if(router.query && router.query.id) {
      setGameId(router.query.id)
    }
  }, [router])

  const updateCurrentGameIfStateChanged = async (gameId, existingGameState) => {
    if(existingGameState === "YOU_WON" || existingGameState === "YOU_LOST" || existingGameState === "TIME_UP") {
      return
    }
    const game = await getGame(gameId)
    if (game && existingGameState !== game.state){
      setCurrentGame(game)
      setAwaitingMessage(waitingMessageForGame(game))
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
    }
  }, [currentGame])

  useEffect(() => {
    if(currentGame && bots && playerBot) {
      if(gameIsWaitingForPlayer(currentGame)){
        setGameInvitePopupOpen(true)
        return
      }
      setGameInvitePopupOpen(false)
      setGameMessages(addBotDataToGameMessages(currentGame.messages, bots, playerBot))
      setGameResult(getGameResult(currentGame, bots))
      setGameEndPopupOpen(true)
    }
  }, [currentGame, bots, playerBot])

  const handleTagDialogClose = () => {
    setTagDialogOpen(false)
  }

  const botTagged = (bot) => {
    console.log(bot)
    tag(bot.id)
    setTagDialogOpen(false)
  }

  const tag = async (botId) => {
    if(gameHasEnded(currentGame)) {
      setGameEndPopupOpen(true)
      return
    }
    try {
      const playerData = await loadPlayerData()
      const resp = await api.call("tag", {
        gameId: currentGame.id,
        playerId: playerData.id,
        botId: botId,
      })
      if (resp.error) {
        console.log(resp.error)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleGameEndPopupClose = () => {
    setGameEndPopupOpen(false)
  }

  const currentTurnIsUser = () => {
    if(gameHasEnded(currentGame)) {
      setGameEndPopupOpen(true)
      return false
    }

    if (!gameTurnIsUsers(currentGame)) {
      setErrorMessage("please wait for your turn")
      return false
    }
    return true
  }

  useEffect(() => {
    if(errorMessage) {
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
      return () => clearTimeout(timerRef.current)
    }
  }, [errorMessage])

  return (
    <div>
      <Stack sx={{alignItems: "center"}}>
        <GameStatusBox game={currentGame} bots={bots} flashMessage={errorMessage}/>
        <ChatContainer playerBot={playerBot} gameMessages={gameMessages} processingMessage={awaitingMessage}/>
        <UserInput
          game={currentGame}
          playerBot={playerBot}
          bots={bots}
          openTagDialog={() => setTagDialogOpen(true)}
          currentTurnIsUser={currentTurnIsUser}
        />
      </Stack>
      <TagDialog
        open={tagDialogOpen}
        botTagged={botTagged}
        handleClose={handleTagDialogClose}
        bots={bots}
      />
      {gameResult && <GameEndPopup
        open={gameEndPopupOpen}
        gameResult={gameResult}
        handleClose={handleGameEndPopupClose}
      />}
      {gameId && <GameInvitePopup
        open={gameInvitePopupOpen}
        inviteLink={`${process.env.NEXT_PUBLIC_BASE_URL}/game/join/${gameId}`}
        handleClose={handleGameEndPopupClose}
      />}
    </div>
  )
}

const waitingMessageForGame = (game) => {
  if (game.state === "WAITING_ON_BOT_TO_ASK_A_QUESTION") {
    return {
      message: "someone is responding ...",
      label: "Question",
      style: styles.questionMessage
    }
  } else if(game.state === "WAITING_ON_BOT_TO_ANSWER"){
    return {
      message: "someone is responding ...",
      label: "Answer",
      style: styles.answerMessage
    }
  }
  return null
}

const addBotDataToGameMessages = (gameMessages, bots, playerBot) => {
  const botMap = {}
  bots.forEach(bot => {
    botMap[bot.id] = bot
  })
  botMap[playerBot.id] = playerBot
  for(let i = 0; i < gameMessages.length; i++) {
    gameMessages[i] = Object.assign(gameMessages[i], {
      sourceBot: botMap[gameMessages[i].sourceBotId],
      targetBot: botMap[gameMessages[i].targetBotId],
    })
  }
  return gameMessages
}

export default Game
