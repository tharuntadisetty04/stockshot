import React from 'react';

const Pagination = ({ onPageChange, currentPage, totalPages }) => {
    return (
        <div className='my-4'>
            <div className='flex gap-4'>
                <button className='bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 font-semibold rounded-md' onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <button className='bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 font-semibold rounded-md' onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default Pagination;
