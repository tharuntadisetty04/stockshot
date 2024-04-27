import React from 'react';

const SearchBar = ({ value, onChange }) => {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Search for images"
            className='border-b-2 border-b-purple-400 outline-none p-2 rounded-md bg-slate-50'
        />
    );
};

export default SearchBar;
