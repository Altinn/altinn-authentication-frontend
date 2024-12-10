import test, { expect } from '@playwright/test';
import { ApiRequests } from '../api-requests/ApiRequests';
import { TestdataApi } from 'playwright/util/TestdataApi';

test.describe('Godkjenn og avvis Systembrukerforespørsel', () => {
  let api: ApiRequests;

  test.beforeEach(async () => {
    api = new ApiRequests();
  });

  test('Avvis Systembrukerforespørsel', async ({ page }): Promise<void> => {
    //Generate confirmUrl from API
    const externalRef = TestdataApi.generateExternalRef();
    const response = await api.postSystemuserRequest(externalRef);

    await page.goto(response.confirmUrl);
    await page.getByRole('button', { name: 'Avvis' }).click();

    //Expect user to be logged out
    await expect(page).toHaveURL('https://info.altinn.no');
  });

  test('Godkjenn Systembrukerforespørsel', async ({ page }): Promise<void> => {
    const externalRef = TestdataApi.generateExternalRef();
    const response = await api.postSystemuserRequest(externalRef);

    await page.goto(response.confirmUrl);
    await page.getByRole('button', { name: 'Godkjenn' }).click();

    //Expect user to be logged out
    await expect(page).toHaveURL('https://info.altinn.no');
  });
});
