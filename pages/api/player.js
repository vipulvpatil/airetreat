import GrpcService from "@/lib/grpc_service"

const Player = async (req, res) => {
  if(req.method !== "POST") {
    res.status(404).json({error: "only POST is allowed"})
    return
  }
  try {
    const {playerId} = await GrpcService.getPlayerId()
    res.status(200).json({result: {playerId}, error: null})
  } catch (err){
    console.log(err)
    res.status(400).json({error: "improper request"})
  }
}

export default Player
