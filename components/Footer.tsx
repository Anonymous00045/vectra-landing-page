'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

// Alias icons to match the requested code structure
const FacebookIcon = Facebook;
const InstagramIcon = Instagram;
const LinkedinIcon = Linkedin;
const YoutubeIcon = Youtube;

const VectraLogo = ({ className = "w-10 h-10" }: { className?: string }) => {
  return (
    <div className={`${className} bg-zinc-800 text-zinc-400 rounded-xl flex items-center justify-center shadow-sm select-none`} aria-hidden="true">
      <svg width="70%" height="70%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M5 6L12 20" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeDasharray="3 3" 
        />
        <path 
          d="M12 20L19 6" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
        />
        <circle cx="5" cy="6" r="1.5" fill="currentColor" />
        <circle cx="19" cy="6" r="1.5" fill="currentColor" />
        <rect x="10.5" y="18.5" width="3" height="3" fill="currentColor" />
      </svg>
    </div>
  );
};

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Follow Us',
		links: [
			{ title: 'Facebook', href: '#', icon: FacebookIcon },
			{ title: 'Instagram', href: '#', icon: InstagramIcon },
			{ title: 'Youtube', href: '#', icon: YoutubeIcon },
			{ title: 'LinkedIn', href: 'https://www.linkedin.com/company/open-design-labs/', icon: LinkedinIcon },
		],
	},
];

export function Footer() {
	return (
		<footer className="relative w-full border-t border-zinc-900 bg-zinc-950 text-zinc-200 z-10">
			<div className="absolute inset-0 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.zinc.800/50%),transparent)] pointer-events-none" />
			<div className="bg-indigo-500/10 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[2px]" />

			<div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-16 flex flex-col md:flex-row w-full justify-between items-center gap-8">
				<AnimatedContainer className="flex flex-col items-center md:items-start text-center md:text-left">
					<div className="flex items-center gap-3 mb-4">
                        <VectraLogo className="w-8 h-8" />
                        <span className="font-medium text-xl tracking-tight text-zinc-100">Vectra</span>
                    </div>
					<p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
						Build fully functional React websites visually. <br className="hidden md:block"/>Designed for the future of development.
					</p>
                    <p className="text-zinc-500 text-xs mt-4">
						© {new Date().getFullYear()} Vectra Labs. All rights reserved.
					</p>
				</AnimatedContainer>

				<AnimatedContainer delay={0.2} className="flex flex-col items-center md:items-end">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4">Follow Us</h3>
                    <div className="flex gap-4">
                        {footerLinks[0].links.map((link) => (
                            <a
                                key={link.title}
                                href={link.href}
                                target={link.href.startsWith('http') ? "_blank" : undefined}
                                rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                                className="text-zinc-400 hover:text-indigo-300 hover:bg-zinc-800 p-2 rounded-full transition-all duration-300 border border-transparent hover:border-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                                aria-label={link.title}
                            >
                                {link.icon && <link.icon className="size-5" />}
                            </a>
                        ))}
                    </div>
                    <div className="flex gap-6 mt-6 text-xs text-zinc-500">
                        <a href="/privacy" className="hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded">Privacy</a>
                        <a href="/terms" className="hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded">Terms</a>
                        <a href="/brand" className="hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded">Brand</a>
                    </div>
				</AnimatedContainer>
			</div>
		</footer>
	);
};

type ViewAnimationProps = React.PropsWithChildren<{
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
}>;

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
};