import { test, expect } from '@playwright/test';

test('vuelo Clic MDE ', async ({ page }) => {
  await page.goto('https://www.clicair.co/');

  var origen = "MEDELLIN"
  var destino = "BUCARAMANGA"

  const frame = page.frameLocator('//*[@id="iframe-booking"]')
  const inputOrigen = frame.getByPlaceholder('Origen')
  const inputDestino = frame.getByPlaceholder('Destino')
  const sugestionwindows = frame.locator('.autocompleteAirport__suggest')
  const calendar = frame.locator('//*[@id="firstDatePicker"]//*[@title="27/04/2026"]')
  const arrivalDate = "01/05/2026"
  const departureDate = "27/04/2026"
  const getCalendarDate = (date) => {
    return frame.locator(`//*[@id="firstDatePicker"]//*[@title="${date}"]`);
  };
  const passengers = frame.locator('//*[@id="passenger-class-btn"]')
  const addAdult = frame.locator('//*[@id="ADTPlus"]')

  await page.waitForTimeout(5000)
  await inputOrigen.pressSequentially(origen, { delay: 100 })
  await sugestionwindows.filter({ hasText: origen }).click()
  await page.waitForTimeout(5000)


  await inputDestino.pressSequentially(destino, { delay: 100 })
  await sugestionwindows.filter({ hasText: destino }).click()
  //await page.waitForTimeout(5000)

  await getCalendarDate(departureDate).click();
  await getCalendarDate(arrivalDate)



  await passengers.click()
  await addAdult.click()
  await page.waitForTimeout(5000)
});
