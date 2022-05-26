import { createStitches } from '@stitches/react';
import type * as Stitches from '@stitches/react';

export const { globalCss, styled, getCssText, createTheme } = createStitches({
	theme: {
		colors: {
			gray400: 'gainsboro',
			gray500: 'lightgray',
			purple400: 'blueviolet',
			purple500: 'darkviolet',
			red400: 'tomato',
			red500: '#cc0000',

			primary: '$purple400',
			primaryDark: '$purple500',
		},
		space: {
			1: '1rem',
			2: '2rem',
		},
		fontSizes: {},
	},
	utils: {
		px: (value: Stitches.ScaleValue<'space'>) => ({
			paddingLeft: value,
			paddingRight: value,
		}),
	},
	media: {
		sm: '(min-width: 640px)',
		md: '(min-width: 768px)',
		lg: '(min-width: 1024px)',
	},
});

export const globalStyles = globalCss({
	'html, body': {
		padding: 0,
		margin: 0,
		fontFamily:
			'-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
	},
	a: {
		color: 'inherit',
		textDecoration: 'none',
	},
	'*': {
		boxSizing: 'border-box',
	},
});

export const Container = styled('div', {
	padding: '0 $2',
});

export const Box = styled('div');

export const Banner = styled('div', {
	width: '100vw',
	height: 300,
	position: 'relative',
});

const Button = styled('button', {
	// Mini reset
	appearance: 'none',
	border: 'none',
	backgroundColor: 'transparent',
	lineHeight: 1,
	borderRadius: '99999px',
	px: '$1',

	variants: {
		size: {
			1: {
				fontSize: '13px',
				height: '25px',
			},
			2: {
				fontSize: '15px',
				height: '35px',
			},
		},
		variant: {
			gray: {
				backgroundColor: '$gray400',
				'&:hover': {
					backgroundColor: '$gray500',
				},
			},
			primary: {
				backgroundColor: '$primary',
				color: 'white',
				'&:hover': {
					backgroundColor: '$primaryDark',
				},
			},
		},
		outlined: {
			true: {
				$$shadowColor: 'transparent',
				backgroundColor: 'transparent',
				boxShadow: '0 0 0 1px $$shadowColor',
			},
		},
	},

	defaultVariants: {
		variant: 'gray',
		size: 1,
	},

	compoundVariants: [
		{
			variant: 'gray',
			outlined: true,
			css: {
				$$shadowColor: '$colors$gray400',
			},
		},
		{
			variant: 'primary',
			outlined: true,
			css: {
				$$shadowColor: '$colors$primary',
				color: '$primary',
				'&:hover': {
					color: 'white',
				},
			},
		},
	],
});

const newTheme = createTheme({
	colors: {
		primary: '$red400',
		primaryDark: '$red500',
	},
});
