import React from 'react'
import SearchComponent1 from '../search-component1'

const PdlComponent1 = ({ peopleData, task, typeOfPdl }) => {
    return (
        <div>
            <p>{ task.name }</p>
            <br />
            <p>{ task.description }</p>
            <br />
            <ol className="pdl-list">
                {peopleData.map((person, index) => (
                    <li key={index}>
                        {person.name}: {person.id}
                    </li>
                ))}
            </ol>
            <br />
            <SearchComponent1 peopleData={peopleData} typeOfPdl={typeOfPdl}/>
        </div>
    )
}

export default PdlComponent1
