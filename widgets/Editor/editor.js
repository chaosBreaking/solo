import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const plugins = 'formatpainter print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons';
const toolbar = 'undo redo | bold italic underline strikethrough formatpainter | fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat pagebreak | charmap emoticons image media | save print link anchor codesample insertfile template | fullscreen code preview';
// 'code codesample undo redo restoredraft | cut copy paste pastetext | forecolor backcolor searchreplace bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | bullist numlist | formatselect fontselect fontsizeselect | blockquote subscript superscript removeformat | table image media charmap emoticons hr pagebreak insertdatetime print preview',
const menubar = false;
const fontsizeFormats = '12px 14px 16px 18px 24px 32px';
const initContent = '';
// 'file edit view insert format tools table help';
const fontFamily = "'Spectral', Serif;";

class App extends React.Component {
    handleEditorChange = (content, editor) => {
        console.log('Content was updated:', content);
    }

    componentDidMount () {
        // localize(window.tinymce);
    }

    render () {
        return (
            <Editor
                initialValue={initContent}
                skin='dark'
                apiKey="yhv7e7rccduf41j39x83x364fdzt91183p8v3thgkw4zm9iw"
                init={{
                    height: '90%',
                    // min_height: 800,
                    language: 'zh_CN',
                    plugins,
                    menubar,
                    toolbar,
                    toolbar_sticky: true,
                    branding: false,
                    fontsize_formats: fontsizeFormats,
                    content_style: `
                        * { font-family: 'Spectral', serif }
                        .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before { font-size: 18px; font-family: 'Spectral', serif !important; }
                        `,
                    placeholder: '输入正文 ...',
                }}
                onEditorChange={this.handleEditorChange}
            />
        );
    }
}

export default App;
