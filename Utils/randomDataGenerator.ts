import { faker } from "@faker-js/faker";
import { stringify } from "node:querystring";

export class RandomDataUtil{

    static getRandomText(){
        return faker.lorem.text();
    }

    static getRandomLocation(){
       return faker.location.city();
    }

    static getRandomDateSlot(){
       return faker.date.future({refDate: '2027-12-31T10:00'});
    }

    static getRandomNumber(min:number, max:number, multipleOf:number){
       return faker.number.int({min:min, max:max, multipleOf:multipleOf});
    }

    static getRandomFullName(){
       return faker.person.fullName();
    }

    static getRandomEmail(allowSpecialCharacters:boolean){
       return faker.internet.email({allowSpecialCharacters: allowSpecialCharacters });
    }

    static getRandomPhoneNumber(style:any){
       return faker.phone.number({style:style});
        
    }
}