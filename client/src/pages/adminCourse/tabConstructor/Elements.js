import FileDownloader from '../../../components/courseTemplates/common/FileDownloader'
import HeaderWithLine from '../../../components/courseTemplates/common/HeaderWithLine'
import ImageLine from '../../../components/courseTemplates/common/ImageLine'
import ImageWithText from '../../../components/courseTemplates/common/ImageWithText'
import NotNumberedDots from '../../../components/courseTemplates/common/NotNumberedDots'
import NumberedDots from '../../../components/courseTemplates/common/NumberedDots'
import RandomGlossary from '../../../components/courseTemplates/common/RandomGlossary'
import RandomH2 from '../../../components/courseTemplates/common/RandomH2'
import RandomParapraph from '../../../components/courseTemplates/common/RandomParagraph'
import Sizebox from '../../../components/courseTemplates/common/Sizebox'

import Table_1 from '../../../components/courseTemplates/common/Tables/Table-1'

import SimpleTable from '../../../components/courseTemplates/common/SimpleTable'
import TextWithBackground from '../../../components/courseTemplates/common/TextWithBackground'
import TextWithTitle from '../../../components/courseTemplates/common/TextWithTitle'
import VideoLine from '../../../components/courseTemplates/common/VideoLine'
import Report_Warning from '../../../components/courseTemplates/common/Warnings/Report'
import Report_Information from '../../../components/courseTemplates/common/Warnings/Report_Information'
import FancyList from '../../../components/courseTemplates/common_v2/FancyList'
import FlexBoxes from '../../../components/courseTemplates/common_v2/FlexBoxes'
import FlexRow from '../../../components/courseTemplates/common_v2/FlexRow'
import IconDots from '../../../components/courseTemplates/common_v2/IconDots'
import ImageAndColumns from '../../../components/courseTemplates/common_v2/ImageAndColumns'
import ImageSequence from '../../../components/courseTemplates/common_v2/ImageSequence'
import Quote from '../../../components/courseTemplates/common_v2/Quote'
import DataChain from '../../../components/courseTemplates/complex/DataChain'
import DragAndDropTwoSide from '../../../components/courseTemplates/complex/DragAndDropTwoSide'
import DropdownGlossaryList from '../../../components/courseTemplates/complex/DropdownGlossaryList'
import DropDownTextWithTabs from '../../../components/courseTemplates/complex/DropDownTextWithTabs'
import ShortBiography from '../../../components/courseTemplates/complex/images/ShortBiography'
import DropdownList from '../../../components/courseTemplates/complex/interactives/DropdownList'
import TabsGlossary from '../../../components/courseTemplates/complex/TabsGlossary'
import TextAndLink from '../../../components/courseTemplates/complex/TextAndLink'
import VideoWithTitleAndText from '../../../components/courseTemplates/complex/Video/VideoWithTitleAndText'

import biographyIcon from '../images/biography-icon.svg'
import block2Icon from '../images/blocks-2-icon.svg'
import blockIcon from '../images/blocks-icon.svg'
import fileDIcon from '../images/download-icon.svg'
import dropDownListIcon from '../images/drop-down-list-icon.svg'
import dropDownTableIcon from '../images/dropdropwithtext-icon.svg'
import headerWithLineIcon from '../images/header-icon.svg'
import imageIcon from '../images/imageLine-icon.svg'
import listIcon from '../images/list-icon.png'
import norNumberedDotsIcon from '../images/notNumberedDots-icon.svg'
import numberedDotsIcon from '../images/numberedDots-icon.svg'
import randomGlossaryIcon from '../images/randomGlossary-icon.svg'
import randomH2Icon from '../images/randomh2-icon.svg'
import randomParagraphIcon from '../images/randomParagraph-icon.svg'
import reportInformationIcon from '../images/reportIndormation-icon.svg'
import reportIcon from '../images/reportWarning-icon.svg'
import sizeBoxIcon from '../images/sizeBox-icon.svg'
import squareIcon from '../images/square-icon.svg'
import table1Icon from '../images/table-1-icon.svg'
import tabsGlossaryIcon from '../images/tabs-glossary-icon.svg'
import textContentIcon from '../images/text-content-icon.svg'
import imageWithTextIcon from '../images/textWithBackground-icon.svg'
import textWithTitleIcon from '../images/textWithTitle-icon.svg'
import dndTwoSideIcon from '../images/two-side-icon.svg'
import videoLineIcon from '../images/videoLine-icon.svg'


// Example images
import TwoColumnsDivider from '../../../components/courseTemplates/common_v2/TwoColumnsDivider'
import DataChainExample from './../../../assets/images/Template Examples/DataChain.png'
import DragAndDropTwoSideExample from './../../../assets/images/Template Examples/DragAndDropTwoSide.png'
import DropdownGlossaryListExample from './../../../assets/images/Template Examples/DropdownGlossaryList.png'
import DropdownListExample from './../../../assets/images/Template Examples/DropdownList.png'
import DropDownTextWithTabsExample from './../../../assets/images/Template Examples/DropDownTextWithTabs.png'
import FancyListExample from './../../../assets/images/Template Examples/FancyList.png'
import FileDownloaderExample from './../../../assets/images/Template Examples/FileDownloader.png'
import FlexBoxesExample from './../../../assets/images/Template Examples/FlexBoxes.png'
import HeaderWithLineExample from './../../../assets/images/Template Examples/HeaderWithLine.png'
import IconDotsExample from './../../../assets/images/Template Examples/IconDots.png'
import ImageAndColumnsExample from './../../../assets/images/Template Examples/ImageAndColumns.png'
import ImageLineExample from './../../../assets/images/Template Examples/ImageLine.png'
import ImageSequenceExample from './../../../assets/images/Template Examples/ImageSequence.png'
import ImageWithTextExample from './../../../assets/images/Template Examples/ImageWithText.png'
import NotNumberedDotsExample from './../../../assets/images/Template Examples/NotNumberedList.png'
import NumberedDotsExample from './../../../assets/images/Template Examples/NumberedList.png'
import QuoteExample from './../../../assets/images/Template Examples/Quote.png'
import RandomGlossaryExample from './../../../assets/images/Template Examples/RandomGlossary.png'
import RandomH2Example from './../../../assets/images/Template Examples/RandomH2.png'
import RandomParagraphExample from './../../../assets/images/Template Examples/RandomParagraph.png'
import ReportInformationExample from './../../../assets/images/Template Examples/ReportInformation.png'
import ReportWarningExample from './../../../assets/images/Template Examples/ReportWarning.png'
import ShortBiographyExample from './../../../assets/images/Template Examples/ShortBiography.png'
import SimpleTableExample from './../../../assets/images/Template Examples/SimpleTable.png'
import Table_1Example from './../../../assets/images/Template Examples/Table_1.png'
import TabsGlossaryExample from './../../../assets/images/Template Examples/TabsGlossary.png'
import TextAndLinkExample from './../../../assets/images/Template Examples/TextAndLink.png'
import TextWithBackgroundExample from './../../../assets/images/Template Examples/TextWithBackground.png'


const Elements = {
    'Текстовые элементы': {
        'Заголовок с полосой': {
            component: HeaderWithLine,
            example: HeaderWithLineExample,
            name: 'HeaderWithLine',
            icon: headerWithLineIcon,
            inputs: [
                { name: 'children', label: 'Children', type: 'text' },
                { name: 'header', label: 'Текст', type: 'text' },
                { name: 'headerColor', label: 'Цвет текста', type: 'color' },
                { name: 'lineColor', label: 'Цвет полосы', type: 'color' },
            ],
        }, //children (span for bold), header (for usual text), headerColor, lineColor
        'Текст': {
            component: RandomGlossary,
            example: RandomGlossaryExample,
            name: 'RandomGlossary',
            icon: randomGlossaryIcon,
            inputs: [
                { name: 'title', label: 'Заголовок', type: 'text' },
                { name: 'text', label: 'Текст', type: 'text' },
                { name: 'color', label: 'Цвет', type: 'color' },
                { name: 'backgroundColor', label: 'Цвет фона', type: 'color' },
            ],
        }, //title, text, color, backgroundColor
        'Маленький заголовок': {
            component: RandomH2,
            example: RandomH2Example,
            name: 'RandomH2',
            icon: randomH2Icon,
            inputs: [
                { name: 'children', label: 'Children', type: 'text' },
                { name: 'isCentered', label: 'Централизировать', type: 'checkbox' },
            ]
        }, //children
        'Параграф': {
            component: RandomParapraph,
            example: RandomParagraphExample,
            name: 'RandomParapraph',
            icon: randomParagraphIcon,
            inputs: [
                { name: 'children', label: 'Текст (Children)', type: 'formatTextarea' },
                { name: 'color', label: 'Цвет', type: 'color' },
                { name: 'fontSize', label: 'Размер шрифта', type: 'number' },
            ],
        }, //children, color, fontSize
        'Цветной фон': {
            component: TextWithBackground,
            example: TextWithBackgroundExample,
            name: 'TextWithBackground',
            icon: imageIcon,
            inputs: [
                { name: 'header', label: 'Заголовок', type: 'text' },
                { name: 'text', label: 'Текст', type: 'text' },
                { name: 'color', label: 'Цвет текста', type: 'color' },
                { name: 'backgroundColor', label: 'Цвет фона', type: 'color' },
            ],
        }, //text [,,], color, backgroundColor
        'Заголовок + текст': {
            component: TextWithTitle,
            name: 'TextWithTitle',
            icon: textWithTitleIcon,
            inputs: [
                { name: 'title', label: 'Заголовок', type: 'text' },
                { name: 'text', label: 'Текст', type: 'text' },
                { name: 'color', label: 'Цвет текста', type: 'color' },
            ],
        }, //title, text
        'Аннотация': {
            component: Report_Warning,
            example: ReportWarningExample,
            name: 'Report_Warning',
            icon: reportIcon,
            inputs: [
                { name: 'children', label: 'Children', type: 'formatTextarea' },
                { name: 'version', label: 'Version', type: 'ignore' }
            ],
        }, //children
        'Аннотация параграф': {
            component: Report_Information,
            example: ReportInformationExample,
            name: 'Report_Information',
            icon: reportInformationIcon,
            inputs: [
                { name: 'version', label: 'Version', type: 'ignore' },
                { name: 'children', label: 'Children', type: 'formatTextarea' },
            ],
        }, //children
        'Цитата': {
            component: Quote,
            example: QuoteExample,
            name: 'Quote',
            icon: reportInformationIcon,
            inputs: [
                { name: 'text', label: 'Текст', type: 'text' },
                { name: 'author', label: 'Автор', type: 'text' },
                { name: 'img', label: 'Изображение', type: 'file' },
            ]
        }
    },
    'Списковые элементы': {
        'Точечный': {
            component: NotNumberedDots,
            example: NotNumberedDotsExample,
            name: 'NotNumberedDots',
            icon: norNumberedDotsIcon,
            inputs: [
                { name: 'header', label: 'Заголовок', type: 'text' },
                { name: 'list', label: 'Список', type: 'list' },
                { name: 'dotsColor', label: 'Цвет точек', type: 'color' },
                { name: 'color', label: 'Цвет текста', type: 'color' },
                { name: 'isSublist', label: 'Подсписок', type: 'checkbox' },
            ],
        }, 
        'Нумированный': {
            component: NumberedDots,
            example: NumberedDotsExample,
            name: 'NumberedDots',
            icon: numberedDotsIcon,
            inputs: [
                { name: 'header', label: 'Заголовок', type: 'text' },
                { name: 'list', label: 'Список', type: 'list' },
                { name: 'dotsColor', label: 'Цвет точек', type: 'color' },
                { name: 'color', label: 'Цвет текста', type: 'color' },
            ],
        },
        'Список квадратный': {
            component: FancyList,
            example: FancyListExample,
            name: 'FancyList',
            icon: squareIcon,
            inputs: [
                { name: 'list', label: 'Список', type: 'list' },
                { name: 'textColor', label: 'Цвет текста', type: 'color' },
                { name: 'numberColor', label: 'Цвет номеров', type: 'color' },
                { name: 'listColor', label: 'Цвет квадратов', type: 'color' },
            ],
        }, 
        'Выпадающий список с описанием': {
            component: DropdownList,
            example: DropdownListExample,
            name: 'DropdownList',
            icon: dropDownListIcon,
            inputs: [
                { name: 'list', label: 'Список', type: 'listNameDescroptionItems' },
            ],
        },
        'Раскрывающийся список': {
            component: DropdownGlossaryList,
            example: DropdownGlossaryListExample,
            name: 'DropdownGlossaryList',
            icon: listIcon,
            inputs: [
                { name: 'list', label: 'Список', type: 'title_desx_list'},
                { name: 'headerTextColor', label: 'Цвет заголовков', type: 'color'},
                { name: 'activeHeaderTextColor', label: 'Цвет активного заголовка', type: 'color'},
                { name: 'textColor', label: 'Цвет текста', type: 'color'},
                { name: 'tabsTextColor', label: 'Цвет текста вкладок', type: 'color'},
                { name: 'tabsBackgroundColor', label: 'Цвет вкладок', type: 'color'},
            ]
        },
        'Список с иконками': {
            component: IconDots,
            example: IconDotsExample,
            name: 'IconDots',
            icon: norNumberedDotsIcon,
            inputs: [
                { name: 'header', label: 'Заголовок', type: 'text' },
                { name: 'icons', label: 'Иконки', type: 'files_and_list' },
                { name: 'gap', label: 'Растояния между объектами листа', type: 'number' },
                { name: 'height', label: 'Высота иконки', type: 'number' },
                { name: 'width', label: 'Ширина иконки', type: 'number' },
                { name: 'fontSize', label: 'Размер шрифта', type: 'number' },
            ]
        },
        'Вкладки с текстами': {
            component: TabsGlossary,
            example: TabsGlossaryExample,
            name: 'TabsGlossary',
            icon: tabsGlossaryIcon, // Replace with the actual icon reference
            inputs: [
                { name: 'tabs', label: 'Вкладки', type: 'tabs'},
                { name: 'tabsGlossary', label: 'Тексты', type: 'tabsGlossary'},
                { name: 'color', label: 'Цвет', type: 'color' },
                { name: 'tabsBackgroundColor', label: 'Цвет фона названии разделов', type: 'color' },
                { name: 'tabsActiveBackgroundColor', label: 'Фон активного названия раздела', type: 'color' },
                { name: 'glossaryBackgroundColor', label: 'Фон раздела', type: 'color' }
                // Add more inputs as needed based on the TabsGlossary component's props
            ],
        },
        'Вкладки с разделами': {
            component: DropDownTextWithTabs,
            example: DropDownTextWithTabsExample,
            name: 'DropDownTextWithTabs',
            icon: dropDownTableIcon,
            inputs: [
                { name: 'tabs', label: 'Вкладки', type: 'dropd'},
                { name: 'tabsData', label: 'Данные Вкладок', type: 'tabsData'},
                { name: 'headerTextColor', label: 'Цвет Текста Заголовка', type: 'color'},
                { name: 'activeHeaderTextColor', label: 'Цвет Активного Текста Заголовка', type: 'color'},
                { name: 'textColor', label: 'Цвет Текста', type: 'color'},
                { name: 'tabsTextColor', label: 'Цвет Текста Вкладок', type: 'color'},
                { name: 'tabsBackgroundColor', label: 'Цвет Фона Вкладок', type: 'color'},
            ]
        }
    },
    'Табличные элементы': {
        'Двухколонная': {
            component: Table_1,
            example: Table_1Example,
            name: 'Table_1',
            icon: table1Icon,
            inputs: [
                { name: 'rows', label: 'Строки', type: 'rows' },
                { name: 'borderColor', label: 'Цвет границы', type: 'color' },
                { name: 'color', label: 'Цвет текста', type: 'color' },
            ],
        }, // rows [{first:, second:}], borderColor, color
        'Видовой': {
            component: SimpleTable,
            example: SimpleTableExample,
            name: 'SimpleTable',
            icon: table1Icon,
            inputs: [
                { name: 'columns', label: 'Колонны', type: 'table_headers' },
                { name: 'data', label: 'Строки', type: 'table_rows' },
            ],
        },
    
    },
    'Медиа': {
        'Текст с изображением': {
            component: ImageWithText,
            example: ImageWithTextExample,
            name: 'ImageWithText',
            icon: imageWithTextIcon,
            inputs: [
                { name: 'img', label: 'Изображение', type: 'file' },
                { name: 'imageText', label: 'Текст', type: 'text' },
                { name: 'children', label: 'Children', type: 'text' },
                { name: 'color', label: 'Цвет', type: 'color' },
            ],
        }, //img, imageText or children, color
        'Изображение': {
            component: ImageLine,
            example: ImageLineExample,
            name: 'ImageLine',
            icon: imageIcon,
            inputs: [
                { name: 'img', label: 'Изображение', type: 'file' },
                { name: 'color', label: 'Цвет', type: 'color' },
                { name: 'height', label: 'Высота', type: 'number' },
                // { name: 'notCrop', label: 'Не обрезать по высоте', type: 'checkbox'},
                { name: 'adjustWidth', label: 'Подогнать ширину', type: 'checkbox' },
                { name: 'alignment', label: 'Выравниевание', type: 'select' },
            ],
        }, //img, height, color done
        'Видео': {
            component: VideoLine,
            name: 'VideoLine',
            icon: videoLineIcon,
            inputs: [
                // { name: 'poster', label: 'Постер', type: 'text' },
                { name: 'url', label: 'Ссылка', type: 'text' },
            ],
        }, // url , poster done
        'Видео с текстом': {
            component: VideoWithTitleAndText,
            name: 'VideoWithTitleAndText',
            icon: textContentIcon,
            inputs: [
                // { name: 'poster', label: 'Постер', type: 'text' },
                { name: 'url', label: 'Ссылка', type: 'text' },
                { name: 'title', label: 'Заголовок', type: 'text' },
                { name: 'text', label: 'Текст', type: 'text' },
            ],
        }, // url , poster done
        'Цепочка изображений с описанием': {
            component: ImageSequence,
            example: ImageSequenceExample,
            name: 'ImageSequence',
            icon: imageIcon,
            inputs: [
                { name: 'images', label: 'Иконки', type: 'files_and_list' },
            ]
        }
    },
    'Элементы вида': {
        // 'Централизовать': {
        //     component: Centered,
        //     icon: centeredIcon
        // }, //
        'Отступ': {
            component: Sizebox,
            name: 'Sizebox',
            icon: sizeBoxIcon,
            inputs: [
                {name: 'height', label: 'Размер отступа в PX', type: 'number' }
            ]
        }, //
    },
    'Ссылки и файлы': {
        'Файл': {
            component: FileDownloader,
            example: FileDownloaderExample,
            name: 'FileDownloader',
            icon: fileDIcon,
            inputs: [
                { name: 'file', label: 'Файл', type: 'file' },
                { name: 'fileName', label: 'Имя файла', type: 'text' },
                { name: 'type', label: 'Тип', type: 'text' },
                { name: 'color', label: 'Цвет', type: 'color' },
            ],

        }, //file, fileName 
        'Ссылка': {
            component: TextAndLink,
            example: TextAndLinkExample,
            name: 'TextAndLink',
            icon: randomGlossaryIcon,
            inputs: [
                { name: 'text', label: 'Название', type: 'text' },
                { name: 'link', label: 'Ссылка', type: 'text' },
                { name: 'linkText', label: 'Текст ссылки', type: 'text' },
                { name: 'textColor', label: 'Цвет Названия', type: 'color' },
                { name: 'linkColor', label: 'Цвет Ссылки', type: 'color' },
                { name: 'linkBackgroundColor', label: 'Цвет заднего фона ссылки', type: 'color' },
            ],
                
        }, //file, fileName 
    },
    'Другие': {
        'Биография': {
            component: ShortBiography,
            example: ShortBiographyExample,
            name: 'ShortBiography',
            icon: biographyIcon,
            inputs: [
                { name: 'img', label: 'Фото', type: 'file'},
                { name: 'name', label: 'ФИО', type: 'text'},
                { name: 'birthdate', label: 'Дата рождения', type: 'text'},
                { name: 'deathdate', label: 'Дата смерти', type: 'text'},
                { name: 'biography', label: 'Биография', type: 'textarea'},
            ]
        },
        'Цепь с текстами': {
            component: DataChain,
            example: DataChainExample,
            name: 'DataChain',
            icon: listIcon,
            inputs: [
                { name: 'data', label: 'Список', type: 'title_desx_list'},
            ]
        },
        'Блоки': {
            component: FlexBoxes,
            example: FlexBoxesExample,
            name: 'FlexBoxes',
            icon: block2Icon,
            inputs: [
                { name: 'list', label: 'Список', type: 'list' },
                { name: 'color', label: 'Цвет текста', type: 'color' },
                { name: 'backgroundColor', label: 'Цвет фона', type: 'color' },
            ],
        }, 
        'Блоки 2': {
            component: FlexRow,
            name: 'FlexRow',
            icon: blockIcon,
            inputs: [
                { name: 'icons', label: 'Картинки', type: 'icons_title_desx_list' },
                { name: 'data', label: 'Список', type: 'title_desx_of_icons' },
                { name: 'textColor', label: 'Цвет текста', type: 'color' },
            ],
        },
        'Изображение с колоннами': {
            component: ImageAndColumns,
            example: ImageAndColumnsExample,
            name: 'ImageAndColumns',
            icon: table1Icon,
            inputs: [
                { name: 'header', label: 'Заголовок', type: 'text' },
                { name: 'image', label: 'Изображение', type: 'file' },
                { name: 'list', label: 'Лист', type: 'list' },
                { name: 'headerColor', label: 'Цвет заголовка', type: 'color' },
                { name: 'listColor', label: 'Цвет текста', type: 'color' }
            ]
        },
        'Разделитель на две колонны': {
            component: TwoColumnsDivider,
            name: 'TwoColumnsDivider',
            icon: table1Icon,
            inputs: [
                { name: 'left', label: 'Левый компонент', type: 'Component' },
                { name: 'right', label: 'Правый компонент', type: 'Component' },
                { name: 'gap', label: 'Растояние между колоннами', type: 'number'},
                { name: 'version', label: 'Version', type: 'ignore' }
            ]
        }
    },
    'Интерактивные': {
        'Двух вариантный': {
            component: DragAndDropTwoSide,
            example: DragAndDropTwoSideExample,
            name: 'DragAndDropTwoSide',
            icon: dndTwoSideIcon,
            inputs: [
                { name: 'leftAnswer', label: 'Первый вариант', type: 'text'},
                { name: 'rightAnswer', label: 'Второй вариант', type: 'text'},
                { name: 'questions', label: 'Вопросы', type: 'dnd_questions'},
            ]
        },
    }
}

export default Elements;