import React, { useState, useEffect } from 'react';

import './style.scss'
import Sizebox from '../../common/Sizebox';

import parseText from '../../../../util/ParseTextFromFormatTextarea';
import './../../../../styles/parseTextStyles.scss';

function TabsGlossary({
    tabs,
    tabsGlossary,
    color,
    tabsBackgroundColor,
    tabsActiveBackgroundColor,
    glossaryBackgroundColor,
    version=1
}) {
    const [currentTab, setCurrentTab] = useState(tabs ? tabs[0] : null)

    if (version >= 2) {
        return (
            <div className="tabsGlossary">
                <div className="tabs">
                    {tabs && tabs.map((tab, index) => {
                        const isTabCurrent = tab === currentTab;

                        return (
                            <div 
                                key={index}
                                className={!isTabCurrent? 'tab active' : 'tab'}
                                style={{
                                    backgroundColor: !isTabCurrent? tabsBackgroundColor : 'white',
                                    color: color,
                                    border: `1px solid ${tabsBackgroundColor}`
                                }}
                                onClick={() => {
                                    if (tab === currentTab) {
                                        return;
                                    }

                                    setCurrentTab(tab);
                                }}
                            >
                                {tab}
                            </div>
                        )
                    })}
                </div>
                <Sizebox height={36} />
                <div className="definition-wrapper">
                    <div className="definition" 
                        style={{
                            background: glossaryBackgroundColor || '#F9F9F9',
                            color: color || '#000000',
                            borderColor: tabsBackgroundColor || '#CADEFC',
                        }}
                    >
                        <div>
                            {tabsGlossary && currentTab && 
                                tabsGlossary[currentTab].split('\\n').map((child, index) => {

                                    return (
                                        <React.Fragment key={index}>
                                            <p>
                                                {parseText(child)}
                                            </p>
                                        </React.Fragment>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return ( 
        <div className="tabsGlossary">
            <div className="tabs">
                {tabs && tabs.map((tab, index) => {
                    const isTabCurrent = tab === currentTab;

                    return (
                        <div 
                            key={index}
                            className={!isTabCurrent? 'tab active' : 'tab'}
                            style={{
                                backgroundColor: !isTabCurrent? tabsBackgroundColor : 'white',
                                color: color,
                                border: `1px solid ${tabsBackgroundColor}`
                            }}
                            onClick={() => {
                                if (tab === currentTab) {
                                    return;
                                }

                                setCurrentTab(tab);
                            }}
                        >
                            {tab}
                        </div>
                    )
                })}
            </div>
            <Sizebox height={36} />
            <div className="definition-wrapper">
                <div className="definition" 
                    style={{
                        background: glossaryBackgroundColor || '#F9F9F9',
                        color: color || '#000000',
                        borderColor: tabsBackgroundColor || '#CADEFC',
                    }}
                >
                    <p>
                        {tabsGlossary && currentTab && tabsGlossary[currentTab]}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default TabsGlossary;