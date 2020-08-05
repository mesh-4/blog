module.exports = {
  purge: ['./src/**/*.jsx'],
  target: 'relaxed',
  prefix: '',
  important: false,
  separator: ':',
  theme: {
    screens: {
      sm: '680px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    primary: 'var(--senlima-primary-color)',
    textColor: {
      primary: 'var(--senlima-text-color)',
      secondary: 'var(--senlima-text-secondary-color)',
    },
    borderColor: theme => ({
      ...theme('colors'),
      primary: 'var(--senlima-primary-color)',
    }),
    backgroundColor: theme => ({
      ...theme('colors'),
      dark: 'var(--senlima-dark-100)',
      dark1: 'var(--senlima-dark-200)',
      dark2: 'var(--senlima-dark-300)',
    }),
  },
  corePlugins: {},
  plugins: [],
}
