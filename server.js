const {server} = require('./socket_app');
require('./express_app');

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});