const socket = io()

const params = new URLSearchParams(window.location.search)
const username = params.get("name")
const room = params.get("room")

document.getElementById("roomName").textContent = "Room: " + room

socket.emit("joinRoom", { username, room })

socket.on("message", msg => {
  const div = document.createElement("div")
  div.textContent = msg.user + ": " + msg.text
  document.getElementById("messages").appendChild(div)
})

function send() {
  const msg = document.getElementById("input").value
  socket.emit("chatMessage", msg)
  document.getElementById("input").value = ""
}
