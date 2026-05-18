import { test, expect, Page } from '@playwright/test';
import { POManager } from '../PageObjects/POManager'
import { HomePage } from '../PageObjects/HomePage';
const dataSet = JSON.parse(JSON.stringify(require('../Utils/DataProvider.json')));
const URL = 'https://eventhub.rahulshettyacademy.com/';

let page: Page;
let poManager: POManager;
let homePage: HomePage;
let eventTitle = `Test Event ${Date.now()}`;
let seatCount: number;
let bookingRef: string = "";

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
    // Step 2 Create Event
    homePage = poManager.getHomePage()
    await homePage.goToEventManager();
    await expect(page.getByText("New Event")).toBeVisible();
    const createEventPage = poManager.getCreateEventPage();
    await createEventPage.createEvent(eventTitle);
    await expect(page.getByText('Event created!')).toBeVisible();

    // 'Step 3 Verify the Event is created'
    await homePage.goToEvents();
    const eventPage = poManager.getEventPage();
    expect(await eventPage.isEventsLoaded()).toBeTruthy();
    const allEvents = await eventPage.getAllEvents();
    const myEvent = allEvents.filter({ hasText: eventTitle }).first();
    // Wait with longer timeout for event to appear in cloud environments
    await expect(myEvent).toBeVisible({ timeout: 15000 });
    seatCount = parseInt(await myEvent.getByText('Seat').first().innerText());
    
    await myEvent.getByTestId('book-now-btn').click();
    
    // 'Step 4 Fill the booking form'
    const bookingPage = poManager.getBookingPage();
    const defaultTicket = await bookingPage.getDefaultTicketCount();
    expect(defaultTicket).toBe('1');
    await bookingPage.fillBookingForm();
    bookingRef = (await bookingPage.getBookingRef())?.trim() ?? "";
    expect(bookingPage.isBookingSuccessful()).toBeTruthy();

    // 'Step 5 Verify Booking Confirmation in MyBookings Page'
    const myBookingPage = poManager.getMyBookingsPage();
    await homePage.goToMyBookings();
    await myBookingPage.bookingCards.first().waitFor();
    expect(page.url()).toBe(URL+'bookings');
    await expect(page).toHaveURL(URL+'bookings');
    
    const isMyEventBooked = await myBookingPage.isMyEventBooked(bookingRef);
    expect(isMyEventBooked).toBeTruthy();

    // 'Step 6 Verify Seat Count is decreased by 1 in Events Page'
    await homePage.goToEvents();
    expect(await eventPage.isEventsLoaded()).toBeTruthy();
    await eventPage.eventCard.first().waitFor();
    // Refetch the event list after navigation (previous reference is stale)
    const updatedAllEvents = await eventPage.getAllEvents();
    const updatedMyEvent = updatedAllEvents.filter({ hasText: eventTitle }).first();
    // Wait with longer timeout for event to appear
    await expect(updatedMyEvent).toBeVisible({ timeout: 15000 });
    // Add small delay to ensure backend updated
    await page.waitForTimeout(1000);
    const seatCountAfterBooking = parseInt(await updatedMyEvent.getByText('Seat').first().innerText());
    expect(seatCountAfterBooking).toBe(seatCount - 1);

})









