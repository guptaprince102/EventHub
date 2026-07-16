import fs from 'fs';

export class DataProvider {

    static getTestDataFromJson(filePath:string) {
        let data: any = JSON.parse(fs.readFileSync(filePath,'utf8'));
        return data;
    }

}