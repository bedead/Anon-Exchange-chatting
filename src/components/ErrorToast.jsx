import React, {useEffect, useState} from 'react';

const ErrorToast = ({message, isVisible, onClose}) => {
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setShowToast(true);
            const timer = setTimeout(() => {
                setShowToast(false);
                onClose();
            }, 3000); // Change the duration as needed (in milliseconds)

            return() => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        <div className={
            `flex absolute md:right-5 mx-auto z-10 md:top-5 m-5 items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 ${
                showToast ? '' : 'hidden'
            }`
        }>
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
                </svg>
            </div>
            <div className="ml-3 text-sm font-normal">
                {message}</div>
        </div>
    );
};

export default ErrorToast;
