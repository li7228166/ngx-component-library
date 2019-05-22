const path = require('path');
const fs = require("fs");

const loopComponentConfig = function (dir) {
    fs.readdirSync(dir).forEach(function (filename) {
        const fileDir = path.join(dir, filename);
        if (fs.statSync(fileDir).isDirectory()) {
            route.children.push(getRouteConfig(fileDir));
        }
    });
    return route;
};

const buildComponentConfig = function () {
    const components = [];
    const dir = path.join(__dirname, '../components')
    fs.readdirSync(dir).forEach(function (filename) {
        const fileDir = path.join(dir, filename);
        if (fs.statSync(fileDir).isDirectory()) {
            components.push(require(path.join(fileDir, 'config.json')));
        }
    });
    fs.writeFileSync(path.join(dir, 'list.json'), JSON.stringify(components));
};

buildComponentConfig();