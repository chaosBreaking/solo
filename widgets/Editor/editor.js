import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const plugins = 'formatpainter print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons';
const toolbar = 'undo redo | bold italic underline strikethrough formatpainter | fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat pagebreak | charmap emoticons image media | save print link anchor codesample insertfile template | fullscreen code preview';
// 'code codesample undo redo restoredraft | cut copy paste pastetext | forecolor backcolor searchreplace bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | bullist numlist | formatselect fontselect fontsizeselect | blockquote subscript superscript removeformat | table image media charmap emoticons hr pagebreak insertdatetime print preview',
const menubar = false;
const fontsizeFormats = '18px 20px 24px';
// 'file edit view insert format tools table help';
const fontFamily = "'Spectral', Serif;";
const DEFAULT_CONTENT = '';

class App extends React.Component {
    state = { mounted: false };
    get handleEditorChange() {
        return this.props.handleEditorChange || (() => { });
    }

    onEditorChange = (content, editor) => {
        this.handleEditorChange(content);
    }

    onInit = (event, editor) => {
        // typeof this.props.mountEditor === 'function' && this.props.mountEditor(editor);
        typeof this.props.onInit === 'function' && this.props.onInit(editor);
        this.setState({ mounted: true });
    }

    render() {
        const { LoadingUI, initialContent = DEFAULT_CONTENT, content } = this.props;
        return <>
            {!this.state.mounted && <LoadingUI />}
            <Editor
                tinymceScriptSrc='/tinymce.min.js'
                initialValue={initialContent}
                value={content}
                // skin='dark'
                outputFormat='html'
                apiKey="yhv7e7rccduf41j39x83x364fdzt91183p8v3thgkw4zm9iw"
                init={{
                    plugins: [
                        'autolink',
                        'codesample',
                        'link',
                        'lists',
                        'media',
                        'powerpaste',
                        'table',
                        'quickimage',
                        'quickbars',
                        'codesample',
                        'help'
                    ],
                    quickbars_insert_toolbar: 'quickimage media quicktable codesample', // 插入菜单
                    quickbars_selection_toolbar: 'bold italic underline | fontsizeselect | blockquote quicklink', // 选中后菜单
                    contextmenu: 'undo redo | inserttable | cell row column deletetable', // 右键context菜单
                    powerpaste_word_import: 'clean',
                    powerpaste_html_import: 'clean',
                    toolbar: false,
                    menubar: false,
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
                }}
                onEditorChange={this.onEditorChange}
                onInit={this.onInit}
            />
        </>;
    }
}

export default App;
