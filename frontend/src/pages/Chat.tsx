import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSocket } from "../hooks/socket";

function Chat() {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [roomId, setRoomId] = useState("testRoom");
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => {
      socket.emit("joinRoom", roomId);
      setRoomId(roomId);
      socket.on("chatMessage", (data) => {
        setChatMessages((prevMessages) => [...prevMessages, data.message]);
      });
    });

    return () => {
      socket.off("disconnect");
    };
  }, [socket, roomId]);

  const submitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) {
      alert("Please enter a message");
      return;
    }
    socket.emit("chatMessage", { roomId, message });
    // console.log(`Sending message: ${message} to room: ${roomId}`);
    // setChatMessages([...chatMessages, message]);
    setMessage("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Chat Page</h1>

      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <Label htmlFor="chatMessages">Chat Messages</Label>
          <div className="border p-2 h-48 overflow-y-auto bg-gray-50">
            {chatMessages.map((msg, index) => (
              <div key={index} className="p-2 border-b last:border-b-0">
                {msg}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={submitMessage} className="flex space-x-2">
          <Input
            id="message"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1"
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
