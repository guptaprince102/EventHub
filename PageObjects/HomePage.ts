import {Locator, Page} from "@playwright/test";

export class HomePage{
    page : Page;
    admin : Locator;
    eventManager : Locator;
    event : Locator;
    myBooking : Locator;
    
    

    constructor(page : Page){
        this.page = page;
        this.admin = page.getByText('Admin');
        this.eventManager = page.locator(`a[href="/admin/events"]`).first();
        this.event = page.locator('#nav-events');
        this.myBooking = page.getByTestId('nav-bookings');
    }
    async goToEventManager(){
        await this.admin.click();
        await this.eventManager.waitFor();
        await this.eventManager.click();
    }
    async goToEvents(){
        await this.event.click();
    }
     async goToMyBookings(){
        await this.myBooking.click();
    }

    
}