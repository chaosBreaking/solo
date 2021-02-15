import React from 'react';
import { Editor as TinyMCEditor } from '@tinymce/tinymce-react';

const MAX_IMG_WIDTH = 640;
const DEFAULT_CONTENT = '';
const UPLOAD_URL = '/upload';
const FOLDER_PREFIX = 'content_imgs/';
const contentStyle = `
* {
    font-family: 'Spectral', serif;
    line-height: 1.5;
}
.mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
    font-family: 'Spectral', serif !important;
}
p {
    margin-block-start: .5em;
    magin-block-end: .1em;
}
img {
    display: block !important;
    margin-left: auto !important;
    margin-right: auto !important;
}
`;

export default class Editor extends React.Component {
    state = { mounted: false, newLine: false };
    uploadUrl = UPLOAD_URL;

    get handleEditorChange() {
        return this.props.handleEditorChange || (() => { });
    }

    setupHandler(editor) {
        editor.on('init', function (args) {
            editor = args.target;
            editor.on('NodeChange', function (e) {
                if (e && e.element.nodeName.toLowerCase() === 'img') {
                    let width = e.element.width;
                    let height = e.element.height;
                    if (width > MAX_IMG_WIDTH) {
                        height = height / (width / MAX_IMG_WIDTH);
                        width = MAX_IMG_WIDTH;
                    }
                    window.tinyMCE.DOM.setAttribs(e.element, { width, height });
                }
            });
        });
    }

    onEditorChange = (content, editor) => {
        this.handleEditorChange(content);
    }

    onInit = (event, editor) => {
        this.setState({ mounted: true });
        typeof this.props.onMounted === 'function' && this.props.onMounted(editor);
    }

    render() {
        const { initialContent = DEFAULT_CONTENT, content, uploadUrl = UPLOAD_URL, placeholder } = this.props;
        this.uploadUrl = uploadUrl;
        return <div style={{ flex: 1 }}>
            <TinyMCEditor
                tinymceScriptSrc='http://fs.hyperii.com/script/tinymce.min.js'
                initialValue={initialContent}
                value={content}
                outputFormat='html'
                onInit={this.onInit}
                // apiKey="yhv7e7rccduf41j39x83x364fdzt91183p8v3thgkw4zm9iw"
                init={{
                    height: '180px',
                    placeholder,
                    entity_encoding: 'raw',
                    content_style: contentStyle,
                    cleanup: true,
                    remove_linebreaks: true,
                    forced_root_block: false,
                    force_br_newlines: false,
                    paste_remove_styles: true,
                    paste_remove_styles_if_webkit: true,
                    paste_strip_class_attributes: true,
                    paste_auto_cleanup_on_paste: true,
                    //     force_p_newlines: false,
                    convert_newlines_to_brs: false,
                    document_base_url: 'http://fs.hyperii.com',
                    skin_url: 'http://fs.hyperii.com/script',
                    theme_url: 'http://fs.hyperii.com/script/theme.js',
                    // image_caption: true,
                    plugins: [
                        'paste'
                    ],
                    //     external_plugins: {
                    //         link: 'http://fs.hyperii.com/script/link.js',
                    //         quickbars: 'http://fs.hyperii.com/script/quickbar.js',
                    //     },
                    //     quickbars_insert_toolbar: 'quickimage quicktable codesample', // 插入菜单
                    //     // quickbars_insert_toolbar: false,
                    //     // quickbars_selection_toolbar: 'bold italic underline | blockquote quicklink | fontsizeselect', // 选中后菜单
                    //     quickbars_selection_toolbar: 'bold italic underline | blockquote quicklink', // 选中后菜单
                    //     contextmenu: 'undo redo | inserttable | cell row column deletetable', // 右键context菜单
                    //     powerpaste_word_import: 'clean',
                    //     powerpaste_html_import: 'clean',
                    toolbar: false,
                    menubar: false,
                    statusbar: false,
                    language: 'zh_CN',
                    language_url: 'http://fs.hyperii.com/script/zh_CN.js',
                    branding: false,
                    // fontsize_formats: fontsizeFormats,
                    //     quickbars_image_toolbar: false, // 选中图片后出现的toolbar
                    //     // automatic_uploads: false,
                    //     // upload_images: () => console.log('dddd'),
                    //     // file_picker_callback: () => console.log('dddsssd'),
                    //     // images_upload_url: 'postAcceptor',
                    //     images_upload_handler: this.uploadHandler,
                    // setup: this.setupHandler,
                }}
            // onEditorChange={this.onEditorChange}
            />
        </div>;
    }
}
