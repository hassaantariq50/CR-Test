export const errorHandler = (error) => {
  if (error.response) {
    console.log("error.response.data.error", error.response.data.error);
    return error.response.data.error;
  } else if (error.message) {
    return `${error.message.replace("GraphQL error: ", "")}`;
  } else {
    return "Something went wrong";
  }
};
