import React, {useRef} from "react";
import {useEffect, useState} from "react";
import {supabase} from "../supabaseClient";
import {useCookies} from "react-cookie";
import {MyCard, OtherCard} from "./card";


const Chatroom = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState({username: "", content: ""});
    const {username, content} = message;
    const messagesContainerRef = useRef(null);
    const [cookies, setCookie] = useCookies(['user']);
    const [roomName, setRoomName] = useState('');
    const roomCode = localStorage.getItem('room_code');
    localStorage.setItem('room_name', roomName);

    useEffect(() => {
        const fetchRoomData = async () => {
            const {data: roomData, error: roomError} = await supabase.from('chat_room').select('room_name').eq('room_code', roomCode).limit(1);

            if (roomError) {
                console.error('Error fetching room data:', roomError.message);
                return;
            }

            if (roomData && roomData.length > 0) {
                setRoomName(roomData[0].room_name);
            }
        };

        fetchRoomData();
    }, [roomCode]);

    useEffect(() => {
        const storedUsername = localStorage.getItem("name");
        setMessage((prevMessage) => ({
            ...prevMessage,
            username: storedUsername
        }));
    }, []);

    useEffect(() => { // Subscribe to the chat_room table with the given roomCode
        const chat_room = supabase.channel("*").on("postgres_changes", {
            event: "INSERT",
            schema: "public",
            table: "chat_room"
        }, (payload) => {
            if (payload.new.room_code === roomCode) {
                payload && setMessages((prevMessages) => [
                    ...prevMessages,
                    payload.new
                ]);
            }
        }).subscribe();

        return() => { // Unsubscribe when component unmounts
            chat_room.unsubscribe();
        };
    }, [roomCode]);

    useEffect(() => {
        Init();
    }, []);


    async function Init() {
        const {data: profiles} = await supabase.from("chat_room").select("*").eq('room_code', roomCode);
        if (profiles == null) 
            return;
        


        setMessages(profiles);
    }

    async function createPost() {
        if (!content || !username) {
            alert('Message and username are required.');
            return;
        } else {
            await supabase.from("chat_room").insert([{
                    room_name: roomName,
                    room_code: roomCode,
                    message: content,
                    username: username

                }]).single();
            // setMessage({username: message.username, content: ""});
            Init();
            submit();
            console.log(messages);
        }
    }

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            const container = messagesContainerRef.current;
            container.scrollTop = container.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom(); // Scroll to bottom after messages update
    }, [messages]);

    function submit() {
        localStorage.setItem("name", message.username);
        setCookie('name', message.username);
    }

    return (
        <div> {/* <div>
                <h1>Chat Room - {roomCode}</h1>
                <div> {
                    messages.map((message, index) => (
                        <div key={index}>
                            {
                            message.message
                        }</div>
                    ))
                } </div>
            </div> */}
            <div> {/* component */}
                <div className="bg-cover h-screen flex flex-col justify-center items-center" loading="lazy"
                    style={
                        {backgroundImage: `url("https://source.unsplash.com/random?dark?night/1600x900")`}
                }>

                    <h2 className='text-white text-5xl'>Anon Exchange
                    </h2>

                    <h3 className='text-white mt-4 text-3xl'>
                        Room Name - {roomName} </h3>

                    {/* card  */}

                    <div className="w-11/12 lg:w-1/3 bg-white my-10 rounded-xl bg-opacity-10 backdrop-filter backdrop-blur-lg">
                        {/* component  */}
                        <div className="flex-1 sm:p-6 justify-between flex flex-col h-[464px] ">

                            {/* top header section */}
                            <div className="flex sm:items-center text-white p-4 md:p-0 justify-between border-b-2 border-gray-100">
                                <h1 className='pb-3'>Service status :
                                    <span>
                                        🟢 Online</span>
                                </h1>
                            </div>

                            {/* message section */}


                            <div id="messages"
                                ref={messagesContainerRef}
                                // Set the ref for the messages container
                                className="flex flex-col my-3 space-y-2 p-3 overflow-auto "
                            >

                                {
                                messages ?. map((message) => ((message.username == cookies.name || message.username === localStorage.getItem('name')) ? <MyCard key={
                                        message.id
                                    }
                                    username={
                                        message.username
                                    }
                                    context={
                                        message.message
                                    }/> : <OtherCard key={
                                        message.id
                                    }
                                    username={
                                        message.username
                                    }
                                    context={
                                        message.message
                                    }/>))
                            } </div>

                            {/* bottom buttons and chat section */}
                            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                                <div className='relative flex mb-2'>
                                    <input required
                                        value={
                                            (username)
                                        }
                                        onChange={
                                            (e) => setMessage({
                                                ...message,
                                                username: e.target.value
                                            })
                                        }
                                        type="text"
                                        placeholder="Username"
                                        className="w-1/2 focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-5 bg-gray-100 rounded-md py-3"/>
                                    <div className="absolute right-0 items-center inset-y-0 sm:flex">
                                        <button type="button"
                                            onClick={
                                                () => {
                                                    submit();
                                                    scrollToBottom();
                                                    window.location.reload();
                                                }
                                            }
                                            className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                                            <span className="font-bold">Set name</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="relative flex">
                                    {/* <span className="absolute inset-y-0 flex items-center">
                                    <button type="button" className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                                        </svg>
                                    </button>
                                </span> */}
                                    <input required
                                        value={content}
                                        onChange={
                                            (e) => {
                                                setMessage({
                                                    ...message,
                                                    content: e.target.value
                                                });
                                                setCookie('name', e.target.value);
                                            }
                                        }
                                        type="text"
                                        placeholder="Write your message!"
                                        className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-5 bg-gray-100 rounded-md py-3"/>
                                    <div className="absolute right-0 items-center inset-y-0 sm:flex">
                                        <button onClick={createPost}
                                            type="button"
                                            className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                                            <span className="font-bold">Send</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chatroom
