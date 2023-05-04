import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider, Global } from "@emotion/react";
import { Toaster } from "react-hot-toast";
import { useSettings } from "../store/settings";
import { themes } from "../themes";
import { MantineProvider } from "@mantine/core";

export const queryClient = new QueryClient();
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const GlobalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const settings = useSettings();

  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
        <ThemeProvider
          // @ts-ignore
          theme={themes[settings.themeId].theme}
        >
          <Global
            styles={(p) => ({
              body: {
                background: p.background,
                color: p.textPrimary,
              },
              "#nprogress .bar": {
                background: `${p.primary} !important`,
              },

              "#nprogress .spinner-icon": {
                borderTopColor: p.primary,
                borderLeftColor: p.primary,
              },
            })}
          />
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
};
