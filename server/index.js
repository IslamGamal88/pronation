const app = require("express")();
const server = require("http").createServer(app);
// const proxy = require("http-proxy");
const socketIo = require("socket.io");
// const cors = require("cors");
// const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const PORT = process.env.PORT || 5000;
// const isProd = process.env.NODE_ENV === "production";
// const origin = isProd
//   ? "https://pronationbot.vercel.app"
//   : "http://localhost:3000";
// const target = isProd
//   ? "https://pronation.vercel.app"
//   : "http://localhost:8000";

// proxy.createProxyServer({ target, ws: true }).listen(80);

server.listen(PORT, (s) => {
  console.log(`Server running on port ${PORT}`);
});

app.use(
  cors({
    origin,
  })
);

const io = socketIo(server, {
  // cors: {
  //   origin,
  //   methods: ["GET", "POST"],
  // },
  wwsEngine: ["ws", "wss"],
  transports: ["websocket", "polling"],
  allowEIO3: true,
});

app.get("/", (req, res) => {
  res.send(`Server is running!!! on port ${PORT}`);
});

// const questions = [
//   "ما هو سنك ؟",
//   "هل انت ذكر ام انثي ؟",
//   "كم هو طولك ؟",
//   "كم هو وزنك ؟",
//   "ماهي الرياضه التي تمارسها ؟",
//   "مازال تمارس هذه الرياضه ام معتزل ؟",
//   "ماهي الاصابات التي اصبت بها من قبل ؟",
//   "هل عالجت هذه الاصابات ام لا ؟",
//   "هل يختلف الالم من مكان الي اخر ام يبقي في نفس المكان ؟",
//   "اين موضع الالم ؟ هل تشعر بالعمق ام السطحيه ؟",
//   "هل الوضع يتحسن ام يسوء ؟",
//   "متي تشعر ان الامر يزاد سوءا و متي يتحسن ؟",
//   "هل هذه المره الاولي التي تعاني منها ام واجهت شيئا مشابها من قبل ؟",
//   "ما هي طبيعه عملك ؟",
// ];

io.on("connection", (socket) => {
  console.log("a user connected");

  // let currentQuestionIndex = 0;
  // let chat = [];

  // // Send a "connected!" message to the client
  // socket.emit("message", "connected!");

  // // Start asking the first question
  // socket.emit("question", questions[currentQuestionIndex]);

  // socket.on("answer", (answer) => {
  //   chat.push(questions[currentQuestionIndex]);
  //   chat.push(answer);

  //   currentQuestionIndex++;

  //   if (currentQuestionIndex < questions.length) {
  //     socket.emit("question", questions[currentQuestionIndex]);
  //   } else {
  //     const prompt = `based on this conversation ${chat.join(
  //       ", "
  //     )} what do you think the diagnosis is ? and can you recommend some general purpose exercises ?`;

  //     getChatGPTResponse(prompt).then((response) => {
  //       socket.emit("response", response);
  //     });
  //   }
  // });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// async function getChatGPTResponse(prompt) {
//   const result = await model.generateContent(prompt);
//   return result.response.text();
// }

module.exports = server;
