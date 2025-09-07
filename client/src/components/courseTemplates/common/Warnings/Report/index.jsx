import React from 'react';
import { BsFillExclamationOctagonFill } from "react-icons/bs";
import parseText from '../../../../../utils/ParseTextFromFormatTextarea.jsx';
import './../../../../../styles/parseTextStyles.scss';
import './style.scss';

const Report_Warning = ({ 
    children, 
    text,
    backgroundColor='rgba(202, 222, 252, 0.22)',
    borderColor='#A7CAFF',
    version = '1'
}) => {
    // Clean text content and handle quoted strings
    const textToProcess = typeof children === 'string' 
        ? children.replace(/^"(.*)"$/, '$1').replace(/\\"/g, '"') 
        : (children || text || '');
    
    // Version 2 with Tailwind styling (matches Report_Information structure)
    if (version === '2' || version === 2) {
        // Split by newlines to handle each paragraph
        const lines = textToProcess.split(/\\n|\n/);
        
        return (
            <div className="w-full max-w-full mx-auto my-5 px-5 sm:px-6 py-6 sm:py-7 bg-[#f0f7ff] border border-[#A7CAFF] rounded-lg shadow-sm">
                <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                        <BsFillExclamationOctagonFill className="text-[#A7CAFF] w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                    </div>
                    <div className="flex-grow ml-3 sm:ml-4">
                        {lines.map((line, index) => {
                            // Skip empty lines
                            if (!line.trim()) return null;
                            
                            return (
                                <React.Fragment key={index}>
                                    <p className="text-[#3A3939] text-base sm:text-lg md:text-xl font-semibold leading-relaxed mb-2 last:mb-0">
                                        {parseText(line)}
                                    </p>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
    
    // Legacy version with simple structure but better styling
    return (
        <div className="w-full max-w-full mx-auto my-5 px-5 sm:px-6 py-6 sm:py-7 bg-[#f0f7ff] border border-[#A7CAFF] rounded-lg shadow-sm"
             style={{
                backgroundColor: backgroundColor,
                borderColor: borderColor
             }}>
            <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                    <BsFillExclamationOctagonFill className="text-[#A7CAFF] w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" 
                                                 style={{color: borderColor}} />
                </div>
                <div className="flex-grow ml-3 sm:ml-4">
                    <p className="text-[#3A3939] text-base sm:text-lg md:text-xl font-medium leading-relaxed">
                        {parseText(textToProcess)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Report_Warning;