/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        IMAGE_CLASSIFICATION_URL: process.env.NEXT_PUBLIC_IMAGE_CLASSIFICATION_URL, 
        INFER_CLASSES_URL: process.env.NEXT_PUBLIC_INFER_CLASSES_URL,
    },
    webpack: (config) => {
        config.module.rules.push({
          test: /\.(ogg|mp3|wav|mpe?g)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[path][name].[ext]',
              },
            },
          ],
        });
        return config;
    },
    
    
}

module.exports = nextConfig
