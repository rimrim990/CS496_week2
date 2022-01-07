const app = require('./src/app');
const database = require('./src/lib/database');

require('dotenv').config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`app running at port ${PORT}`);
});
