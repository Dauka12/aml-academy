import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import './style.css';
const style = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    width:'40%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function NewsModal({name, image, description, imagesHidden, handleClose, open}) {
    

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <div id="Modal" style={style}>
                    <div className='modal-wrapper-news'>
                        <div className="details-modal1">
                            <div className="details-content1">
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ display: 'flex', textAlign: 'left', marginTop: '25px', justifyContent: "space-between" }}>
                                        <p className='details-info1'>{name}</p>
                                        <span style={{ textAlign: 'right', justifyContent: 'center' }}>
                                            <button className="details-button11" onClick={handleClose}>X</button> 
                                        </span>
                                    </div>
                                    {!imagesHidden && (<img src={image} alt="" className={'NewsModalImg'} />)}
                                    <p className='details-description1'>{description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}