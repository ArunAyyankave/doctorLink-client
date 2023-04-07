import React, { useState } from 'react';
import axios from '../../api/axios';
import { FaSearch } from 'react-icons/fa';

function Search(props) {

    const [query, setQuery] = useState('');

    const handleSearch = async () => {
        const response = await axios.get(`/search?query=${query}`);
        props.onSearchData(response.data);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex justify-center">
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="border border-gray-400 rounded-full py-2 pr-8 pl-4 w-64 sm:w-auto"
                    placeholder="Search"
                />
                <button onClick={handleSearch} className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <FaSearch />
                </button>
            </div>
        </div>
    );
}

export default Search;
