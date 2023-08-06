export function OtherCard(props) {
    return (
        <div className="chat-message">
            <div className="flex items-end justify-end">
                <div>
                    <img src={
                            "https://avatars.dicebear.com/api/adventurer/" + props.username + ".svg"
                        }
                        alt="user avatar"
                        className="w-6 h-6 mx-auto rounded-full order-2"/>
                    <p className="text-sm">
                        {
                        props.username
                    } </p>
                </div>
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                    <div>
                        <span className="px-4 text-base py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                            {
                            props.context
                        } </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function MyCard(props) {
    return (
        <div className="chat-message">
            <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                    <div>
                        <span className="px-4 text-base py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
                            {
                            props.context
                        } </span>
                    </div>
                </div>
                <div>
                    <img src={
                            "https://avatars.dicebear.com/api/adventurer/" + props.username + ".svg"
                        }
                        alt="user avatar"
                        className="w-6 h-6 mx-auto rounded-full order-2"/>
                    <p className="text-sm">
                        {
                        props.username
                    } </p>
                </div>
            </div>
        </div>
    )
}
