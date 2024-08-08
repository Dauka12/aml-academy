import React, { useState, useEffect } from 'react';

import './style.scss';

import pdf from './pdf-file.png'
import docx from './../../../../assets/icons/docx_icon.png'
import download from './download.png'

function FileDownloader({
    file,
    fileName,
    type,
    color
}) {

    console.log(file)
    const defaultType = 'pdf'
    const _type = type || defaultType;

    let fileImg = pdf;

    if (_type !== 'pdf') {
        // set other file type icons to fileImg
        fileImg = docx;
    }

    const initiateDownload = async () => {
        try {
            const response = await fetch(file);
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Error downloading the file: ', error);
        }
    };

    return ( 
        <div className="file-downloader-wrapper">
            <div className='course-file'style={{ borderColor: color || '#CADEFC' }}>
                <img src={_type === 'doc' ? docx : pdf} alt="file-icon" className='file-icon' />
                <div>
                    <h6>{fileName}</h6>
                </div>
                <img src={download} 
                    onClick={initiateDownload}
                alt="download-icon" className='download' height={31}/>
            </div>
        </div>
     );
}

export default FileDownloader;