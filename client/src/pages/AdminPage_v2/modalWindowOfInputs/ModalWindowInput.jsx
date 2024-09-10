import React, { useEffect, useRef, useState } from 'react';
import './modalWindowInput.scss';

function fileToBase64(file, callback) {
  if (!file) {
    console.error("No file provided for conversion.");
    return;
  }

  const reader = new FileReader();

  reader.onloadend = () => {
    if (reader.readyState === FileReader.DONE) { // Ensures the read is complete
      if (typeof callback === 'function') {
        callback(reader.result);
      }
    }
  };

  reader.onerror = (error) => {
    console.error("Error reading file:", error);
  };

  reader.readAsDataURL(file);
}

const Modal = ({ onClose, inputs, onSubmit, exValues, example }) => {
  const [values, setValues] = useState(exValues || {});
  const [showExample, setShowExample] = useState(false);
  
  useEffect(() => {
    const hasListInput = inputs.some((x) => x.name == 'list');
    const hasTabsInput = inputs.some((x) => x.name == 'tabs');
    const hasTabsGlossaryInput = inputs.some((x) => x.name == 'tabsGlossary');
    const hasTabsDataInput = inputs.some((x) => x.name == 'tabsData');
    const hasItems_text = inputs.some((x) => x.type == 'items_text');
    const hasLeftAnswer = inputs.some((x) => x.name == 'leftAnswer')
    const hasRightAnswer = inputs.some((x) => x.name == 'rightAnswer')
    const hasQuestions = inputs.some((x) => x.name == 'questions')
    const hasColumnsInput = inputs.some((x) => x.name == 'columns')
    const hasDataInput = inputs.some((x) => x.name == 'data')
    const hasIconInput = inputs.some((x) => x.name == 'icons');
    const hasCentered = inputs.some((x) => x.name == 'isCentered');
    const adjustWidth = inputs.some((x) => x.name == 'adjustWidth');
    const isSublist = inputs.some((x) => x.name == 'isSublist');
    const hasAlignment = inputs.some((x) => x.name == 'alignment');
    const hasImages = inputs.some((x) => x.name == 'images');
    const notCrop = inputs.some((x) => x.name == 'notCrop');

    const hasTableInput = inputs.some((x) => x.name === 'rows');

    const hasLeft = inputs.some((x) => x.name === 'left');
    const hasRight = inputs.some((x) => x.name === 'right');

    if (hasLeft) {
      setValues(prevValues => ({
        ...prevValues,
        'adjustWidth': exValues?.left || null
      }))
    }

    if (hasRight) {
      setValues(prevValues => ({
        ...prevValues,
        'adjustWidth': exValues?.right || null
      }))
    }


    if (adjustWidth) {
      setValues(prevValues => ({
        ...prevValues,
        'adjustWidth': exValues?.adjustWidth || false
      }))
    }

    if (notCrop) {
      setValues(prevValues => ({
        ...prevValues,
        'notCrop': exValues?.notCrop || true
      }))
    }

    if (inputs.some((x) => x.name === 'version')) {
      setValues(prevValues => ({
        ...prevValues,
        'version': 2
      }))
    }

    if (hasImages) {
      setValues(prevValues => ({
        ...prevValues,
        'images': exValues?.images || []
      }))
    }

    if (isSublist) {
      setValues(prevValues => ({
        ...prevValues,
        'isSublist': exValues?.isSublist || false
      }))
    }

    if (hasAlignment) {
      setValues(prevValues => ({
        ...prevValues,
        'alignment': exValues?.alignment || 'сenter'
      }))
    }

    if (hasIconInput) {
      setValues(prevValues => ({
        ...prevValues,
        'icons': exValues?.icons || []
      }))
    }

    if (hasListInput) {
      // Update the 'list' property in the values state to an empty string
      setValues((prevValues) => ({
        ...prevValues,
        'list': exValues?.list || [],
      }));
    } else if (hasTableInput) {
      setValues((prevValues) => ({
        ...prevValues,
        'rows': exValues?.rows || [],
      }));
    } else if (hasTabsInput && hasTabsGlossaryInput) {
      const isTabsGlossaryObject = exValues?.tabsGlossary && typeof exValues.tabsGlossary === 'object' && !Array.isArray(exValues.tabsGlossary);

      let newTabsGlossary = [];
      if (isTabsGlossaryObject) {
          // Convert the tabsGlossary object to an array of its values
          newTabsGlossary = Object.values(exValues.tabsGlossary);
      } else {
          // Use the tabsGlossary array as is
          newTabsGlossary = exValues?.tabsGlossary || [];
      }



      setValues((prevValues) => ({
          ...prevValues,
          'tabs': exValues?.tabs || [],
          'tabsGlossary': newTabsGlossary,
      }));
    } else if (hasTabsInput && hasTabsDataInput) {
      // Convert tabs back into array of objects with ids
      const newTabs = exValues?.tabs?.map((tab, index) => ({
        id: tab + '-' + index, // Example id generation, adjust as needed
        tab: tab
      })) || [];


      // Remove tabName from tabsData and adjust tabsIndex to match newTabs ids
      const newTabsData = exValues?.tabsData?.map(tabData => {
          const tabNameIndex = newTabs.findIndex(tab => tab.tab === tabData.tabName);
          const newTabsIndex = tabNameIndex !== -1 ? newTabs[tabNameIndex].id : null;
          const { tabName, ...rest } = tabData;
          return { ...rest, tabsIndex: newTabsIndex };
      }) || [];


      setValues((prevValues) => ({
          ...prevValues,
          tabs: newTabs,
          tabsData: newTabsData,
      }));
    } else if (hasLeftAnswer && hasRightAnswer && hasQuestions) {
      const originalQuestionsList = exValues?.questions?.map(question => {
        // Determine the original 'side' value based on the comparison
        let originalSide;
        if (question.side === exValues?.leftAnswer) {
            originalSide = 0;
        } else if (question.side === exValues?.rightAnswer) {
            originalSide = 1;
        }
    
        // Return a new object with the original 'side' value
        return { ...question, side: originalSide };
      });
      setValues((prevValues) => ({
        ...prevValues,
        questions: originalQuestionsList,
      }));
    } else if (hasColumnsInput && hasDataInput) {
      setValues((prevValues) => ({
        ...prevValues,
        'columns': exValues?.columns || ['Первая колонна', 'Вторая колонна'],
        'data': exValues?.data || [['Значение', 'Значение']],
      }));
    } else if (hasIconInput && hasDataInput) {
      setValues((prevValues) => ({
        ...prevValues,
        'icons': exValues?.icons || [''],
        'data': exValues?.data || [{title: 'Заголовок', description: 'Текст'}],
      }));
    } else if (hasCentered) {
      setValues((prevValues) => ({
        ...prevValues,
        'isCentered': exValues?.isCentered || false
      }));
    }

    if (hasItems_text) {
      setValues((prevValues) => ({
        ...prevValues,
        'items': exValues?.items || [{'text': 'Элемент'}],
      }));
    }
  }, [inputs])

  const handleAddToList = (...args) => {
    if (args?.length == 1) {
      if (args[0] == 'tabs') {
        setValues((prevValues) => ({
          ...prevValues,
          [args[0]]: [...prevValues[args[0]], 'Новый текст'],
          'tabsGlossary': [...prevValues['tabsGlossary'], 'Новый раздел']
        }));
      } else if (args[0] == 'dropd') {
        setValues((prevValues) => {
          const newTabsId = Date.now() + '-' + prevValues.tabs?.length;
          const newId = Date.now() + '-' + prevValues.tabsData?.length;
          return {
            ...prevValues,
            'tabs': [...prevValues['tabs'], {'id': newTabsId, 'tab': 'Вкладка ' + (values.tabs?.length + 1)}],
            'tabsData': [...prevValues['tabsData'], {'id': newId, 'header': 'Заголовок вкладки', 'data': 'Данные вкладки', 'tabsIndex': newTabsId }]
          }
        });
      } else if (Number.isInteger(args[0]))  {
        setValues((prevValues) => {
          const newId = Date.now() + '-' + prevValues.tabsData?.length;
          return {
            ...prevValues,
            'tabsData': [...prevValues['tabsData'], {'id': newId, 'header': 'Заголовок вкладки', 'data': 'Данные вкладки', 'tabsIndex': args[0] }]
          }
        });
      } else if (args[0] == 'listNameDescroptionItems') {
        setValues((prevValues) => ({
          ...prevValues,
          'list': [...prevValues['list'], 
          {
            name: 'Вкладка', 
            description: 'Описание вкладки', 
            items: [
              'Элемент списка',
            ]
          }],
        }));
      } else if (args[0] == 'items_text') {
        setValues((prevValues) => ({
          ...prevValues,
          items: [...prevValues['items'], {text: 'Элемент'}],
        }));
      } else if (args[0] == 'dnd_questions') {
        setValues((prevValues) => ({
          ...prevValues,
          ['questions']: [...prevValues['questions'] || [], {answer: 'Новый вопрос', side: 0}],
        }));
      } else if (args[0] == 'icons-title-desx') {
        setValues((prevValues) => ({
          ...prevValues,
          ['data']: [...prevValues['data'] || [], {title: 'Заголовок', description: 'Текст'}],
          ['icons']: [...prevValues['icons'] || [], ''],
        }));
      } else {
        setValues((prevValues) => ({
          ...prevValues,
          [args[0]]: [...prevValues[args[0]], 'Новый элемент'],
        }));
      }
    } else if (args?.length == 2) {
      if (args[0] == 'tabsData') {
        setValues((prevValues) => {
          const newId = Date.now() + '-' + prevValues.tabsData?.length;
          return {
            ...prevValues,
            'tabsData': [...prevValues['tabsData'], {'id': newId, 'header': 'Заголовок вкладки', 'data': 'Данные вкладки', 'tabsIndex': args[1] }]
          }
        });
      } else if (args[0] == 'dropDownListItems') {
        const updatedList = [...values.list];
        if (args[1] >= 0 && args[1] < updatedList?.length) {
          updatedList[args[1]].items = [...updatedList[args[1]].items, 'Элемент списка']; // Assuming you're adding an empty object
        }
        setValues((prevValues) => {
          return {
              ...prevValues,
              'list': updatedList
          };
        });
      } else if (args[0] == 'title_desx_list') {
        if (args[1] == 'data') {
          setValues((prevValues) => ({
            ...prevValues,
            ['data']: [...prevValues['data'] || [], {title: 'Заголовок', description: 'Описание'}],
          }));
        } else {
          setValues((prevValues) => ({
            ...prevValues,
            ['list']: [...prevValues['list'] || [], {title: 'Заголовок', description: 'Описание'}],
          }));
        }
      }
    }
  };

  const handleAddToTable = (name) => {
    if (name == 'rows') {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: [...prevValues[name], {"first": '1', "second": 'Значение'}],
      }));
    } else if (name == 'data') {
      setValues(prevValues => {
        // Create a new row with the same number of elements as there are columns
        const newRow = new Array(prevValues.columns?.length).fill('Значение');

        // Add the new row to the existing data
        return {
            ...prevValues,
            [name]: [...prevValues[name], newRow]
        };
      });
    }
    // Add a new element to the list array
  };
  //For lists
  const handleInputChange = (idOrIndex, newValue, name) => {
    if (name === 'tabsDataHeader' || name === 'tabsDataData') {
      setValues((prevValues) => {
        // Clone the tabsData array and update the relevant item
        const updatedTabsData = prevValues.tabsData.map(item => {
            if (item.id === idOrIndex) {
                return { ...item, [name === 'tabsDataHeader' ? 'header' : 'data']: newValue };
            }
            return item;
        });

        // Filter out items where both header and data are empty
        const filteredTabsData = updatedTabsData.filter(item => 
            item.header.trim() !== '' || item.data.trim() !== ''
        );
        // Filter the tabs array to remove tabs without corresponding tabsData
        const filteredTabs = prevValues.tabs.filter((tab, tabIndex) =>
            filteredTabsData.some(tabData => tabData.tabsIndex === tab.id)
        );

        // Return the updated state
        return {
          ...prevValues,
          tabs: filteredTabs,
          tabsData: filteredTabsData,
        };
      });
    } else if (name == 'tabs') {
      setValues((prevValues) => {
          const updatedTabs = prevValues[name].map(tab => 
              tab.id === idOrIndex ? { ...tab, tab: newValue } : tab
          );

          // Check for duplicates in the updated tabs array
          const duplicates = updatedTabs.some((tab, index, self) => 
              tab.tab === newValue && self.findIndex(t => t.tab === newValue) !== index
          );

          if (duplicates) {
              alert('Duplicate entry detected. Each tab must have a unique name.');
              return prevValues; // Return previous state to avoid applying the duplicate
          }

          return {
              ...prevValues,
              [name]: updatedTabs,
          };
      });
    } else if (name == 'tabs-for-glossary') {
      setValues((prevValues) => {
        const updatedTabs = [...prevValues.tabs];
        const updatedTabsGlossary = [...prevValues.tabsGlossary];

        if (newValue.trim() === '') {
            // Check if the corresponding tabsGlossary entry is also empty
            if (updatedTabsGlossary[idOrIndex].trim() === '') {
                // Remove both entries
                updatedTabs.splice(idOrIndex, 1);
                updatedTabsGlossary.splice(idOrIndex, 1);
            }
        } else {
            // Update the tab's value
            updatedTabs[idOrIndex] = newValue;
        }

        return {
            ...prevValues,
            tabs: updatedTabs,
            tabsGlossary: updatedTabsGlossary
        };
      });
    } else if (name == 'listDescription') {
      const updatedList = [...values['list']];
      updatedList[idOrIndex].description = newValue;
      
      if (updatedList[idOrIndex].name.trim(' ') == '' 
        && updatedList[idOrIndex].description.trim(' ') == '' 
        && updatedList[idOrIndex].items?.length == 0) {
        updatedList.splice(idOrIndex, 1)
      } else if (updatedList[idOrIndex].name.trim(' ') == '' 
        && updatedList[idOrIndex].description.trim(' ') == '' 
        && updatedList[idOrIndex].items?.length != 0) {
        updatedList[idOrIndex].name = 'Вкладка';
        updatedList[idOrIndex].description = 'Описание вкладки';
          
      }
      setValues((prevValues) => ({
        ...prevValues,
        'list': updatedList,
      }));
    } else if (name == 'listName') {
      const updatedList = [...values['list']];
      updatedList[idOrIndex].name = newValue;
      
      if (updatedList[idOrIndex].name.trim(' ') == '' 
        && updatedList[idOrIndex].description.trim(' ') == '' 
        && updatedList[idOrIndex].items?.length == 0) {
        updatedList.splice(idOrIndex, 1)
      } else if (updatedList[idOrIndex].name.trim(' ') == '' 
        && updatedList[idOrIndex].description.trim(' ') == '' 
        && updatedList[idOrIndex].items?.length != 0) {
        updatedList[idOrIndex].name = 'Вкладка';
        updatedList[idOrIndex].description = 'Описание вкладки';
          
      }
      setValues((prevValues) => ({
        ...prevValues,
        'list': updatedList,
      }));
    } else if (name == 'items_text') {
      setValues((prevValues) => {
        const updatedItems = [...prevValues.items];

        if (newValue.trim() === '') {
          updatedItems.splice(idOrIndex, 1);
        } else {
          updatedItems[idOrIndex].text = newValue;
        }

        return {
            ...prevValues,
            items: updatedItems,
        };
      });
    } else if (name == 'dnd_questions') {
      setValues((prevValues) => {
        const updatedQuestions = [...prevValues.questions];

        if (newValue.trim() === '') {
          updatedQuestions.splice(idOrIndex, 1);
        } else {
          updatedQuestions[idOrIndex].answer = newValue;
        }

        return {
            ...prevValues,
            questions: updatedQuestions,
        };
      });
    } else if (name == 'select_dnd') {
      setValues((prevValues) => {
        const updatedQuestions = [...prevValues.questions];

        updatedQuestions[idOrIndex].side = newValue;

        return {
            ...prevValues,
            questions: updatedQuestions,
        };
      });
    } else if (name == 'title') {
      const isDropDown = inputs.some((x) => x.name == 'list')
      if (isDropDown) {
        setValues((prevValues) => {
          const updatedList = [...prevValues.list];
          updatedList[idOrIndex].title = newValue;
          
          if (updatedList[idOrIndex].title.trim(' ') === '' && updatedList[idOrIndex].description.trim(' ') === '') {
            updatedList.splice(idOrIndex, 1)
          }
          
          return {
              ...prevValues,
              list: updatedList,
          };
        });
      } else {
        setValues((prevValues) => {
          const updatedList = [...prevValues.data];
          updatedList[idOrIndex].title = newValue;
          
          if (updatedList[idOrIndex].title.trim(' ') === '' && updatedList[idOrIndex].description.trim(' ') === '') {
            updatedList.splice(idOrIndex, 1)
          }
          
          return {
              ...prevValues,
              data: updatedList,
          };
        });
      }
    } else if (name == 'description') {
      const isDropDown = inputs.some((x) => x.name == 'list')
      if (isDropDown) {
        setValues((prevValues) => {
          const updatedList = [...prevValues.list];
          updatedList[idOrIndex].description = newValue;
          
          if (updatedList[idOrIndex].title.trim(' ') === '' && updatedList[idOrIndex].description.trim(' ') === '') {
            updatedList.splice(idOrIndex, 1)
          }
          
          return {
              ...prevValues,
              list: updatedList,
          };
        });
      } else {
        setValues((prevValues) => {
          const updatedList = [...prevValues.data];
          updatedList[idOrIndex].description = newValue;
          
          if (updatedList[idOrIndex].title.trim(' ') === '' && updatedList[idOrIndex].description.trim(' ') === '') {
            updatedList.splice(idOrIndex, 1)
          }
          
          return {
              ...prevValues,
              data: updatedList,
          };
        });
      }
    } else if (name == 'icons') {
      if (newValue) {
        const selectedFile = newValue;
      
        fileToBase64(selectedFile, (base64String) => {
          setValues((prevValues) => {
              const updatedIcons = [...prevValues.icons];
              updatedIcons[idOrIndex] = base64String;
              
              return { ...prevValues, icons: updatedIcons }
            }
          )
        });
        
      } else {
        console.error("Invalid file type");
      }
    } else {
      const updatedList = [...values[name]];
      updatedList[idOrIndex] = newValue;
  
      setValues((prevValues) => ({
        ...prevValues,
        [name]: updatedList,
      }));
    }
  };

  const handleInputChangeArrayInObject = (index, newValue, parentIndex, name) => {
    if (name == 'listItems') {
      const updatedList = [...values.list];
      const updatedItems = [...updatedList[parentIndex].items];

      updatedItems[index] = newValue;
      // Update the value at the specified index
      if (updatedItems[index].trim() === '') {
          // Remove the object from the array if the new value is an empty string
          updatedItems.splice(index, 1);
      } 
      setValues((prevValues) => {

        // Assign the updated items array back to the corresponding parent object
        updatedList[parentIndex].items = updatedItems;

        return {
            ...prevValues,
            list: updatedList,
        };
      });
    } else if (name == 'simpleTable') {
      setValues(prevValues => {
        // Clone the entire data array
        const updatedData = [...prevValues.data];

        // Clone the row that needs to be updated
        const updatedRow = [...updatedData[parentIndex]];

        // Update the specific cell in the row
        updatedRow[index] = newValue;

        // Assign the updated row back to the data
        updatedData[parentIndex] = updatedRow;

        return {
            ...prevValues,
            data: updatedData
        };
      });
    }
  }
  //For [{firts: , second: }] List
  const handleInputChangeTable1 = (index, newValue, name) => {
    setValues((prevValues) => {
      const updatedRows = [...prevValues.rows];

      // Update the value at the specified index
      if (name === 'first') {
          updatedRows[index].first = newValue;
      } else if (name === 'second') {
          updatedRows[index].second = newValue;
      }

      // Check if both 'first' and 'second' are empty strings
      if (updatedRows[index].first.trim() === '' && updatedRows[index].second.trim() === '') {
          // Remove the object from the array
          updatedRows.splice(index, 1);
      }

      return {
          ...prevValues,
          'rows': updatedRows,
      };
    });
  };
  //For default inputs (singular, simple types)
  const handleChange = (name, value, type) => {
    if (type == "file") {
      if (value) {
        const selectedFile = value;
      
        fileToBase64(selectedFile, (base64String) => {
          setValues((prevValues) => ({ ...prevValues, [name]: base64String }));
        });
        
      } else {
        console.error("Invalid file type");
      }
    } else if (type == "number") {
      const numericValue = value.replace(/\D/g, '');
      const integerValue = parseInt(numericValue, 10);

      if (!isNaN(integerValue)) {
        setValues((prevValues) => ({ ...prevValues, [name]: integerValue }));
      } else {
        console.error("Invalid numeric input");
      }
    } else {
      setValues((prevValues) => ({ ...prevValues, [name]: value }));
    }
  };

  //For Generic Table
  const handleHeaderChange = (index, newValue) => {
    if (newValue.trim() === '') {
        // If the new column name is an empty string, remove the column and corresponding data in each row
        setValues(prevValues => {
            const updatedColumns = prevValues.columns.filter((_, colIndex) => colIndex !== index);
            const updatedData = prevValues.data.map(row => row.filter((_, cellIndex) => cellIndex !== index));

            return {
                ...prevValues,
                columns: updatedColumns,
                data: updatedData
            };
        });
    } else {
        // If the new column name is not empty, simply update the column name
        setValues(prevValues => {
            const updatedColumns = [...prevValues.columns];
            updatedColumns[index] = newValue;

            return {
                ...prevValues,
                columns: updatedColumns
            };
        });
    }
  };


  const handleAddColumn = () => {
    setValues(prevValues => {
        // Create a new array for columns with an added empty string for the new column
        const updatedColumns = [...prevValues.columns, 'Колонна'];

        // Update each row in the data array, adding a new element to it
        const updatedData = prevValues.data.map(row => {
            // Add an empty string (or default value) to each row for the new column
            return [...row, 'Значение'];
        });

        return {
            ...prevValues,
            columns: updatedColumns,
            data: updatedData
        };
    });
  };


  const handleSubmit = () => {
    const updatedValues = { ...values };


    if (updatedValues.tabsGlossary && updatedValues.tabs) {
      const tabsGlossaryObject = updatedValues.tabsGlossary.reduce((obj, glossaryValue, index) => {
          const tabKey = updatedValues.tabs[index]; // Get corresponding element from 'tabs'
          obj[tabKey] = glossaryValue; // Assign it as a key-value pair
          return obj;
      }, {});

      updatedValues.tabsGlossary = tabsGlossaryObject;
    } else if (updatedValues.tabs && updatedValues.tabsData) {
      // console.log({ inputs, values: updatedValues })

      // Transform 'tabs' into an array of tab names (strings)
      
      // Map through 'tabsData' to add 'tabName' and remove 'id' and 'tabsIndex'
      const updatedTabsData = updatedValues.tabsData.map(tabData => {
        // Find the corresponding tab using tabsIndex
        const correspondingTabIndex = updatedValues.tabs.findIndex(tab => tab.id === tabData.tabsIndex);
        // Add tabName to tabData and remove 'id' and 'tabsIndex'
        const { id, tabsIndex, ...rest } = tabData;
        return { ...rest, tabName: correspondingTabIndex !== -1 ? updatedValues.tabs[correspondingTabIndex].tab : '' };
      });
      
      updatedValues.tabs = updatedValues.tabs.map(tab => tab.tab);

      updatedValues.tabsData = updatedTabsData;
    } else if (updatedValues.questions && updatedValues.leftAnswer && updatedValues.rightAnswer) {
      const questionsList = updatedValues.questions.reduce((accumulator, currentElement) => {
        // Check the value of 'side' and assign the corresponding value from updatedValues
        const valueOfSide = currentElement.side === 0 ? updatedValues.leftAnswer : updatedValues.rightAnswer;
        // Push the modified element onto the accumulator
        accumulator.push({ ...currentElement, side: valueOfSide });
        return accumulator;
      }, []);
    

      updatedValues.questions = questionsList;
    }

    onSubmit({ inputs, values: updatedValues });    
    setValues({});
    onClose();
  };

    

  const adjustTextAreaHeight = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <div className="modal">

        <div className='title-example'>
          <a className='modal-title'>Введите данные для компонента</a>
          {
            example 
              ? (
                <>
                  <div 
                    className="example"
                    onClick={() => setShowExample(prev => !prev)}
                  >{ !showExample ? 'Показать пример' : 'Скрыть пример' }</div>

                  {
                    showExample 
                      ? (
                        <img src={example} />
                      ) : null
                  }
                </>
              ) : null
          }
        </div>

        <div className="modal-content">
            {inputs !== null && inputs.map((input) => (
              input.type === 'ignore' ? null
              : input.type == "file" ?
                <div key={input.name} className='file-input'>
                    <label>{input.label}</label>
                    <input
                        type={input.type}
                        src={values[input.name]}
                        onChange={(e) => handleChange(input.name, e.target.files[0], input.type)}
                    />
                </div>
              : input.type == "number" ?
                <div key={input.name} className='number-input'>
                    <label>{input.label}</label>
                    <input
                        type={input.type}
                        value={values[input.name] || 18}
                        onChange={(e) => handleChange(input.name, e.target.value, input.type)}
                    />
                </div>
              : input.type == 'list' && values[input.name] ? 
                <div key={input.name} className='list-inputs'>
                  <label>{input.label}</label>
                    <div className='list-column'>
                    {values[input.name].map((x, index) => {
                      return (
                        <div key={index}>
                          <input
                            type="text"
                            value={x || ''}
                            onChange={(e) => handleInputChange(index, e.target.value, input.name)}
                            />
                        </div>
                      )
                    })}
                    </div>
                    <div className='add-button-div'>
                      <button className='add-button' onClick={() => handleAddToList(input.name)}>Добавить</button>
                    </div>
                </div>
              : input.type == 'rows' && values[input.name] ? 
                <div key={input.name} className='rows-inputs'>
                  <label>{input.label}</label>
                  {values[input.name].map((x, index) => {
                    return (
                      <div key={index} className='two-columns'>
                        <div className='first-column'>
                          <input
                            type="text"
                            value={x.first || ''}
                            onChange={(e) => handleInputChangeTable1(index, e.target.value, 'first')}
                          />
                        </div>
                        <div className='second-column'>
                          <input
                            type="text"
                            value={x.second || ''}
                            onChange={(e) => handleInputChangeTable1(index, e.target.value, 'second')}
                          />
                        </div>
                      </div>
                    )
                  })}
                  <div className='add-button-div'>
                    <button className='add-button' onClick={() => handleAddToTable(input.name)}>Добавить</button>
                  </div>
                </div> 
                :
                input.type == 'tabs' && values.tabs && Array.isArray(values.tabsGlossary) ? 
                <div key={input.name}>
                    <label>Разделы</label>
                    <div className='columns'>
                      <div className='first-column'>
                      {values.tabs.map((x, index) => {
                        return (
                          <div key={index}>
                            <input
                              type="text"
                              value={x || ''}
                              onChange={(e) => handleInputChange(index, e.target.value, 'tabs-for-glossary')}
                              />
                          </div>
                        )
                      })}
                      </div>
                      <div className='second-column'>
                      {values.tabsGlossary.map((x, index) => {
                        return (
                          <div key={index}>
                            <input
                              type="text"
                              value={x || ''}
                              onChange={(e) => handleInputChange(index, e.target.value, 'tabsGlossary')}
                              />
                          </div>
                        )
                      })}
                      </div>
                    </div>
                    <div className='add-button-div'>
                      <button className='add-button' onClick={() => handleAddToList(input.name)}>Добавить</button>
                    </div>
                </div> 
                : input.type == 'tabsGlossary'? 
                null
                : input.type == 'dropd' && values.tabs && values.tabsData ? 
                <div key={input.name}>
                    <label>Вкладки</label>
                      {values.tabs.map((tabObject, tabIndex) => {
                        return (
                        <div className='dropdown-columns'>
                          <div key={tabObject.id} className='dropdown-rows'>
                            <input
                                type="text"
                                value={tabObject.tab || ''}
                                onChange={(e) => handleInputChange(tabObject.id, e.target.value, 'tabs')}
                                />
                          </div>
                          <div className='dropd-content'>
                            <div className='first-column'>
                            {values.tabsData.filter(x => x.tabsIndex == tabObject.id).map((x, index) => {
                              return (
                                <div key={index}>
                                  <input
                                    type="text"
                                    value={x.header || ''}
                                    onChange={(e) => handleInputChange(x.id, e.target.value, 'tabsDataHeader')}
                                    />
                                </div>
                              )
                            })}
                            </div>
                            <div className='second-column'>
                            {values.tabsData.filter(x => x.tabsIndex == tabObject.id).map((x, index) => {
                              return (
                                <div key={index}>
                                  <input
                                    type="text"
                                    value={x.data || ''}
                                    onChange={(e) => handleInputChange(x.id, e.target.value, 'tabsDataData')}
                                    />
                                </div>
                              )
                            })}
                            </div>
                          </div> 
                          <div className='add-drop'>
                            <svg className='add-drop-button' onClick={() => handleAddToList('tabsData' , tabObject.id)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <circle cx="10" cy="10" r="9.4" stroke="#7E869E" stroke-opacity="0.25" stroke-width="1.2"/>
                              <path d="M10 13.3333L10 6.66666" stroke="#374761" stroke-width="1.2" stroke-linecap="square"/>
                              <path d="M13.3333 10L6.66659 10" stroke="#374761" stroke-width="1.2" stroke-linecap="square"/>
                            </svg>
                            {/* <button className='add-drop-button' onClick={() => handleAddToList(tabIndex)}>+</button> */}
                          </div>
                        </div>
                        )
                      })}
                    <div className='add-button-div'>
                      <button className='add-button' onClick={() => handleAddToList('dropd')}>Добавить вкладку</button>
                    </div>
                </div> 
                : input.type == 'tabsData'? 
                null 
                : input.type == 'listNameDescroptionItems' && values.list ? 
                <div key={input.name} className='dropd-name-desx-items'>
                  <label>{input.label}</label>
                  {values.list.map((x, index) => {
                    return (
                      <div className='columns'>
                        <div className='name-desx'>
                          <div key={index} className='name-input'>
                            <input
                              type="text"
                              value={x.name || ''}
                              onChange={(e) => handleInputChange(index, e.target.value, 'listName')}
                              />
                          </div>
                          <div key={values.list?.length + 1} className='desx-input'>
                            <textarea
                              type="text"
                              value={x.description || ''}
                              onChange={(e) => handleInputChange(index, e.target.value, 'listDescription')}
                              />
                          </div>
                        </div>
                        <div className='list'>
                          <div className='list-list'>
                          {x.items.map((item, itemIndex) => {
                            return (
                              <div key={itemIndex} className='list-rows'>
                                <input
                                  type="text"
                                  value={item || ''}
                                  onChange={(e) => handleInputChangeArrayInObject(itemIndex, e.target.value, index, 'listItems')}
                                  />
                              </div>
                            )
                          })}
                          </div>
                          <div className='add-drop'>
                            <svg className='add-drop-button' onClick={() => handleAddToList('dropDownListItems', index)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <circle cx="10" cy="10" r="9.4" stroke="#7E869E" stroke-opacity="0.25" stroke-width="1.2"/>
                              <path d="M10 13.3333L10 6.66666" stroke="#374761" stroke-width="1.2" stroke-linecap="square"/>
                              <path d="M13.3333 10L6.66659 10" stroke="#374761" stroke-width="1.2" stroke-linecap="square"/>
                            </svg>
                            {/* <button className='add-drop-button' onClick={() => handleAddToList(tabIndex)}>+</button> */}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <div className='add-button-div'>
                      <button className='add-button' onClick={() => handleAddToList(input.type)}>Добавить</button>
                  </div>
                </div>
                : input.type == 'items_text' && values.items ? 
                <div key={input.name} className='list-inputs'>
                  <label>{input.label}</label>
                    <div className='list-column'>
                    {values.items.map((x, index) => {
                      return (
                        <div key={index}>
                          <input
                            type="text"
                            value={x.text || ''}
                            onChange={(e) => handleInputChange(index, e.target.value, 'items_text')}
                            />
                        </div>
                      )
                    })}
                    </div>
                    <div className='add-button-div'>
                      <button className='add-button' onClick={() => handleAddToList('items_text')}>Добавить</button>
                    </div>
                </div>
                : input.type == 'textarea' ?
                <div key={input.name} className='textarea-input'>
                  <label>{input.label}</label>
                  <textarea
                      value={values[input.name] || ''}
                      onChange={(e) => {
                        handleChange(input.name, e.target.value, input.type)
                        adjustTextAreaHeight(e)
                      }}
                  />
                </div>
                : input.type == 'dnd_questions' ? 
                <div key={input.name} className='dnd_questions'>
                  <label>{input.label}</label>
                  {values?.questions?.map((x, index) => {
                    return (
                      <div className='dnd-question-answer'>
                        <div className='first-column'>
                          <input
                              type={'text'}
                              value={x.answer || ''}
                              onChange={(e) => handleInputChange(index, e.target.value, input.type)}
                          />
                        </div>
                        <div className='second-column'>
                          <select className='select' value={x.side} onChange={(e) => handleInputChange(index, e.target.value, 'select_dnd')}>
                            <option value={0}><a>{values.leftAnswer}</a></option>
                            <option value={1}><a>{values.rightAnswer}</a></option>
                          </select>
                        </div>
                      </div>
                    )
                  })}
                  <div className='add-button-div'>
                    <button className='add-button' onClick={() => handleAddToList('dnd_questions')}>Добавить</button>
                  </div>
                </div>
                : input.type == 'title_desx_list' ?
                <div key={input.name} className='dropd-title-desx'>
                  <label>{input.label}</label>
                  {values?.[input.name]?.map((x, index) => {
                    return (
                      <div className='dtd-columns'>
                        <div className='first-column'>
                          <input
                              type={'text'}
                              value={x.title || ''}
                              onChange={(e) => handleInputChange(index, e.target.value, 'title')}
                          />
                        </div>
                        <div className='second-column'>
                          <input
                              type={'text'}
                              value={x.description || ''}
                              onChange={(e) => handleInputChange(index, e.target.value, 'description')}
                          />
                        </div>
                      </div>
                    )
                  })}
                  <div className='add-button-div'>
                    <button className='add-button' onClick={() => handleAddToList('title_desx_list', input.name)}>Добавить</button>
                  </div>
                </div>
                : input.type == 'table_headers' && values.columns ? 
                <div key={input.name} className='generic-table'>
                  <div key={input.name} className='generic-table'>
                    <table>
                      <thead>
                        <tr>
                          {values.columns.map((column, index) => (
                              <th className='header' key={index}>
                                  <input
                                      type="text"
                                      value={column}
                                      onChange={(e) => handleHeaderChange(index, e.target.value)}
                                  />
                              </th>
                          ))}
                          <th className='extra-column'>
                            <svg className='add-drop-button' onClick={() => handleAddColumn()} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <circle cx="10" cy="10" r="9.4" stroke="#7E869E" stroke-opacity="0.25" stroke-width="1.2"/>
                              <path d="M10 13.3333L10 6.66666" stroke="#374761" stroke-width="1.2" stroke-linecap="square"/>
                              <path d="M13.3333 10L6.66659 10" stroke="#374761" stroke-width="1.2" stroke-linecap="square"/>
                            </svg>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                          {values.data.map((row, rowIndex) => (
                              <tr key={rowIndex}>
                                  {row.map((cell, cellIndex) => (
                                      <td key={cellIndex}>
                                          <input
                                              type="text"
                                              value={cell}
                                              onChange={(e) => handleInputChangeArrayInObject(cellIndex, e.target.value, rowIndex, 'simpleTable')}
                                          />
                                      </td>
                                  ))}
                              </tr>
                          ))}
                      </tbody>
                    </table>
                    <div className='add-button-div'>
                      <button className='add-button' onClick={() => handleAddToTable('data')}>Добавить</button>
                    </div> 
                  </div>
                </div>
                : input.type == 'table_rows' ? null
                : input.type == 'icons_title_desx_list' && values.icons ? 
                <div key={input.name} className='icons-title-desx'>
                  <label>Блоки</label>
                  {values?.data?.map((x, index) => {
                    return (
                      <div className='ictide-columns'>
                        <div className='first-column'>
                          <input
                              type={'text'}
                              value={x.title || ''}
                              onChange={(e) => handleInputChange(index, e.target.value, 'title')}
                          />
                        </div>
                        <div className='second-column'>
                          <input
                              type={'text'}
                              value={x.description || ''}
                              onChange={(e) => handleInputChange(index, e.target.value, 'description')}
                          />
                        </div>
                        <div className='third-column'>
                          {/* <label for="file-upload" class="custom-file-upload">
                              Иконка
                          </label> */}
                          <input 
                              id = 'file-upload'
                              type={'file'}
                              value={values.icons[index] || ''}
                              onChange={(e) => handleInputChange(input.name, e.target.files[0], 'icons')}
                          />
                        </div>
                      </div>
                    )
                  })}
                  {values?.list?.map((item, index) => {
                    return (
                      <div className='ictide-columns'>
                        <div className='second-column'>
                          <input
                            type={'text'}
                            value={item || ''}
                            onChange={(e) => {
                              values.list[index] = e.target.value;
                            }}
                          />
                        </div>
                        <div className='third-column'>
                          {/* <label for="file-upload" class="custom-file-upload">
                              Иконка
                          </label> */}
                          <input 
                            id='file-upload'
                            type={'file'}
                            value={values.icons[index] || ''}
                            onChange={(e) => handleInputChange(input.name, e.target.files[0], 'icons')}
                          />
                        </div>
                      </div>
                    )
                  })}
                  <div className='add-button-div'>
                    <button className='add-button' onClick={() => handleAddToList('icons-title-desx')}>Добавить</button>
                  </div>
                </div>
                : input.type == 'title_desx_of_icons' ? null
                : input.type == 'checkbox'
                ? (
                  <div key={input.name} className='checkbox-input'>
                    <label>{input.label}</label>
                    <input 
                      type='checkbox'
                      value={values[input.name] || false}
                      onChange={(e) => {
                        values[input.name] = e.target.checked;
                      }}
                    />
                  </div>
                )
                : input.type === 'formatTextarea' 
                ? (
                  <Formatable_Textarea 
                    handleChange={handleChange}
                    label={input.label}
                    name={input.name}
                    type={input.type}
                    value={values[input.name] || ''}
                  />
                ) 
                : input.type === 'files_and_list'
                ? (
                  <div className="icons-and-list" key={input.name}>
                    <div className="title">Лист</div>
                    <div className="list">
                      <div className="row">
                        <div>Иконка</div>
                        <div>Текст</div>
                      </div>

                      {
                        values?.list?.map((item, index) => {

                          return (
                            <div className="row">
                              <div>
                                <input 
                                  type="file" 
                                  // value={values.icons[index]}
                                  onChange={e => {
                                    const file = e.target.files[0];

                                    console.log(file)

                                    fileToBase64(file, (base64String) => {
                                      console.log(base64String)
                                      setValues(prev => {
                                        const updatedIcons = [...prev[input.name]];
                                        updatedIcons[index] = base64String;

                                        return {
                                          ...prev,
                                          [input.name]: updatedIcons
                                        }
                                      })
                                    })
                                  }}
                                />
                              </div>
                              <div>
                                <input 
                                  type="text"
                                  value={values.list[index]}
                                  onChange={e => {
                                    setValues(prev => {
                                      const updatedList = [...prev.list];
                                      updatedList[index] = e.target.value;

                                        return {
                                          ...prev,
                                          ['list']: updatedList
                                        }
                                    })
                                  }}
                                />
                              </div>
                            </div>
                          )
                        })
                      }

                      <div className="row-btn">
                        <button 
                          className='add-button' 
                          onClick={(e) => {
                            setValues(prev => {
                              
                              return {
                                ...prev,
                                [input.name]: [...prev[input.name], ''],
                                ['list']: prev.list ? [...prev['list'], 'Новый итем'] : [],
                              }
                            })
                          }}
                        >Добавить</button>
                      </div>
                    </div>

                  </div>
                )
                : input.type === 'select'
                ? (
                  <div className='select-input' key={input.name}>
                    <label>{input.label}</label>
                    <select 
                      value={values[input.name]}
                      onChange={e => {
                        setValues(prev => {

                          return {
                            ...prev, 
                            ['alignment']: e.target.value
                          }
                        })
                      }}
                    >
                      <option value={'center'}>Центр</option>
                      <option value={'left'}>Налево</option>
                      <option value={'right'}>Направо</option>
                    </select>
                  </div>
                )
                : (
                  <div key={input.name} className='default-input'>
                    <label>{input.label}</label>
                    <input
                      type={input.type}
                      value={values[input.name] || ''}
                      onChange={(e) => handleChange(input.name, e.target.value, input.type)}
                    />
                  </div>
                )
            ))}
            <div className='buttons'>
              <button className="close-button" onClick={onClose}>Закрыть</button>
              <button className="save-button" onClick={handleSubmit}>Сохранить</button>
            </div>
        </div>
    </div>
  );
};

const Formatable_Textarea = ({
  handleChange,
  label,
  name,
  type,
  value,
}) => {

  const textAreaRef = useRef(null);

  const wrapSelected = (symbol, endSymbol=symbol) => {
    const textArea = textAreaRef.current;
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    // Only proceed if there is a selection
    if (start !== end) {
      const before = value.substring(0, start);
      const after = value.substring(end);

      // **bold**
      // ||italic||
      const newText = `${before}${symbol}${selectedText}${endSymbol}${after}`;

      handleChange(name, newText, type)
      
      setTimeout(() => {
        textArea.selectionStart = start;
        textArea.selectionEnd = end + 4; // Adjust for the added characters
      }, 0);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default Enter behavior (optional)

      const cursorPosition = event.target.selectionStart;
      const textBeforeCursor = value.substring(0, cursorPosition);
      const textAfterCursor = value.substring(cursorPosition);

      if (textBeforeCursor.slice(-2) === '\\n' || textBeforeCursor.slice(-1) === '\n') {
        const newValue = textBeforeCursor + '\n' + textAfterCursor;
        handleChange(name, newValue, type)

        setTimeout(() => {
          event.target.selectionStart = event.target.selectionEnd = cursorPosition + 2;
        }, 0);

        return;
      }

      console.log(cursorPosition, textBeforeCursor, textAfterCursor);

      // Check if text before cursor is not just whitespace
      if (/\S/.test(textBeforeCursor)) {
        // Insert \n at cursor position
        const newValue = textBeforeCursor + '\\n\n' + textAfterCursor;
        handleChange(name, newValue, type)

        // Set cursor position to right after the inserted \n
        // Note: This needs to be done after the state update takes effect
        setTimeout(() => {
          event.target.selectionStart = event.target.selectionEnd = cursorPosition + 2;
        }, 0);
      }
    }
  };

  return (
    <div className="format-textarea">
      <label>{label}</label>
      <div className="inner">
        <div className="actions">
          <button 
            className='btn-bold'
            onClick={() => wrapSelected('|b|')}
          >Ж</button>
          <button 
            className='btn-italic'
            onClick={() => wrapSelected('|i|')}
          >К</button>
          {/* <button 
            className='btn-bold btn-italic'
            onClick={() => wrapSelected('|bi|', '|bi|')}
          >ЖК</button> */}
          <button 
            className='btn-underline'
            onClick={() => wrapSelected('|u|', '|u|')}
          >П</button>
        </div>

        <textarea
          ref={textAreaRef}
          type="text"
          value={value}
          onKeyDown={handleKeyDown}
          onChange={(e) => handleChange(name, e.target.value, type)}
        ></textarea>
      </div>

    </div>
  )
}

export default Modal;
