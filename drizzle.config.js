import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './config/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_riO6PyLK4wuW@ep-mute-snowflake-a1zl7z15-pooler.ap-southeast-1.aws.neon.tech/DecoMint_App?sslmode=require&channel_binding=require",
  },
}); 
