//write error message to make debug easy
export function getErrorPayload(error) {
  if (error.response) {
    return {
      message: error.response.data.message || "Server error",
      status: error.response.status,
      data: error.response.data,
    };
  } else if (error.request) {
    return { message: "No response from server" };
  } else {
    return { message: error.message || "Unknown error" };
  }
}
