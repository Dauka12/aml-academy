import React, { useState, useEffect } from 'react';

function InTextFileDownloader({
    file,
    text,
    style,
    fileName
}) {
    const initiateDownload = async () => {
        try {
            const response = await fetch(file);
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = fileName ? fileName : text;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Error downloading the file: ', error);
        }
    };

    return ( 
        <span 
            className='in-text-file-downloader' 
            onClick={initiateDownload}
            style={style}
        >
            { text }
        </span>
    );
}

export default InTextFileDownloader;