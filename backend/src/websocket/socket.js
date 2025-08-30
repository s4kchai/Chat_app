const { Server } = require("socket.io");

function initSocket(server) {
  const io = new Server(server, {
    cors: { origin: "http://localhost:8080" },
    methods: ["GET", "POST"],
    credentials: true,
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", (roomId) => {
      console.log(`User ${socket.id} joined room: ${roomId}`);
      socket.join(roomId);
      socket.emit("roomJoinedByUser", roomId);
    });

    socket.on("leaveRoom", (roomId) => {
      console.log(`User ${socket.id} joined room: ${roomId}`);
      socket.leave(roomId);
    });
    socket.on("chatMessage", (data) => {
      console.log("chatMessage event received:", data);
      const { roomId, message } = data;
      console.log(`this is server from ${socket.id} in room ${roomId} ${message} `);
      io.to(roomId).emit("chatMessage", { roomId, message });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
}

module.exports = { initSocket };
