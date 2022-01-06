const app = require('./app');

const port = 443;

app.listen(port, () => {
	console.log(`app running at port ${port}`);
});
