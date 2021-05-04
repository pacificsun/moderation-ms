const express = require("express");
const axios = require("axios");

// This is for to watch event CommentModerated Generated by Event bus

const app = express();

app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  // when comment is created event bus sends here for moderation
  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        content: data.content,
        status,
      },
    });
  }

  res.send({});
});

app.listen(4003, () => console.log("Listening on PORT 4003 "));
