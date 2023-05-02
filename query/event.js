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

  return {
    postCreated,
    commentCreated,
    commentUpdated,
  };
}

module.exports = QueryEvent;
