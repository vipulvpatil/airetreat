const GrpcErrorCodes = {
  NOT_FOUND: 5
}

const errorIsNotFound = (error) => {
  return error.code === GrpcErrorCodes.NOT_FOUND
}

const errorIsResetPlayerData = (error) => {
  return error && error.details === "reset player data"
}

const ErrorChecker = {
  errorIsNotFound,
  errorIsResetPlayerData
}

export default ErrorChecker
