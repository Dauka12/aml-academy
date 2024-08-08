import React, { useState } from 'react'
import searchImg from '../../assets/search.svg'
import './style.css'

const SearchComponent = ({ peopleData, typeOfPdl }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredResults, setFilteredResults] = useState([])

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        const result = peopleData.filter(person => 
            person.id.includes(value)
        )
        setFilteredResults(result)
    }
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
                        onChange={handleSearch}
                    />
                    <button className='search-component-button'>Поиск</button>
                </div>
                <div className="search-component-description">
                    {searchTerm === '' ? (
                        <p>{ typeOfPdl }</p>
                    ) : (
                        <ul className="search-component-results">
                            {filteredResults.length > 0 ? (
                                filteredResults.map((person, index) => (
                                    <li key={index} className="search-component-result-item">
                                        {person.name}: {person.id}
                                    </li>
                                ))
                            ) : (
                                <p>Результатов не найдено</p>
                            )}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchComponent
