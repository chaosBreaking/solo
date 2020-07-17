import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';

// Register the plugin
registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateSize,
    FilePondPluginFileValidateType
);

const MAX_FILE_SIZE = '5MB';

function FilePondUploader () {
    const [files, setFiles] = useState([]);
    return <FilePond
        files={files}
        allowMultiple={false}
        onupdatefiles={setFiles}
        labelIdle='将文件拖入框内 或<span class="filepond--label-action">选取本地文件</span>'
        allowFileTypeValidation={true}
        acceptedFileTypes={['image/*']}
        labelFileTypeNotAllowed={'只能上传图片哦~'}
        labelMaxFileSizeExceeded={'图片文件太大了呢...'}
        labelMaxFileSize={`最大支持${MAX_FILE_SIZE}的图片哦～`}
        maxFileSize={MAX_FILE_SIZE}
    />;
}

export default FilePondUploader;
