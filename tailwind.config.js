module.exports = {
    purge: ["./src/renderer/**/*.jsx"],
    darkMode: "media",
    theme: {
        container: {
            center: true,
        },
        extend: {
            colors: {
                darkTheme: {
                    DEFAULT: "#ca484e",
                    second: "#deb755",
                },
                darkBase: {
                    DEFAULT: "#2e2e2e",
                    second: "#3e3e3e",
                },

                salmon: {
                    light: "#f6c8b8",
                    DEFAULT: "#f1a48e",
                    dark: "#e88367",
                },
                brick: {
                    DEFAULT: "#a63926",
                    dark: "#78291c",
                },
                blush: {
                    DEFAULT: "#ca484e",
                },
                graphite: {
                    DEFAULT: "#2e2e2e",
                },
                ash: {
                    DEFAULT: "#3e3e3e",
                },
                blonde: {
                    DEFAULT: "#deb755",
                },
            },
        },
    },
    variants: {},
    plugins: [require("@tailwindcss/forms")],
}
