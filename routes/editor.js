import EditorPage from '@components/Editor';

export default async function action () {
    return {
        title: 'editor',
        chunks: ['editor'],
        component: EditorPage
    };
}
