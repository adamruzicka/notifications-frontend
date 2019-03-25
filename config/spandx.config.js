/*global module, process*/

const localhost = (process.env.PLATFORM === 'linux') ? 'localhost' : 'host.docker.internal';

module.exports = {
    routes: {
        '/apps/webhooks': { host: `http://${localhost}:8002` },
        '/insights/webhooks': { host: `http://${localhost}:8002` },
        '/api/webhooks': { host: `http://${localhost}:3000` }
    }
};
