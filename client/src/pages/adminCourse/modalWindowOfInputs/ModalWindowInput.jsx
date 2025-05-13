import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ThemeProvider,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { modalTheme } from './theme';

// Import input components
import CardQuizInput from './components/inputs/CardQuizInput';
import CarouselInput from './components/inputs/CarouselInput';
import CheckboxInput from './components/inputs/CheckboxInput';
import ColorPickerInput from './components/inputs/ColorPickerInput';
import DataRowsInput from './components/inputs/DataRowsInput';
import DefaultInput from './components/inputs/DefaultInput';
import DndQuestionsInput from './components/inputs/DndQuestionsInput';
import DragAndDropOptionsInput from './components/inputs/DragAndDropOptionsInput';
import DropdownInput from './components/inputs/DropdownInput';
import DropdownR5Input from './components/inputs/DropdownR5Input';
import FileInput from './components/inputs/FileInput';
import FilesAndListInput from './components/inputs/FilesAndListInput';
import FormattableTextarea from './components/inputs/FormattableTextarea';
import IconsTitleDescInput from './components/inputs/IconsTitleDescInput';
import IconTextInnerTextInput from './components/inputs/IconTextInnerTextInput';
import ItemsTextInput from './components/inputs/ItemsTextInput';
import ListInput from './components/inputs/ListInput';
import ListNameDescInput from './components/inputs/ListNameDescInput';
import ListOfListInput from './components/inputs/ListOfListInput';
import ListWithTabsInput from './components/inputs/ListWithTabsInput';
import NumberInput from './components/inputs/NumberInput';
import PhasesInput from './components/inputs/PhasesInput';
import PointsListInput from './components/inputs/PointsListInput';
import RowsInput from './components/inputs/RowsInput';
import SelectInput from './components/inputs/SelectInput';
import TableDataInput from './components/inputs/TableDataInput';
import TableHeadersInput from './components/inputs/TableHeadersInput';
import TabsGlossaryInput from './components/inputs/TabsGlossaryInput';
import TestAnswersInput from './components/inputs/TestAnswersInput';
import TextareaInput from './components/inputs/TextareaInput';
import TitleDescInput from './components/inputs/TitleDescInput';
import { fileToBase64 } from './utils/fileUtils';

const Modal = ({ onClose, inputs, onSubmit, exValues, example }) => {
  const [values, setValues] = useState(exValues || {});
  const [showExample, setShowExample] = useState(false);
  
  useEffect(() => {
    // Only keep variables that are actually used in conditionals below
    const hasListInput = inputs.some((x) => x.name == 'list');
    const isDropdownList_r5 = inputs.some((x) => x.name == 'items' && x.type == 'data:5'); 
    const hasLeftAnswer = inputs.some((x) => x.name == 'leftAnswer');
    const hasRightAnswer = inputs.some((x) => x.name == 'rightAnswer');
    const hasTest_answers = inputs.some((x) => x.type === 'test_answers');

    // Initialize state values based on input types
    if (inputs.some((x) => x.name === 'isKazakh')) {
      setValues(prevValues => ({
        ...prevValues,
        'isKazakh': exValues?.isKazakh || true
      }));
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
      }));
    }

    if (inputs.some((x) => x.name === 'points')) {
      setValues(prevValues => ({
        ...prevValues,
        'points': exValues?.points || [
          { id: 0, x: 720, y: 380, name: 'ГО регуляторы (государтсвенные органы-регуляторы)' },
        ],
        'list': exValues?.list || [[ 'Текст' ]]
      }));
    } else if (hasListInput) {
      setValues((prevValues) => ({
        ...prevValues,
        'list': exValues?.list || [],
      }));
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
      }));
    }

    if (inputs.some((x) => x.type === 'DragAndDropOptions')) {
      setValues(prevValues => ({
        ...prevValues,
        'answerOptions': [
          { id: 1, text: '' },
          { id: 2, text: '' }
        ],
        'fieldOptions': [
          { text: '', correctId: 1 },
          { text: '', correctId: 2 }
        ]
      }));
    }

    if (inputs.some((x) => x.name === 'stages')) {
      setValues(prevValues => ({
        ...prevValues,
        'stages': exValues?.stages || [
          {icon: '', text: 'Видная часть', innerText: 'Скрытая часть'},
        ]
      }));
    }

    if (inputs.some((x) => x.name === 'gap')) {
      setValues(prevValues => ({
        ...prevValues,
        'gap': exValues?.gap || 27
      }));
    }

    if (isDropdownList_r5) {
      setValues(prevValues => ({
        ...prevValues,
        'items': exValues?.items || [
          { title: 'Элемент1', text: 'Элемент1 - это' },
          { title: 'Элемент2', text: 'Элемент2 - это' },
          { title: 'Элемент3', text: 'Элемент3 - это' },
          { title: 'Элемент4', text: 'Элемент4 - это' },
          { title: 'Элемент5', text: 'Элемент5 - это' },
        ],
        'headers': exValues?.headers || [
          { name: 'Группа 1', icon: null },
          { name: 'Группа 2', icon: null },
          { name: 'Группа 3', icon: null },
        ]
      }));
    }

    if (hasLeftAnswer) {
      setValues(prevValues => ({
        ...prevValues,
        'left': exValues?.left || null
      }));
    }

    if (hasRightAnswer) {
      setValues(prevValues => ({
        ...prevValues,
        'right': exValues?.right || null
      }));
    }

    if (hasTest_answers) {
      setValues(prevValues => ({
        ...prevValues,
        'options': exValues?.options || [],
        'correctOptions': exValues?.correctOptions || [],
      }));
    }

    if (inputs.some((x) => x.name === 'adjustWidth')) {
      setValues(prevValues => ({
        ...prevValues,
        'adjustWidth': exValues?.adjustWidth || false
      }));
    }

    if (inputs.some((x) => x.name === 'notCrop')) {
      setValues(prevValues => ({
        ...prevValues,
        'notCrop': exValues?.notCrop || true
      }));
    }

    if (inputs.some((x) => x.name === 'version')) {
      setValues(prevValues => ({
        ...prevValues,
        'version': 2
      }));
    }

    if (inputs.some((x) => x.name === 'images')) {
      setValues(prevValues => ({
        ...prevValues,
        'images': exValues?.images || []
      }));
    }

    if (inputs.some((x) => x.name === 'isSublist')) {
      setValues(prevValues => ({
        ...prevValues,
        'isSublist': exValues?.isSublist || false
      }));
    }

    if (inputs.some((x) => x.name === 'alignment')) {
      setValues(prevValues => ({
        ...prevValues,
        'alignment': exValues?.alignment || 'сenter'
      }));
    }

    if (inputs.some((x) => x.name === 'icons')) {
      setValues(prevValues => ({
        ...prevValues,
        'icons': exValues?.icons || []
      }));
    }

    // Handle tabs and glossary
    if (inputs.some((x) => x.name === 'tabs') && inputs.some((x) => x.name === 'tabsGlossary')) {
      const isTabsGlossaryObject = exValues?.tabsGlossary && 
        typeof exValues.tabsGlossary === 'object' && 
        !Array.isArray(exValues.tabsGlossary);

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
    } 
    // Handle tabs and data
    else if (inputs.some((x) => x.name === 'tabs') && inputs.some((x) => x.name === 'tabsData')) {
      // Convert tabs back into array of objects with ids
      const newTabs = exValues?.tabs?.map((tab, index) => ({
        id: tab + '-' + index,
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
    }
    // Handle questions, leftAnswer, and rightAnswer
    else if (inputs.some((x) => x.name === 'questions') && hasLeftAnswer && hasRightAnswer) {
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
      }) || [];

      setValues((prevValues) => ({
        ...prevValues,
        questions: originalQuestionsList,
        leftAnswer: exValues?.leftAnswer || '',
        rightAnswer: exValues?.rightAnswer || '',
      }));
    } 
    // Handle columns and data for tables
    else if (inputs.some((x) => x.name === 'columns') && inputs.some((x) => x.name === 'data')) {
      setValues((prevValues) => ({
        ...prevValues,
        'columns': exValues?.columns || ['Первая колонна', 'Вторая колонна'],
        'data': exValues?.data || [],
        'data_row': exValues?.data_row || [],
      }));
    }
    // Handle icons and data
    else if (inputs.some((x) => x.name === 'icons') && inputs.some((x) => x.name === 'data')) {
      setValues((prevValues) => ({
        ...prevValues,
        'icons': exValues?.icons || [''],
        'data': exValues?.data || [{title: 'Заголовок', description: 'Текст изображения'}],
      }));
    }
    // Handle centered flag
    else if (inputs.some((x) => x.name === 'isCentered')) {
      setValues((prevValues) => ({
        ...prevValues,
        'isCentered': exValues?.isCentered || false
      }));
    }
    // Handle data buttons and data
    else if (inputs.some((x) => x.name === 'dataBtn') && inputs.some((x) => x.name === 'data')) {
      setValues((prevValues) => ({
        ...prevValues,
        'data': exValues?.data || [],
        'dataBtn': exValues?.dataBtn || [],
      }));
    }
    // Handle just data
    else if (inputs.some((x) => x.name === 'data')) {
      setValues(prevValues => ({
        ...prevValues,
        'data': exValues?.data || [{ header: 'Заголовок', image: '', imageText: 'Текст изображения' }]
      }));
    }
    // Handle just questions
    else if (inputs.some((x) => x.name === 'questions')) {
      setValues(prevValues => ({
        ...prevValues,
        'questions': exValues?.questions || [
          {
            question: 'Вопрос',
            options: [
              { question: 'Ответ 1', answer: 'Фидбэк к ответу (напривер, "неправильно!")' },
              { question: 'Ответ 1', answer: 'Фидбэк к ответу (напривер, "правильно!")' },
            ],
            correctOptionIndex: 1,
          },
        ]
      }));
    }

    // Handle items_text type
    if (inputs.some((x) => x.type === 'items_text')) {
      setValues((prevValues) => ({
        ...prevValues,
        'items': exValues?.items || [{'text': 'Элемент'}],
      }));
    }

  }, [inputs, exValues]);

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
          };
        });
      } else if (Number.isInteger(args[0]))  {
        setValues((prevValues) => {
          const newId = Date.now() + '-' + prevValues.tabsData?.length;
          return {
            ...prevValues,
            'tabsData': [...prevValues['tabsData'], {'id': newId, 'header': 'Заголовок вкладки', 'data': 'Данные вкладки', 'tabsIndex': args[0] }]
          };
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
          };
        });
      } else if (args[0] == 'dropDownListItems') {
        const updatedList = [...values.list];
        if (args[1] >= 0 && args[1] < updatedList?.length) {
          updatedList[args[1]].items = [...updatedList[args[1]].items, 'Элемент списка']; 
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
        const newRow = new Array(prevValues.columns?.length).fill('Значение');
        return {
            ...prevValues,
            [name]: [...prevValues[name], newRow]
        };
      });
    }
  };

  const handleInputChange = (idOrIndex, newValue, name) => {
    // If idOrIndex is null and newValue is an array, we're setting the whole array directly
    // This is for immediate deletion operations
    if (idOrIndex === null && Array.isArray(newValue)) {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: newValue,
      }));
      return;
    }

    if (name === 'tabsDataHeader' || name === 'tabsDataData') {
      setValues((prevValues) => {
        const updatedTabsData = prevValues.tabsData.map(item => {
            if (item.id === idOrIndex) {
              return { ...item, [name === 'tabsDataHeader' ? 'header' : 'data']: newValue };
            }
            return item;
        });

        const filteredTabsData = updatedTabsData.filter(item => 
            item.header.trim() !== '' || item.data.trim() !== ''
        );
        
        const filteredTabs = prevValues.tabs.filter((tab, tabIndex) =>
            filteredTabsData.some(tabData => tabData.tabsIndex === tab.id)
        );

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

          const duplicates = updatedTabs.some((tab, index, self) => 
              tab.tab === newValue && self.findIndex(t => t.tab === newValue) !== index
          );

          if (duplicates) {
              alert('Duplicate entry detected. Each tab must have a unique name.');
              return prevValues;
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
          // If the tab name is empty, mark for potential removal
          updatedTabs[idOrIndex] = '';
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
    } else if (name == 'icons') {
      if (newValue) {
        const selectedFile = newValue;
      
        fileToBase64(selectedFile, (base64String) => {
          setValues((prevValues) => {
              const updatedIcons = [...prevValues.icons];
              updatedIcons[idOrIndex] = base64String;
              
              return { ...prevValues, icons: updatedIcons };
            }
          );
        });
      }
    } else if (name === 'listName' || name === 'listDescription') {
      // Handle updates to list item name and description
      setValues((prevValues) => {
        const updatedList = [...prevValues.list];
        
        if (idOrIndex >= 0 && idOrIndex < updatedList.length) {
          if (name === 'listName') {
            updatedList[idOrIndex].name = newValue;
          } else if (name === 'listDescription') {
            updatedList[idOrIndex].description = newValue;
          }
        }
        
        return {
          ...prevValues,
          list: updatedList,
        };
      });
    } else if (name === 'title' || name === 'description') {
      // Handle updates to title and description fields in list or data arrays
      setValues((prevValues) => {
        // Determine which array to update based on TitleDescInput component usage
        const arrayName = prevValues.data && 
                          Array.isArray(prevValues.data) && 
                          prevValues.data.length > idOrIndex && 
                          typeof prevValues.data[idOrIndex] === 'object' &&
                          (prevValues.data[idOrIndex].title !== undefined || prevValues.data[idOrIndex].description !== undefined)
                            ? 'data' 
                            : 'list';
        
        if (!prevValues[arrayName]) return prevValues;
        
        const updatedArray = [...prevValues[arrayName]];
        
        if (idOrIndex >= 0 && idOrIndex < updatedArray.length) {
          updatedArray[idOrIndex] = {
            ...updatedArray[idOrIndex],
            [name]: newValue
          };
        }
        
        return {
          ...prevValues,
          [arrayName]: updatedArray,
        };
      });
    } else {
      // For any other array-type field
      setValues((prevValues) => {
        if (!prevValues[name]) return prevValues;
        
        const updatedList = [...prevValues[name]];
        
        if (idOrIndex >= 0 && idOrIndex < updatedList.length) {
          updatedList[idOrIndex] = newValue;
          
          // If value is empty and it's not the only item, remove it
          if (newValue.trim() === '' && updatedList.length > 1) {
            updatedList.splice(idOrIndex, 1);
          }
        }
        
        return {
          ...prevValues,
          [name]: updatedList,
        };
      });
    }
  };

  const handleInputChangeArrayInObject = (index, newValue, parentIndex, name) => {
    if (name == 'listItems') {
      const updatedList = [...values.list];
      const updatedItems = [...updatedList[parentIndex].items];

      updatedItems[index] = newValue;
      
      if (updatedItems[index].trim() === '') {
          updatedItems.splice(index, 1);
      } 
      
      setValues((prevValues) => {
        updatedList[parentIndex].items = updatedItems;
        return {
            ...prevValues,
            list: updatedList,
        };
      });
    } else if (name == 'simpleTable') {
      setValues(prevValues => {
        const updatedData = [...prevValues.data];
        const updatedRow = [...updatedData[parentIndex]];
        updatedRow[index] = newValue;
        updatedData[parentIndex] = updatedRow;

        return {
            ...prevValues,
            data: updatedData
        };
      });
    }
  };

  const handleInputChangeTable1 = (index, newValue, name) => {
    setValues((prevValues) => {
      const updatedRows = [...prevValues.rows];

      if (name === 'first') {
          updatedRows[index].first = newValue;
      } else if (name === 'second') {
          updatedRows[index].second = newValue;
      }

      if (updatedRows[index].first.trim() === '' && updatedRows[index].second.trim() === '') {
          updatedRows.splice(index, 1);
      }

      return {
          ...prevValues,
          'rows': updatedRows,
      };
    });
  };

  const handleChange = (name, value, type) => {
    if (type == "file") {
      if (value) {
        fileToBase64(value, (base64String) => {
          setValues((prevValues) => ({ ...prevValues, [name]: base64String }));
        });
      }
    } else if (type == "number") {
      const numericValue = value?.replace(/\D/g, '');
      const integerValue = parseInt(numericValue, 10);

      if (!isNaN(integerValue)) {
        setValues((prevValues) => ({ ...prevValues, [name]: integerValue }));
      }
    } else {
      setValues((prevValues) => ({ ...prevValues, [name]: value }));
    }
  };

  const handleHeaderChange = (index, newValue) => {
    if (newValue.trim() === '') {
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
        const updatedColumns = [...prevValues.columns, 'Колонна'];
        const updatedData = prevValues.data.map(row => [...row, 'Значение']);

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
          const tabKey = updatedValues.tabs[index]; 
          obj[tabKey] = glossaryValue; 
          return obj;
      }, {});

      updatedValues.tabsGlossary = tabsGlossaryObject;
    } else if (updatedValues.tabs && updatedValues.tabsData) {
      const updatedTabsData = updatedValues.tabsData.map(tabData => {
        const correspondingTabIndex = updatedValues.tabs.findIndex(tab => tab.id === tabData.tabsIndex);
        const { id, tabsIndex, ...rest } = tabData;
        return { ...rest, tabName: correspondingTabIndex !== -1 ? updatedValues.tabs[correspondingTabIndex].tab : '' };
      });
      
      updatedValues.tabs = updatedValues.tabs.map(tab => tab.tab);
      updatedValues.tabsData = updatedTabsData;
    } else if (updatedValues.questions && updatedValues.leftAnswer && updatedValues.rightAnswer) {
      const questionsList = updatedValues.questions.reduce((accumulator, currentElement) => {
        const valueOfSide = currentElement.side === 0 ? updatedValues.leftAnswer : updatedValues.rightAnswer;
        accumulator.push({ ...currentElement, side: valueOfSide });
        return accumulator;
      }, []);
    
      updatedValues.questions = questionsList;
    }

    onSubmit({ inputs, values: updatedValues });    
    setValues({});
    onClose();
  };

  const renderInputComponent = (input) => {
    if (input.type === 'ignore') return null;
    
    switch (input.type) {
      case 'file':
        return <FileInput key={input.name} input={input} values={values} handleChange={handleChange} />;
      
      case 'number':
        return <NumberInput key={input.name} input={input} values={values} handleChange={handleChange} />;
      
      case 'list':
        if (values[input.name]) {
          return <ListInput 
                  key={input.name} 
                  name={input.name} 
                  label={input.label} 
                  values={values} 
                  handleInputChange={handleInputChange} 
                  handleAddToList={handleAddToList} 
                />;
        }
        return null;
      
      case 'rows':
        if (values[input.name]) {
          return <RowsInput 
                  key={input.name} 
                  name={input.name} 
                  label={input.label} 
                  values={values} 
                  handleInputChangeTable1={handleInputChangeTable1} 
                  handleAddToTable={handleAddToTable} 
                />;
        }
        return null;
      
      case 'tabs':
        if (values.tabs && Array.isArray(values.tabsGlossary)) {
          return <TabsGlossaryInput 
                  key={input.name} 
                  values={values} 
                  handleInputChange={handleInputChange} 
                  handleAddToList={handleAddToList} 
                />;
        } else if (values.tabs && values.tabsData) {
          return <DropdownInput 
                  key={input.name} 
                  values={values} 
                  handleInputChange={handleInputChange} 
                  handleAddToList={handleAddToList} 
                />;
        }
        return null;
      
      case 'tabsGlossary':
      case 'tabsData':
        return null;
      
      case 'listNameDescroptionItems':
        if (values.list) {
          return <ListNameDescInput 
                  key={input.name} 
                  input={input} 
                  values={values} 
                  handleInputChange={handleInputChange} 
                  handleInputChangeArrayInObject={handleInputChangeArrayInObject} 
                  handleAddToList={handleAddToList} 
                />;
        }
        return null;
      
      case 'items_text':
        if (values.items) {
          return <ItemsTextInput 
                  key={input.name} 
                  input={input} 
                  values={values} 
                  handleInputChange={handleInputChange} 
                  handleAddToList={handleAddToList} 
                />;
        }
        return null;
      
      case 'textarea':
        return <TextareaInput 
                key={input.name} 
                input={input} 
                values={values} 
                handleChange={handleChange} 
              />;
      
      case 'dnd_questions':
        return <DndQuestionsInput 
                key={input.name} 
                input={input} 
                values={values} 
                handleInputChange={handleInputChange} 
                handleAddToList={handleAddToList} 
              />;
      
      case 'title_desx_list':
        return <TitleDescInput 
                key={input.name} 
                input={input} 
                values={values} 
                handleInputChange={handleInputChange} 
                handleAddToList={handleAddToList} 
              />;
      
      case 'table_headers':
        if (values.columns) {
          return <TableHeadersInput 
                  key={input.name} 
                  values={values} 
                  handleHeaderChange={handleHeaderChange} 
                  handleInputChangeArrayInObject={handleInputChangeArrayInObject} 
                  handleAddColumn={handleAddColumn} 
                  handleAddToTable={handleAddToTable} 
                />;
        }
        return null;
      
      case 'table_rows':
        return null;
      
      case 'icons_title_desx_list':
        if (values.icons) {
          return <IconsTitleDescInput 
                  key={input.name} 
                  input={input} 
                  values={values} 
                  handleInputChange={handleInputChange} 
                  handleAddToList={handleAddToList} 
                />;
        }
        return null;
      
      case 'title_desx_of_icons':
        return null;
      
      case 'checkbox':
        return <CheckboxInput 
                key={input.name} 
                input={input} 
                values={values} 
                handleChange={handleChange} 
              />;
      
      case 'formatTextarea':
        return <FormattableTextarea 
                key={input.name} 
                name={input.name} 
                label={input.label} 
                type={input.type} 
                value={values[input.name] || ''} 
                handleChange={handleChange} 
              />;
      
      case 'files_and_list':
        return <FilesAndListInput 
                key={input.name} 
                input={input} 
                values={values} 
                setValues={setValues} 
                fileToBase64={fileToBase64} 
              />;
      
      case 'select':
        return <SelectInput 
                key={input.name} 
                input={input} 
                values={values} 
                setValues={setValues} 
              />;
      
      case 'carousel_items':
        return <CarouselInput 
                key={input.name} 
                input={input} 
                values={values} 
                setValues={setValues} 
                fileToBase64={fileToBase64} 
              />;
      
      case 'test_answers':
        return <TestAnswersInput 
                key={input.name} 
                values={values} 
                setValues={setValues} 
              />;
      
      case 'tableData':
        return <TableDataInput 
                key={input.name} 
                values={values} 
                setValues={setValues} 
              />;
      
      case 'list_with_tabs':
        return <ListWithTabsInput 
                key={input.name} 
                values={values} 
                setValues={setValues} 
              />;
      
      case 'card_quiz_input':
        return <CardQuizInput 
                key={input.name} 
                values={values} 
                setValues={setValues} 
              />;
      
      case 'data:5':
        return <DropdownR5Input 
                key={input.name} 
                values={values} 
                setValues={setValues} 
                fileToBase64={fileToBase64} 
              />;
      
      case 'icon:text:innerText':
        return <IconTextInnerTextInput 
                key={input.name} 
                values={values} 
                setValues={setValues} 
                fileToBase64={fileToBase64} 
              />;
      
      case 'DragAndDropOptions':
        return <DragAndDropOptionsInput 
                key={input.name} 
                values={values} 
                setValues={setValues} 
              />;
      
      case 'data_rows':
        return <DataRowsInput 
                key={input.name} 
                values={values} 
                setValues={setValues} 
              />;
      
      case 'phases':
        return <PhasesInput 
                key={input.name} 
                values={values} 
                setValues={setValues} 
              />;
      
      case 'points_list':
        return <PointsListInput 
                key={input.name} 
                values={values} 
                setValues={setValues} 
              />;
      
      case 'list_of_list':
        return <ListOfListInput 
                key={input.name} 
                values={values} 
                setValues={setValues} 
              />;
      
      case 'color':
        return <ColorPickerInput 
                key={input.name} 
                input={input} 
                values={values} 
                handleChange={handleChange} 
              />;
      
      default:
        return <DefaultInput 
                key={input.name} 
                input={input} 
                values={values} 
                handleChange={handleChange} 
              />;
    }
  };

  return (
    <ThemeProvider theme={modalTheme}>
      <Dialog
        open={true}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            maxHeight: '90vh',
            p: 3
          }
        }}
      >
        <DialogTitle sx={{ p: 0, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" color="primary.main" fontWeight={500}>
            Введите данные для компонента
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {example && (
              <IconButton
                onClick={() => setShowExample(!showExample)}
                color="primary"
                sx={{ mr: 1 }}
              >
                {showExample ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            )}
            <IconButton onClick={onClose} edge="end">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        {example && showExample && (
          <Box sx={{ mb: 2, borderRadius: 1, overflow: 'hidden' }}>
            <img 
              src={example} 
              alt="Example" 
              style={{ maxWidth: '100%', display: 'block' }} 
            />
          </Box>
        )}

        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {inputs !== null && inputs.map(renderInputComponent)}
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 0, mt: 3 }}>
          <Button 
            variant="outlined" 
            onClick={onClose}
            startIcon={<CloseIcon />}
          >
            Закрыть
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            startIcon={<SaveIcon />}
            color="primary"
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default Modal;
