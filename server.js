const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const path = require("path")

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static(path.join(__dirname, "public")))

io.on("connection", socket => {

  socket.on("joinRoom", ({ username, room }) => {
    socket.join(room)
    socket.username = username
    socket.room = room

    socket.to(room).emit("message", { user: "System", text: username + " joined" })
  })

  socket.on("chatMessage", msg => {
    io.to(socket.room).emit("message", { user: socket.username, text: msg })
  })

  socket.on("disconnect", () => {
    if (socket.username && socket.room) {
      io.to(socket.room).emit("message", { user: "System", text: socket.username + " left" })
    }
  })
})

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

