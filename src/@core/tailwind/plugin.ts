import plugin from 'tailwindcss/plugin'

module.exports = plugin(function () {}, {
  theme: {
    borderColor: ({ theme }) => ({
      ...theme('colors'),
      DEFAULT: 'var(--border-color, currentColor)'
    }),
    borderRadius: {
      none: '0px',
      xs: 'var(--mui-shape-customBorderRadius-xs)',
      sm: 'var(--mui-shape-customBorderRadius-sm)',
      DEFAULT: '0.375rem',
      md: 'var(--mui-shape-customBorderRadius-md)',
      lg: 'var(--mui-shape-customBorderRadius-lg)',
      xl: 'var(--mui-shape-customBorderRadius-xl)',
      '2xl': '0.75rem',
      '3xl': '1rem',
      '4xl': '1.5rem',
      full: '9999px'
    },
    screens: {
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1536px',
      '2xl': '1920px'
    },
    extend: {
      boxShadow: {
        xs: 'var(--mui-customShadows-xs)',
        sm: 'var(--mui-customShadows-sm)',
        DEFAULT: 'var(--mui-customShadows-md)',
        md: 'var(--mui-customShadows-md)',
        lg: 'var(--mui-customShadows-lg)',
        xl: 'var(--mui-customShadows-xl)'
      },
      colors: {
        primary: 'var(--primary-color)',
        primaryLight: 'var(--mui-palette-primary-lightOpacity)',
        primaryDark: 'var(--mui-palette-primary-dark)',
        secondary: 'var(--mui-palette-secondary-main)',
        error: 'var(--mui-palette-error-main)',
        errorLight: 'var(--mui-palette-error-lightOpacity)',
        warning: 'var(--mui-palette-warning-main)',
        info: 'var(--mui-palette-info-main)',
        success: 'var(--mui-palette-success-main)',
        successLight: 'var(--mui-palette-success-lightOpacity)',
        textPrimary: 'var(--mui-palette-text-primary)',
        textSecondary: 'var(--mui-palette-text-secondary)',
        textDisabled: 'var(--mui-palette-text-disabled)',
        actionActive: 'var(--mui-palette-action-active)',
        actionHover: 'var(--mui-palette-action-hover)',
        actionSelected: 'var(--mui-palette-action-selected)',
        actionFocus: 'var(--mui-palette-action-focus)',
        backgroundPaper: 'var(--mui-palette-background-paper)',
        backgroundDefault: 'var(--mui-palette-background-default)',
        track: 'var(--mui-palette-customColors-trackBg)',
        backdrop: 'var(--backdrop-color)',
        facebook: '#497CE2',
        twitter: '#1DA1F2',
        googlePlus: '#DB4437'
      },
      zIndex: {
        header: 'var(--header-z-index)',
        footer: 'var(--footer-z-index)',
        customizer: 'var(--customizer-z-index)',
        search: 'var(--search-z-index)',
        drawer: 'var(--drawer-z-index)'
      }
    }
  }
})
