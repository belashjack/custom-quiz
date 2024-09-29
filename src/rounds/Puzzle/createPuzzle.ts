/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as headbreaker from 'headbreaker';

const createPuzzle = (
    puzzleElement: HTMLDivElement | null,
    initialSize: number,
    image: HTMLImageElement,
    onSolved: () => void,
    shouldShuffle: boolean,
    isEasyGame: boolean
) => {
    const rowCount = 4;
    const canvas = new headbreaker.Canvas(puzzleElement?.id, {
        width: initialSize,
        height: initialSize,
        pieceSize: 95,
        proximity: 15,
        strokeWidth: 2,
        image,
        preventOffstageDrag: true,
        fixed: true,
        outline: new headbreaker.outline.Rounded(),
        painter: new headbreaker.painters.Konva(),
    });

    canvas.adjustImagesToPuzzleWidth();
    canvas.autogenerate({
        horizontalPiecesCount: rowCount,
        verticalPiecesCount: rowCount,
        insertsGenerator: headbreaker.generators.random,
    });

    if (shouldShuffle) {
        if (isEasyGame) {
            canvas.puzzle.pieces[rowCount * rowCount - 1].translate(25, 25);
        } else {
            canvas.shuffleGrid();
        }
    }

    canvas.attachSolvedValidator();
    // @ts-expect-error: library is not typed
    canvas.onConnect((_piece, figure, _target, targetFigure) => {
        figure.shape.stroke('yellow');
        targetFigure.shape.stroke('yellow');
        canvas.redraw();

        setTimeout(() => {
            figure.shape.stroke('black');
            targetFigure.shape.stroke('black');
            canvas.redraw();
        }, 100);
    });

    canvas.onValid(() => {
        onSolved();
    });

    canvas.draw();

    const resizeCanvas = () => {
        const container = puzzleElement?.parentElement;

        if (!container) return;

        const styles = window.getComputedStyle(container);
        const paddingLeft = parseFloat(styles.paddingLeft);
        const paddingRight = parseFloat(styles.paddingRight);
        const widthWithoutPadding = container.clientWidth - paddingLeft - paddingRight;

        if (widthWithoutPadding < initialSize) {
            canvas.resize(widthWithoutPadding, widthWithoutPadding);
            canvas.scale(widthWithoutPadding / initialSize);
        } else {
            canvas.resize(initialSize, initialSize);
            canvas.scale(1);
        }

        canvas.redraw();
    };

    return { resizeCanvas };
};

export default createPuzzle;
