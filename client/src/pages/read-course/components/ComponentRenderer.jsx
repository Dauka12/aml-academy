// Import text formatting utility
import { processTextWithFormatting } from '../../../util/TextFormattingEnhancer.jsx';

// Import all course template components
import BoxOfThree from '../../../components/courseTemplates/common/BoxOfThree';
import Centered from '../../../components/courseTemplates/common/Centered';
import ComplexTable from '../../../components/courseTemplates/common/ComplexTable';
import { default as DoubleDraggableOption, default as DragAndDropComponent } from '../../../components/courseTemplates/common/DoubleDraggableOption';
import DraggableOption from '../../../components/courseTemplates/common/DraggableOption';
import DragAndDropZone from '../../../components/courseTemplates/common/DraggableOption/DragAndDropZone';
import FileDownloader from '../../../components/courseTemplates/common/FileDownloader';
import HeaderWithLine from '../../../components/courseTemplates/common/HeaderWithLine';
import ImageLine from '../../../components/courseTemplates/common/ImageLine';
import ImageWithText from '../../../components/courseTemplates/common/ImageWithText';
import JustTextWithP from '../../../components/courseTemplates/common/JustTextWithP';
import Lupa from '../../../components/courseTemplates/common/Lupa';
import NotNumberedDots from '../../../components/courseTemplates/common/NotNumberedDots';
import NumberedDots from '../../../components/courseTemplates/common/NumberedDots';
import NumberedDotsAndImage from '../../../components/courseTemplates/common/NumberedDotsAndImage';
import QuizWithCardComponent from '../../../components/courseTemplates/common/QuizWithCardComponent';
import RandomGlossary from '../../../components/courseTemplates/common/RandomGlossary';
import RandomH2 from '../../../components/courseTemplates/common/RandomH2';
import RandomParapraph from '../../../components/courseTemplates/common/RandomParagraph';
import SimpleTable from '../../../components/courseTemplates/common/SimpleTable';
import Sizebox from '../../../components/courseTemplates/common/Sizebox';
import SmallNotNuberedDots from '../../../components/courseTemplates/common/SmallNotNuberedDots';
import Table1 from '../../../components/courseTemplates/common/Tables/Table-1';
import TableComponent from '../../../components/courseTemplates/common/Tables/TableComponent';
import TableWithData from '../../../components/courseTemplates/common/Tables/TableWithData';
import TableWithDataWithoutFormatting from '../../../components/courseTemplates/common/Tables/TableWithDataWithoutFormatting';
import TableWithTable from '../../../components/courseTemplates/common/Tables/TableWithTable';
import TextWithBackground from '../../../components/courseTemplates/common/TextWithBackground';
import TextWithBold from '../../../components/courseTemplates/common/TextWithBold';
import TextWithLink from '../../../components/courseTemplates/common/TextWithLink';
import TextWithTitle from '../../../components/courseTemplates/common/TextWithTitle';
import VideoLine from '../../../components/courseTemplates/common/VideoLine';

// Import common_v2 components
import FancyList from '../../../components/courseTemplates/common_v2/FancyList';
import FlexBoxes from '../../../components/courseTemplates/common_v2/FlexBoxes';
import FlexRow from '../../../components/courseTemplates/common_v2/FlexRow';
import IconDots from '../../../components/courseTemplates/common_v2/IconDots';
import Image from '../../../components/courseTemplates/common_v2/Image';
import ImageAndColumns from '../../../components/courseTemplates/common_v2/ImageAndColumns';
import Quote from '../../../components/courseTemplates/common_v2/Quote';
import ThreeColumnsDivider from '../../../components/courseTemplates/common_v2/ThreeColumnsDivider';
import TwoColumnsDivider from '../../../components/courseTemplates/common_v2/TwoColumnsDivider';

// Import Warnings components
import ReportWarning from '../../../components/courseTemplates/common/Warnings/Report';
import ReportInformation from '../../../components/courseTemplates/common/Warnings/Report_Information';

// Import complex components
import Component52 from '../../../components/courseTemplates/complex/Component52';
import CustomCarousel from '../../../components/courseTemplates/complex/CustomCarousel';
import DragAndDropTwoSide from '../../../components/courseTemplates/complex/DragAndDropTwoSide';
import DropdownGlossaryList from '../../../components/courseTemplates/complex/DropdownGlossaryList';
import DropDownTextWithTabs from '../../../components/courseTemplates/complex/DropDownTextWithTabs';
import ShortBiography from '../../../components/courseTemplates/complex/images/ShortBiography';
import DropdownList from '../../../components/courseTemplates/complex/interactives/DropdownList';
import DropdownListR5 from '../../../components/courseTemplates/complex/interactives/DropdownList_r5';
import ImageWithPoints from '../../../components/courseTemplates/complex/interactives/ImageWithPoints';
import InteractivePhases from '../../../components/courseTemplates/complex/interactives/InteractivePhases';
import OneToFour from '../../../components/courseTemplates/complex/interactives/OneToFour';
import StageDropDown from '../../../components/courseTemplates/complex/StageDropDown';
import TabsGlossary from '../../../components/courseTemplates/complex/TabsGlossary';
import TextAndLink from '../../../components/courseTemplates/complex/TextAndLink';
import VideoWithTitleAndText from '../../../components/courseTemplates/complex/Video/VideoWithTitleAndText';
import DataChain from '../../../components/courseTemplates/complex/DataChain/index.jsx';
import DropdownPage from '../../../components/courseTemplates/common/Tables/TableWithData';
import LupaZone from '../../../components/courseTemplates/common/Lupa/LupaDragZone.jsx';

// Import additional common_v2 components
import { useEffect } from 'react';
import ImageSequence from '../../../components/courseTemplates/common_v2/ImageSequence';
import PyramidList from '../../../components/courseTemplates/common_v2/PyramidList';

const ComponentRenderer = ({ componentEntries }) => {


    useEffect(() => {
        console.log('Rendering components:', componentEntries);
    }, [componentEntries]);

    if (!componentEntries || !Array.isArray(componentEntries)) {
        return null;
    }


    // Enhanced helper function to clean and format text with more robust type checking
    const cleanAndFormatText = (text) => {
        if (!text) return '';
        if (typeof text !== 'string') {
            console.warn('Non-string value passed to cleanAndFormatText:', text);
            if (text && typeof text === 'object') {
                return JSON.stringify(text);
            }
            return String(text);
        }
        // Remove quotes and trailing backslashes
        const cleaned = text
            .replace(/"/g, '')
            .replace(/\\\s*$/gm, '')  // Remove trailing backslashes at end of lines
            .replace(/\\$/gm, '')     // Remove single trailing backslashes
            .trim();
        return processTextWithFormatting(cleaned);
    };

    // Helper function that returns just clean text without React elements
    const cleanTextOnly = (text) => {
        if (!text) return '';
        if (typeof text !== 'string') {
            console.warn('Non-string value passed to cleanTextOnly:', text);
            if (text && typeof text === 'object') {
                return JSON.stringify(text);
            }
            return String(text);
        }
        // Handle escaped characters: newlines, quotes, trailing backslashes, etc.
        return text
            .replace(/"/g, '')
            .replace(/\\n/g, '\n')
            .replace(/\\r/g, '\r')
            .replace(/\\t/g, '\t')
            .replace(/\\\\/g, '\\')
            .replace(/\\\s*$/gm, '')  // Remove trailing backslashes at end of lines
            .replace(/\\$/gm, '')     // Remove single trailing backslashes
            .trim();
    };

    // Enhanced function to clean values with nested or double quotes
    const cleanValue = (value) => {
        if (!value) return '';
        if (typeof value !== 'string') {
            console.warn('Non-string value passed to cleanValue:', value);
            return String(value);
        }
        // Remove surrounding quotes, escaped quotes, and trailing backslashes
        return value
            .replace(/^"/, '')     // Remove leading quote
            .replace(/"$/, '')     // Remove trailing quote
            .replace(/\\"/g, '"')  // Unescape inner quotes
            .replace(/&quot;/g, '"') // Replace HTML entities
            .replace(/\\\s*$/gm, '')  // Remove trailing backslashes at end of lines
            .replace(/\\$/gm, '')     // Remove single trailing backslashes
            .trim();
    };

    const renderComponent = (entry) => {
        const { componentName, values } = entry;
        const componentValues = values?.values || {};

        try {
            switch (componentName) {
                case 'Sizebox':
                    return (
                        <Sizebox
                            height={parseInt(componentValues.height) || 20}
                        />
                    );

                case 'ImageWithText':
                    return (
                        <ImageWithText
                            imageText={componentValues.imageText?.replace(/"/g, '') || ''}
                            img={componentValues.img?.replace(/"/g, '') || ''}
                            color={componentValues.color?.replace(/"/g, '') || '#ffffff'}
                        />
                    );

                case 'HeaderWithLine':
                    const headerText = componentValues.header?.replace(/"/g, '') || '';
                    return (
                        <HeaderWithLine
                            header={headerText}
                            lineColor={componentValues.lineColor?.replace(/"/g, '') || '#CADEFC'}
                            headerColor={componentValues.headerColor?.replace(/"/g, '') || '#3A3939'}
                        />
                    );

                case 'TextWithTitle':
                    // Support both 'title'/'header' and 'text' fields
                    const titleText = componentValues.title || componentValues.header;
                    return (
                        <TextWithTitle
                            title={cleanAndFormatText(titleText)}
                            text={componentValues.text ? [cleanAndFormatText(componentValues.text)] : []}
                            color={componentValues.color?.replace(/"/g, '') || '#000000'}
                        />
                    );
                
                case 'DataChain':
                    let data_row = JSON.parse(componentValues.data_row || '[]');
                    return (
                        <DataChain
                            data_row={data_row}
                        />
                    )
                
                case 'DropdownPage':
                    return (
                        <DropdownPage
                            data={JSON.parse(componentValues.data)}
                            dataBtn={JSON.parse(componentValues.dataBtn)}
                            version={JSON.parse(componentValues.version)}
                        />
                    )

                case 'NumberedDots':
                    let numberedList = [];
                    if (componentValues.list) {
                        try {
                            const rawList = JSON.parse(componentValues.list);
                            numberedList = rawList.map(item =>
                                typeof item === 'string' ? cleanAndFormatText(item) : item
                            );
                        } catch (e) {
                            console.warn('Error parsing numbered list:', e);
                        }
                    }
                    return (
                        <NumberedDots
                            header={cleanAndFormatText(componentValues.header)}
                            list={numberedList}
                            dotsColor={componentValues.dotsColor?.replace(/"/g, '') || 'white'}
                            color={componentValues.color?.replace(/"/g, '') || '#000000'}
                        />
                    );

                case 'NotNumberedDots':
                    let notNumberedList = [];
                    if (componentValues.list) {
                        try {
                            const rawList = JSON.parse(componentValues.list);
                            notNumberedList = rawList.map(item =>
                                typeof item === 'string' ? cleanAndFormatText(item) : item
                            );
                        } catch (e) {
                            console.warn('Error parsing not numbered list:', e);
                        }
                    }
                    return (
                        <NotNumberedDots
                            header={cleanAndFormatText(componentValues.header)}
                            list={notNumberedList}
                            dotsColor={componentValues.dotsColor?.replace(/"/g, '') || 'black'}
                            color={componentValues.color?.replace(/"/g, '') || '#000000'}
                            gap={parseInt(componentValues.gap) || 20}
                            isSublist={componentValues.isSublist === 'true'}
                        />
                    );

                case 'Table_1':
                    let tableRows = [];
                    if (componentValues.rows) {
                        try {
                            tableRows = JSON.parse(componentValues.rows);
                        } catch (e) {
                            console.warn('Error parsing table rows:', e);
                        }
                    }
                    return (
                        <Table1
                            header={componentValues.header?.replace(/"/g, '') || ''}
                            rows={tableRows}
                            borderColor={componentValues.borderColor?.replace(/"/g, '') || '#a7c1ec'}
                        />
                    );

                case 'SimpleTable':
                    let simpleTableColumns = [];
                    let simpleTableData = [];

                    if (componentValues.columns) {
                        try {
                            simpleTableColumns = JSON.parse(componentValues.columns);
                        } catch (e) {
                            console.warn('Error parsing simple table columns:', e);
                        }
                    }

                    if (componentValues.data) {
                        try {
                            simpleTableData = JSON.parse(componentValues.data);
                        } catch (e) {
                            console.warn('Error parsing simple table data:', e);
                        }
                    }

                    return (
                        <SimpleTable
                            columns={simpleTableColumns}
                            data={simpleTableData}
                        />
                    );

                case 'TableWithData':
                    let tableWithDataRows = [];
                    if (componentValues.data) {
                        try {
                            tableWithDataRows = JSON.parse(componentValues.data);
                        } catch (e) {
                            console.warn('Error parsing table with data:', e);
                        }
                    }
                    return (
                        <TableWithData
                            data={tableWithDataRows}
                            headers={componentValues.headers ? JSON.parse(componentValues.headers) : []}
                        />
                    );

                case 'TableComponent':
                    let tableComponentData = [];
                    if (componentValues.tableData) {
                        try {
                            tableComponentData = JSON.parse(componentValues.tableData);
                        } catch (e) {
                            console.warn('Error parsing table component data:', e);
                        }
                    }
                    return (
                        <TableComponent
                            tableData={tableComponentData}
                            title={componentValues.title?.replace(/"/g, '') || ''}
                        />
                    );

                case 'TableWithTable':
                    let nestedTableData = [];
                    if (componentValues.dataBtn) {
                        try {
                            nestedTableData = JSON.parse(componentValues.dataBtn);
                        } catch (e) {
                            console.warn('Error parsing table with table data:', e);
                        }
                    }
                    return (
                        <TableWithTable
                            dataBtn={nestedTableData}
                            Height={componentValues.Height || '400px'}
                            simpleTableProps={componentValues.simpleTableProps ? JSON.parse(componentValues.simpleTableProps) : []}
                        />
                    );

                case 'TableWithDataWithoutFormatting':
                    let rawTableData = [];
                    if (componentValues.data) {
                        try {
                            rawTableData = JSON.parse(componentValues.data);
                        } catch (e) {
                            console.warn('Error parsing raw table data:', e);
                        }
                    }
                    return (
                        <TableWithDataWithoutFormatting
                            data={rawTableData}
                            headers={componentValues.headers ? JSON.parse(componentValues.headers) : []}
                        />
                    );

                case 'RandomParapraph':
                case 'RandomParagraph':  // альтернативное написание
                    // Ensure text or children is properly formatted
                    const paragraphContent = componentValues.text || componentValues.children;
                    // Add safety check to prevent objects from being rendered as text
                    if (paragraphContent && typeof paragraphContent === 'object') {
                        console.warn('Object passed as text to RandomParagraph:', paragraphContent);
                        return (
                            <RandomParapraph
                                color={componentValues.color?.replace(/"/g, '') || '#000000'}
                                fontSize={componentValues.fontSize?.replace(/"/g, '') || '16px'}
                                isCentered={componentValues.isCentered === 'true'}
                            >
                                {JSON.stringify(paragraphContent)}
                            </RandomParapraph>
                        );
                    }
                    return (
                        <RandomParapraph
                            color={componentValues.color?.replace(/"/g, '') || '#000000'}
                            fontSize={componentValues.fontSize?.replace(/"/g, '') || '16px'}
                            isCentered={componentValues.isCentered === 'true'}
                        >
                            {cleanTextOnly(paragraphContent)}
                        </RandomParapraph>
                    );

                case 'TextWithBold':
                case 'BoldText':  // альтернативное название
                    return (
                        <TextWithBold
                            text={cleanAndFormatText(componentValues.text)}
                            color={componentValues.color?.replace(/"/g, '') || '#000000'}
                        />
                    );                case 'TextWithBackground':
                    return (
                        <TextWithBackground
                            text={cleanAndFormatText(componentValues.text)}
                            header={cleanAndFormatText(componentValues.header)}
                            backgroundColor={componentValues.backgroundColor?.replace(/"/g, '') || '#f0f8ff'}
                            color={componentValues.color?.replace(/"/g, '') || '#000000'}
                        />
                    );

                case 'TextWithLink':
                    return (
                        <TextWithLink
                            text={cleanAndFormatText(componentValues.text)}
                            link={componentValues.link?.replace(/"/g, '') || ''}
                            linkText={cleanAndFormatText(componentValues.linkText) || 'Подробнее'}
                        />
                    );

                case 'JustTextWithP':
                    console.log('JustTextWithP componentValues:', componentValues);
                    const textData = componentValues.textData || componentValues.text;
                    console.log('JustTextWithP textData:', textData);
                    
                    // Используем cleanTextOnly вместо cleanAndFormatText, чтобы не обрабатывать текст дважды
                    const cleanedText = cleanTextOnly(textData);
                    console.log('JustTextWithP cleanedText:', cleanedText);
                    
                    return (
                        <JustTextWithP
                            textData={cleanedText}
                            color={cleanValue(componentValues.color) || undefined}
                        />
                    );

                case 'SmallNotNuberedDots':
                    let smallDotsList = [];
                    if (componentValues.list) {
                        try {
                            smallDotsList = JSON.parse(componentValues.list);
                        } catch (e) {
                            console.warn('Error parsing small dots list:', e);
                        }
                    }
                    return (
                        <SmallNotNuberedDots
                            list={smallDotsList}
                            dotsColor={componentValues.dotsColor?.replace(/"/g, '') || 'black'}
                            color={componentValues.color?.replace(/"/g, '') || '#000000'}
                        />
                    );

                case 'VideoLine':
                    // VideoLine expects 'url' prop, not 'videoSrc'
                    const videoUrl = componentValues.url?.replace(/"/g, '') || componentValues.videoSrc?.replace(/"/g, '') || '';
                    return (
                        <VideoLine
                            url={videoUrl}
                            title={componentValues.title?.replace(/"/g, '') || ''}
                            poster={componentValues.poster?.replace(/"/g, '') || ''}
                        />
                    );

                case 'RandomGlossary':
                    let glossaryTerms = [];
                    if (componentValues.terms) {
                        try {
                            glossaryTerms = JSON.parse(componentValues.terms);
                        } catch (e) {
                            console.warn('Error parsing glossary terms:', e);
                        }
                    }

                    const glossaryProps = {
                        terms: glossaryTerms,
                        title: cleanValue(componentValues.title) || '',
                        text: cleanValue(componentValues.text) || '',
                        color: cleanValue(componentValues.color) || '',
                        backgroundColor: cleanValue(componentValues.backgroundColor) || ''
                    };
                    return (
                        <RandomGlossary
                            {...glossaryProps}
                        />
                    );

                case 'RandomH2':
                    // Support both 'text' and 'children' fields
                    const h2Text = componentValues.text || componentValues.children;
                    return (
                        <RandomH2
                            text={h2Text?.replace(/"/g, '') || ''}
                            color={componentValues.color?.replace(/"/g, '') || '#000000'}
                        />
                    );

                case 'NumberedDotsAndImage':
                    let numberedImageList = [];
                    if (componentValues.list) {
                        try {
                            numberedImageList = JSON.parse(componentValues.list);
                        } catch (e) {
                            console.warn('Error parsing numbered image list:', e);
                        }
                    }
                    return (
                        <NumberedDotsAndImage
                            list={numberedImageList}
                            image={componentValues.image?.replace(/"/g, '') || ''}
                            imagePosition={componentValues.imagePosition?.replace(/"/g, '') || 'right'}
                        />
                    );

                case 'ImageLine':
                    const cleanImg = cleanValue(componentValues.img) || cleanValue(componentValues.imageSrc) || '';
                    const cleanAlignment = cleanValue(componentValues.alignment) || 'center';
                    const cleanHeight = componentValues.height ? parseInt(cleanValue(componentValues.height)) : undefined;
                    const cleanAdjustWidth = cleanValue(componentValues.adjustWidth) === 'true' || componentValues.adjustWidth === true;
                    const cleanNotCrop = cleanValue(componentValues.notCrop) === 'true' || componentValues.notCrop === true;

                    return (
                        <ImageLine
                            img={cleanImg}
                            color={cleanValue(componentValues.color) || ''}
                            height={cleanHeight}
                            notCrop={cleanNotCrop}
                            adjustWidth={cleanAdjustWidth}
                            alignment={cleanAlignment}
                        />
                    );

                case 'Lupa':
                    return (
                        <Lupa
                            content={componentValues.content?.replace(/"/g, '') || ''}
                            zoomLevel={parseInt(componentValues.zoomLevel) || 2}
                        />
                    );
                case 'LupaZone':
                    return (
                        <LupaZone
                            options={JSON.parse(componentValues.options)}
                            img={componentValues.img}
                            correctOptions={JSON.parse(componentValues.correctOptions)}
                            version={JSON.parse(componentValues.version) || 1}
                            
                        />
                    );

                case 'FileDownloader':
                    return (
                        <FileDownloader
                            fileName={componentValues.fileName?.replace(/"/g, '') || ''}
                            fileUrl={componentValues.fileUrl?.replace(/"/g, '') || ''}
                            description={componentValues.description?.replace(/"/g, '') || ''}
                            file={componentValues.file?.replace(/"/g, '') }
                            type={componentValues.type?.replace(/"/g, '') || 'docx'} // docx задал для файла конфискации потому что тип файла не определяется 
                        />
                    );

                case 'ComplexTable':
                    let complexTableData = [];
                    let complexTableColumns = [];

                    // Обрабатываем данные из разных возможных полей
                    if (componentValues.data_row) {
                        try {
                            complexTableData = JSON.parse(componentValues.data_row);
                        } catch (e) {
                            console.warn('Error parsing complex table data_row:', e);
                        }
                    } else if (componentValues.data) {
                        try {
                            complexTableData = JSON.parse(componentValues.data);
                        } catch (e) {
                            console.warn('Error parsing complex table data:', e);
                        }
                    }

                    if (componentValues.columns) {
                        try {
                            complexTableColumns = JSON.parse(componentValues.columns);
                        } catch (e) {
                            console.warn('Error parsing complex table columns:', e);
                        }
                    } else if (componentValues.headers) {
                        try {
                            complexTableColumns = JSON.parse(componentValues.headers);
                        } catch (e) {
                            console.warn('Error parsing complex table headers:', e);
                        }
                    }

                    // Защита от пустых данных
                    if (!Array.isArray(complexTableColumns) || complexTableColumns.length === 0) {
                        console.warn('ComplexTable: columns is empty or not an array, skipping render');
                        return null;
                    }

                    if (!Array.isArray(complexTableData)) {
                        complexTableData = [];
                    }


                    return (
                        <ComplexTable
                            data={complexTableData}
                            columns={complexTableColumns}
                            data_row={complexTableData}  // Некоторые версии используют data_row
                            showCollapseButton={componentValues.showCollapseButton !== 'false'}
                            version={parseInt(componentValues.version) || 1}
                        />
                    );

                case 'Centered':
                    const centeredContent = componentValues.content || componentValues.children;
                    // Safely handle content that might be an object
                    if (centeredContent && typeof centeredContent === 'object') {
                        console.warn('Object passed as content to Centered component:', centeredContent);
                        return (
                            <Centered>
                                {JSON.stringify(centeredContent)}
                            </Centered>
                        );
                    }
                    return (
                        <Centered>
                            {cleanAndFormatText(centeredContent)}
                        </Centered>
                    );

                case 'BoxOfThree':
                    let boxItems = [];
                    if (componentValues.items) {
                        try {
                            boxItems = JSON.parse(componentValues.items);
                        } catch (e) {
                            console.warn('Error parsing box items:', e);
                        }
                    }
                    return (
                        <BoxOfThree
                            items={boxItems}
                            title={componentValues.title?.replace(/"/g, '') || ''}
                        />
                    );

                case 'DraggableOption':
                    let draggableOptions = [];
                    if (componentValues.options) {
                        try {
                            draggableOptions = JSON.parse(componentValues.options);
                        } catch (e) {
                            console.warn('Error parsing draggable options:', e);
                        }
                    }
                    return (
                        <DraggableOption
                            options={draggableOptions}
                            question={componentValues.question?.replace(/"/g, '') || ''}
                        />
                    );

                case 'DoubleDraggableOption':
                    let doubleDraggableOptions = [];
                    if (componentValues.options) {
                        try {
                            doubleDraggableOptions = JSON.parse(componentValues.options);
                        } catch (e) {
                            console.warn('Error parsing double draggable options:', e);
                        }
                    }
                    return (
                        <DoubleDraggableOption
                            options={doubleDraggableOptions}
                            question={componentValues.question?.replace(/"/g, '') || ''}
                        />
                    );                case 'QuizWithCardComponent':
                    let questions = [];
                    // Try to extract questions from any level of nesting
                    const extractQuestions = (obj) => {
                        if (!obj) return null;
                        
                        // If questions is directly available
                        if (obj.questions) {
                            try {
                                if (typeof obj.questions === 'string') {
                                    const parsed = JSON.parse(obj.questions);
                                    return Array.isArray(parsed) ? parsed : null;
                                } else if (Array.isArray(obj.questions)) {
                                    return obj.questions;
                                } else if (typeof obj.questions === 'object') {
                                    // If obj.questions is an object but not an array, it might be a 
                                    // single question that needs to be wrapped in an array
                                    return [obj.questions];
                                }
                            } catch (e) {
                                console.warn('Error parsing quiz questions:', e);
                                return [];
                            }
                        }
                        
                        // Check in prevValues if exists
                        if (obj.prevValues) {
                            return extractQuestions(obj.prevValues);
                        }
                        
                        return null;
                    };
                    
                    // Try to find questions in componentValues or its nested properties
                    questions = extractQuestions(componentValues) || [];
                    
                    // Проверяем, что каждый элемент имеет нужную структуру
                    const validQuestions = questions.filter(q => 
                        q && typeof q === 'object' && 
                        typeof q.question === 'string' && 
                        Array.isArray(q.options) &&
                        typeof q.correctOptionIndex === 'number'
                    );
                    
                    console.log('Rendering QuizWithCardComponent with questions:', validQuestions);
                    
                    return (
                        <QuizWithCardComponent
                            questions={validQuestions}
                        />
                    );

                case 'TwoColumnsDivider':
                    return (
                        <TwoColumnsDivider
                            leftContent={componentValues.leftContent?.replace(/"/g, '') || ''}
                            rightContent={componentValues.rightContent?.replace(/"/g, '') || ''}
                            leftTitle={componentValues.leftTitle?.replace(/"/g, '') || ''}
                            rightTitle={componentValues.rightTitle?.replace(/"/g, '') || ''}
                        />
                    );

                case 'ThreeColumnsDivider':
                    return (
                        <ThreeColumnsDivider
                            leftContent={componentValues.leftContent?.replace(/"/g, '') || ''}
                            centerContent={componentValues.centerContent?.replace(/"/g, '') || ''}
                            rightContent={componentValues.rightContent?.replace(/"/g, '') || ''}
                            leftTitle={componentValues.leftTitle?.replace(/"/g, '') || ''}
                            centerTitle={componentValues.centerTitle?.replace(/"/g, '') || ''}
                            rightTitle={componentValues.rightTitle?.replace(/"/g, '') || ''}
                        />
                    );

                case 'Quote':
                    return (
                        <Quote
                            text={componentValues.text?.replace(/"/g, '') || ''}
                            author={componentValues.author?.replace(/"/g, '') || ''}
                            backgroundColor={componentValues.backgroundColor?.replace(/"/g, '') || '#f8f9fa'}
                        />
                    );

                case 'Image':
                    return (
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            margin: '20px 0',
                            padding: '0 20px',
                            boxSizing: 'border-box'
                        }}>
                            <Image
                                src={componentValues.src?.replace(/"/g, '') || ''}
                                alt={componentValues.alt?.replace(/"/g, '') || ''}
                                caption={componentValues.caption?.replace(/"/g, '') || ''}
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                }}
                                display="block"
                                padding="0"
                            />
                        </div>                    );

                case 'ImageAndColumns':
                    let columnsItems = [];
                    if (componentValues.list) {
                        try {
                            columnsItems = JSON.parse(componentValues.list);
                        } catch (e) {
                            console.warn('Error parsing ImageAndColumns list:', e);
                            columnsItems = [];
                        }
                    }
                    return (
                        <ImageAndColumns
                            image={componentValues.image?.replace(/"/g, '') || componentValues.img?.replace(/"/g, '') || ''}
                            list={columnsItems}
                            header={cleanAndFormatText(componentValues.header)}
                            headerColor={componentValues.headerColor?.replace(/"/g, '') || 'black'}
                            listColor={componentValues.listColor?.replace(/"/g, '') || 'inherit'}
                        />
                    );

                case 'FlexRow':
                    let flexItems = [];
                    if (componentValues.items) {
                        try {
                            flexItems = JSON.parse(componentValues.items);
                        } catch (e) {
                            console.warn('Error parsing flex items:', e);
                        }
                    }
                    return (
                        <FlexRow
                            items={flexItems}
                            gap={componentValues.gap?.replace(/"/g, '') || '16px'}
                            alignment={componentValues.alignment?.replace(/"/g, '') || 'center'}
                        />
                    );

                case 'FlexBoxes':
                    let flexBoxItems = [];
                    if (componentValues.boxes) {
                        try {
                            flexBoxItems = JSON.parse(componentValues.boxes);
                        } catch (e) {
                            console.warn('Error parsing flex boxes:', e);
                        }
                    } else if (componentValues.list) {
                        try {
                            flexBoxItems = JSON.parse(componentValues.list);
                        } catch (e) {
                            console.warn('Error parsing flex list:', e);
                        }
                    }

                    // Защита от пустого массива
                    if (!Array.isArray(flexBoxItems) || flexBoxItems.length === 0) {
                        console.warn('FlexBoxes: list is empty or not an array, skipping render');
                        return null;
                    }

                    return (
                        <FlexBoxes
                            list={flexBoxItems}  // FlexBoxes ожидает prop 'list'
                            color={componentValues.color?.replace(/"/g, '') || 'black'}
                            backgroundColor={componentValues.backgroundColor?.replace(/"/g, '') || '#ccc'}
                        />
                    );

                case 'FancyList':
                    let fancyItems = [];
                    if (componentValues.list) {
                        try {
                            fancyItems = JSON.parse(componentValues.list);
                        } catch (e) {
                            console.warn('Error parsing fancy list items:', e);
                        }
                    }
                    return (
                        <FancyList
                            list={fancyItems}
                            textColor={componentValues.textColor?.replace(/"/g, '') || 'black'}
                            numberColor={componentValues.numberColor?.replace(/"/g, '') || '#151515a8'}
                            listColor={componentValues.listColor?.replace(/"/g, '') || 'burlywood'}
                        />
                    );

                case 'IconDots':
                    let iconList = [];
                    let iconArray = [];

                    if (componentValues.list) {
                        try {
                            iconList = typeof componentValues.list === 'string'
                                ? JSON.parse(componentValues.list)
                                : componentValues.list;
                        } catch (e) {
                            console.warn('Error parsing icon list:', e);
                        }
                    }

                    if (componentValues.icons) {
                        try {
                            iconArray = typeof componentValues.icons === 'string'
                                ? JSON.parse(componentValues.icons)
                                : componentValues.icons;
                        } catch (e) {
                            console.warn('Error parsing icons array:', e);
                        }
                    }

                    return (
                        <IconDots
                            list={iconList}
                            icons={iconArray}
                            header={componentValues.header?.replace(/"/g, '') || ''}
                            color={componentValues.color?.replace(/"/g, '') || '#007bff'}
                            gap={componentValues.gap ? parseInt(componentValues.gap) : 20}
                            height={componentValues.height?.replace(/"/g, '') || '40px'}
                            width={componentValues.width?.replace(/"/g, '') || '40px'}
                            fontSize={componentValues.fontSize?.replace(/"/g, '') || '16px'}
                        />
                    );

                case 'Report_Warning':
                case 'Report':
                    return (
                        <ReportWarning
                            children={componentValues.children?.replace(/"/g, '') || componentValues.text?.replace(/"/g, '') || ''}
                            text={componentValues.text?.replace(/"/g, '') || ''}
                            title={componentValues.title?.replace(/"/g, '') || 'Предупреждение'}
                            type={componentValues.type?.replace(/"/g, '') || 'warning'}
                            version={componentValues.version?.replace(/"/g, '') || '1'}
                        />
                    ); case 'Report_Information':
                    // Handle potentially nested values structure
                    let reportValues = componentValues;

                    if (componentValues.data) {
                        try {
                            const parsedData = JSON.parse(componentValues.data);
                            if (parsedData.values && parsedData.values.values) {
                                reportValues = parsedData.values.values;
                            }
                        } catch (e) {
                            console.warn('Error parsing Report_Information data:', e);
                        }
                    }

                    const children = reportValues.children || componentValues.children || reportValues.text || componentValues.text || '';
                    const versionValue = reportValues.version || componentValues.version || 1;

                    return (
                        <ReportInformation
                            children={children}
                            version={parseInt(versionValue, 10)}
                        />
                    );

                case 'VideoWithTitleAndText':
                    return (
                        <div style={{
                            width: '100%',
                            padding: '20px',
                            boxSizing: 'border-box',
                            maxWidth: '1200px',
                            margin: '0 auto'
                        }}>
                            <VideoWithTitleAndText
                                url={componentValues.url?.replace(/"/g, '') || componentValues.videoSrc?.replace(/"/g, '') || ''}
                                title={cleanAndFormatText(componentValues.title)}
                                text={cleanAndFormatText(componentValues.text)}
                                poster={componentValues.poster?.replace(/"/g, '') || ''}
                            />
                        </div>
                    );

                case 'DragAndDropTwoSide':
                    let dragDropQuestions = [];
                    if (componentValues.questions) {
                        try {
                            dragDropQuestions = JSON.parse(componentValues.questions);
                        } catch (e) {
                            console.warn('Error parsing drag and drop questions:', e);
                        }
                    } else if (componentValues.options || componentValues.items) {
                        try {
                            dragDropQuestions = JSON.parse(componentValues.options || componentValues.items);
                        } catch (e) {
                            console.warn('Error parsing drag and drop options:', e);
                        }
                    }

                    return (
                        <DragAndDropTwoSide
                            questions={dragDropQuestions}
                            leftAnswer={cleanTextOnly(componentValues.leftAnswer || componentValues.leftTitle || 'Перетащите сюда')}
                            rightAnswer={cleanTextOnly(componentValues.rightAnswer || componentValues.rightTitle || 'Доступные элементы')}
                        />
                    );

                case 'ImageWithPoints':

                    let imagePoints = [];
                    if (componentValues.points) {
                        try {
                            imagePoints = JSON.parse(componentValues.points);
                        } catch (e) {
                            console.warn('Error parsing image points:', e);
                        }
                    }

                    let imageList = [];
                    if (componentValues.list) {
                        try {
                            imageList = JSON.parse(componentValues.list);
                        } catch (e) {
                            console.warn('Error parsing image list:', e);
                        }
                    }

                    // Try both possible prop names for the image
                    const imageUrl = componentValues.imageSrc || componentValues.img || componentValues.src || '';

                    const imageWithPointsProps = {
                        img: cleanValue(imageUrl),
                        points: imagePoints,
                        list: imageList,
                        title: cleanValue(componentValues.title) || ''
                    };
                    return (
                        <ImageWithPoints
                            img={componentValues.img}
                            list={JSON.parse(componentValues.list)}
                            points={JSON.parse(componentValues.points)}
                        />
                    );

                case 'TabsGlossary':
                    let glossaryTabs = [];
                    let glossaryData = {};

                    if (componentValues.tabs) {
                        try {
                            glossaryTabs = JSON.parse(componentValues.tabs);
                        } catch (e) {
                            console.warn('Error parsing glossary tabs:', e);
                            glossaryTabs = [];
                        }
                    }

                    if (componentValues.tabsGlossary) {
                        try {
                            glossaryData = JSON.parse(componentValues.tabsGlossary);
                        } catch (e) {
                            console.warn('Error parsing glossary data:', e);
                            glossaryData = {};
                        }
                    }

                    // Защита от пустых данных
                    if (!Array.isArray(glossaryTabs) || glossaryTabs.length === 0) {
                        console.warn('TabsGlossary: tabs is empty or not an array, skipping render');
                        return null;
                    }


                    return (
                        <TabsGlossary
                            tabs={glossaryTabs}
                            tabsGlossary={glossaryData}
                            color={cleanTextOnly(componentValues.color) || '#000000'}
                            tabsBackgroundColor={cleanTextOnly(componentValues.tabsBackgroundColor) || '#d6ebff'}
                            version={parseInt(componentValues.version) || 1}
                            title={cleanTextOnly(componentValues.title) || ''}
                        />
                    );                case 'PyramidList':
                    console.log('PyramidList componentValues:', componentValues);
                    let pyramidItems = [];
                    
                    // Проверяем различные возможные поля для списка
                    if (componentValues.list) {
                        if (typeof componentValues.list === 'string') {
                            try {
                                pyramidItems = JSON.parse(componentValues.list);
                                console.log('Parsed pyramid list from string:', pyramidItems);
                            } catch (e) {
                                console.warn('Error parsing pyramid list from string:', e);
                                pyramidItems = [];
                            }
                        } else if (Array.isArray(componentValues.list)) {
                            pyramidItems = componentValues.list;
                            console.log('Using pyramid list as array:', pyramidItems);
                        }
                    } else if (componentValues.items) {
                        if (typeof componentValues.items === 'string') {
                            try {
                                pyramidItems = JSON.parse(componentValues.items);
                                console.log('Parsed pyramid items from string:', pyramidItems);
                            } catch (e) {
                                console.warn('Error parsing pyramid items:', e);
                                pyramidItems = [];
                            }
                        } else if (Array.isArray(componentValues.items)) {
                            pyramidItems = componentValues.items;
                            console.log('Using pyramid items as array:', pyramidItems);
                        }
                    }
                    
                    console.log('Final pyramid items for PyramidList:', pyramidItems);
                    
                    return (
                        <PyramidList
                            list={pyramidItems}
                            title={componentValues.title?.replace(/"/g, '') || ''}
                        />
                    );

                case 'ImageSequence':
                    let sequenceImages = [];
                    let imageDescriptions = [];
                    let sequenceList = [];
                    
                    // Handle images array
                    if (componentValues.images) {
                        try {
                            sequenceImages = JSON.parse(componentValues.images);
                        } catch (e) {
                            console.warn('Error parsing image sequence images:', e);
                        }
                    }
                    
                    // Handle descriptions array
                    if (componentValues.imageDescriptions) {
                        try {
                            imageDescriptions = JSON.parse(componentValues.imageDescriptions);
                        } catch (e) {
                            console.warn('Error parsing image sequence descriptions:', e);
                        }
                    }
                    
                    // Handle list array (alternative to imageDescriptions)
                    if (componentValues.list) {
                        try {
                            sequenceList = JSON.parse(componentValues.list);
                        } catch (e) {
                            console.warn('Error parsing image sequence list:', e);
                        }
                    }
                    
                    return (
                        <ImageSequence
                            images={sequenceImages}
                            imageDescriptions={imageDescriptions}
                            list={sequenceList}
                        />
                    );

                case 'TextAndLink':
                    return (
                        <TextAndLink
                            text={cleanAndFormatText(componentValues.text)}
                            link={componentValues.link?.replace(/"/g, '') || ''}
                            linkText={cleanAndFormatText(componentValues.linkText) || 'Подробнее'}
                        />
                    );

                case 'DropDownTextWithTabs':
                    let dropDownTabs = [];
                    let dropDownTabsData = [];                    if (componentValues.tabs) {
                        try {
                            const cleanTabs = cleanValue(componentValues.tabs);
                            dropDownTabs = JSON.parse(cleanTabs);
                        } catch (e) {
                            console.warn('Error parsing dropdown tabs:', e);
                            dropDownTabs = [];
                        }
                    }

                    if (componentValues.tabsData) {
                        try {
                            const cleanTabsData = cleanValue(componentValues.tabsData);
                            dropDownTabsData = JSON.parse(cleanTabsData);
                        } catch (e) {
                            console.warn('Error parsing dropdown tabs data:', e);
                            dropDownTabsData = [];
                        }
                    }

                    // Защита от пустых данных
                    if (!Array.isArray(dropDownTabs) || dropDownTabs.length === 0) {
                        console.warn('DropDownTextWithTabs: tabs is empty or not an array, skipping render');
                        return null;
                    }

                    if (!Array.isArray(dropDownTabsData) || dropDownTabsData.length === 0) {
                        console.warn('DropDownTextWithTabs: tabsData is empty or not an array, skipping render');
                        return null;
                    }                    return (
                        <DropDownTextWithTabs
                            tabs={dropDownTabs}
                            tabsData={dropDownTabsData}
                            title={cleanValue(componentValues.title) || ''}
                            headerTextColor={cleanValue(componentValues.headerTextColor) || undefined}
                            activeHeaderTextColor={cleanValue(componentValues.activeHeaderTextColor) || undefined}
                            textColor={cleanValue(componentValues.textColor) || undefined}
                            tabsTextColor={cleanValue(componentValues.tabsTextColor) || undefined}
                            tabsBackgroundColor={cleanValue(componentValues.tabsBackgroundColor) || undefined}
                        />
                    );

                case 'OneToFour':
                    // Check which format of props is provided
                    if (componentValues.options) {
                        // Original format
                        let oneToFourOptions = [];
                        try {
                            oneToFourOptions = JSON.parse(componentValues.options);
                        } catch (e) {
                            console.warn('Error parsing OneToFour options:', e);
                            oneToFourOptions = [];
                        }

                        // Защита от пустых данных
                        if (!Array.isArray(oneToFourOptions) || oneToFourOptions.length === 0) {
                            console.warn('OneToFour: options is empty or not an array, skipping render');
                            return null;
                        }

                        return (
                            <OneToFour
                                options={oneToFourOptions}
                                question={componentValues.question?.replace(/"/g, '') || ''}
                            />
                        );
                    } else if (componentValues.header && componentValues.list) {
                        // New format with header and list
                        let header = componentValues.header;
                        let list = [];

                        // Parse header if it's a JSON string
                        try {
                            // Try to parse as JSON first
                            if (typeof header === 'string' && header.startsWith('{')) {
                                const parsedHeader = JSON.parse(header);
                                if (parsedHeader.componentName && parsedHeader.values) {
                                    // It's a component reference
                                    header = parsedHeader;
                                }
                            }
                        } catch (e) {
                            console.warn('Error parsing OneToFour header:', e);
                        }

                        // Parse list if available
                        if (componentValues.list) {
                            try {
                                list = JSON.parse(componentValues.list);
                            } catch (e) {
                                console.warn('Error parsing OneToFour list:', e);
                                list = [];
                            }
                        }

                        return (
                            <OneToFour
                                header={header}
                                list={list}
                                version={componentValues.version ? parseInt(componentValues.version.replace(/"/g, '')) : 1}
                            />
                        );
                    } else {
                        console.warn('OneToFour: Invalid props format, neither options nor header+list provided');
                        return null;
                    }

                case 'ShortBiography':
                    return (
                        <ShortBiography
                            name={cleanTextOnly(componentValues.name)}
                            img={cleanTextOnly(componentValues.img || componentValues.photo)}
                            biography={cleanTextOnly(componentValues.biography)}
                            birthdate={cleanTextOnly(componentValues.birthdate)}
                            deathdate={cleanTextOnly(componentValues.deathdate)}
                            position={cleanTextOnly(componentValues.position)}
                        />
                    );

                case 'StageDropDown':
                    let stageItems = [];
                    if (componentValues.stages) {
                        try {
                            stageItems = JSON.parse(componentValues.stages);
                        } catch (e) {
                            console.warn('Error parsing stage items:', e);
                            stageItems = [];
                        }
                    }

                    // Защита от пустых данных
                    if (!Array.isArray(stageItems) || stageItems.length === 0) {
                        console.warn('StageDropDown: stages is empty or not an array, skipping render');
                        return null;
                    }

                    return (
                        <StageDropDown
                            stages={stageItems}
                            title={componentValues.title?.replace(/"/g, '') || ''}
                        />
                    );

                case 'InteractivePhases':
                    let phaseData = [];
                    if (componentValues.phases) {
                        try {
                            phaseData = JSON.parse(componentValues.phases);
                        } catch (e) {
                            console.warn('Error parsing phase data:', e);
                            phaseData = [];
                        }
                    }

                    // Защита от пустых данных
                    if (!Array.isArray(phaseData) || phaseData.length === 0) {
                        console.warn('InteractivePhases: phases is empty or not an array, skipping render');
                        return null;
                    }

                    return (
                        <InteractivePhases
                            phases={phaseData}
                            title={componentValues.title?.replace(/"/g, '') || ''}
                        />);

                case 'Component52':
                    let parsedData = null;

                    if (componentValues) {
                        try {
                            parsedData = componentValues;
                        } catch (e) {
                            console.warn('Error parsing Component52 data:', e);
                        }
                    }
                    // Pass all the possible data formats to the component
                    // The component will handle extracting the correct values
                    return (
                        <Component52
                            data={parsedData}
                            img={componentValues.img ? componentValues.img.replace(/^"(.*)"$/, '$1').replace(/\\"/g, '"') : ''}
                            version={componentValues.version || 1}
                            title={componentValues.title ? componentValues.title.replace(/^"(.*)"$/, '$1').replace(/\\"/g, '"') : ''}
                            isKazakh={componentValues.isKazakh || false}
                        />
                    );

                case 'DropdownList':
                    let dropdownItems = [];
                    // Check both 'list' and 'items' fields for data
                    const dropdownData = componentValues.list || componentValues.items;
                    if (dropdownData) {
                        try {
                            dropdownItems = JSON.parse(dropdownData);
                        } catch (e) {
                            console.warn('Error parsing dropdown items:', e);
                        }
                    }
                    return (
                        <DropdownList
                            list={dropdownItems}
                        />
                    );

                case 'DropdownList_r5':
                    let dropdownItemsR5 = [];
                    if (componentValues.items) {
                        try {
                            dropdownItemsR5 = JSON.parse(componentValues.items);
                        } catch (e) {
                            console.warn('Error parsing dropdown items r5:', e);
                        }
                    }
                    let headersR5 = [];
                    if (componentValues.headers) {
                        try {
                            headersR5 = JSON.parse(componentValues.headers);
                        } catch (e) {
                            console.warn('Error parsing dropdown headers r5:', e);
                            // Default headers if parsing fails
                            headersR5 = [
                                { name: 'Header 1', icon: null },
                                { name: 'Header 2', icon: null },
                                { name: 'Header 3', icon: null }
                            ];
                        }
                    } else {
                        // Default headers if not provided
                        headersR5 = [
                            { name: 'Header 1', icon: null },
                            { name: 'Header 2', icon: null },
                            { name: 'Header 3', icon: null }
                        ];
                    }

                    return (
                        <DropdownListR5
                            title={cleanTextOnly(componentValues.title || '')}
                            headers={headersR5}
                            items={dropdownItemsR5}
                            color={componentValues.color || '#1F3C88'}
                            strokeColor={componentValues.strokeColor || '#CADEFC'}
                        />
                    );

                case 'CustomCarousel':
                    let carouselData = [];
                    if (componentValues.data) {
                        try {
                            carouselData = JSON.parse(componentValues.data);
                        } catch (e) {
                            console.warn('Error parsing carousel data:', e);
                            carouselData = [];
                        }
                    }

                    // Защита от пустых данных
                    if (!Array.isArray(carouselData) || carouselData.length === 0) {
                        console.warn('CustomCarousel: data is empty or not an array, skipping render');
                        return null;
                    }



                    return (
                        <CustomCarousel
                            data={carouselData}
                            autoPlay={componentValues.autoPlay === 'true' || componentValues.autoPlay === true}
                            autoPlayInterval={parseInt(componentValues.autoPlayInterval) || 4000}
                            showDots={componentValues.showDots !== 'false'}
                            showArrows={componentValues.showArrows !== 'false'}
                        />
                    );

                case 'DragAndDropZone':
                    let dragOptions = [];
                    let correctOptions = [];
                    try {
                        if (componentValues.options) {
                            dragOptions = JSON.parse(componentValues.options);
                        }
                        if (componentValues.correctOptions) {
                            correctOptions = JSON.parse(componentValues.correctOptions);
                        }
                    } catch (e) {
                        console.warn('Error parsing DragAndDropZone options:', e);
                    }
                    return (
                        <DragAndDropZone
                            options={dragOptions}
                            correctOptions={correctOptions}
                            title={cleanAndFormatText(componentValues.title)}
                            img={componentValues.img?.replace(/"/g, '') || null}
                            version={parseInt(componentValues.version) || 1}
                        />
                    );

                case 'DropdownGlossaryList':
                    let glossaryList = [];
                    try {
                        if (componentValues.list) {
                            glossaryList = JSON.parse(componentValues.list);
                        }
                    } catch (e) {
                        console.warn('Error parsing DropdownGlossaryList list:', e);
                    }
                    return (
                        <DropdownGlossaryList
                            list={glossaryList}
                            headerTextColor={componentValues.headerTextColor?.replace(/"/g, '') || '#000000'}
                            activeHeaderTextColor={componentValues.activeHeaderTextColor?.replace(/"/g, '') || '#007bff'}
                            textColor={componentValues.textColor?.replace(/"/g, '') || '#333333'}
                            tabsTextColor={componentValues.tabsTextColor?.replace(/"/g, '') || '#000000'}
                            tabsBackgroundColor={componentValues.tabsBackgroundColor?.replace(/"/g, '') || '#f8f9fa'}
                        />
                    );

                case 'DragAndDropComponent':
                    let answerOptions = [];
                    let fieldOptions = [];
                    try {
                        if (componentValues.answerOptions) {
                            answerOptions = JSON.parse(componentValues.answerOptions);
                        }
                        if (componentValues.fieldOptions) {
                            fieldOptions = JSON.parse(componentValues.fieldOptions);
                        }
                    } catch (e) {
                        console.warn('Error parsing DragAndDropComponent options:', e);
                    }
                    return (
                        <DragAndDropComponent
                            answerOptions={answerOptions}
                            fieldOptions={fieldOptions}
                        />
                    );

                default:
                    console.warn(`Неизвестный компонент: ${componentName}`, { componentValues });
                    return (
                        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg my-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-yellow-800">
                                        Компонент не поддерживается
                                    </h3>
                                    <div className="mt-2 text-sm text-yellow-700">
                                        <p>Компонент <strong>"{componentName}"</strong> пока не реализован в системе.</p>
                                        <details className="mt-2">
                                            <summary className="cursor-pointer text-yellow-600 hover:text-yellow-800">
                                                Показать данные компонента
                                            </summary>
                                            <pre className="mt-2 text-xs bg-yellow-100 p-2 rounded overflow-auto max-h-32">
                                                {JSON.stringify(componentValues, null, 2)}
                                            </pre>
                                        </details>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
            }
        } catch (error) {
            console.error(`Error rendering component ${componentName}:`, error);
            return (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800">
                        Ошибка при рендеринге компонента "{componentName}": {error.message}
                    </p>
                    <details className="mt-2">
                        <summary className="cursor-pointer text-red-600">Показать детали</summary>
                        <pre className="mt-2 text-xs bg-red-100 p-2 rounded overflow-auto">
                            {JSON.stringify(componentValues, null, 2)}
                        </pre>
                    </details>
                </div>
            );
        }
    };

    return (
        <div className="component-entries">
            {componentEntries.map((entry, index) => {
                // Add check to ensure the entry is valid before rendering
                if (!entry || typeof entry !== 'object') {
                    console.error('Invalid component entry at index', index, entry);
                    return (
                        <div key={`error-${index}`} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-800">Неверный формат компонента</p>
                        </div>
                    );
                }

                return (
                    <div key={entry.component_entry_id || index} className="component-entry">
                        {renderComponent(entry)}
                    </div>
                );
            })}
        </div>
    );
};

export default ComponentRenderer;
