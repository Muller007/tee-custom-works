import './globals.css'

export const metadata = {
  title: 'Tee Custom Works - Premium Kitchens & Wardrobes',
  description: 'Bespoke custom kitchens, wardrobes, and built-ins crafted with timeless design and attention to detail.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
