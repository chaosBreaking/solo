import path from 'path';
import HappyPack from 'happypack';
import os from 'os';

export const ROOT_DIR = path.resolve(__dirname, '..');
export const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);
export const SRC_DIR = resolvePath('src');
export const BUILD_DIR = resolvePath('build');

export const isDebug = !process.argv.includes('--release');
export const isVerbose = process.argv.includes('--verbose');
export const isAnalyze = process.argv.includes('--analyze') || process.argv.includes('--analyse');

export const reScript = /\.(js|jsx|mjs)$/;
export const reStyle = /\.(css|less|styl|scss|sass|sss)$/;
export const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;

export const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length - 1 || 1 });
export const staticAssetName = isDebug
    ? '[path][name].[ext]'
    : 'img/[name]-[hash:8].[ext]';

export const reNotIsomorphicStyle = [
    /node_modules/,
    resolvePath('utils')
];

export const reStyleModule = [
    /components|widgets/
];
