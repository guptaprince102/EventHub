import {Locator, Page} from "@playwright/test";
import {RandomDataUtil} from "../Utils/randomDataGenerator";

export class BookingPage{
    page : Page;
    ticketCount : Locator;
    fullName : Locator;
    email : Locator;
    phoneNumber : Locator;
    confirmButton : Locator;
    bookingRef : Locator;
    


    constructor(page : Page){
        this.page = page;
        this.ticketCount = page.locator('#ticket-count');
        this.fullName = page.getByLabel('Full Name');
        this.email = page.getByLabel('Email');
        this.phoneNumber = page.getByLabel('Phone Number');
        this.confirmButton = page.locator('.confirm-booking-btn').first();
        this.bookingRef = page.locator('.booking-ref');

    }

    async getDefaultTicketCount(){
        return this.ticketCount.textContent(); 
    }
    async fillBookingForm(){
        await this.fullName.fill(RandomDataUtil.getRandomFullName());
        await this.email.fill(RandomDataUtil.getRandomEmail(false));
        await this.phoneNumber.fill(RandomDataUtil.getRandomPhoneNumber('mobile'));
        await this.confirmButton.click();
    }
    async isBookingSuccessful(){
        return await this.bookingRef.first().isVisible();
    }
    async getBookingRef(){
        return await this.bookingRef.first().textContent();
    }
   
    

    
}