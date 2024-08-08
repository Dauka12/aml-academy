import React, { useState } from 'react';
import './style.scss';
import DropdownButton from './DropdownButton';
import DropdownContent from './DropdownContent';
import SimpleTable from './../../SimpleTable';


const DropdownPageTable = ({ dataBtn, Height, simpleTableProps }) => {
  const [openDropdown, setOpenDropdown] = useState(0);

  const handleButtonClick = (index) => {
    setOpenDropdown(index);
  };

  return (
    <div className='dropParentTable'>
      <div className="dropdown-page">
        <div className="buttons-container">
          {dataBtn.map((item, index) => (
            <DropdownButton
              label={item.name}
              onClick={() => handleButtonClick(index)}
              isOpen={openDropdown === index}
              key={index}
            />
          ))}
        </div>

        <div
          className="dropdown-container"
          style={{ height: Height }}
        >
         
          {dataBtn.map((item, index) => (
            <DropdownContent isOpen={index === openDropdown} key={item.name}>
              
              <table className='TableOfTable'>
                <tr>
                  <th colSpan={2}>{item.mainRow}</th>
                </tr>
              </table>
             

            {item.type === 'simpleTable' && simpleTableProps[index] ? (
            <div className='SimpleTableStyle'><SimpleTable {...simpleTableProps[index]}
            /></div>
            ) : (
              <div>{/* Ваш дополнительный контент, если необходимо */}</div>
            )}
          </DropdownContent>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropdownPageTable;
