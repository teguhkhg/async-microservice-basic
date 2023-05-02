function QueryEvent(db) {
  function postCreated(type, data) {
    console.log("event received with type ", type);
    db[data.id] = {
      ...data,
      comments: [],
    };
  }

  function commentCreated(type, data) {
    console.log("event received with type ", type);
    const { postId, ...comment } = data;

    db[postId].comments.push(comment);
  }

  function commentUpdated(type, data) {
    console.log("event received with type ", type);
    const { postId, id, status, content } = data;

    console.log(db, postId);
    const comment = db[postId].comments.find((comment) => comment.id === id);
    comment.status = status;
    comment.content = content;
  }

  function handleEvent(event) {
    const { type, data } = event;

    switch (type) {
      case "POST_CREATED":
        postCreated(type, data);
        break;

      case "COMMENT_CREATED":
        commentCreated(type, data);
        break;

      case "COMMENT_UPDATED":
        commentUpdated(type, data);
        break;

      default:
    }

    console.log(db);
  }

  return {
    postCreated,
    commentCreated,
    commentUpdated,
    handleEvent,
  };
}

module.exports = QueryEvent;
