import { FC } from 'react';
import RoundWrapper from './RoundWrapper';
import { PreviewRound } from './types';

const Preview: FC<PreviewRound> = (props) => {
    const { content } = props;

    return (
        <RoundWrapper>
            <div className="round-description">{content.description}</div>
        </RoundWrapper>
    );
};

export default Preview;
