/*global module, process*/

const localhost = (process.env.PLATFORM === 'linux') ? 'localhost' : 'host.docker.internal';

module.exports = {
    routes: {
        '/apps/hooks': { host: `http://${localhost}:8002` },
        '/insights/settings/hooks': { host: `http://${localhost}:8002` },
        '/api/hooks': { host: `http://${localhost}:3000` }
    }
};
