import React from 'react';

function SearchBar({ query, onQueryChange }) {
    return (
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <input 
                type="text" 
                value={query} 
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search by company or date..."
                style={{
                    borderRadius: '15px',
                    borderColor: '#00a78e',
                    padding: '5px 10px',
                    outline: 'none'
                }}
            />
        </div>
    );
}

export default SearchBar;  // This line exports the SearchBar function as the default export

