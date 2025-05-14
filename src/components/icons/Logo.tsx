import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      width="150"
      height="37.5"
      aria-label="Urban Armor Outfitters Logo"
      {...props}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--secondary))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <rect width="200" height="50" fill="transparent" />
      <text
        x="10"
        y="35"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="24"
        fontWeight="bold"
        fill="url(#logoGradient)"
        letterSpacing="-0.5"
      >
        URBAN ARMOR
      </text>
      <text
        x="100" 
        y="35"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="24"
        fontWeight="normal"
        fill="hsl(var(--foreground))"
        opacity="0.8"
        dx="2" 
      >
        OUTFITTERS
      </text>
       <path d="M5 5 L15 5 L10 15 Z M5 45 L15 45 L10 35 Z M185 5 L195 5 L190 15 Z M185 45 L195 45 L190 35 Z" fill="hsl(var(--accent))" opacity="0.6" />
    </svg>
  );
}
