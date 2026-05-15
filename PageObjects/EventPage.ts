import {Locator, Page} from "@playwright/test";

export class EventPage{
    page : Page;
    eventCard : Locator;


    constructor(page : Page){
        this.page = page;
        this.eventCard = page.getByTestId('event-card');
        
        
    }
    async isEventsLoaded(){
        return await this.eventCard.first().isVisible();
    }

    async getAllEvents(){
        await this.eventCard.first().waitFor();
        return this.eventCard;
    }
    

    
}