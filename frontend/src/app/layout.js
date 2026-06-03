import "./globals.css";

export const metadata = {
  title: "Gym Meliora — Elevate Beyond Limits",
  description: "Luxury performance gym with elite coaching, world-class equipment, and a state-of-the-art recovery suite. Located atBowery, New York.",
  metadataBase: new URL("https://meliora-elevate-pulse.lovable.app"),
  openGraph: {
    title: "Gym Meliora — Elevate Beyond Limits",
    description: "Luxury performance gym with elite strength, boxing, MMA, BJJ, and recovery contrast therapy suites.",
    siteName: "Gym Meliora",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1600",
        width: 1600,
        height: 1000,
        alt: "Gym Meliora Luxury Strength Forge",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body>
        {children}
      </body>
    </html>
  );
}
