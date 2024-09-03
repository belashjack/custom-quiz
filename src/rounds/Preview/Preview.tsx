import { FC } from 'react';
import RoundWrapper from '../RoundWrapper';
import { PreviewRound } from '../types';

const Preview: FC<PreviewRound> = (props) => {
    const { content } = props;

    return <RoundWrapper description={content.description} canHaveNextRoundButton />;
};

export default Preview;
