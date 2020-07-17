import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { forward } from '@utils/navi';
import TagInput from './TagInput';
import Previewer from './Previewer';
import s from './index.scss';
import Cover from './Cover';
import IntroCard from './IntroCard';

function LeftBar (props) {
    return (
        <div className={s.container}>
            <Previewer />
            <Cover />
            <IntroCard />
            <TagInput />
        </div>
    );
};

export default withStyles(s)(LeftBar);
