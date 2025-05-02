import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import ConfirmDialog from './components/ConfirmDialog';
import DefaultInput from './components/DefaultInput';
import DropdownInput from './components/DropdownInput';
import FileInput from './components/FileInput';
import FormattableTextarea from './components/FormattableTextarea';
import GenericTableInput from './components/GenericTableInput';
import ListInput from './components/ListInput';
import TableInput from './components/TableInput';
import TabsInput from './components/TabsInput';
import { fileToBase64 } from './utils/fileUtils';

const Modal = ({ onClose, inputs, onSubmit, exValues, example }) => {
  const [values, setValues] = useState(exValues || {});
  const [showExample, setShowExample] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: '',
    message: '',
    onConfirm: () => { },
  });

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
        newTabsGlossary = Object.values(exValues.tabsGlossary);
      } else {
        newTabsGlossary = exValues?.tabsGlossary || [];
      }

      setValues((prevValues) => ({
        ...prevValues,
        'tabs': exValues?.tabs || [],
        'tabsGlossary': newTabsGlossary,
      }));
    } else if (hasTabsInput && hasTabsDataInput) {
      const newTabs = exValues?.tabs?.map((tab, index) => ({
        id: tab + '-' + index,
        tab: tab
      })) || [];

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
        let originalSide;
        if (question.side === exValues?.leftAnswer) {
          originalSide = 0;
        } else if (question.side === exValues?.rightAnswer) {
          originalSide = 1;
        }
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
        'data': exValues?.data || [{ title: 'Заголовок', description: 'Текст' }],
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
        'items': exValues?.items || [{ 'text': 'Элемент' }],
      }));
    }
  }, [inputs]);

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
            'tabs': [...prevValues['tabs'], { 'id': newTabsId, 'tab': 'Вкладка ' + (values.tabs?.length + 1) }],
            'tabsData': [...prevValues['tabsData'], { 'id': newId, 'header': 'Заголовок вкладки', 'data': 'Данные вкладки', 'tabsIndex': newTabsId }]
          }
        });
      } else if (Number.isInteger(args[0])) {
        setValues((prevValues) => {
          const newId = Date.now() + '-' + prevValues.tabsData?.length;
          return {
            ...prevValues,
            'tabsData': [...prevValues['tabsData'], { 'id': newId, 'header': 'Заголовок вкладки', 'data': 'Данные вкладки', 'tabsIndex': args[0] }]
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
          items: [...prevValues['items'], { text: 'Элемент' }],
        }));
      } else if (args[0] == 'dnd_questions') {
        setValues((prevValues) => ({
          ...prevValues,
          ['questions']: [...prevValues['questions'] || [], { answer: 'Новый вопрос', side: 0 }],
        }));
      } else if (args[0] == 'icons-title-desx') {
        setValues((prevValues) => ({
          ...prevValues,
          ['data']: [...prevValues['data'] || [], { title: 'Заголовок', description: 'Текст' }],
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
            'tabsData': [...prevValues['tabsData'], { 'id': newId, 'header': 'Заголовок вкладки', 'data': 'Данные вкладки', 'tabsIndex': args[1] }]
          }
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
            ['data']: [...prevValues['data'] || [], { title: 'Заголовок', description: 'Описание' }],
          }));
        } else {
          setValues((prevValues) => ({
            ...prevValues,
            ['list']: [...prevValues['list'] || [], { title: 'Заголовок', description: 'Описание' }],
          }));
        }
      }
    }
  };

  const handleRemoveFromList = (name, index) => {
    setConfirmDialog({
      open: true,
      title: 'Удалить элемент?',
      message: 'Вы действительно хотите удалить этот элемент?',
      onConfirm: () => {
        setValues((prevValues) => {
          const updatedList = [...prevValues[name]];
          updatedList.splice(index, 1);
          return {
            ...prevValues,
            [name]: updatedList
          };
        });
        setConfirmDialog({ ...confirmDialog, open: false });
      }
    });
  };

  const handleRemoveFromTable = (name, index) => {
    setConfirmDialog({
      open: true,
      title: 'Удалить строку?',
      message: 'Вы действительно хотите удалить эту строку?',
      onConfirm: () => {
        setValues((prevValues) => {
          const updatedTable = [...prevValues[name]];
          updatedTable.splice(index, 1);
          return {
            ...prevValues,
            [name]: updatedTable
          };
        });
        setConfirmDialog({ ...confirmDialog, open: false });
      }
    });
  };

  const handleRemoveTab = (index, tabId) => {
    setConfirmDialog({
      open: true,
      title: 'Удалить вкладку?',
      message: 'Удаление вкладки приведет к удалению всего связанного содержимого. Вы уверены?',
      onConfirm: () => {
        setValues((prevValues) => {
          if (prevValues.tabsGlossary) {
            const updatedTabs = [...prevValues.tabs];
            const updatedGlossary = [...prevValues.tabsGlossary];
            updatedTabs.splice(index, 1);
            updatedGlossary.splice(index, 1);
            return {
              ...prevValues,
              tabs: updatedTabs,
              tabsGlossary: updatedGlossary
            };
          } else if (prevValues.tabsData) {
            const updatedTabs = prevValues.tabs.filter(tab => tab.id !== tabId);
            const updatedTabsData = prevValues.tabsData.filter(data => data.tabsIndex !== tabId);

            return {
              ...prevValues,
              tabs: updatedTabs,
              tabsData: updatedTabsData
            };
          }

          return prevValues;
        });
        setConfirmDialog({ ...confirmDialog, open: false });
      }
    });
  };

  const handleRemoveTabData = (dataId) => {
    setConfirmDialog({
      open: true,
      title: 'Удалить элемент?',
      message: 'Вы уверены, что хотите удалить этот элемент?',
      onConfirm: () => {
        setValues((prevValues) => {
          const updatedTabsData = prevValues.tabsData.filter(data => data.id !== dataId);
          return {
            ...prevValues,
            tabsData: updatedTabsData
          };
        });
        setConfirmDialog({ ...confirmDialog, open: false });
      }
    });
  };

  const handleRemoveRow = (rowIndex) => {
    setConfirmDialog({
      open: true,
      title: 'Удалить строку?',
      message: 'Вы уверены, что хотите удалить эту строку?',
      onConfirm: () => {
        setValues((prevValues) => {
          const updatedData = [...prevValues.data];
          updatedData.splice(rowIndex, 1);
          return {
            ...prevValues,
            data: updatedData
          };
        });
        setConfirmDialog({ ...confirmDialog, open: false });
      }
    });
  };

  const handleRemoveColumn = (colIndex) => {
    setConfirmDialog({
      open: true,
      title: 'Удалить колонку?',
      message: 'Удаление колонки повлияет на все строки. Вы уверены?',
      onConfirm: () => {
        setValues((prevValues) => {
          const updatedColumns = [...prevValues.columns];
          updatedColumns.splice(colIndex, 1);

          const updatedData = prevValues.data.map(row => {
            const newRow = [...row];
            newRow.splice(colIndex, 1);
            return newRow;
          });

          return {
            ...prevValues,
            columns: updatedColumns,
            data: updatedData
          };
        });
        setConfirmDialog({ ...confirmDialog, open: false });
      }
    });
  };

  const handleAddToTable = (name) => {
    if (name == 'rows') {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: [...prevValues[name], { "first": '1', "second": 'Значение' }],
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
          if (updatedTabsGlossary[idOrIndex].trim() === '') {
            updatedTabs.splice(idOrIndex, 1);
            updatedTabsGlossary.splice(idOrIndex, 1);
          }
        } else {
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
        const selectedFile = value;

        fileToBase64(selectedFile, (base64String) => {
          setValues((prevValues) => ({ ...prevValues, [name]: base64String }));
        });

      } else {
        console.error("Invalid file type");
      }
    } else if (type == "number") {
      const numericValue = value?.replace(/\D/g, '');
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
      const updatedData = prevValues.data.map(row => {
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

    if (input.type === 'file') {
      return <FileInput key={input.name} input={input} values={values} handleChange={handleChange} />;
    }

    if (input.type === 'list' && values[input.name]) {
      return (
        <ListInput
          key={input.name}
          name={input.name}
          label={input.label}
          values={values}
          handleInputChange={handleInputChange}
          handleAddToList={handleAddToList}
          handleRemoveFromList={handleRemoveFromList}
        />
      );
    }

    if (input.type === 'rows' && values[input.name]) {
      return (
        <TableInput
          key={input.name}
          name={input.name}
          label={input.label}
          values={values}
          handleInputChangeTable1={handleInputChangeTable1}
          handleAddToTable={handleAddToTable}
          handleRemoveFromTable={handleRemoveFromTable}
        />
      );
    }

    if (input.type === 'formatTextarea') {
      return (
        <FormattableTextarea
          key={input.name}
          handleChange={handleChange}
          label={input.label}
          name={input.name}
          type={input.type}
          value={values[input.name] || ''}
        />
      );
    }

    if (input.type === 'table_headers' && values.columns) {
      return (
        <GenericTableInput
          key={input.name}
          values={values}
          handleHeaderChange={handleHeaderChange}
          handleInputChangeArrayInObject={handleInputChangeArrayInObject}
          handleAddColumn={handleAddColumn}
          handleAddToTable={handleAddToTable}
          handleRemoveRow={handleRemoveRow}
          handleRemoveColumn={handleRemoveColumn}
        />
      );
    }

    if (input.type === 'tabs' && values.tabs && Array.isArray(values.tabsGlossary)) {
      return (
        <TabsInput
          key={input.name}
          values={values}
          handleInputChange={handleInputChange}
          handleAddToList={handleAddToList}
          handleRemoveTab={handleRemoveTab}
        />
      );
    }

    if (input.type === 'dropd' && values.tabs && values.tabsData) {
      return (
        <DropdownInput
          key={input.name}
          values={values}
          handleInputChange={handleInputChange}
          handleAddToList={handleAddToList}
          handleRemoveTab={handleRemoveTab}
          handleRemoveTabData={handleRemoveTabData}
        />
      );
    }

    if (input.type === 'checkbox') {
      return (
        <Box key={input.name} sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={values[input.name] || false}
                onChange={(e) => handleChange(input.name, e.target.checked, input.type)}
              />
            }
            label={input.label}
          />
        </Box>
      );
    }

    if (input.type === 'select') {
      return (
        <Box key={input.name} sx={{ mb: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel>{input.label}</InputLabel>
            <Select
              value={values[input.name] || 'center'}
              onChange={(e) => handleChange('alignment', e.target.value, input.type)}
              label={input.label}
            >
              <MenuItem value="center">Центр</MenuItem>
              <MenuItem value="left">Налево</MenuItem>
              <MenuItem value="right">Направо</MenuItem>
            </Select>
          </FormControl>
        </Box>
      );
    }

    return <DefaultInput key={input.name} input={input} values={values} handleChange={handleChange} />;
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: '90vh',
          overflowY: 'auto'
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Введите данные для компонента</Typography>
        <Box>
          {example && (
            <IconButton
              onClick={() => setShowExample(prev => !prev)}
              color="primary"
              sx={{ mr: 1 }}
            >
              {showExample ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
          )}
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    </DialogTitle>
      

  {example && showExample && (
        <Box sx={{ px: 3, pb: 2 }}>
          <Paper variant="outlined" sx={{ p: 1 }}>
            <img 
              src={example} 
              alt="Example" 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '300px', 
                objectFit: 'contain',
                display: 'block',
                margin: '0 auto'
              }} 
            />
          </Paper>
        </Box>
      )}

      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {inputs?.map(renderInputComponent)}
        </Box>
      </DialogContent >

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button 
          variant="outlined" 
          onClick={onClose}
          startIcon={<CloseIcon />}
        >
          Закрыть
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit}
          startIcon={<SaveIcon />}
        >
          Сохранить
        </Button>
      </DialogActions>

      <ConfirmDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog({ ...confirmDialog, open: false })}
      />
    </Dialog>
  );
};

export default Modal;
