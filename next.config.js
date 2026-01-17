/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    'antd',
    '@ant-design/icons',
    '@ant-design/icons-svg',
    '@ant-design/colors',
    '@ant-design/cssinjs',
    '@ant-design/react-slick',
    '@rc-component/trigger',
    '@rc-component/tour',
    '@rc-component/portal',
    '@rc-component/context',
    'rc-util',
    'rc-pagination',
    'rc-picker',
    'rc-notification',
    'rc-tooltip',
    'rc-tree',
    'rc-table',
    'rc-input',
    'rc-input-number',
    'rc-textarea',
    'rc-select',
    'rc-menu',
    'rc-motion',
    'rc-field-form',
    'rc-checkbox',
    'rc-drawer',
    'rc-dialog',
    'rc-dropdown',
    'rc-tabs',
    'rc-overflow',
    'rc-resize-observer',
    'rc-virtual-list',
  ],
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig

