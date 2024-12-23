import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'
import { error } from 'console'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      screens: {
        xxs: '380px',
        xs: '480px'
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        'marchent-primary': '#FFF0D9',
        'marchent-secondary': '#FFEEE2',
        muted: '#808080',
        error: '#BD4040',
        success: '#0FA35C'
      },
      backgroundColor: {
        primary: '#C7763E',
        'custom-offwhite': '#f1f1f1',
        'custom-orange': '#fff0d9',
        'custom-blue': '#15253B66',
        'custom-dark-blue': '#15253b'
      },
      borderColor: {
        primary: '#C7763E',
        error: '#BD4040'
      }
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['light']
  }
}
export default config
