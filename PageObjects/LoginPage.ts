import {Locator, Page} from "@playwright/test";

export class LoginPage{
    page : Page;
    username : Locator;
    password : Locator;
    loginButton : Locator;

    constructor(page : Page){
        this.page = page;
        this.username = page.getByPlaceholder('you@email.com');
        this.password = page.getByLabel('password');
        this.loginButton = page.locator('#login-btn');
    }

    async goTo(URL: string){
        await this.page.goto(URL);
    }
    async login(username : string, password : string){
        await this.username.waitFor();
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}