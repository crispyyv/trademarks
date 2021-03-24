import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { AppProps } from "next/app";
import React from "react";
import { Fonts } from "../components/chakra/Fonts";
import { TMContext, useCurrentTM } from "../utils/TrademarksContext";
// This is the default breakpoint
const breakpoints = createBreakpoints({
  sm: "20em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
});

const theme = extendTheme({
  fonts: {
    body: "Helvetica, Arial",
    heading: "Stem, sans-serif, serif",
    mono: "Menlo, monospace",
  },
  breakpoints,
});

function App({ Component, pageProps }: AppProps): React.ReactNode {
  const { trademark, setTM } = useCurrentTM();
  return (
    <TMContext.Provider value={{ trademark, setTM }}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Fonts />
        <Component {...pageProps} />
      </ChakraProvider>
    </TMContext.Provider>
  );
}

export default App;
