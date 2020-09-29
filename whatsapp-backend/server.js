// importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";

// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: '1081540',
    key: '1dd3c0c631623bcdec89',
    secret: '1bef0ea9facc73bf93d3',
    cluster: 'mt1',
    encrypted: true
  });

// middleware
app.use(express.json());

// DB config
const connection_url =
  "mongodb+srv://admin:9aCN1lsju2sT7RCC@cluster0.bzmtd.mongodb.net/whatsappdb?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection

db.once('open', () => {
    console.log('DB is Connected!');

    const msgCollection = db.collection('messagecontents');
    // console.log(msgCollection)

    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        // console.log(change);
        console.log("A Change has occurred", change);
    })
})

// ??

// API routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// Listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));
