import React from 'react';

const ErrorDisplay = ({ message }) => {
    return (
        <div className='text-center text-4xl font-semibold m-10'>
            Error: {message}
        </div>
    );
};

export default ErrorDisplay;
