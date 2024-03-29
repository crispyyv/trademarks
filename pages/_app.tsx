import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import React from "react";
import { Fonts } from "../components/chakra/Fonts";
import { TMContext, useCurrentTM } from "../utils/TrademarksContext";
// This is the default breakpoint

NProgress.configure({
  minimum: 0.1,
  easing: "ease",
  speed: 800,
  showSpinner: false,
});

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

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
