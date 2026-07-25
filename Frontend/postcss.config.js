export default {
    content: [
        "./src/**/*.{html,js,jsx}",
    ],
    theme: {
        extend: {
            screens: {
                '1000px': '1050px',
                '1100px': '1110px',
                '800px': '800px',
                '1300px': '1300px',
                '400px': '400px',
            },
        },
        fontFamily: {
            Roboto: ['Roboto', 'sans-serif'],
            Poppins: ['Poppins', 'sans-serif'],
        },
    },
    plugins: {
        "@tailwindcss/postcss": {},
    }
}