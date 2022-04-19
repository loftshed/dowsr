const getUserThreads = async (userId) => {
  try {
    const response = await fetch(`/api/get-user-threads?userId=${userId}`);
    const { threads } = await response.json();
    return threads;
  } catch (error) {
    console.log(error);
  }
};

const getOneThread = async (threadId) => {
  try {
    const response = await fetch(`/api/get-thread?threadId=${threadId}`);
    const {
      threads: { messages },
    } = await response.json();
    return messages;
  } catch (error) {
    console.log(error);
  }
};

const newThread = async (idA, idB, msgObj) => {
  try {
    const response = await fetch(`/api/new-thread?idA=${idA}&idB=${idB}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(msgObj),
    });
    return response.json();
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
    const { sentMessage } = await response.json();
    return sentMessage;
  } catch (error) {
    console.log(error);
  }
};

const startThreadWithUser = async (idA, idB, message, senderUsername) => {
  try {
    const messageBody = {
      userId: idA,
      handle: senderUsername,
      message: message,
    };
    const response = await newThread(idA, idB, messageBody);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// const sendMessage = async (message) => {
//   try {
//     if (message === "") return;
//     const returnMessage = await replyThread(
//       displayedThreadId,
//       message,
//       loggedInUser._id,
//       loggedInUser.username
//     );
//     // setShowLoadingAnim(true);
//     // setCurrentMessages([...currentMessages, returnMessage]);
//     // const { threads } = await getUserThreads(loggedInUser?._id);
//     // setThreads(threads);
//     // setShowLoadingAnim(false);
//   } catch (error) {
//     if (error) console.log(error);
//   }
// };

export {
  getUserThreads,
  getOneThread,
  newThread,
  replyThread,
  startThreadWithUser,
  // sendMessage,
};
