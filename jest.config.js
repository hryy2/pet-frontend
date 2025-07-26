module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    // 样式类文件 mock 掉
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // 图片等资源 mock 掉
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    // Swiper 等 ESM 模块处理
    '^swiper/react$': require.resolve('swiper/react'),
    '^swiper/css$': 'identity-obj-proxy',
    '^swiper/css/navigation$': 'identity-obj-proxy',
    '^swiper/modules$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(swiper|axios|ssr-window|dom7)/)', // 确保swiper、axios等包被转译
  ],
};
