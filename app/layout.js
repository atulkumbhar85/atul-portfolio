// app/layout.js
import Navbar from './components/Navbar';
import './globals.css';

export const metadata = {
  title: 'Atul Kumbhar Portfolio',
  description: 'Professional portfolio of Atul Kumbhar',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
