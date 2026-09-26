import { test, expect } from '@playwright/test';

function formatDDMMYYYY(fecha: Date): string {
  const day = String(fecha.getDate()).padStart(2, '0');
  const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
  const year = fecha.getFullYear();

  return `${day}/${month}/${year}`;
}

test('vuelo Clic MDE ', async ({ page }) => {
  await page.goto('https://www.clicair.co/');


  var origen = "EOH"
  var destino = "BOG"

  
 
  const frame = page.frameLocator('//*[@id="iframe-booking"]')
  const inputOrigen = frame.getByPlaceholder('Origen')
  const inputDestino = frame.getByPlaceholder('Destino')
  const sugestionwindows = frame.locator('.autocompleteAirport__suggest')

const hoy = new Date();
   const departureDate = new Date(hoy);
  departureDate.setDate(departureDate.getDate()+2);
  const departureDateFormatted = formatDDMMYYYY(departureDate);

  const getCalendarDeparture = (date) => {
    return frame.locator(`//*[@id="firstDatePicker"]//*[@title="${date}"]`);
  };
 const getCalendarArrival = (date) => {
    return frame.locator(`//*[@id="secondDatePicker"]//*[@title="${date}"]`);
  };
  
  const arrivalDate =new Date(departureDate);
arrivalDate.setDate(departureDate.getDate() + 1);
const arrivalDateFormatted = formatDDMMYYYY(arrivalDate);
 
 const passengerConteiner = frame.locator('//*[@class="searchForm__paxs"]')
  
  const addAdult = frame.locator('//*[@id="ADTPlus"]')
const searchButton = frame.locator('//*[@id="search_button"]')


//Pagina Vuelos 
const selectAnyCategoryAvailable = page.locator('//*[@class="flightComponent__card"][1]')
const continueButton = page.locator('//*[@class="btn actionNav__continue"]')
const checkboxtermsCheck = page.locator('//*[@class="actionNav__termsCheck"]')

  
  await inputOrigen.pressSequentially(origen, { delay: 100 })
  await sugestionwindows.filter({ hasText: origen }).click()

  await inputDestino.pressSequentially(destino, { delay: 100 })
  await sugestionwindows.filter({ hasText: destino }).click()


  await getCalendarDeparture(departureDateFormatted).click()
  await page.waitForTimeout(3000);
  await getCalendarArrival(arrivalDateFormatted).click()


  await passengerConteiner.click()
  await addAdult.click()
  await searchButton.click()
  await page.waitForTimeout(8000);

  await selectAnyCategoryAvailable.click()
  await page.waitForTimeout(2000);
  await continueButton.click()
  await page.waitForTimeout(2000);
  await selectAnyCategoryAvailable.click()
  await checkboxtermsCheck.check
  await continueButton.click()

});
