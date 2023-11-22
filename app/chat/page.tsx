"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface Message {
  username: string;
  message: string;
}

export default function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get("/api/messages");
        setMessages(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getMessages();
  }, []);
  
  return (
    <main className="w-screen h-screen flex">
      <div className="flex justify-center flex-col gap-[2rem]">
        <div className="w-[40.5rem] h-[50rem]">
          {messages.map((message: Message) => {
            return (
              <div className="flex justify-start items-center gap-[1rem]">
                <div className="w-[4rem] h-[4rem] rounded-[50%] bg-[#C4C4C4] flex justify-center items-center">{message.username[0]}</div>
                <div className="flex flex-col justify-center items-start gap-[0.5rem]">
                  <p className="text-[#000000] text-[2rem]">{message.message}</p>
                </div>
              </div>
            );
          }
          )}
        </div>
        <input type="text" />
      </div>
      <div>

      </div>
    </main>
  )
}
