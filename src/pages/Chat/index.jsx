import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";

import { getMessages } from "../../services/messages";
import { getRooms } from "../../services/rooms";

import { SidebarContainer, ChatContainer } from "../../containers";

import { ChatWrapper, LoadingContainer } from "./styles";
import loadingSvg from "../../assets/loading.svg";

function Chat() {
  const [currentRoom, setCurrentRoom] = useState({});
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);

  const [showDrop, setShowDrop] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRooms().then((rooms) => {
      setRooms(rooms);
      setCurrentRoom(rooms[0]);
    });
  }, []);

  useEffect(() => {
    if (!currentRoom._id) return;

    getMessages(currentRoom._id).then((messages) => {
      setMessages(messages);
      setLoading(false);
    });
    setLoading(false);
  }, [currentRoom._id]);

  useEffect(() => {
    var pusher = new Pusher("4f1c569c128a5f575b42", {
      cluster: "ap2",
    });
    const messageChannel = pusher.subscribe("messages");

    messageChannel.bind("inserted", (newMessage) => {
      if (newMessage.room_id === currentRoom._id) {
        setMessages([...messages, newMessage]);
      }
    });

    return () => {
      messageChannel.unbind_all();
      messageChannel.unsubscribe();
    };
  }, [messages, currentRoom._id]);

  useEffect(() => {
    var pusher = new Pusher("4f1c569c128a5f575b42", {
      cluster: "ap2",
    });
    const messageChannel = pusher.subscribe("messages");

    messageChannel.bind("deleted", (deletedMessage) => {
      const currentMessages = messages.filter((message) =>
        message.room_id === currentRoom._id
          ? message._id !== deletedMessage._id
            ? message
            : null
          : null
      );
      setMessages(currentMessages);
    });

    return () => {
      messageChannel.unbind_all();
      messageChannel.unsubscribe();
    };
  }, [messages, currentRoom._id]);

  useEffect(() => {
    var pusher = new Pusher("4f1c569c128a5f575b42", {
      cluster: "ap2",
    });

    const roomChannel = pusher.subscribe("rooms");

    roomChannel.bind("inserted", (newRoom) => {
      setRooms([...rooms, newRoom]);
    });

    roomChannel.bind("deleted", (deletedRoom) => {
      const currentRooms = rooms.filter((room) =>
        room._id !== deletedRoom._id ? room : null
      );

      setRooms(currentRooms);

      if (deletedRoom._id === currentRoom._id) {
        setCurrentRoom(rooms[0]);
      }
    });

    roomChannel.bind(
      "updated",
      async (updatedRoom) => {
        getRooms().then((rooms) => {
          setRooms(rooms);

          if (currentRoom._id === updatedRoom._id) {
            const current = rooms.filter((room) =>
              room._id === updatedRoom._id ? room : null
            )[0];
            setCurrentRoom(current);
          }
        });

        return () => {
          roomChannel.unbind_all();
          roomChannel.unsubscribe();
        };
      },
      [rooms, currentRoom._id]
    );
  });

  return (
    <ChatWrapper>
      {!loading ? (
        <>
          <SidebarContainer
            rooms={rooms}
            currentRoom={currentRoom}
            messages={messages}
            setRooms={setRooms}
            setCurrentRoom={setCurrentRoom}
            showDrop={showDrop}
            setShowDrop={setShowDrop}
          />

          <ChatContainer
            currentRoom={currentRoom}
            setCurrentRoom={setCurrentRoom}
            setRooms={setRooms}
            messages={messages}
            showDrop={showDrop}
            setShowDrop={setShowDrop}
          />
        </>
      ) : (
        <LoadingContainer>
          <img src={loadingSvg} alt="Loading"></img>
        </LoadingContainer>
      )}
    </ChatWrapper>
  );
}

export default Chat;
