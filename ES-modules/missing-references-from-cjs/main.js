import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// use require() to import functionality coming from CommonJS modules
const require = createRequire(import.meta.url);

// another way to import from commonjs
import packageMain from 'commonjs-package'; // Works
import { method } from 'commonjs-package'; // Errors

// it is not possible to import ES modules from CommonJS modules
