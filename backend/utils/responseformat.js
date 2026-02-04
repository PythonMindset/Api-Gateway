const successResponse = (message, data = null) => ({
  success: true,
  message,
  data
});

const errorResponse = (message, status = 500) => ({
  success: false,
  message,
  status
});

module.exports = {
  successResponse,
  errorResponse
};