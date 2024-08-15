import React, { useState } from 'react';
import searchImg from '../../assets/search.svg';
import './style.css';

const SearchComponent = ({ peopleData, typeOfPdl }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearched, setIsSearched] = useState(false);
    const [isInList, setIsInList] = useState(false);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
        setIsSearched(false);  // Reset search status when the input changes
    };

    const handleSearch = () => {
        const found = peopleData.some(person => person.id === searchTerm);
        setIsInList(found);
        setIsSearched(true);
    };

    return (
        <div className='search-component-wrapper'>
            <div className='search-component'>
                <div className='search-component-input'>
                    <img className='search-component-icon' src={searchImg} alt="" />
                    <input
                        className='search-component-text-input'
                        type="text"
                        placeholder='ИИН/БИН'
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                    <button className='search-component-button' onClick={handleSearch}>
                        Поиск
                    </button>
                </div>
                <div className="search-component-description">
                    {searchTerm === '' ? (
                        <p>{typeOfPdl}</p>
                    ) : isSearched ? (
                        <p>
                            {isInList ? 'Есть в списке' : 'Нет в списке'}
                        </p>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default SearchComponent;
