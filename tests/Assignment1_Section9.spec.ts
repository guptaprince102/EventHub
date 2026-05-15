import { test, expect, Page } from '@playwright/test';
import { POManager } from '../PageObjects/POManager'
import { HomePage } from '../PageObjects/HomePage';
const dataSet = JSON.parse(JSON.stringify(require('../Utils/DataProvider.json')));
const URL = 'https://eventhub.rahulshettyacademy.com/';

let page: Page;
let poManager: POManager;
let homePage : HomePage;
let eventTitle = `Test Event ${Date.now()}`;
let seatCount : number;
let bookingRef : string= "";

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    poManager = new POManager(page);
})

test('Step 1 Login', async () => {

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo(URL);
    await loginPage.login(dataSet.email, dataSet.password);
    await expect(page.getByText('Browse Events').first()).toContainText('Browse Events');

})

test('Step 2 Create Event', async () => {

    homePage = poManager.getHomePage()
    await homePage.goToEventManager();
    await expect(page.getByText("New Event")).toBeVisible();
    const createEventPage = poManager.getCreateEventPage();
    await createEventPage.createEvent(eventTitle);
    await expect(page.getByText('Event created!')).toBeVisible();
    
})

test('Step 3 Verify the Event is created', async () => {

    await homePage.goToEvents();
    const eventPage = poManager.getEventPage();
    expect(eventPage.isEventsLoaded).toBeTruthy();
    const allEvents = await eventPage.getAllEvents();
    const myEvent = allEvents.filter({ hasText: eventTitle }).first();
    await expect(myEvent).toBeVisible();
    seatCount = parseInt(await myEvent.getByText('Seat').first().innerText());
    await myEvent.getByTestId('book-now-btn').click();

})
test('Step 4 Fill the booking form', async () => {

    const bookingPage = poManager.getBookingPage();
    const defaultTicket = await bookingPage.getDefaultTicketCount();
    expect(defaultTicket).toBe('1');
    await bookingPage.fillBookingForm();
    bookingRef = (await bookingPage.getBookingRef())?.trim() ?? "";
    expect(bookingPage.isBookingSuccessful()).toBeTruthy();

})
test('Step 5 Verify Booking Confirmation in MyBookings Page', async () => {

    const myBookingPage = poManager.getMyBookingsPage();
    await homePage.goToMyBookings();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toBe(URL+'bookings');
    await expect(page).toHaveURL(URL+'bookings');
    
    const isMyEventBooked = await myBookingPage.isMyEventBooked(bookingRef);
    expect(isMyEventBooked).toBeTruthy();

})
test('Step 6 Verify Seat Count is decreased by 1 in Events Page', async () => {
    await homePage.goToEvents();
    const eventPage = poManager.getEventPage();
    expect(eventPage.isEventsLoaded).toBeTruthy();
    const allEvents = await eventPage.getAllEvents();
    const myEvent = allEvents.filter({ hasText: eventTitle }).first();
    await expect(myEvent).toBeVisible();
    const seatCountAfterBooking = parseInt(await myEvent.getByText('Seat').first().innerText());
    
    expect(seatCountAfterBooking === seatCount-1).toBeTruthy();

})


