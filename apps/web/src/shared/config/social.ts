import { BiLogoGmail } from 'react-icons/bi';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';

export const SOCIAL_NAVIGATION = {
	LINKEDIN: 'https://www.linkedin.com/in/dgd03146/',
	GITHUB: 'https://github.com/dgd03146',
	// YOUTUBE: 'https://www.youtube.com/@ibory1220',
	EMAIL: 'mailto:ibory1220@gmail.com',
} as const;

export const SOCIAL_ICONS = {
	LINKEDIN: BsLinkedin,
	GITHUB: FaGithub,
	// YOUTUBE: FaYoutube,
	EMAIL: BiLogoGmail,
} as const;

export const SOCIAL_LABELS = {
	LINKEDIN: 'LinkedIn',
	GITHUB: 'GitHub',
	// YOUTUBE: 'YouTube',
	EMAIL: 'Email',
} as const;

export const SOCIAL_LINKS = Object.entries(SOCIAL_NAVIGATION).map(
	([key, value]) => ({
		href: value,
		icon: SOCIAL_ICONS[key as keyof typeof SOCIAL_ICONS],
		label: SOCIAL_LABELS[key as keyof typeof SOCIAL_LABELS],
	}),
);
