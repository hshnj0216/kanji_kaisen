module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        '15xl': '15rem',
      },
      height: {
        '9/10': '90vh',
        '1/10': '10vh',
        'h-90': '22.5rem',
      },
      textWrap: {
        'balance': 'balance',
      }
    }
   
  },
  variants: {

  },
  plugins: [],
}
