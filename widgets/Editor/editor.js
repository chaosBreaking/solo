import React from 'react';
import { Editor as TinyMCEditor } from '@tinymce/tinymce-react';

const plugins = 'formatpainter print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons';
const toolbar = 'undo redo | bold italic underline strikethrough formatpainter | fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat pagebreak | charmap emoticons image media | save print link anchor codesample insertfile template | fullscreen code preview';
// 'code codesample undo redo restoredraft | cut copy paste pastetext | forecolor backcolor searchreplace bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | bullist numlist | formatselect fontselect fontsizeselect | blockquote subscript superscript removeformat | table image media charmap emoticons hr pagebreak insertdatetime print preview',
// 'file edit view insert format tools table help';
const fontsizeFormats = '22px 24px 26px';
const MAX_IMG_WIDTH = 640;
const DEFAULT_CONTENT = '';
const UPLOAD_URL = '/upload';
const FOLDER_PREFIX = 'content_imgs/';
const contentStyle = `
* {
    font-family: 'Spectral', serif;
    line-height: 2;
}
.mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
    font-size: 20px; font-family: 'Spectral', serif !important;
}
img {
    display: block !important;
    margin-left: auto !important;
    margin-right: auto !important;
}
`;

/**
 * 可监听的事件 https://www.tiny.cloud/docs/advanced/events/#mediaembedevents
 * dom util https://www.tiny.cloud/docs/api/tinymce.dom/tinymce.dom.domutils/
 */

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
        // editor.ui.registry.addContextToolbar('inserttoolbar', {
        //     predicate: function (node) {
        //         return node.nodeName === 'P';
        //     },
        //     items: 'quickimage media',
        //     position: 'line',
        //     scope: 'editor'
        // });

        // editor.ui.registry.addContextToolbar('textselection', {
        //     predicate: function (node) {
        //         return !editor.selection.isCollapsed();
        //     },
        //     items: 'bold italic | blockquote',
        //     position: 'selection',
        //     scope: 'node'
        // });
    }

    onEditorChange = (content, editor) => {
        this.handleEditorChange(content);
    }

    onInit = (event, editor) => {
        // typeof this.props.mountEditor === 'function' && this.props.mountEditor(editor);
        this.setState({ mounted: true });
        typeof this.props.onMounted === 'function' && this.props.onMounted(editor);
    }

    uploadHandler = async (blobInfo, success, failure, progress) => {
        const res = await this.props.uploader(FOLDER_PREFIX + blobInfo.filename(), blobInfo.blob());
        success('//' + res);
    };

    render() {
        const { LoadingUI, initialContent = DEFAULT_CONTENT, content, uploadUrl = UPLOAD_URL, } = this.props;
        this.uploadUrl = uploadUrl;
        return <>
            {!this.state.mounted && <LoadingUI />}
            <TinyMCEditor
                tinymceScriptSrc='http://fs.hyperii.com/script/tinymce.min.js'
                initialValue={initialContent}
                value={content}
                outputFormat='html'
                apiKey="yhv7e7rccduf41j39x83x364fdzt91183p8v3thgkw4zm9iw"
                init={{
                    // content_css: 'dark',
                    entity_encoding: 'raw',
                    cleanup: true,
                    remove_linebreaks: true,
                    forced_root_block: true,
                    force_br_newlines: true,
                    force_p_newlines: false,
                    convert_newlines_to_brs: true,
                    paste_auto_cleanup_on_paste: true,
                    image_caption: true,
                    document_base_url: 'http://fs.hyperii.com',
                    skin_url: 'http://fs.hyperii.com/script',
                    theme_url: 'http://fs.hyperii.com/script/theme.js',
                    plugins: [
                        // 'autolink',
                        // 'codesample',
                        // 'link',
                        // 'lists',
                        // 'media',
                        // 'powerpaste',
                        // 'table',
                        // 'quickimage',
                        // 'quickbars',
                        // 'help',
                        // 'wordcount', // 暂时不用
                        'paste'
                    ],
                    external_plugins: {
                        link: 'http://fs.hyperii.com/script/link.js',
                        quickbars: 'http://fs.hyperii.com/script/quickbar.js',
                    },
                    quickbars_insert_toolbar: 'quickimage quicktable codesample', // 插入菜单
                    // quickbars_insert_toolbar: false,
                    // quickbars_selection_toolbar: 'bold italic underline | blockquote quicklink | fontsizeselect', // 选中后菜单
                    quickbars_selection_toolbar: 'bold italic underline | blockquote quicklink', // 选中后菜单
                    contextmenu: 'undo redo | inserttable | cell row column deletetable', // 右键context菜单
                    powerpaste_word_import: 'clean',
                    powerpaste_html_import: 'clean',
                    toolbar: false,
                    menubar: false,
                    statusbar: false,
                    // inline: true,
                    height: '90%',
                    // min_height: 800,
                    language: 'zh_CN',
                    language_url: 'http://fs.hyperii.com/script/zh_CN.js',
                    // plugins,
                    // menubar,
                    // toolbar,
                    toolbar_sticky: true,
                    branding: false,
                    fontsize_formats: fontsizeFormats,
                    content_style: contentStyle,
                    placeholder: '输入正文 ...',
                    quickbars_image_toolbar: false, // 选中图片后出现的toolbar
                    // automatic_uploads: false,
                    // upload_images: () => console.log('dddd'),
                    // file_picker_callback: () => console.log('dddsssd'),
                    // images_upload_url: 'postAcceptor',
                    images_upload_handler: this.uploadHandler,
                    setup: this.setupHandler,
                }}
                onEditorChange={this.onEditorChange}
                onInit={this.onInit}
            />
        </>;
    }
}
