const GrpcErrorCodes = {
  NOT_FOUND: 5,
  UNAVAILABLE: 14,
}

const errorIsNotFound = (error) => {
  return error.code === GrpcErrorCodes.NOT_FOUND
}

const errorIsUnavailable = (error) => {
  return error.code === GrpcErrorCodes.UNAVAILABLE
}

const errorIsResetPlayerData = (error) => {
  return error && error.details === "reset player data"
}

const ErrorChecker = {
  errorIsNotFound,
  errorIsUnavailable,
  errorIsResetPlayerData
}

export default ErrorChecker
