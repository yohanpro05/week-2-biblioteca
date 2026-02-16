/// <reference types="vite/client" />

declare module '*.css' {
  const content: string;
  export default content;
}

// Opcional: si usas CSS modules en algún momento (*.module.css)
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}