import GrpcService from "@/lib/grpc_service"
import getLoggedInUserEmail from "@/common/logged_in_user"

const Player = async (req, res) => {
  if(req.method !== "POST") {
    res.status(404).json({error: "only POST is allowed"})
    return
  }
  try {
    let playerId = null
    if(req.body &&req.body.params) {
      playerId = req.body.params.playerId
    }
    const email = await getLoggedInUserEmail(req, res)
    const playerData = await GrpcService.syncPlayerData(email, playerId)
    res.status(200).json({result: {playerData}, error: null})
  } catch (err){
    console.log(err)
    res.status(400).json({error: "improper request"})
  }
}

export default Player
