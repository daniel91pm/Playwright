import { test } from '@playwright/test';
import { BookingPage } from '../pages/BookingPage';
import { FlightSelectionPage } from '../pages/FlightSelectionPage';
import { DateUtils } from '../utils/DateUtils';

test('Reserva de vuelo Clic MDE -> BOG', async ({ page }) => {
  const bookingPage = new BookingPage(page);
  const flightSelectionPage = new FlightSelectionPage(page);

  const testEslint =123;
  const origen = 'EOH';
  const destino = 'BOG';
  const fechaIda = DateUtils.getFormattedFutureDate(2);
  const fechaRegreso = DateUtils.getFormattedFutureDate(3); 

  
  await bookingPage.navigate();
  await bookingPage.selectOrigin(origen);
  await bookingPage.selectDestination(destino);
  await bookingPage.selectDates(fechaIda, fechaRegreso);
  await bookingPage.addAdultPassenger();
  await bookingPage.submitSearch();

});
