import React from 'react';
import { Editor as TinyMCEditor } from '@tinymce/tinymce-react';

const plugins = 'formatpainter print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons';
const toolbar = 'undo redo | bold italic underline strikethrough formatpainter | fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat pagebreak | charmap emoticons image media | save print link anchor codesample insertfile template | fullscreen code preview';
// 'code codesample undo redo restoredraft | cut copy paste pastetext | forecolor backcolor searchreplace bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | bullist numlist | formatselect fontselect fontsizeselect | blockquote subscript superscript removeformat | table image media charmap emoticons hr pagebreak insertdatetime print preview',
const menubar = false;
const fontsizeFormats = '16px 20px 24px';
// 'file edit view insert format tools table help';
const fontFamily = "'Spectral', Serif;";
const DEFAULT_CONTENT = '';
const UPLOAD_URL = '/upload';
const FOLDER_PREFIX = 'content_imgs/';

export default class Editor extends React.Component {
    state = { mounted: false };
    uploadUrl = UPLOAD_URL;

    get handleEditorChange() {
        return this.props.handleEditorChange || (() => { });
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
                // skin='dark'
                outputFormat='html'
                apiKey="yhv7e7rccduf41j39x83x364fdzt91183p8v3thgkw4zm9iw"
                init={{
                    plugins: [
                        // 'autolink',
                        // 'codesample',
                        'link',
                        // 'lists',
                        // // 'media',
                        // 'powerpaste',
                        // 'table',
                        // 'quickimage',
                        'quickbars',
                        // 'codesample',
                        // 'help',
                        // 'wordcount', // 暂时不用
                    ],
                    quickbars_insert_toolbar: 'quickimage quicktable codesample', // 插入菜单
                    quickbars_selection_toolbar: 'bold italic underline | blockquote quicklink | fontsizeselect', // 选中后菜单
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
                    // plugins,
                    // menubar,
                    // toolbar,
                    toolbar_sticky: true,
                    branding: false,
                    fontsize_formats: fontsizeFormats,
                    content_style: `
                    * { font-family: 'Spectral', serif }
                    .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before { font-size: 18px; font-family: 'Spectral', serif !important; }
                    `,
                    placeholder: '输入正文 ...',
                    // automatic_uploads: false,
                    // upload_images: () => console.log('dddd'),
                    // file_picker_callback: () => console.log('dddsssd'),
                    // images_upload_url: 'postAcceptor',
                    images_upload_handler: this.uploadHandler
                }}
                onEditorChange={this.onEditorChange}
                onInit={this.onInit}
            />
        </>;
    }
}
