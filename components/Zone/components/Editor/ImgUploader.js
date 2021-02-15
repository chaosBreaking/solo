import React, { useState } from 'react';
import { FilePond, registerPlugin, } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
import useStyles from 'isomorphic-style-loader/useStyles';

import s from './uploader.scss';

// Register the plugin
registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateSize,
    FilePondPluginFileValidateType
);

const MAX_FILE_SIZE = '10MB';

function FilePondUploader({ serverUrl, images, setImages }) {
    useStyles(s);

    const updateHandler = files => {
        setImages(files);
        console.log(files, images);
        return true;
    };

    return <div className={s.container}>
        <FilePond
            maxFiles={6}
            allowMultiple={true}
            allowReorder={true}
            onupdatefiles={updateHandler}
            labelIdle='将文件拖入框内 或<span class="filepond--label-action">选取本地文件</span>'
            allowFileTypeValidation={true}
            acceptedFileTypes={['image/*']}
            labelFileTypeNotAllowed={'只能上传图片哦~'}
            labelMaxFileSizeExceeded={'图片文件太大了呢...'}
            labelMaxFileSize={`最大支持${MAX_FILE_SIZE}的图片哦～`}
            maxFileSize={MAX_FILE_SIZE}
            instantUpload={false}
            server={{
                url: serverUrl,
                // process: processFiles
            }}
        />
    </div>;
}

export default FilePondUploader;
