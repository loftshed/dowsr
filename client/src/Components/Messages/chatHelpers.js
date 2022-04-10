const getThreads = async (userId) => {
  try {
    const response = await fetch(`/api/get-user-threads?userId=${userId}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const getThread = async (threadId) => {
  try {
    const response = await fetch(`/api/get-thread?threadId=${threadId}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const newThread = async (idA, idB, body) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const replyThread = async (threadId, message, userId, handle) => {
  try {
    const messageObject = {
      userId: userId,
      handle: handle,
      message: message,
    };
    const response = await fetch(`/api/modify-thread?threadId=${threadId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageObject),
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export { getThreads, getThread, newThread, replyThread };
