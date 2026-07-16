import fs from 'fs';

export class DataProvider{
    static getDataFromJSON(filePath:string){

        let data:string = JSON.parse(fs.readFileSync(filePath,'utf8'));
        return data;

    }

}