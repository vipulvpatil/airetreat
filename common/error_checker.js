const GrpcErrorCodes = {
  NOT_FOUND: 5
}

const errorIsNotFound = (error) => {
  return error.code === GrpcErrorCodes.NOT_FOUND
}

const ErrorChecker = {
  errorIsNotFound
}

export default ErrorChecker
