
import React, { useState } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import FilePondUploader from './uploader';
// import { FilePond, File, registerPlugin } from 'react-filepond';

// // Import the Image EXIF Orientation and Image Preview plugins
// // Note: These need to be installed separately
// // `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
// import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
// import s3 from 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
// import s2 from 'filepond/dist/filepond.min.css';
import s from './index.scss';
// Register the plugins
// registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function Uploader () {
    const [files, setFiles] = useState([]);
    return (
        <div className={s.container}>
            <FilePondUploader />
        </div>
    );
}
export default withStyles(s)(Uploader);
