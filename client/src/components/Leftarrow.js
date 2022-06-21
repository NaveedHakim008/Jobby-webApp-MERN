import React from 'react'
export default function (props) {
    const { style, classname, onClick } = { props }
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-200 absolute top-56" viewBox="0 0 20 20" fill="currentColor" onClick={onClick}>
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
        </svg>
    )
}
