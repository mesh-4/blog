module.exports = {
  purge: [],
  target: 'relaxed',
  prefix: '',
  important: false,
  separator: ':',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    primary: 'var(--senlima-primary-color)',
    'text-primary': 'var(--senlima-text-color)',
    'text-secondary': 'var(--senlima-text-secondary-color)',
    borderColor: theme => ({
      ...theme('colors'),
      primary: 'var(--senlima-primary-color)',
    }),
    backgroundColor: theme => ({
      ...theme('colors'),
      primary: 'var(--senlima-primary-color)',
    }),
  },
  corePlugins: {},
  plugins: [],
}
