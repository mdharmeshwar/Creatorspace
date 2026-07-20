export const APP_NAME = 'CreatorSpace';
export const APP_TAGLINE = 'Where ideas become stories.';

export const ANIMATION = {
  PAGE: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
  },
  CARD: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.97 },
    transition: { type: 'spring', stiffness: 220, damping: 26 },
  },
  STAGGER_CHILD: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
  },
};

export const CHAR_LIMITS = {
  TITLE: 80,
  DESCRIPTION: 500,
};

export const MAX_FILE_SIZE_MB = 10;
