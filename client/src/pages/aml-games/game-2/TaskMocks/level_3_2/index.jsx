import React from "react";
import Sizebox from "../../../../../components/courseTemplates/common/Sizebox";
import image from '../../../assets/image.png';
import Divider from "../../../components/divider/index.jsx";
import MessagesComponent from "../../MessagePage/MessagesPage.tsx";

function Level_3_2() {
    return (
        <>
            <div className='message-page'>
                <div className='message-page-container'>
                    <MessagesComponent image={image} />
                </div>
            </div>
            <Sizebox />
            <Divider />

        </>
    );
}

export default Level_3_2;
