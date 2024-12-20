/** @type {import('tailwindcss').Config} */
export default {
 
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#3B82F6',
            dark: '#1E40AF',
          },
          secondary: {
            DEFAULT: '#FBBF24',
          }
        }
      },
    },
    plugins: [],
  
}