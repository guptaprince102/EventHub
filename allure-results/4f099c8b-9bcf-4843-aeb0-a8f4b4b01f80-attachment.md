# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Assignment1_Section9.spec.ts >> TC6 Verify Seat Count is decreased by 1 in Events Page
- Location: tests/Assignment1_Section9.spec.ts:88:5

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('#nav-events')

```

# Test source

```ts
  1  | import {Locator, Page} from "@playwright/test";
  2  | 
  3  | export class HomePage{
  4  |     page : Page;
  5  |     admin : Locator;
  6  |     eventManager : Locator;
  7  |     event : Locator;
  8  |     myBooking : Locator;
  9  |     
  10 |     
  11 | 
  12 |     constructor(page : Page){
  13 |         this.page = page;
  14 |         this.admin = page.getByText('Admin');
  15 |         this.eventManager = page.locator(`a[href="/admin/events"]`).first();
  16 |         this.event = page.locator('#nav-events');
  17 |         this.myBooking = page.getByTestId('nav-bookings');
  18 |     }
  19 |     async goToEventManager(){
  20 |         await this.admin.click();
  21 |         await this.eventManager.waitFor();
  22 |         await this.eventManager.click();
  23 |     }
  24 |     async goToEvents(){
> 25 |         await this.event.click();
     |                          ^ Error: locator.click: Target page, context or browser has been closed
  26 |     }
  27 |      async goToMyBookings(){
  28 |         await this.myBooking.click();
  29 |     }
  30 | 
  31 |     
  32 | }
```