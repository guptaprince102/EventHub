import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { POManager } from "../../PageObjects/POManager";

const URL = 'https://eventhub.rahulshettyacademy.com/';

let poManager: POManager;

Given('Login with valid user {string} and {string}',{timeout:60000}, async function (email, password) {

    poManager = new POManager(this.page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo(URL);
    await loginPage.login(email, password);
    await expect(this.page.getByText('Browse Events').first()).toContainText('Browse Events');

});

When('User book an event with one ticket', function () {
    
});

Then('User is able its booking in Booking section', function () {

});
Then('User is able to check if the booking is eleigible for a refund', function () {

});
