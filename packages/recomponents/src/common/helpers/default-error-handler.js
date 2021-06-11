class DefaultErrorHandler {
  static parseError(error, defaultMessage = 'Something went wrong, please try again or contact support') {
    let errorMessages = [];
    if (error && error.status) {
      switch (error.status) {
        case 401:
        case 404:
        case 409:
        case 400:
          errorMessages.push(error.message);
          break;
        case 422:
          // TODO use invalidFields prop for better details when possible
          if (error.details && error.details.length) {
            errorMessages = [
              ...errorMessages,
              ...error.details,
            ];
          }
          break;
        case 500:
          errorMessages.push('Something went wrong on our servers, please contact support.');
          break;
        default:
          errorMessages.push(defaultMessage);
      }
    } else if (error && error.name === 'RebillyConflictError') { // error status 409
      errorMessages.push(error.message);
    } else if (error && error.name === 'RebillyCanceledError') {
      // ignore cancel error, request is canceled
      return errorMessages;
    }
    if (errorMessages.length) {
      return errorMessages;
    }

    return [defaultMessage];
  }
}

export default DefaultErrorHandler;
