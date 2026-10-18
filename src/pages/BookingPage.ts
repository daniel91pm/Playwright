import { Page, FrameLocator, Locator } from '@playwright/test';

export class BookingPage {
  readonly page: Page;
  readonly bookingFrame: FrameLocator;
  readonly inputOrigen: Locator;
  readonly inputDestino: Locator;
  readonly sugestionWindows: Locator;
  readonly passengerContainer: Locator;
  readonly addAdultButton: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bookingFrame = page.frameLocator('#iframe-booking');
    this.inputOrigen = this.bookingFrame.getByPlaceholder('Origen');
    this.inputDestino = this.bookingFrame.getByPlaceholder('Destino');
    this.sugestionWindows = this.bookingFrame.locator('.autocompleteAirport__suggest');
    this.passengerContainer = this.bookingFrame.locator('.searchForm__paxs');
    this.addAdultButton = this.bookingFrame.locator('#ADTPlus');
    this.searchButton = this.bookingFrame.locator('#search_button');
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://www.clicair.co/');
  }

  async selectOrigin(origen: string): Promise<void> {
    await this.inputOrigen.pressSequentially(origen, { delay: 100 });
    await this.sugestionWindows.filter({ hasText: origen }).click();
  }

  async selectDestination(destino: string): Promise<void> {
    await this.inputDestino.pressSequentially(destino, { delay: 100 });
    await this.sugestionWindows.filter({ hasText: destino }).click();
  }

  private getCalendarDateLocator(datePickerId: string, formattedDate: string): Locator {
    return this.bookingFrame.locator(`//*[@id="${datePickerId}"]//*[@title="${formattedDate}"]`);
  }

  async selectDates(departureDateFormatted: string, arrivalDateFormatted: string): Promise<void> {
    const departureLocator = this.getCalendarDateLocator('firstDatePicker', departureDateFormatted);
    await departureLocator.waitFor({ state: 'visible' });
    await departureLocator.click();

    const arrivalLocator = this.getCalendarDateLocator('secondDatePicker', arrivalDateFormatted);
    await arrivalLocator.waitFor({ state: 'visible' });
    await arrivalLocator.click();
  }

  async addAdultPassenger(): Promise<void> {
    await this.passengerContainer.click();
    await this.addAdultButton.click();
  }

  async submitSearch(): Promise<void> {
    await this.searchButton.click();
  }
}