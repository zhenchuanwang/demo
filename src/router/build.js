/**
 * Created by henian.xu on 2018/7/15.
 * 实现自动生成 router 配置
 */

class BuildRouter {
    constructor() {
        this.dirs = [];
    }

    addDir(path) {
        this.dirs.push(path);
    }

    parsePath(path) {
        const arr = /(\.*)(.*\/)*([^.]+)(.*)/gi.exec(path);
        arr.splice(0, 2);
        return {
            path: arr[0],
            name: arr[1],
            extension: arr[2],
        };
    }

    getPath(file) {
        const path = file.path.replace(/[/\\]_/gi, '/:');
        return path;
    }

    getName(file) {
        const name = file.name.replace(/^_/, ':');
        return name;
    }

    getPages() {
        const res = [];
        const map = {};
        this.dirs.forEach(dir => {
            dir.keys().forEach(fileName => {
                const component = dir(fileName).default;
                // const component = fileName;
                const file = this.parsePath(fileName);
                const path = this.getPath(file);
                const name = this.getName(file);
                const obj = {
                    path: path + name,
                    name: path + name,
                    component,
                };
                const key = path.replace(/\/$/, '');
                const mapItem = map[key];
                if (mapItem) {
                    mapItem.children = mapItem.children || [];
                    if (/^:/.test(name)) {
                        mapItem.children.push(obj);
                    } else {
                        mapItem.children.unshift(obj);
                    }
                } else {
                    res.push(obj);
                }
                map[path + name] = obj;
            });
        });
        // console.log(map);
        // console.log(JSON.stringify(res));
        return res;
    }

    build() {
        return this.getPages();
    }
}

export default new BuildRouter();
export { BuildRouter };
