// app/layout.js
import './globals.css';

export const metadata = {
  title: 'Atul Kumbhar Portfolio',
  description: 'Professional animated portfolio of Atul Kumbhar with 3D elements',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-hidden">
        {children}
      </body>
    </html>
  );
}
