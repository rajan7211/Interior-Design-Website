export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',

  database: {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'aurelle_interiors',
    url: process.env.DATABASE_URL,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    synchronize: process.env.DB_SYNCHRONIZE !== 'false',
    autoLoadEntities: true,
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'aurelle_luxury_super_secret_jwt_key_2026',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  },

  mail: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.MAIL_FROM || 'concierge@aurelleinteriors.com',
    alertRecipient: process.env.ALERT_EMAIL || 'admin@aurelleinteriors.com',
  },

  defaultAdmin: {
    email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@aurelleinteriors.com',
    password: process.env.DEFAULT_ADMIN_PASSWORD || 'aurelle2026',
    name: process.env.DEFAULT_ADMIN_NAME || 'Aurelle Executive Director',
  },
});

