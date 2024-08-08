import React from 'react';
import './DropdownContent.scss';
import componentMap_level_2 from '../../../../../pages/AdminPage_v2/constructor/ComponentMap_level_2';

const DropdownContent = ({ isOpen, children, content=null }) => {
  const formatText = (text) => {
      let res = '';

      try {
          res = text.replace(/"(.*?)"/g, '<span style="font-weight: 600;">$1</span>');
      } catch (e) {
          res = text;
      }

      return res;
  }

  if (content === null) {
    return <div className={`dropdown-contentData ${isOpen ? 'open' : ''}`} dangerouslySetInnerHTML={{ __html: formatText(children) }} />;
  }
  else {

    return <div className={`dropdown-contentData ${isOpen ? 'open' : ''}`}>
      {
        content.map((child, index) => (
      
          componentMap_level_2[child.name] && (
            React.createElement(componentMap_level_2[child.name], {...child.values, ['key']: index})
          ) 
        ))
      }
    </div>
  }

};

export default DropdownContent;
