const Create_Join_Toast = ({handlecreateDialogOpen, handlejoinDialogOpen}) => {


    return (
        <div id="toast-message-cta" className="flex mx-auto md:absolute md:right-5 md:bottom-10 items-center max-w-xs p-2 md:p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow-lg drop-shadow-lg dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
            <div className="flex">

                <img className="w-8 h-8 rounded-full shadow-lg" src="https://avatars.dicebear.com/api/adventurer/indian.svg" alt="Jese Leos image"/>
                <div className="ml-3 text-sm font-normal">

                    <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                        Satyam Mishra</span>
                    <div className="mb-2 text-sm font-normal">Hi,this is Satyam Mishra creator of this application.
                                                                    Now you can create chat rooms for quick discussions and private messaging.</div>
                    <div className="flex justify-evenly">
                        <button onClick={handlecreateDialogOpen}
                            className="cursor-pointer inline-flex px-2.5 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-3xl hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">Create Chat Room</button>
                        <button onClick={handlejoinDialogOpen}
                            className="cursor-pointer inline-flex px-2.5 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-3xl hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">Join Room</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create_Join_Toast
