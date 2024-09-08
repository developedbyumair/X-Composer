import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,css}'],
  corePlugins: {
    preflight: false
  },
  important: '#__next',
  plugins: [require('tailwindcss-logical'), require('./src/@core/tailwind/plugin')],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient':
          'radial-gradient(88.57% 88.57% at 50% 50%, rgba(0, 126, 187, 0.09) 0%, rgba(37, 37, 37, 0.3) 100%)'
      }
    }
  }
}

export default config
