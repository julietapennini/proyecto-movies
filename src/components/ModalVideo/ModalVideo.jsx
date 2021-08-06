import { useState, useEffect } from "react";
import { Modal } from 'antd';
import ReactPlayer from "react-player";

const ModalVideo = props => {

    const { isOpen, close, videoKey, videoPlatform} = props;
    const [urlVideo, setUrlVideo] = useState(null)

    return (
        <Modal
            className="modal-video"
            visible={isOpen}
            centered
            onCancel={close}
            footer={false}
        >
            Este es mi modal
        </Modal>
    );
};

export default ModalVideo;
