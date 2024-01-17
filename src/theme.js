 

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              dark: "#99EEFD",
              main: "#E0E0E0",
              light: "#00353F",
            },
            neutral: {
              dark: "#E0E0E0",
              main: "#C2C2C2",
              mediumMain: "#A3A3A3",
              medium: "#858585",
              light: "#333333",
            },
            background: {
              default: "#001519",
              alt: "#00353F",
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: "#006B7D",
              main: "#006B7D",
              light: "#E6FBFF",
            },
            neutral: {
              dark: "#006B7D",
              main: "#666666",
              mediumMain: "#858585",
              medium: "#A3A3A3",
              light: "#F0F0F0",
            },
            background: {
              default: "#F6F6F6",
              alt: "#FFFFFF",
            },
            
          }),
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 16,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 26,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      body1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 18,
      },
      body2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
    },
  };
};
