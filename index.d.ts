declare module '*.jpg' {
    const value: string;
    export default value;
}

declare module '*.mp3' {
    const value: string;
    export default value;
}

declare module 'headbreaker';

declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
    }
}
