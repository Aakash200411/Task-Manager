require('dotenv').config();
console.log('Current working directory:', process.cwd());
console.log('Loaded environment variables:');
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('All env:', process.env); 