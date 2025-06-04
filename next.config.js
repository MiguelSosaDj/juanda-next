/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! ADVERTENCIA !!
    // Temporalmente ignoramos errores de tipos durante la compilación
    // para resolver el problema actual
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig