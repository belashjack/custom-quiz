/* eslint-disable react/jsx-key */
import { Explanation } from './types';

export const CORRECT_EXPLANATION_ASSETS: Explanation['asset'][] = [
    <video autoPlay loop muted playsInline>
        <source src={new URL('./assets/correctAnswers/video1.webm', import.meta.url).href} type="video/webm" />
    </video>,
    <video autoPlay loop muted playsInline>
        <source src={new URL('./assets/correctAnswers/video2.webm', import.meta.url).href} type="video/webm" />
    </video>,
    <video autoPlay loop muted playsInline>
        <source src={new URL('./assets/correctAnswers/video3.webm', import.meta.url).href} type="video/webm" />
    </video>,
    <video autoPlay loop muted playsInline>
        <source src={new URL('./assets/correctAnswers/video4.webm', import.meta.url).href} type="video/webm" />
    </video>,
    <video autoPlay loop muted playsInline>
        <source src={new URL('./assets/correctAnswers/video5.webm', import.meta.url).href} type="video/webm" />
    </video>,
    <video autoPlay loop muted playsInline>
        <source src={new URL('./assets/correctAnswers/video6.webm', import.meta.url).href} type="video/webm" />
    </video>,
    <video autoPlay loop muted playsInline>
        <source src={new URL('./assets/correctAnswers/video7.webm', import.meta.url).href} type="video/webm" />
    </video>,
    <video autoPlay loop muted playsInline>
        <source src={new URL('./assets/correctAnswers/video8.webm', import.meta.url).href} type="video/webm" />
    </video>,
    <video autoPlay loop muted playsInline>
        <source src={new URL('./assets/correctAnswers/video9.webm', import.meta.url).href} type="video/webm" />
    </video>,
    <video autoPlay loop muted playsInline>
        <source src={new URL('./assets/correctAnswers/video10.webm', import.meta.url).href} type="video/webm" />
    </video>,
    <video autoPlay loop muted playsInline>
        <source src={new URL('./assets/correctAnswers/video11.webm', import.meta.url).href} type="video/webm" />
    </video>,
    <img src={new URL('./assets/correctAnswers/image1.webp', import.meta.url).href} />,
    <img src={new URL('./assets/correctAnswers/image2.webp', import.meta.url).href} />,
    <img src={new URL('./assets/correctAnswers/image3.webp', import.meta.url).href} />,
];

export const INCORRECT_EXPLANATION_ASSETS: Explanation['asset'][] = [
    <video autoPlay loop muted playsInline>
        <source src={new URL('./assets/incorrectAnswers/video1.webm', import.meta.url).href} type="video/webm" />
    </video>,
    <video autoPlay loop muted playsInline>
        <source src={new URL('./assets/incorrectAnswers/video2.webm', import.meta.url).href} type="video/webm" />
    </video>,
    <video autoPlay loop muted playsInline>
        <source src={new URL('./assets/incorrectAnswers/video3.webm', import.meta.url).href} type="video/webm" />
    </video>,
    <video autoPlay loop muted playsInline>
        <source src={new URL('./assets/incorrectAnswers/video4.webm', import.meta.url).href} type="video/webm" />
    </video>,
    <video autoPlay loop muted playsInline>
        <source src={new URL('./assets/incorrectAnswers/video5.webm', import.meta.url).href} type="video/webm" />
    </video>,
    <video autoPlay loop muted playsInline>
        <source src={new URL('./assets/incorrectAnswers/video6.webm', import.meta.url).href} type="video/webm" />
    </video>,
    <video autoPlay loop muted playsInline>
        <source src={new URL('./assets/incorrectAnswers/video7.webm', import.meta.url).href} type="video/webm" />
    </video>,
    <video autoPlay loop muted playsInline>
        <source src={new URL('./assets/incorrectAnswers/video8.webm', import.meta.url).href} type="video/webm" />
    </video>,
    <video autoPlay loop muted playsInline>
        <source src={new URL('./assets/incorrectAnswers/video9.webm', import.meta.url).href} type="video/webm" />
    </video>,
    <video autoPlay loop muted playsInline>
        <source src={new URL('./assets/incorrectAnswers/video10.webm', import.meta.url).href} type="video/webm" />
    </video>,
    <video autoPlay loop muted playsInline>
        <source src={new URL('./assets/incorrectAnswers/video11.webm', import.meta.url).href} type="video/webm" />
    </video>,
    <video autoPlay loop muted playsInline>
        <source src={new URL('./assets/incorrectAnswers/video12.webm', import.meta.url).href} type="video/webm" />
    </video>,
    <img src={new URL('./assets/incorrectAnswers/image1.webp', import.meta.url).href} />,
    <img src={new URL('./assets/incorrectAnswers/image2.webp', import.meta.url).href} />,
    <img src={new URL('./assets/incorrectAnswers/image3.webp', import.meta.url).href} />,
    <img src={new URL('./assets/incorrectAnswers/image4.webp', import.meta.url).href} />,
];

export const DEFAULT_TIMER_DURATION = 15000;
