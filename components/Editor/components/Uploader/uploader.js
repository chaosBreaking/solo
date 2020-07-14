import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function FilePondUploader () {
    const [files, setFiles] = useState([]);
    return <FilePond
        files={files}
        allowMultiple={false}
        onupdatefiles={setFiles}
        labelIdle='将文件拖入框内或者<span class="filepond--label-action">选取本地文件</span>'
    />;
}

export default FilePondUploader;
