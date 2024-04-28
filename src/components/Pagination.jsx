import React from 'react';

const Pagination = ({ setPage, currentPage, totalPages }) => {
    return (
        <div className='my-4'>
            <div className='flex'>
                <button className='rounded-l-md bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 border-r-2 font-semibold ' onClick={() => setPage(1)} disabled={currentPage === 1}>1</button>
                <button className='bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 border-r-2 font-semibold ' onClick={() => setPage(2)} disabled={currentPage === 2}>2</button>
                <button className='bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 border-r-2 font-semibold ' onClick={() => setPage(3)} disabled={currentPage === 3}>3</button>
                <button className='bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 border-r-2 font-semibold ' onClick={() => setPage(4)} disabled={currentPage === 4}>4</button>
                <button className='rounded-r-md bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 font-semibold ' onClick={() => setPage(5)} disabled={currentPage === totalPages}>5</button>
            </div>
        </div>
    );
};

export default Pagination;
