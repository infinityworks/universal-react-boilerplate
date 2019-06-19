import path from 'path';
import fs from 'fs';
import { config } from 'dotenv';

const filePath = path.resolve(process.cwd(), '.env');
if (!fs.existsSync(filePath)) {
  throw new Error(`.env file could not be found at path ${filePath}`);
}
config({ path: filePath });
