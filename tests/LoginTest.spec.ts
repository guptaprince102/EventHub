import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../PageObjects/LoginPage';
import { TestConfig } from '../test.config';
import { DataProvider } from '../Utils/dataProvider';

let loginPage: LoginPage;
let testConfig = new TestConfig();
const jsonPath = "testdata/DataProvider.json";
const jsonLoginData = DataProvider.getTestDataFromJson(jsonPath);

test.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page);
})
for (const data of jsonLoginData) {
    test(`TC1 Login ${data.email}`, async ({ page }) => {

        await loginPage.goTo(testConfig.appURL);
        await loginPage.login(data.email, data.password);
        if (data.condition.toLowerCase() === 'valid') {
            await expect(page.getByText('Browse Events').first()).toContainText('Browse Events');
        }
        else{
            expect(await loginPage.getloginErrorMessage()).toBe('Invalid email or password');
        }

    });
};

test.afterEach(async ({ page }) => {

    await page.close();
});