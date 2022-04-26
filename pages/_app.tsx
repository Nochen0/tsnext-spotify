import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "../global-styles.css";
import AppLayout from "../components/Layout/AppLayout";
import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import store from "../store/store";

const theme = extendTheme({
  colors: {
    gray: {
      100: "#F5f5f5",
      200: "#E1E1E1",
      300: "#BDBDBD",
      400: "#B1B1B1",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
    green: {
      500: "#1EB954",
    },
  },
  components: {
    Button: {
      variants: {
        link: {
          ":focus": {
            outline: "none",
            boxShadow: "none",
          },
        },
      },
    },
  },
  fonts: {
    heading: "Montserrat",
    body: "Montserrat",
  },
});

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <ReduxProvider store={store}>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </ReduxProvider>
        </ChakraProvider>
      </SessionProvider>
  );
};

export default MyApp;
