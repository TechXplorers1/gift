import { SVGProps } from "react";

export function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...props}
    >
      <g fill="hsl(var(--primary))">
        {/* House shape */}
        <path d="M50 15 L90 45 L90 85 L10 85 L10 45 Z" fill="#2A4494"/>
        
        {/* Car shape */}
        <path d="M20 70 L30 60 H70 L80 70 L80 80 H20Z" fill="#224870" />
        <circle cx="35" cy="85" r="5" fill="hsl(var(--primary-foreground))"/>
        <circle cx="65" cy="85" r="5" fill="hsl(var(--primary-foreground))"/>
        
        {/* Sparkle */}
        <g fill="#4EA5D9">
          <path d="M50 5 L55 25 L75 30 L55 35 L50 55 L45 35 L25 30 L45 25 Z" />
        </g>
      </g>
    </svg>
  );
}
