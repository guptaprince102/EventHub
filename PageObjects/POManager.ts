import { Page } from '@playwright/test';
import {LoginPage} from './LoginPage';
import { HomePage } from './HomePage';
import { CreateEventPage } from './CreateEventPage';
import {EventPage} from './EventPage';
import {BookingPage} from './BookingPage'
import {MyBookingPage} from './MyBookingPage'

export class POManager{

    loginPage : LoginPage;
    homePage : HomePage;
    createEventPage : CreateEventPage;
    eventPage : EventPage;
    bookingPage : BookingPage;
    myBookingPage : MyBookingPage;

    constructor(page : Page){
        this.loginPage = new LoginPage(page);
        this.homePage = new HomePage(page);
        this.createEventPage = new CreateEventPage(page);
        this.eventPage = new EventPage(page);
        this.bookingPage = new BookingPage(page);
        this.myBookingPage = new MyBookingPage(page);     

    }
    getLoginPage(){
        return this.loginPage;
    }
    getHomePage(){
        return this.homePage;
    }
    getCreateEventPage(){
        return this.createEventPage;
    }
    getEventPage(){
        return this.eventPage;
    }
    getBookingPage(){
        return this.bookingPage;
    }
    getMyBookingsPage(){
        return this.myBookingPage;
    }

}