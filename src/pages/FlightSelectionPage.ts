import { Page, Locator } from '@playwright/test';

export class FlightSelectionPage {
  readonly page: Page;
  readonly flightCards: Locator;
  readonly continueButton: Locator;
  readonly termsCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.flightCards = page.locator('.flightComponent__card');
    this.continueButton = page.locator('.btn.actionNav__continue');
    this.termsCheckbox = page.locator('.actionNav__termsCheck');
  }

  async selectFirstAvailableFlight(): Promise<void> {
    const firstFlight = this.flightCards.first();
    await firstFlight.waitFor({ state: 'visible' });
    await firstFlight.click();
  }

  async acceptTermsAndContinue(): Promise<void> {
    await this.termsCheckbox.check();
    await this.continueButton.click();
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}