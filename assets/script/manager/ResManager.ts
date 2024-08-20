export default class ResManager {
    private static instance: ResManager;

    public static get Instance(): ResManager {
        if (!ResManager.instance) {
            ResManager.instance = new ResManager();
        }
        return ResManager.instance;
    }

    public loadRes<T extends cc.Asset>(url: string, type: { prototype: T }): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            cc.resources.load(url, type, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    public loadDir<T extends cc.Asset>(url: string, type: { prototype: T }): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            cc.resources.loadDir(url, type, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }
}