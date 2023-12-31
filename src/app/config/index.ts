import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });


export default {
  database_url: process.env.MONGODB_URI,
  port:process.env.PORT,
  node_env:process.env.NODE_ENV
};