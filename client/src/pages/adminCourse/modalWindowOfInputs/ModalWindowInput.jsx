import React, { useEffect, useRef, useState } from 'react';
import './modalWindowInput.scss';

import AdvancedInput from './AdvancedInput';

import { BsX } from "react-icons/bs";

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
    const hasDataRowInput = inputs.some((x) => x.name == 'data_row')
    const hasDataBtnInput = inputs.some((x) => x.name == 'dataBtn')
    const hasIconInput = inputs.some((x) => x.name == 'icons');
    const hasCentered = inputs.some((x) => x.name == 'isCentered');
    const adjustWidth = inputs.some((x) => x.name == 'adjustWidth');
    const isSublist = inputs.some((x) => x.name == 'isSublist');
    const hasAlignment = inputs.some((x) => x.name == 'alignment');
    const hasImages = inputs.some((x) => x.name == 'images');
    const notCrop = inputs.some((x) => x.name == 'notCrop');

    const isDropdownList_r5 = inputs.some((x) => x.name == 'items' && x.type == 'data:5'); 

    const hasTableInput = inputs.some((x) => x.name === 'rows');

    const hasLeft = inputs.some((x) => x.name === 'left');
    const hasRight = inputs.some((x) => x.name === 'right');

    const hasTest_answers = inputs.some((x) => x.type === 'test_answers');

    if (inputs.some((x) => x.name === 'isKazakh')) {
      setValues(prevValues => ({
        ...prevValues,
        'isKazakh': exValues?.isKazakh || true
      }))
    }

    if (inputs.some((x) => x.name === 'tableData')) {
      setValues(prevValues => ({
        ...prevValues,
        'tableData': exValues?.tableData || [
          {
            id: 1,
            column1: 'Текст 1',
            details: 'Значение 1',
          }
        ]
      }))
    }

    if (inputs.some((x) => x.name === 'points')) {
      setValues(prevValues => ({
        ...prevValues,
        'points': exValues?.points || [
          { id: 0, x: 720, y: 380, name: 'ГО регуляторы (государтсвенные органы-регуляторы)' },
        ]
      }))
    }

    if (inputs.some((x) => x.name === 'phases')) {
      setValues(prevValues => ({
        ...prevValues,
        'phases': exValues?.phases || [
          {
            title: 'Двухфазная модель отмывания денег',
            phases: [
              {title: ' ', name: 'Предикат', shortDescription: 'Доход, полученный преступным путем', longDescription: ''},
              {title: 'I этап', name: 'Легализация', shortDescription: 'Обмен валюты или иного имущества', longDescription: 'Первый этап (легализация) - представляет собой отмывание денег, полученных непосредственно в результате совершения преступления путем обмена этих денежных средств на купюры иного достоинства, другой валюты, имущества.'},
              {title: 'II этап', name: 'Интеграция', shortDescription: 'Вводится легальный фин. оборот', longDescription: 'Второй этап (интеграция) заключается в совершении операций, в результате которых предварительно «отмытым» деньгам придается статус, полученных законными путями, и они вводятся в легальный финансовый оборот.'}
            ]
          }
        ]
      }))
    }

    if (inputs.some((x) => x.type === 'DragAndDropOptions')) {
      console.log('works')
      setValues(prevValues => {
       
        return {
          ...prevValues,
          'answerOptions': [
            { id: 1, text: '' },
            { id: 2, text: '' }
          ],
          'fieldOptions': [
            { text: '', correctId: 1 },
            { text: '', correctId: 2 }
          ]
        }
      })
    }

    if (inputs.some((x) => x.name === 'stages')) {
      setValues(prevValues => ({
        ...prevValues,
        'stages': exValues?.stages || [
          {icon: '', text: 'Видная часть', innerText: 'Скрытая часть'},
        ]
      }))
    }

    if (inputs.some((x) => x.name === 'gap')) {
      setValues(prevValues => ({
        ...prevValues,
        'gap': exValues?.gap || 27
      }))
    }

    if (isDropdownList_r5) {
      setValues(prevValues => ({
        ...prevValues,
        'items': exValues?.items 
          || [
            {
              title: 'Элемент1',
              text: 'Элемент1 - это',
            },
            {
              title: 'Элемент2',
              text: 'Элемент2 - это',
            },
            {
              title: 'Элемент3',
              text: 'Элемент3 - это',
            },
            {
              title: 'Элемент4',
              text: 'Элемент4 - это',
            },
            {
              title: 'Элемент5',
              text: 'Элемент5 - это',
            },
          ],
        'headers': exValues?.headers 
          || [
            { name: 'Группа 1', icon: null },
            { name: 'Группа 2', icon: null },
            { name: 'Группа 3', icon: null },
          ]
      }));
    }
    
    if (hasLeft) {
      setValues(prevValues => ({
        ...prevValues,
        'left': exValues?.left || null
      }))
    }

    if (hasRight) {
      setValues(prevValues => ({
        ...prevValues,
        'right': exValues?.right || null
      }))
    }

    if (hasTest_answers) {
      setValues(prevValues => ({
        ...prevValues,
        'options': exValues?.options || [],
        'correctOptions': exValues?.correctOptions || [],
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

    if (hasListInput && !inputs.some((x) => x.name === 'points')) {
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
        'data': exValues?.data || [
          // {'Первая колонна': '', 'Вторая колонна': ''}
        ],
        'data_row': exValues?.data_row || [
          // {'Первая колонна': '', 'Вторая колонна': ''}
        ],
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
    } else if (hasDataBtnInput && hasDataInput) {

      setValues((prevValues) => ({
        ...prevValues,
        'data': exValues?.data || [],
        'dataBtn': exValues?.dataBtn || [],
      }));

    } else if (hasDataInput) {
      setValues(prevValues => ({
        ...prevValues,
        'data': exValues?.data || [{ header: 'Заголовок', image: '', imageText: 'Текст изображения' }]
      }));
    } else if (hasQuestions) {
      setValues(prevValues => ({
        ...prevValues,
        'questions': exValues?.questions 
          || [
            {
              question: 'Вопрос',
              options: [
                {
                  question: 'Ответ 1',
                  answer: 'Фидбэк к ответу (напривер, "неправильно!")',
                },
                {
                  question: 'Ответ 1',
                  answer: 'Фидбэк к ответу (напривер, "правильно!")',
                },
              ],
              correctOptionIndex: 1,
            },
          ]
      }))
    }

    if (hasListInput && inputs.some((x) => x.name === 'points')) {
      setValues(prevValues => ({
        ...prevValues,
        'list': exValues?.list || [
          [ 'Текст' ],
        ]
      }))
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
                      return <Formatable_Textarea 
                        handleChange={(_, value, __) => handleInputChange(index, value, input.name)}
                        label={''}
                        name={input.name}
                        type={'list'}
                        value={x || ''}
                        minHeight={100}
                      />

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
                <div key={input.name} className='tabs-glossary-input'>
                    <label>Разделы</label>
                    <div className="rows">
                      {values.tabs.map((x, index) => {
                        return (
                          <div key={index}>
                            <div>
                              <label>Название раздела</label>
                              <input
                                type="text"
                                valvvvvvue={x || ''}
                                onChange={(e) => handleInputChange(index, e.target.value, 'tabs-for-glossary')}
                              />
                            </div>

                            <Formatable_Textarea 
                              handleChange={(_, newValue, __) => {
                                handleInputChange(index, newValue, 'tabsGlossary')
                              }}
                              label={'Текст раздела'}
                              type={'tabsGlossary'}
                              value={values.tabsGlossary[index] || ''}
                            />
                          </div>
                        )
                      })}
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
                              {
                                values.tabsData.map((x, index) => {
                                  if (x.tabsIndex == tabObject.id) {
                                    return (
                                      <div key={index}>
                                        <input
                                          type="text"
                                          value={x.header || ''}
                                          onChange={(e) => {
                                            setValues(prevValues => {
                                              let updatedTabsData = prevValues.tabsData;
                                              updatedTabsData[index] = {
                                                ...prevValues.tabsData[index],
                                                ['header']: e.target.value
                                              };

                                              return {
                                                ...prevValues,
                                                ['tabsData']: updatedTabsData
                                              }
                                            })
                                          }
                                        }/>
                                      </div>
                                    ) 
                                  } else return null;
                                })
                              }
                            </div>
                            <div className='second-column'>
                              {
                                values.tabsData.map((x, index) => {
                                  if (x.tabsIndex == tabObject.id) {
                                    return (
                                      <div key={index}>
                                        <input
                                          type="text"
                                          value={x.data || ''}
                                          onChange={(e) => {
                                            setValues(prevValues => {
                                              let updatedTabsData = prevValues.tabsData;
                                              updatedTabsData[index] = {
                                                ...prevValues.tabsData[index],
                                                ['data']: e.target.value
                                              };

                                              return {
                                                ...prevValues,
                                                ['tabsData']: updatedTabsData
                                              }
                                            })
                                          }}
                                          />
                                      </div>
                                    )
                                  } else return null;
                                })
                              }
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
                                          <textarea
                                            className='textarea-formatable'
                                            value={cell}
                                            onChange={(e) => handleInputChangeArrayInObject(cellIndex, e.target.value, rowIndex, 'simpleTable')}
                                          ></textarea>
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
                : input.type === 'carousel_items'
                ? (
                  <div className="carousel-input">
                    <div className="title">{input.label}</div>
                    <div className="list">
                      <div className="row">
                        <div>Иконка</div>
                        <div>Заголовок</div>
                        <div>Текст к изображению</div>
                      </div>

                      {
                        values?.data?.map((item, index) => {
                          
                          return <div className="row">
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
                                      const updatedData = [...prev['data']];
                                      updatedData[index].image = base64String;

                                      return {
                                        ...prev,
                                        ['data']: updatedData
                                      }
                                    })
                                  })
                                }}
                              />
                            </div>
                            <div>
                              <input 
                                value={values['data'][index]['header']}
                                onChange={(e) => {
                                  setValues(prev => {
                                    const updatedData = [...prev['data']];
                                    updatedData[index].header = e.target.value;

                                    return {
                                      ...prev,
                                      ['data']: updatedData
                                    }
                                  })
                                }}
                                type='text'
                              />
                            </div>
                            <div>
                              <input 
                                value={values['data'][index]['imageText']}
                                onChange={(e) => {
                                  setValues(prev => {
                                    const updatedData = [...prev['data']];
                                    updatedData[index].imageText = e.target.value;

                                    return {
                                      ...prev,
                                      ['data']: updatedData
                                    }
                                  })
                                }}
                                type='text'
                              />
                            </div>
                          </div>
                        })
                      }

                      <div className="row-btn">
                        <button 
                          className='add-button' 
                          onClick={(e) => {
                            setValues(prev => {
                              
                              return {
                                ...prev,
                                [input.name]: [
                                  ...prev[input.name], 
                                  { 
                                    header: '', 
                                    image: '', 
                                    imageText: '' 
                                  }
                                ],
                              }
                            })
                          }}
                        >Добавить</button>
                      </div>
                    </div>
                  </div>
                )
                : input.type === 'test_answers' 
                ? (
                  <div className="test-options">
                    <label>Ответы</label>
                    <div className="options">
                      {
                        values?.options?.map((option, index) => {

                          return (
                            <div className="option" >
                              <Formatable_Textarea 
                                minHeight={200}
                                handleChange={(_, newValue, __) => {
                                  setValues(prevValues => {
                                    const updatedOptions = prevValues.options;
                                    updatedOptions[index] = newValue;

                                    return {
                                      ...prevValues,
                                      ['options']: updatedOptions
                                    }
                                  })
                                }}
                                name={'options'}
                                type={'options'}
                                value={option}
                              />
                              <input 
                                type="checkbox"
                                checked={values.correctOptions.includes(option)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setValues(prevValues => {
                                      const updatedCorrectValues = prevValues.correctOptions;
                                      updatedCorrectValues.push(option);

                                      return {
                                        ...prevValues,
                                        ['correctOptions']: updatedCorrectValues
                                      }
                                    })
                                  } else {
                                    setValues(prevValues => {
                                      const updatedCorrectValues = prevValues.correctOptions;
                                      const i = prevValues.correctOptions.indexOf(option)
                                      updatedCorrectValues.splice(i, 1);;

                                      console.log(updatedCorrectValues);

                                      return {
                                        ...prevValues,
                                        ['correctOptions']: updatedCorrectValues
                                      }
                                    })
                                  }
                                }} 
                              />
                            </div>
                          )
                        })
                      }
                    </div>
                    <button 
                      className='add-button' 
                      onClick={(e) => {
                        setValues(prev => {
                          
                          return {
                            ...prev,
                            ['options']: [
                              ...prev['options'],  
                              'Значение' 
                            ],
                          }
                        })
                      }}
                    >Добавить</button>
                  </div>
                ) 
                : input.type === 'tableData'
                ? (
                  <div className="table-data-inputs">
                    <div>
                      <div>Видная часть</div>
                      <div>Скрытая часть</div>
                    </div>

                    {
                      values?.tableData?.map((item, index) => {

                        return (
                          <div key={index}>
                            <div>
                              <input 
                                type="text" 
                                value={item.column1}
                                onChange={(e) => {
                                  setValues(prevValues => {
                                    const updatedTableData = prevValues['tableData'];
                                    updatedTableData[index].column1 = e.target.value;

                                    return {
                                      ...prevValues,
                                      ['tableData']: updatedTableData
                                    }
                                  })
                                }}
                              />
                            </div>
                            <div>
                              <input 
                                type="text" 
                                value={item.details}
                                onChange={(e) => {
                                  setValues(prevValues => {
                                    const updatedTableData = prevValues['tableData'];
                                    updatedTableData[index].details = e.target.value;

                                    return {
                                      ...prevValues,
                                      ['tableData']: updatedTableData
                                    }
                                  })
                                }}
                              />
                            </div>
                          </div>
                        )
                      })
                    }

                    <button 
                      className='add-button' 
                      onClick={(e) => {
                        setValues(prev => {
                          const nextId = prev['tableData'][prev['tableData']?.length - 1].id + 1;

                          return {
                            ...prev,
                            ['tableData']: [
                              ...prev['tableData'],  
                              {
                                id: nextId,
                                column1: `Текст ${nextId}`,
                                details: `Значение ${nextId}`,
                              }
                            ],
                          }
                        })
                      }}
                    >Добавить</button>
                  </div>
                )
                : input.type === 'list_with_tabs'
                ? (
                  <div className="table-data-inputs">
                    {
                      values?.dataBtn?.map((item, index) => {

                        return (
                          <div key={index}>
                            <div>
                              <label>Название вкладки</label>
                              <input 
                                type="text" 
                                value={item}
                                onChange={(e) => {
                                  setValues(prevValues => {
                                    const updatedData = prevValues['dataBtn'];
                                    updatedData[index] = e.target.value;

                                    return {
                                      ...prevValues,
                                      ['dataBtn']: updatedData
                                    }
                                  })
                                }}
                              />
                            </div>
                            <AdvancedInput
                              content={values?.data[index]} 
                              handleSave={(content) => {
                                setValues(prevValues => {
                                  const updatedData = prevValues['data'];
                                  updatedData[index] = content;

                                  return {
                                    ...prevValues,
                                    ['data']: updatedData
                                  }
                                })
                              }}
                            />
                          </div>
                        )
                      })
                    }

                    <button 
                      className='add-button' 
                      onClick={(e) => {
                        setValues(prev => {
                          return {
                            ...prev,
                            ['data']: [...prev['data'], []],
                            ['dataBtn']: [...prev['dataBtn'], 'Вкладка'],
                          }
                        })
                      }}
                    >Добавить</button>
                  </div>
                )
                : input.type === 'card_quiz_input' 
                ? (
                  <div className="card-quiz-input">
                    <div className="questions">
                      {
                        values?.questions?.map((question, index) => {
                          
                          return <div className="question" key={index}>
                            <div className="title">
                              <div>Вопрос</div>
                              <div>
                                <BsX 
                                  size={30}
                                  onClick={(e) => {
                                    setValues(prevValues => {
                                      const updatedQuestions = [...prevValues.questions];
                                      
                                      updatedQuestions.splice(index, 1);
                                
                                      return {
                                        ...prevValues,
                                        questions: updatedQuestions
                                      };
                                    })
                                  }}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="question-text">
                                <input
                                  type="text" 
                                  value={question.question}
                                  onChange={e => {
                                    setValues(prevValues => {
                                      const updated = prevValues['questions'];
                                      updated[index].question = e.target.value;
                                      
                                      return {
                                        prevValues,
                                        ['questions']: updated
                                      }
                                    })
                                  }}
                                />
                              </div>
                              <div className="question-answers">
                                <div className="option">
                                  <div>Ответ</div>
                                  <div>Фидбэк</div>
                                </div>
                                {
                                  question.options.map((option, _index) => {

                                    return <div className="option" key={_index}>
                                      <input 
                                        type="text" 
                                        value={option.question}
                                        onChange={(e) => {
                                          setValues(prevValues => {
                                            const updated = prevValues['questions'];
                                            updated[index].options[_index].question = e.target.value;
                                            
                                            return {
                                              prevValues,
                                              ['questions']: updated
                                            }
                                          })
                                        }}
                                      />
                                      <input 
                                        type="text" 
                                        value={option.answer}
                                        onChange={(e) => {
                                          setValues(prevValues => {
                                            const updated = prevValues['questions'];
                                            updated[index].options[_index].answer = e.target.value;
                                            
                                            return {
                                              prevValues,
                                              ['questions']: updated
                                            }
                                          })
                                        }}
                                      />
                                      <input 
                                        type="checkbox" 
                                        checked={question.correctOptionIndex === _index}
                                        onChange={(e) => {
                                          setValues(prevValues => {
                                            const updated = prevValues['questions'];
                                            
                                            if (e.target.checked) {
                                              updated[index].correctOptionIndex = _index;
                                            } else {
                                              updated[index].correctOptionIndex = -1;
                                            }
 
                                            return {
                                              prevValues,
                                              ['questions']: updated
                                            }
                                          })
                                        }}
                                      />
                                    </div>
                                  })
                                }
                                <button
                                  onClick={(e) => {
                                    const updated = values['questions']
                                    updated[index].options = [
                                      ...updated[index].options, 
                                      { 
                                        question: 'a',
                                        answer: 'b',
                                      }
                                    ]

                                    setValues({
                                        values,
                                        ['questions'] : updated
                                      })
                                  }}
                                >Добавить ответ</button>
                              </div>
                            </div>
                          </div>
                        })  
                      }
                    </div>
                    <button
                      onClick={(e) => {
                        setValues(prevValues => {
                          const updated = [
                            ...prevValues['questions'], 
                            {
                              question: 'Вопрос',
                              options: [
                                {
                                  question: '',
                                  answer: '',
                                },
                              ],
                              correctOptionIndex: -1,
                            },
                          ]

                          return {
                            ...prevValues,
                            ['questions'] : updated
                          }
                        })
                      }}
                    >Добавить вопрос</button>
                  </div>
                ) 
                : input.type === 'data:5'
                ? (
                  <div className="dropDown-r5-input">
                    <div className="groups-input">
                      <div className="title">Группы</div>
                      <div>
                        <div>Иконка</div>
                        <div>Название</div>
                      </div>
                      {
                        values?.headers?.map((header, index) => {

                          return (
                            <div key={index}>
                              <input 
                                type="file" 
                                onChange={(e) => {
                                  const file = e.target.files[0]
                                  fileToBase64(file, (base64String) => {
                                    setValues(prevValues => {
                                      const updated = prevValues.headers;
                                      updated[index].icon = base64String;
  
                                      return {
                                        ...prevValues,
                                        ['headers']: updated
                                      }
                                    })
                                  })

                                  setValues(prevValues => {
                                    const updated = prevValues.headers;
                                    updated[index].icon = file;

                                    return {
                                      ...prevValues,
                                      ['headers']: updated
                                    }
                                  })
                                }}
                              />
                              <input 
                                type="text" 
                                value={header.name}
                                onChange={(e) => {
                                  setValues(prevValues => {
                                    const updated = prevValues.headers;
                                    updated[index].name = e.target.value;

                                    return {
                                      ...prevValues,
                                      ['headers']: updated
                                    }
                                  })
                                }}
                              />
                            </div>
                          )
                        })
                      }
                    </div>

                    <div className="list-input">
                      <div className="title">Элементы списка</div>
                      <div>
                        <div>Название</div>
                        <div>Определение</div>
                      </div>
                      {
                        values?.items?.map((item, index) => {

                          return (
                            <div key={index}>
                              <input 
                                type="text"
                                value={item.title} 
                                onChange={(e) => {
                                  setValues(prevValues => {
                                    const updated = prevValues.items;
                                    updated[index].title = e.target.value;

                                    return {
                                      ...prevValues,
                                      ['items']: updated
                                    }
                                  })
                                }}
                              />
                              <input 
                                type="text" 
                                value={item.text}
                                onChange={(e) => {
                                  setValues(prevValues => {
                                    const updated = prevValues.items;
                                    updated[index].text = e.target.value;

                                    return {
                                      ...prevValues,
                                      ['items']: updated
                                    }
                                  })
                                }}
                              />
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                )
                : input.type === 'icon:text:innerText' 
                ? (
                  <div className="icon-text-innerText-input">
                    <div className='title'>Элементы списка</div>
                    <div className="items">
                      {
                        values?.stages?.map((item, index) => {

                          return (
                            <div>
                              <div>
                                <input 
                                  type="file"
                                  onChange={(e) => {
                                    const file = e.target.files[0];

                                    fileToBase64(file, (base64String) => {
                                      setValues(prev => {
                                        const updated = prev.stages;
                                        updated[index].icon = base64String;

                                        return {
                                          ...prev,
                                          ['stages']: updated
                                        }
                                      })
                                    })
                                  }} 
                                />
                                <input 
                                  type="text" 
                                  value={item.text}
                                  onChange={(e) => {
                                    setValues(prevValues => {
                                      const updated = prevValues.stages;
                                      updated[index].text = e.target.value;
  
                                      return {
                                        ...prevValues,
                                        ['stages']: updated
                                      }
                                    })
                                  }}
                                />
                              </div>
                              <input 
                                type="text"
                                value={item.innerText}
                                onChange={(e) => {
                                  setValues(prevValues => {
                                    const updated = prevValues.stages;
                                    updated[index].innerText = e.target.value;

                                    return {
                                      ...prevValues,
                                      ['stages']: updated
                                    }
                                  })
                                }}
                              />
                            </div>
                          )
                        })
                      }
                    </div>
                    <button
                      onClick={(e) => {
                        setValues(prevValues => {
                          const updated = [
                            ...prevValues['stages'], 
                            { 
                              icon: '',
                              text: '',
                              innerText: ''
                            }
                          ]

                          return {
                            ...prevValues,
                            ['stages'] : updated
                          }
                        })
                      }}
                    >Добавить элемент</button>
                  </div>
                )
                : input.type === 'DragAndDropOptions' 
                ? (
                  <div className="DragAndDropOptions-input">
                    <div>
                      <div>Ответ</div>
                      <div>Сторона</div>
                    </div>

                    <div>
                      <div>
                        <input 
                          type="text"
                          value={
                            values?.answerOptions 
                              ? values?.answerOptions[0] 
                                ? values?.answerOptions[0].text
                                : 'text'
                              : 'text2'
                          }
                          onChange={(e) => {
                            setValues(prevValues => {
                              const updated = prevValues.answerOptions;
                              updated[0].text = e.target.value;

                              return {
                                ...prevValues,
                                ['answerOptions']: updated
                              }
                            })
                          }}
                        />
                      </div>
                      <div>
                        <input 
                          type="text"
                          value={
                            values?.fieldOptions 
                              ? values?.fieldOptions[0] 
                                ? values?.fieldOptions[0].text
                                : 'text'
                              : 'text2'
                          }
                          onChange={(e) => {
                            setValues(prevValues => {
                              const updated = prevValues.fieldOptions;
                              updated[0].text = e.target.value;

                              return {
                                ...prevValues,
                                ['fieldOptions']: updated
                              }
                            })
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <input 
                          type="text"
                          value={
                            values?.answerOptions 
                              ? values?.answerOptions[1] 
                                ? values?.answerOptions[1].text
                                : 'text'
                              : 'text2'
                          }
                          onChange={(e) => {
                            setValues(prevValues => {
                              const updated = prevValues.answerOptions;
                              updated[1].text = e.target.value;

                              return {
                                ...prevValues,
                                ['answerOptions']: updated
                              }
                            })
                          }}
                        />
                      </div>
                      <div>
                        <input 
                          type="text"
                          value={
                            values?.fieldOptions 
                              ? values?.fieldOptions[1] 
                                ? values?.fieldOptions[1].text
                                : 'text'
                              : 'text2'
                          }
                          onChange={(e) => {
                            setValues(prevValues => {
                              const updated = prevValues.fieldOptions;
                              updated[1].text = e.target.value;

                              return {
                                ...prevValues,
                                ['fieldOptions']: updated
                              }
                            })
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )
                : input.type === 'data_rows'
                ? (
                  <div className="data-rows-input">
                    {
                      values?.data_row?.map((item, index) => {

                        console.log(item);

                        const isSpan = item.colSpan === 3 ? true : false;

                        return (
                          <div>
                            {
                              values?.columns?.map((key, keyIndex) => {

                                if (isSpan) {
                                  if (keyIndex === 0) {
                                    <input 
                                      key={index}
                                      type='text'
                                      value={item[key]}
                                      onChange={(e) => {
                                        console.log(index, key, e.target.value)
                                        setValues(prevValues => {
                                          const updated = prevValues.data_row;
                                          updated[index][key] = e.target.value;

                                          return {
                                            ...prevValues,
                                            ['data']: updated
                                          }

                                        })
                                      }}
                                    />
                                  } else {
                                    return null;
                                  }
                                }

                                return (
                                  <textarea 
                                    key={keyIndex}
                                    type='text'
                                    value={item[key]}
                                    onChange={(e) => {
                                      let newValue = e.target.value;

                                      setValues(prevValues => {
                                        const updated = prevValues.data_row;
                                        updated[index][key] = newValue;

                                        return {
                                          ...prevValues,
                                          ['data']: updated
                                        }

                                      })
                                    }}
                                  />
                                )
                              })
                            }
                          </div>
                        )
                      })
                    }
                    {
                      values?.data_row?.row !== undefined && values?.data_row !== null
                      && values?.data_row?.length === 0
                        ? <p>Перед тем как добавить ряд, добавьте и заполните все колонки</p>
                        : null
                    }
                    <button
                      onClick={e => {
                        const newRow = values?.columns?.reduce((acc, currentValue) => {
                          acc[currentValue] = '';
                          return acc;
                        }, {});

                        setValues(prevValues => {

                          return {
                            ...prevValues,
                            ['data_row']: [
                              ...prevValues['data_row'],
                              newRow
                            ]
                          }

                        })
                      }}
                    >
                      Добавить ряд со всеми колонками
                    </button>
                    <button
                      onClick={e => {
                        const newKey = values?.columns 
                          ? values?.columns?.length !== 0
                            ? values?.columns[0]
                            : 'key'
                          : 'key1'

                        console.log(newKey);

                        const newRow = {
                          colSpan: 3,
                          [values?.columns[0]]: ''
                        }

                        setValues(prevValues => {

                          return {
                            ...prevValues,
                            ['data_row']: [
                              ...prevValues['data_row'],
                              newRow
                            ]
                          }

                        })
                      }}
                    >
                      Добавить ряд с 1 колонкой
                    </button>
                  </div>
                )
                : input.type === 'phases'
                ? (
                  <div className="phases-input">
                    {
                      values?.phases?.map((phase, index) => {

                        return (
                          <div className="phase" key={index}>
                            <div>
                              <label>Название</label>
                              <input 
                                type="text" 
                                value={phase.title}
                                onChange={(e) => {
                                  

                                  setValues(prevValues => {
                                    const updated = prevValues.phases;
                                    updated[index].title = e.target.value;

                                    return {
                                      ...prevValues,
                                      ['phases']: updated
                                    }
                                  })
                                }}
                              />
                            </div>
                            <div>
                              <div>
                                <div>title</div>
                                <div>name</div>
                                <div>shortDescription</div>
                                <div>longDescription</div>
                              </div>
                              {
                                phase.phases.map((item, idx) => {
                                  const changeValue = (name, value) => {
                                    console.log(index, name, value)
                                    setValues(prevValues => {
                                      const updated = prevValues.phases;
                                      updated[index].phases[idx][name] = value;

                                      return {
                                        ...prevValues,
                                        ['phases']: updated
                                      }

                                    })
                                  }

                                  return (
                                    <div>
                                      <div>
                                        <input 
                                          type="text" 
                                          value={item.title}
                                          onChange={e => changeValue('title', e.target.value)}
                                        />
                                      </div>
                                      <div>
                                        <input 
                                          type="text" 
                                          value={item.name}
                                          onChange={e => changeValue('name', e.target.value)}
                                        />
                                      </div>
                                      <div>
                                        <input 
                                          type="text" 
                                          value={item.shortDescription}
                                          onChange={e => changeValue('shortDescription', e.target.value)}
                                        />
                                      </div>
                                      <div>
                                        <input 
                                          type="text" 
                                          value={item.longDescription}
                                          onChange={e => changeValue('longDescription', e.target.value)}
                                        />
                                      </div>
                                    </div>
                                  )
                                })
                              }
                              <div>
                                <button
                                  onClick={e => {
                                    const updated = values?.phases;
                                    updated[index].phases = [
                                      ...values?.phases[index].phases,
                                      {
                                        title: '', 
                                        name: '', 
                                        shortDescription: '', 
                                        longDescription: ''
                                      },
                                    ]

                                    setValues(prevValues => {
                                      
                                      return {
                                        ...prevValues,
                                        ['phases']: updated
                                      }
                                    })
                                  }}
                                >+</button>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                    <button
                      onClick={e => {
                        setValues(prevValues => {
                          
                          return {
                            ...prevValues,
                            ['phases']: [
                              ...prevValues.phases,
                              {
                                title: '',
                                phases: []
                              }
                            ]
                          }

                        })
                      }}
                    >
                      Добавить новый элемент
                    </button>
                  </div>
                ) 
                : input.type === 'points_list' 
                ? (
                  <div className='points_list-input'>
                    <div className='input-title'>Введите данные точек</div>

                    <div>
                      <div>Координаты X</div>
                      <div>Координаты Y</div>
                      <div>Названия точек</div>
                    </div>
                    {
                      values?.points?.map((point, index) => {
                        
                        return (
                          <div key={index}>
                            <input 
                              type="number" 
                              value={point.x}
                              onChange={(e) => {
                                setValues(prevValues => {
                                  const updated = prevValues.points;
                                  updated[index].x = parseInt(e.target.value, 10);

                                  return {
                                    ...prevValues,
                                    ['points']: updated,
                                  }
                                })
                              }}
                            />
                            <input 
                              type="number" 
                              value={point.y}
                              onChange={(e) => {
                                setValues(prevValues => {
                                  const updated = prevValues.points;
                                  updated[index].y = parseInt(e.target.value, 10);

                                  return {
                                    ...prevValues,
                                    ['points']: updated,
                                  }
                                })
                              }}
                            />
                            <input 
                              type="text" 
                              value={point.name}
                              onChange={(e) => {
                                setValues(prevValues => {
                                  const updated = prevValues.points;
                                  updated[index].name = e.target.value;

                                  return {
                                    ...prevValues,
                                    ['points']: updated,
                                  }
                                })
                              }}
                            />
                          </div>
                        )
                      })
                    }
                    <button
                      onClick={e => {
                        setValues(prevValues => {

                          return {
                            ...prevValues,
                            ['points']: [
                              ...prevValues['points'],
                              { 
                                id: prevValues['points'][prevValues['points']?.length - 1].id + 1,
                                x: 0,
                                y: 0,
                                name: ''
                              }
                            ],
                            ['list']: [
                              ...prevValues['list'],
                              ['Текст']
                            ]
                          }
                        })
                      }}
                    >Добавить точку</button>
                  </div>
                )
                : input.type === 'list_of_list'
                ? (
                  <div className="list-of-list-input">
                    <div className="input-title">Введите лист значений для точек</div>
                    {
                      values?.list?.map((list_item, index) => {

                        return (
                          <div className="list-item" key={index}>
                            <div><p>{index + 1}</p></div>
                            <div className="list-inputs">
                              {
                                list_item.map((item, idx) => {

                                  return (
                                    <input 
                                      type="text" 
                                      key={idx}
                                      value={item}
                                      onChange={(e) => {
                                        setValues(prevValues => {
                                          const updated = prevValues.list;
                                          updated[index][idx] = e.target.value;

                                          return {
                                            ...prevValues,
                                            ['list']: updated
                                          }
                                        })
                                      }}
                                    />
                                  )
                                })
                              }
                              <button
                                onClick={e => {
                                  const updated = values.list;
                                  updated[index] = [...updated[index], 'Текст'];

                                  setValues(prevValues => {
                                    return {
                                      ...prevValues,
                                      ['list']: updated
                                    }
                                  })
                                }}
                              >Добавить новый элемент в лист</button>
                            </div>
                          </div>
                        )
                      })
                    }
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
  minHeight=300
}) => {

  const textAreaRef = useRef(null);

  const wrapSelected = (symbol, endSymbol = symbol) => {
    const textArea = textAreaRef.current;
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const selectedText = value.substring(start, end);
 
    if (start !== end) {
      const before = value.substring(0, start);
      const after = value.substring(end);

      const newText = `${before}${symbol}${selectedText}${endSymbol}${after}`;

      handleChange(name, newText, type);

      setTimeout(() => {
        textArea.selectionStart = start;
        textArea.selectionEnd = end + symbol?.length + endSymbol?.length + `[]`?.length;
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
  const convertToHtml = (text) => {
    const linkRegex = /\|a\|(.*?)\|a\|/g;
    return text.replace(linkRegex, '<a href="$1">$1</a>');
  };

  const formattedValue = convertToHtml(value);

  return (
    <div className="format-textarea">
      {label ? <label>{label}</label> : null}
      <div className="inner">
        <div className="actions">
          <button className='btn-bold' onClick={() => wrapSelected('|b|')}>Ж</button>
          <button className='btn-italic' onClick={() => wrapSelected('|i|')}>К</button>
          <button className='btn-underline' onClick={() => wrapSelected('|u|', '|u|')}>П</button>
          <button className='btn-highlight' onClick={() => wrapSelected('|h|', '[Вставьте скрытый текст сюда]|h|')}>H</button>
          <button className='btn-red' onClick={() => wrapSelected('|r|', '|r|')}>r</button>
          <button className='btn-link' onClick={() => wrapSelected('|a|[ Вставьте ссылку сюда ]', '|a|')}>Link</button>
          <button className='btn-ordered-list' onClick={() => wrapSelected('|1|', '|1|')}>1.</button>
          <button className='btn-unordered-list' onClick={() => wrapSelected('|•|', '|•|')}>•</button>
        </div>
        <textarea
          style={{ minHeight: `${minHeight}px` }}
          ref={textAreaRef}
          value={value}
          onKeyDown={handleKeyDown}
          onChange={(e) => handleChange(name, e.target.value, type)}
        ></textarea>
      </div>
    </div>
  );
};

export default Modal;
