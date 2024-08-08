import React, { useState, useEffect } from 'react';
import './style.scss';

import HeaderWithLine from '../../common/HeaderWithLine';
import Quote from '../../common_v2/Quote'
import Centered from '../../common/Centered'
import FileDownloader from '../../common/FileDownloader'
import ImageLine from '../../common/ImageLine'
import ImageWithText from '../../common/ImageWithText'
import NotNumberedDots from '../../common/NotNumberedDots'
import NumberedDots from '../../common/NumberedDots'
import RandomGlossary from '../../common/RandomGlossary'
import RandomH2 from '../../common/RandomH2'
import RandomParapraph from '../../common/RandomParagraph'
import Sizebox from '../../common/Sizebox'
import SmallNotNuberedDots from '../../common/SmallNotNuberedDots'
import ImageSequence from '../../common_v2/ImageSequence'

import Table_1 from '../../common/Tables/Table-1'

import FlexRow from '../../common_v2/FlexRow'
import FlexBoxes from '../../common_v2/FlexBoxes'
import FancyList from '../../common_v2/FancyList'
import TextWithBackground from '../../common/TextWithBackground'
import TextWithTitle from '../../common/TextWithTitle'
import VideoLine from '../../common/VideoLine'
import Report_Information from '../../common/Warnings/Report_Information'
import TabsGlossary from '../../complex/TabsGlossary'
import VideoWithTitleAndText from '../../complex/Video/VideoWithTitleAndText'
import TextAndLink from '../../complex/TextAndLink'
import DropdownList from '../../complex/interactives/DropdownList'
import DropdownList_r5 from '../../complex/interactives/DropdownList_r5'
import ShortBiography from '../../complex/images/ShortBiography'
import DragAndDropTwoSide from '../../complex/DragAndDropTwoSide'
import DropdownGlossaryList from '../../complex/DropdownGlossaryList'
import DataChain from '../../complex/DataChain'
import SimpleTable from '../../common/SimpleTable'
import DropDownTextWithTabs from '../../complex/DropDownTextWithTabs'
import IconDots from '../../common_v2/IconDots'
import Report_Warning from '../../common/Warnings/Report'
import ImageAndColumns from '../../common_v2/ImageAndColumns'

function TwoColumnsDivider({
    left,
    right,
    gap=10,
    version=1,
}) {

    const componentMap = {
        HeaderWithLine,
        ImageWithText,
        ImageLine,
        RandomGlossary,
        RandomH2,
        RandomParapraph,
        TextWithBackground,
        TextWithTitle,
        Report_Warning,
        Report_Information,
        NotNumberedDots,
        NumberedDots,
        Table_1,
        FileDownloader,
        VideoLine,
        Sizebox,
        TabsGlossary,
        DropDownTextWithTabs,
        VideoWithTitleAndText,
        TextAndLink,
        DropdownList,
        DropdownList_r5,
        ShortBiography,
        DragAndDropTwoSide,
        DropdownGlossaryList,
        DataChain,
        SimpleTable,
        FancyList,
        FlexBoxes,
        FlexRow,
        Quote,
        IconDots,
        ImageAndColumns,
        ImageSequence,
    };

    if (version === 2) {
        return ( 
            <div 
                className="two-columns-divider" 
            >
                <div className="wrapper"
                    style={{
                        gap: `${gap}px`
                    }}
                >
    
                    {console.log(left, right)}
                    <div className="left">
                        {
                            left === null ? null 
                            : (
                                componentMap[left.componentName] && (
                                    React.createElement(componentMap[left.componentName], left.values)
                                ) 
                            )
                        }
                    </div>
    
                    <div className="right">
                        {
                            left === null ? null 
                            : (
                                componentMap[right.componentName] && (
                                    React.createElement(componentMap[right.componentName], right.values)
                                ) 
                            )
                        }
                    </div>
    
                </div>
            </div>
        );
    }

    return ( 
        <div className="two-columns-divider" 
        >
            <div className="wrapper"
                style={{
                    gap: `${gap}px`
                }}
            >

                <div className="left">{ left }</div>

                <div className="right">{ right }</div>

            </div>
        </div>
    );
}

export default TwoColumnsDivider;