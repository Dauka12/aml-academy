import React from 'react';
import { IoInformationCircle } from "react-icons/io5";
import parseText from '../../../../../utils/ParseTextFromFormatTextarea.jsx';
import './../../../../../styles/parseTextStyles.scss';

function Report_Information({ children, version=1 }) {
    // Clean children string if it's wrapped in quotes
    const cleanChildren = typeof children === 'string' 
        ? children.replace(/^"(.*)"$/, '$1').replace(/\\"/g, '"') 
        : children || '';
          if (version === 2) {
        return (
            <div className="w-full max-w-full mx-auto my-5 px-5 sm:px-6 py-6 sm:py-7 bg-[#f8fbea] border border-[#dcebbb] rounded-lg shadow-sm">
                <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                        <IoInformationCircle className="text-[#2a8658] w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                    </div>
                    <div className="flex-grow ml-3 sm:ml-4">
                        {cleanChildren && cleanChildren.split('\\n').map((child, index) => {
                            // Skip empty lines
                            if (!child.trim()) return null;
                            
                            return (
                                <React.Fragment key={index}>
                                    <p className="text-[#2A2A2A] text-base sm:text-lg md:text-xl font-semibold leading-relaxed mb-2 last:mb-0">
                                        {parseText(child)}
                                    </p>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>
        );    }
    
    return ( 
        <div className="w-full max-w-full mx-auto my-5 px-5 sm:px-6 py-6 sm:py-7 bg-[#f8fbea] border border-[#dcebbb] rounded-lg shadow-sm">
            <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                    <IoInformationCircle className="text-[#2a8658] w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                </div>
                <div className="flex-grow ml-3 sm:ml-4">
                    <p className="text-[#2A2A2A] text-base sm:text-lg md:text-xl font-semibold leading-relaxed">
                        {parseText(cleanChildren)}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Report_Information;