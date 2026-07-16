import {Locator, Page} from "@playwright/test";
import {RandomDataUtil} from "../Utils/randomDataGenerator";

export class CreateEventPage{
    page : Page;
    title : Locator;
    description : Locator; 
    city : Locator;
    venue : Locator;
    eventSlot : Locator;
    price : Locator;
    totalSeats : Locator;
    submit : Locator;
    
    constructor(page : Page){
        this.page = page;
        this.title = page.locator('#event-title-input');
        this.description = page.getByPlaceholder('Describe the event…');
        this.city = page.locator('#city');
        this.venue = page.getByLabel('Venue');
        this.eventSlot = page.getByLabel('Event Date & Time');
        this.price = page.getByLabel('Price ($)');
        this.totalSeats = page.getByLabel('Total Seats');
        this.submit = page.locator('#add-event-btn');
    }
    async createEvent(eventTitle : string){
        await this.title.fill(eventTitle);
        await this.description.fill(RandomDataUtil.getRandomText());
        await this.city.fill(RandomDataUtil.getRandomLocation());
        await this.venue.fill(RandomDataUtil.getRandomLocation());
        await this.eventSlot.fill(RandomDataUtil.getRandomDateSlot().toISOString().slice(0,16));
        await this.price.fill(RandomDataUtil.getRandomNumber(10,50,10).toString());
        await this.totalSeats.fill(RandomDataUtil.getRandomNumber(10,50,10).toString());
        await this.submit.click();

    }
   

   
}