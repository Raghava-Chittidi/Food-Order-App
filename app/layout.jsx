"use client";
import NavBar from "@/components/NavBar/NavBar";
import "./globals.css";
import { Provider } from "react-redux";
import store from "@/store";

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en" className="bg-white">
        <body suppressHydrationWarning={true}>
          <NavBar>{children}</NavBar>
          <div id="backdrop" />
          <div id="modal" />
        </body>
      </html>
    </Provider>
  );
}
