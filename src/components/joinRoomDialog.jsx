import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import ErrorToast from "./ErrorToast";


const JoinRoomDialogModel = ({onClose}) => {

    const [roomCode, setRandomCode] = useState('');
    let navigate = useNavigate();

    const handleRoomCodeChange = (event) => {
        setRandomCode(event.target.value);
    };

    const handleJoinRoom = () => {
        if (roomCode) {
            localStorage.setItem('room_code', roomCode);

            let path = `/chat_room/${roomCode}`;
            navigate(path);

            onClose();
        } else {
            setToastMessage(`Please enter room code.`);
            setShowToast(true);
        }
    };

    // toast handling
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleToastClose = () => {
        setShowToast(false);
    };

    return (
        <div className="fixed left-0 top-0 z-[1055] w-full h-full overflow-y-auto overflow-x-hidden outline-none" tabIndex="-1" aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog">
            <ErrorToast message={toastMessage}
                isVisible={showToast}
                onClose={handleToastClose}/>
            <div className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
                <div className="pointer-events-auto relative flex w-full flex-col rounded-2xl bg-opacity-60 backdrop-filter backdrop-blur-lg text-current shadow-lg border-[0.5px] ">
                    <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                        <h5 className="text-xl font-medium leading-normal text-white dark:text-neutral-200" id="exampleModalScrollableLabel">
                            Enter the room code to join chat
                        </h5>
                        <button onClick={onClose}
                            type="button"
                            className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                            aria-label="Close">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>

                    <div className="relative py-4 px-2">
                        <input className="px-2 py-2 w-full border-none outline-none text-white bg-transparent placeholder:text-gray-200 " type="text"
                            value={roomCode}
                            onChange={handleRoomCodeChange}
                            placeholder="Enter room code"/>
                    </div>

                    <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                        <button onClick={handleJoinRoom}
                            type="button"
                            className="ml-1 inline-block bg-primary bg-black rounded-lg text-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal">
                            Join room
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JoinRoomDialogModel;
