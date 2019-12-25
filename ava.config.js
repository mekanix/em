export default {
  babel: {
    testOptions: {
      presets: [
        '@babel/preset-react',
      ],
    },
  },
  register: ['babel-register'],
  require: ['esm'],
}
