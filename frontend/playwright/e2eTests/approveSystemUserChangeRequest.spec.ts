import test, { expect } from '@playwright/test';
import { ApiRequests } from '../api-requests/ApiRequests';
import { TestdataApi } from 'playwright/util/TestdataApi';

test.describe('Godkjenn og avvis Systembruker endringsforespørsel', () => {
  let api: ApiRequests;

  test.beforeEach(async () => {
    api = new ApiRequests();
  });

  test('Avvis Systembruker endringsforespørsel', async ({ page }): Promise<void> => {
    //Generate confirmUrl from API
    const externalRef = TestdataApi.generateExternalRef();
    const response = await api.postSystemuserRequest(externalRef);

    await api.approveSystemuserRequest(response.id);

    const confirmUrlChangeRequest = await api.postSystemuserChangeRequest(externalRef);

    await page.goto(confirmUrlChangeRequest);
    await page.getByRole('button', { name: 'Avvis' }).click();

    //Expect user to be logged out
    await expect(page).toHaveURL('https://info.altinn.no');
  });

  test('Godkjenn Systembruker endringsforespørsel', async ({ page }): Promise<void> => {
    const externalRef = TestdataApi.generateExternalRef();
    const response = await api.postSystemuserRequest(externalRef);

    await api.approveSystemuserRequest(response.id);

    const confirmUrlChangeRequest = await api.postSystemuserChangeRequest(externalRef);

    await page.goto(confirmUrlChangeRequest);
    await page.getByRole('button', { name: 'Godkjenn' }).click();

    //Expect user to be logged out
    await expect(page).toHaveURL('https://info.altinn.no');
  });
});
