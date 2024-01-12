import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {
  &,&.light-mode {
  /* Grey */
  --color-white: #fff;
  --color-black: #000;

  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;

  --color-blue-100: #e0f2fe;
  --color-blue-200: #cfe6f5;
  --color-blue-300: #b1dbf8;
  --color-blue-400: #98d1f7;
  --color-blue-500: #88cffe;
  --color-blue-600: #6ec3fb;
  --color-blue-700: #50b8fd;
  --color-blue-800: #31adff;
  --color-blue-900: #189ef6;
  
  --color-green-100: #dcfce7;
  --color-green-200: #b4ebb4;
  --color-green-300: #99e699;
  --color-green-400: #87ec87;
  --color-green-500: #6ce86c;
  --color-green-600: #59e659;
  --color-green-700: #3de63d;
  --color-green-800: #1ee81e;
  --color-green-900: #00ec00;
  --color-yellow-100: #383624;
  --color-yellow-700: #f0ff2b;

  --color-star-bold: #f59e0b;
  --color-star-light: #ffbf00;

  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;

  --color-indigo-100: #e0e7ff;
  --color-indigo-700: #4338ca;


  --color-cream-100: #fff7ee;
  --color-cream-200: #ffefdd;
  --color-cream-300: #ffe7cb;
  --color-cream-400: #f8d9b4;
  --color-cream-500: #fbd7ac;
  
  --color-red-100: #fee2e2;
  --color-red-200: #fecaca;
  --color-red-200: #fca5a5;
  --color-red-200: #f87171;
  --color-red-500: #ef4444;
  --color-red-600: #dc2626;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;
  --color-red-900: #7f1d1d;
  
  --color-danger:  #b91c1c;
  --color-text: #1A2F36;
  --color-text-secondary: #768286;
  --color-primary: #1844a4;
  --color-primary-light: #d5e0fa;
  --color-text-sidebar: #8681a2;
  --color-background-sidebar: #edf1f8;

  --font-size-8: 0.8rem;
  --font-size-10: 1rem;
  --font-size-12: 1.2rem;
  --font-size-13: 1.3rem;
  --font-size-14: 1.4rem;
  --font-size-16: 1.6rem;
  --font-size-18: 1.8rem;
  --font-size-20: 2rem;
  --font-size-22: 2.2rem;
  --font-size-24: 2.4rem;
  --font-size-26: 2.6rem;
  --font-size-28: 2.8rem;
  --font-size-30: 3rem;

  --backdrop-color: rgba(255, 255, 255, 0.1);
  
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-large: 12px;
  --border-radius-xl: 16px;
  --border-radius-2xl: 20px;
  --border-radius-cyc: 50%;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
  --shadow-around: 0 1px 2px 0 rgba(60, 64, 67, 0.1), 0 2px 6px 2px rgba(60, 64, 67, 0.15);
  --shadow-around-dark: 0 2px 20px rgba(0,0,0,0.5);

    --image-grayscale: 0;
    --image-opacity: 100%;
  }
  
  &.dark-mode {
    --color-white: #18212f;
    --color-grey-50: #111827;
    --color-grey-100: #1f2937;
    --color-grey-200: #374151;
    --color-grey-300: #4b5563;
    --color-grey-400: #6b7280;
    --color-grey-500: #9ca3af;
    --color-grey-600: #d1d5db;
    --color-grey-700: #e5e7eb;
    --color-grey-800: #f3f4f6;
    --color-grey-900: #f9fafb;

    --color-blue-100: #075985;
    --color-blue-700: #e0f2fe;
    --color-green-100: #166534;
    --color-green-700: #dcfce7;
    --color-yellow-100: #854d0e;
    --color-yellow-700: #fef9c3;
    --color-silver-100: #374151;
    --color-silver-700: #f3f4f6;
    --color-indigo-100: #3730a3;
    --color-indigo-700: #e0e7ff;

    --color-red-100: #fee2e2;
    --color-red-500: #f14668;
    --color-red-700: #b91c1c;
    --color-red-800: #991b1b;

    --backdrop-color: rgba(0, 0, 0, 0.3);

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
    --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

    --image-grayscale: 10%;
    --image-opacity: 90%;
  }
  
  /* Indigo */
  --color-brand-50: #eef2ff;
  --color-brand-100: #e0e7ff;
  --color-brand-200: #c7d2fe;
  --color-brand-500: #6366f1;
  --color-brand-600: #4f46e5;
  --color-brand-700: #4338ca;
  --color-brand-800: #3730a3;
  --color-brand-900: #312e81;
  
  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;  
  line-height: 1;
  /* Creating animations for dark mode */
}

html {
  font-size: 62.5%;
  scroll-behavior: smooth;

  ::-webkit-scrollbar {
    width: 1rem;
    height: 5px;
    background-color: var(--color-grey-100); 
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey; 
    border-radius: 10px;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: var(--color-grey-400); 
    border-radius: 1rem;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-grey-800); 

  }
}



body {
  font-family: "Roboto", sans-serif;
  color: var(--color-text);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.4;
  font-size: 1.6rem;
}

main {
  background-color: var(--color-background-sidebar);

}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  border: none;
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 1;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
  line-height: 1.4;
}

img {
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}
`;

export default GlobalStyles;
