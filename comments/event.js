const axios = require("axios");

function CommentEvents(db) {
  function postCreated(type, data) {
    console.log("event received with type :", type);
    db[data.id] = {
      id: data.id,
      comments: [],
    };
  }

  async function commentModerated(type, data) {
    console.log("event received with type :", type);
    const { postId, id, status } = data;

    const comment = db[postId].comments.find((comment) => comment.id === id);
    comment.status = status;

    await axios.post("http://event-bus-srv:4000/events", {
      type: "COMMENT_UPDATED",
      data: {
        ...comment,
        postId,
      },
    });
  }

  return {
    postCreated,
    commentModerated,
  };
}

module.exports = CommentEvents;
