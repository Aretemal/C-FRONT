/* eslint-disable eol-last */
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.webp';
declare module '*.css' {
    const content: Record<string, string>;
    export default content;
}
