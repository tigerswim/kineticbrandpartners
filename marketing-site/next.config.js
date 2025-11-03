/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  webpack: (config) => {
    // Use native file watching on macOS (more memory-efficient than polling)
    config.watchOptions = {
      ignored: ['**/node_modules', '**/.git', '**/.next', '**/out'],
    }
    return config
  }
}

module.exports = nextConfig
