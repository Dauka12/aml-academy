import React, { useState } from 'react'
import searchImg from '../../assets/search.svg'
import './style.css'

const SearchComponent1 = ({ peopleData, typeOfPdl }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredResults, setFilteredResults] = useState([])

    const handleSearch = () => {
        const result = peopleData.filter(person =>
            person.id.includes(searchTerm)
        )
        setFilteredResults(result)
    }

    const generateRandomDate = () => {
        const start = new Date(2015, 0, 1)
        const end = new Date()
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
        return date.toISOString().split('T')[0]
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
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className='search-component-button' onClick={handleSearch}>Поиск</button>
                </div>
                <div className="search-component-description">
                    {searchTerm === '' ? (
                        <table className="search-component-table">
                            <thead>
                                <tr>
                                    <th>ФИО</th>
                                    <th>ИИН/БИН</th>
                                    <th>Дата включения в список</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredResults?.length > 0 ? (
                                    filteredResults.map((person, index) => (
                                        <tr key={index} className="search-component-result-item">
                                            <td>{person.name}</td>
                                            <td>{person.id}</td>
                                            <td>{generateRandomDate()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">Нажмите на кнопку поиск</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    ) : (
                        <table className="search-component-table">
                            <thead>
                                <tr>
                                    <th>ФИО</th>
                                    <th>ИИН/БИН</th>
                                    <th>Дата включения в список</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredResults?.length > 0 ? (
                                    filteredResults.map((person, index) => (
                                        <tr key={index} className="search-component-result-item">
                                            <td>{person.name}</td>
                                            <td>{person.id}</td>
                                            <td>{generateRandomDate()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">Результатов не найдено</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchComponent1
