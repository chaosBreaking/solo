import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import TagInput from './TagInput';
import Previewer from './Previewer';
import Cover from './Cover';
import IntroCard from './IntroCard';
import { forward } from '@utils/navi';

import s from './index.scss';

function LeftBar(props) {
    useStyles(s);
    return (
        <div className={s.container}>
            {/* <Previewer /> */}
            <Cover />
            <IntroCard />
            <TagInput />
        </div>
    );
};

export default LeftBar;
