import React from 'react';
import './style.scss';

function SimpleTable({ columns, data }) {
    // Function to handle newlines in table cell text
    const renderTextWithLineBreaks = (text) => {

        if (typeof text !== 'string') return text;

        return text.split('\n').map((line, index, array) => (
            <React.Fragment key={index}>
                {line}
                {index !== array.length - 1 && <br />}
            </React.Fragment>
        ));
    };



    return (
        <div className="simpleTable">
            <div className="wrapper">
                <table>
                    {
                        columns 
                            ? columns.length === 1 
                                ? (
                                    <thead>
                                        <tr>
                                            {columns.map((column, index) => <th key={index} style={{textAlign: 'center'}}>{column}</th>)}
                                        </tr>
                                    </thead>
                                )
                                : (
                                    <thead>
                                        <tr>
                                            {columns.map((column, index) => <th key={index}>{column}</th>)}
                                        </tr>
                                    </thead>
                                ) 
                            : null
                    }
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((column, columnIndex) => (
                                    <td key={columnIndex}>{renderTextWithLineBreaks(column)}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SimpleTable;
