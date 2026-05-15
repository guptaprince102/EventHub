import {Locator, Page} from "@playwright/test";

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
        await this.description.fill("Test Description");
        await this.city.fill("Delhi");
        await this.venue.fill("Delhi");
        await this.eventSlot.fill('2027-12-31T10:00');
        await this.price.fill('10');
        await this.totalSeats.fill('50');
        await this.submit.click();

    }
   

   
}