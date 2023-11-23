"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface Message {
  id: number;
  username: string;
  message: string;
}

export default function Chat() {
  const [data, setData] = useState<Message[]>([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (message: string) => {
    try {
      const username = localStorage.getItem('username');
      await axios.post('/api/messages', { username, message });
      getMessages();
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  }
  const getMessages = async () => {
      try {
        const response = await axios.get("/api/messages");
        console.log(response);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    
    getMessages();

  }, []);

  
  return (
    <main className="w-screen h-screen flex">
      <div className="flex justify-center flex-col gap-[2rem]">
        <div className="w-[40.5rem] h-[50rem]">
          {data && data.map((message: Message) => {
            return (
              <div className="flex justify-start items-center gap-[1rem]">
                <div key={message.id} className="w-[4rem] h-[4rem] rounded-[50%] bg-[#C4C4C4] flex justify-center items-center">{message.username[0]}</div>
                <div className="flex flex-col justify-center items-start gap-[0.5rem]">
                  <p key={message.id} className="text-[#000000] text-[2rem]">{message.message}</p>
                </div>
              </div>
            );
          }
          )}
        </div>
        <input type="text" value={message} onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit(message);
          }
        }} onChange={(e) => {setMessage(e.target.value)}}  />
      </div>
      <div>

      </div>
    </main>
  )
}
