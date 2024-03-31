import { AxiosInterceptor } from "@/libs/config/axios";
import AuthProvider from "@/libs/context/AuthContext";
import { QueryClientProvider, ThemeProvider } from "@/libs/provider";
import type { Metadata } from "next";
import { RouteChangesProvider } from "nextjs-router-events";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <ThemeProvider options={{ key: "mui" }}>
          <AuthProvider>
            <RouteChangesProvider>
              <AxiosInterceptor>
                <ToastContainer />
                <QueryClientProvider>{children}</QueryClientProvider>
              </AxiosInterceptor>
            </RouteChangesProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
