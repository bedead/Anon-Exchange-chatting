import {useState, useEffect} from 'react'
import './App.css'
import {supabase} from "./supabaseClient";
import {MyCard, OtherCard} from './components/card';
import {useCookies} from 'react-cookie';


function App() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState({username: "", content: ""});
    const {username, content} = message;
    const [cookies, setCookie] = useCookies(['user']);

    message.username = cookies.name;


    useEffect(() => {
        const profiles = supabase.channel("*").on("postgres_changes", {
            event: "INSERT",
            schema: "public",
            table: "profiles"
        }, (payload) => {
            console.log({payload});
            payload && setMessages((oldMessages) => [
                ...oldMessages,
                payload.new
            ]);
        }).subscribe();
        return() => {
            profiles.unsubscribe();
        };
    }, []);


    useEffect(() => {
        Init();
    }, []);


    async function Init() {
        const {data: profiles} = await supabase.from("profiles").select("*");
        if (profiles == null) 
            return;
        


        setMessages(profiles);
    }

    // Insere USERNAME e CONTENT dentro da tabela
    async function createPost() {
        await supabase.from("profiles").insert([{
                username,
                content
            }]).single();
        setMessage({username: message.username, content: ""});
        Init();
        submit();
        console.log(messages);
    }

    function submit() {
        localStorage.setItem("name", message.username);
        setCookie('name', message.username);
    }


    return (
        <div> {/* component */}
            <div className="bg-cover h-screen flex flex-col justify-center items-center" loading="lazy"
                style={
                    {backgroundImage: `url("https://source.unsplash.com/random?dark?aesthetic")`}
            }>
                <h2 className='text-white md:text-3xl sm:text-lg'>Anon Exchange</h2>
                {/* card  */}
                <div className="w-11/12 lg:w-1/3 bg-white my-10 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg">
                    {/* component  */}
                    <div className="flex-1 sm:p-6 justify-between flex flex-col h-[464px] ">

                        {/* top header section */}
                        <div className="flex sm:items-center justify-between border-b-2 pb-3 border-gray-100">
                            <h1 className=''>Service status :
                                <span>
                                    🟢 Online</span>
                            </h1>
                        </div>

                        {/* message section */}
                        <div id="messages" className="flex flex-col my-3 space-y-2 p-3 overflow-auto ">

                            {
                            messages ?. map((message) => ((message.username == cookies.name) ? <MyCard key={
                                    message.id
                                }
                                username={
                                    message.username
                                }
                                context={
                                    message.content
                                }/> : <OtherCard key={
                                    message.id
                                }
                                username={
                                    message.username
                                }
                                context={
                                    message.content
                                }/>))
                        } </div>

                        {/* bottom buttons and chat section */}
                        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                            <div className='relative flex mb-2'>
                                <input value={
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
                                    className="focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-5 bg-gray-100 rounded-md py-3"/>
                            </div>
                            <div className="relative flex">
                                {/* <span className="absolute inset-y-0 flex items-center">
                                    <button type="button" className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                                        </svg>
                                    </button>
                                </span> */}
                                <input value={content}
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
                                <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
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
    )
}

export default App
