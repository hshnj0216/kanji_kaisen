/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        IMAGE_CLASSIFICATION_URL: process.env.NEXT_PUBLIC_IMAGE_CLASSIFICATION_URL, 
        INFER_CLASSES_URL: process.env.NEXT_PUBLIC_INFER_CLASSES_URL,
    }
}

module.exports = nextConfig
