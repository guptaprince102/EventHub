import { test, expect, Page } from '@playwright/test';
import { POManager } from '../PageObjects/POManager'
import { HomePage } from '../PageObjects/HomePage';
import { LoginPage } from '../PageObjects/LoginPage';
import { TestConfig } from '../test.config';
// const dataSet = JSON.parse(JSON.stringify(require('../testdata/DataProvider.json')));

let page: Page;
let poManager: POManager;
let homePage: HomePage;
let loginPage: LoginPage;
let testConfig = new TestConfig();
let eventTitle = testConfig.eventTitle;
let seatCount: number;
let bookingRef: string = "";

test.beforeAll(async ({ browser }) => {
    // const context = await browser.newContext();
    page = await browser.newPage();
    poManager = new POManager(page);
    homePage = poManager.getHomePage();
    loginPage = poManager.getLoginPage();
})


test('TC1 Login', async () => {

    await loginPage.goTo(testConfig.appURL);
    await loginPage.login(testConfig.email, testConfig.password);
    await expect(page.getByText('Browse Events').first()).toContainText('Browse Events');

});
test('TC2 Create Event', async () => {

    // Step 2 Create Event
    await homePage.goToEventManager();
    await expect(page.getByText("New Event")).toBeVisible();
    const createEventPage = poManager.getCreateEventPage();
    await createEventPage.createEvent(eventTitle);
    await expect(page.getByText('Event created!')).toBeVisible();
});

test('TC3 Verify the Event is created', async () => {

    // 'Step 3 Verify the Event is created'
    await homePage.goToEvents();
    const eventPage = poManager.getEventPage();
    expect(await eventPage.isEventsLoaded()).toBeTruthy();
    const allEvents = await eventPage.getAllEvents();
    const myEvent = allEvents.filter({ hasText: eventTitle }).first();
    // Wait with longer timeout for event to appear in cloud environments
    await expect(myEvent).toBeVisible({ timeout: 15000 });
    seatCount = parseInt(await myEvent.getByText('Seat').first().innerText());



});

test('TC4 Fill the booking form', async () => {

    // 'Step 4 Fill the booking form'
    const eventPage = poManager.getEventPage();
    const allEvents = await eventPage.getAllEvents();
    const myEvent = allEvents.filter({ hasText: eventTitle }).first();
    await myEvent.getByTestId('book-now-btn').click();
    const bookingPage = poManager.getBookingPage();
    const defaultTicket = await bookingPage.getDefaultTicketCount();
    expect(defaultTicket).toBe('1');
    await bookingPage.fillBookingForm();
    bookingRef = (await bookingPage.getBookingRef())?.trim() ?? "";
    expect(bookingPage.isBookingSuccessful()).toBeTruthy();
});

test('TC5 Verify Booking Confirmation in MyBookings Page', async () => {

    // 'Step 5 Verify Booking Confirmation in MyBookings Page'
    const myBookingPage = poManager.getMyBookingsPage();
    await homePage.goToMyBookings();
    await myBookingPage.bookingCards.first().waitFor();
    expect(page.url()).toBe(testConfig.appURL + 'bookings');
    await expect(page).toHaveURL(testConfig.appURL + 'bookings');

    const isMyEventBooked = await myBookingPage.isMyEventBooked(bookingRef);
    expect(isMyEventBooked).toBeTruthy();

});

test('TC6 Verify Seat Count is decreased by 1 in Events Page', async () => {

    // 'Step 6 Verify Seat Count is decreased by 1 in Events Page'
    const eventPage = poManager.getEventPage();
    await homePage.goToEvents();
    await page.reload({ waitUntil: 'domcontentloaded' });
    expect(await eventPage.isEventsLoaded()).toBeTruthy();
    await eventPage.eventCard.first().waitFor();
    const allEvents = await eventPage.getAllEvents();
    const myEvent = allEvents.filter({ hasText: eventTitle }).first();
    const seatCountAfterBooking = parseInt(await myEvent.getByText('Seat').first().innerText());
    expect(seatCountAfterBooking).toBe(seatCount - 1);

});

test.afterAll(async ({ browser }) => {

    await browser.close();
})









