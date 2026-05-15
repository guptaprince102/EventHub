import {Locator, Page} from "@playwright/test";

export class MyBookingPage{
    page : Page;
    bookingRef : Locator;
    bookingCards : Locator;
    bookingRef1 : Locator;

    constructor(page : Page){
        this.page = page;
        this.bookingRef = page.locator('.booking-ref');
        this.bookingCards = page.locator('#booking-card');
        this.bookingRef1 = this.bookingCards.locator('.booking-ref');

    }
    async isBookingsVisible(){
        return this.bookingCards.first().isVisible();
    }

    async isMyEventBooked(eventId : string){
        await this.bookingCards.first().waitFor();
        let isMyEventBooked = false;
        for(let i=0; i < await this.bookingCards.count(); i++){
            
            if((await this.bookingRef1.nth(i).textContent())?.includes(eventId)){
                isMyEventBooked = true;
            }
            
        }
        
        return isMyEventBooked;
    }

   
   


    
   
    

    
}