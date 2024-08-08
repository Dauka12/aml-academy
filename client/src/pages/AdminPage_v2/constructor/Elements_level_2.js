import FileDownloader from '../../../components/courseTemplates/common/FileDownloader'
import HeaderWithLine from '../../../components/courseTemplates/common/HeaderWithLine'
import ImageLine from '../../../components/courseTemplates/common/ImageLine'
import NotNumberedDots from '../../../components/courseTemplates/common/NotNumberedDots'
import NumberedDots from '../../../components/courseTemplates/common/NumberedDots'
import RandomH2 from '../../../components/courseTemplates/common/RandomH2'
import RandomParapraph from '../../../components/courseTemplates/common/RandomParagraph'
import Sizebox from '../../../components/courseTemplates/common/Sizebox'

import SimpleTable from '../../../components/courseTemplates/common/SimpleTable'
import VideoLine from '../../../components/courseTemplates/common/VideoLine'
import Report_Warning from '../../../components/courseTemplates/common/Warnings/Report'
import Report_Information from '../../../components/courseTemplates/common/Warnings/Report_Information'
import FancyList from '../../../components/courseTemplates/common_v2/FancyList'
import IconDots from '../../../components/courseTemplates/common_v2/IconDots'
import TextAndLink from '../../../components/courseTemplates/complex/TextAndLink'

import fileDIcon from '../images/download-icon.svg'
import headerWithLineIcon from '../images/header-icon.svg'
import imageIcon from '../images/imageLine-icon.svg'
import norNumberedDotsIcon from '../images/notNumberedDots-icon.svg'
import numberedDotsIcon from '../images/numberedDots-icon.svg'
import randomGlossaryIcon from '../images/randomGlossary-icon.svg'
import randomParagraphIcon from '../images/randomParagraph-icon.svg'
import randomH2Icon from '../images/randomh2-icon.svg'
import reportInformationIcon from '../images/reportIndormation-icon.svg'
import reportIcon from '../images/reportWarning-icon.svg'
import sizeBoxIcon from '../images/sizeBox-icon.svg'
import squareIcon from '../images/square-icon.svg'
import table1Icon from '../images/table-1-icon.svg'
import videoLineIcon from '../images/videoLine-icon.svg'

// Example images
import Table_1 from '../../../components/courseTemplates/common/Tables/Table-1'
import FancyListExample from './../../../assets/images/Template Examples/FancyList.png'
import FileDownloaderExample from './../../../assets/images/Template Examples/FileDownloader.png'
import HeaderWithLineExample from './../../../assets/images/Template Examples/HeaderWithLine.png'
import IconDotsExample from './../../../assets/images/Template Examples/IconDots.png'
import ImageLineExample from './../../../assets/images/Template Examples/ImageLine.png'
import NotNumberedDotsExample from './../../../assets/images/Template Examples/NotNumberedList.png'
import NumberedDotsExample from './../../../assets/images/Template Examples/NumberedList.png'
import RandomH2Example from './../../../assets/images/Template Examples/RandomH2.png'
import RandomParagraphExample from './../../../assets/images/Template Examples/RandomParagraph.png'
import ReportInformationExample from './../../../assets/images/Template Examples/ReportInformation.png'
import ReportWarningExample from './../../../assets/images/Template Examples/ReportWarning.png'
import SimpleTableExample from './../../../assets/images/Template Examples/SimpleTable.png'
import Table_1Example from './../../../assets/images/Template Examples/Table_1.png'
import TextAndLinkExample from './../../../assets/images/Template Examples/TextAndLink.png'



const Elements_level_2 = {
    'Текстовые элементы': {
        'Заголовок с полосой': {
            component: HeaderWithLine,
            example: HeaderWithLineExample,
            name: 'HeaderWithLine',
            icon: headerWithLineIcon,
            inputs: [
                // { name: 'children', label: 'Children', type: 'text' },
                { name: 'header', label: 'Текст', type: 'formatTextarea' },
                { name: 'headerColor', label: 'Цвет текста', type: 'color' },
                { name: 'lineColor', label: 'Цвет полосы', type: 'color' },
                { name: 'version', label: '', type: 'ignore' },
            ],
        }, //children (span for bold), header (for usual text), headerColor, lineColor
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
                { name: 'gap', label: 'Растояние между элементами списка', type: 'number' },
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
    },
    'Табличные элементы': {
        'Двухколонная': {
            component: Table_1,
            example: Table_1Example,
            name: 'Table_1',
            icon: table1Icon,
            inputs: [
                { name: 'header', label: 'Заголовок', type: 'text' },
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
    },
    'Элементы вида': {
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
}

export default Elements_level_2;