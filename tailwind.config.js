module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
              "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
              "gradient-conic":
                "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
              sky: "#C3EBFA",
              skyLight: "#EDF9FD",
              purple: "#CFCEFF",
              purpleLight: "#F1F0FF",
              yellow: "#FAE27C",
              yellowLight: "#FEFCE8",
            },
          },
    },
    plugins: [require('@tailwindcss/forms')],
}
