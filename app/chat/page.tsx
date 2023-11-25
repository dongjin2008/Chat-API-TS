"use client";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { Server, get } from "http";
import Pusher from "pusher-js";
import { useRef } from "react";

interface Message {
  id: number;
  username: string;
  message: string;
}

export default function Chat() {
  const [data, setData] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
      cluster: "eu",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage: Message) => {
      setData((prevData) => [...prevData, newMessage]);
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth' });
      }
    });

    const get_original_message = async () => {
      try {
        const response = await axios.get("/api/messages");
        setData(response.data);
        if (ref.current) {
          ref.current.scrollIntoView({ behavior: 'smooth' });
        }
      } catch (error) {
        console.error(error);
      }
    };

    get_original_message();

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [data]);
  

  const handleSubmit = async (message: string) => {
    if (message === '') {
      alert('Please enter the message');
      return;
    }
    try {
      const username = localStorage.getItem('username');
      await axios.post('/api/messages', { username, message });
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  }

  const handleProfile = (message: Message) => {
    if (message && message.username && message.username[0]) {
      return message.username[0].toUpperCase();
    }
    else {
      return 'G';
    }
  }
  

  return (
    <main className="w-screen h-screen flex justify-center gap-[1.5rem]">
      <div className="flex justify-center flex-col gap-[2rem]">
        <div className="w-[40.5rem] h-[50rem] overflow-scroll">
          {data && data.map((message: Message) => {
            return (
              <div key={message.id} ref={ref} className="flex justify-start items-center gap-[1rem] mb-[1rem]">
                <div key={message.id} title={message.username} className="w-[4rem] h-[4rem] rounded-[50%] bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] text-base font-extrabold flex justify-center items-center">
                 {handleProfile(message)} 
                </div>
                <div className="flex flex-col justify-center items-start gap-[0.5rem]">
                  <p key={message.id} className="text-[#000000] text-lg">{message.message}</p>
                </div>
              </div>
            );
          }
          )}
        </div>
        <input type="text" placeholder="Enter the message..." className="w-[40.5rem] h-[4.5rem] pl-[3.5rem] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] rounded-[6.25rem]" value={message} onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit(message);
          }
        }} onChange={(e) => {setMessage(e.target.value)}}  />
      </div>
      <div className="w-full h-full smallscreen flex justify-center">
        <iframe src="https://www.twoplayergames.org/embed/basket-random" className="w-full h-auto"></iframe>
      </div>
    </main>
  )
}
