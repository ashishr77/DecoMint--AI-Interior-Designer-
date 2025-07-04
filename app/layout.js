import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Provider from "./provider";

export const metadata = {
  title: "DecoMint - AI Interior Designer",
  description: "Effortless Interior Designing at Your Fingertips!",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Provider>
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
