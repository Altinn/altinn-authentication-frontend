import test, { expect } from '@playwright/test';
import { ApiRequests } from '../api-requests/ApiRequests';
import { Token } from 'playwright/api-requests/Token';
import { LoginWithUserPage } from 'playwright/pages/loginPage';

test.describe('Godkjenn og avvis Systembrukerforespørsel', () => {
  let token: Token;
  let loginPage: LoginWithUserPage;
  let api: ApiRequests;

  test.beforeEach(async ({ page }) => {
    api = new ApiRequests();
    token = new Token();
    loginPage = new LoginWithUserPage(page);
  });

  test('Avvis Systembrukerforespørsel', async ({ page }): Promise<void> => {
    //Generate confirmUrl from API
    const confirmUrl = await prepareSystemUserRequest(api, token);

    await page.goto(confirmUrl);
    await page.getByRole('button', { name: 'Avvis' }).click();

    //Expect user to be logged out
    await expect(loginPage.LOGIN_BUTTON).toBeVisible();
    await expect(page).toHaveURL('https://info.altinn.no');
  });

  test('Godkjenn Systembrukerforespørsel', async ({ page }): Promise<void> => {
    const confirmUrl = await prepareSystemUserRequest(api, token);

    await page.goto(confirmUrl);
    await page.getByRole('button', { name: 'Godkjenn' }).click();

    //Expect user to be logged out
    await expect(loginPage.LOGIN_BUTTON).toBeVisible();
    await expect(page).toHaveURL('https://info.altinn.no');
  });

  async function prepareSystemUserRequest(api: ApiRequests, tokenclass: Token) {
    const payload = api.generatePayloadSystemUserRequest();
    const scopes =
      'altinn:authentication/systemuser.request.read altinn:authentication/systemuser.request.write';
    const token = await tokenclass.getEnterpriseAltinnToken(scopes);
    const endpoint = 'v1/systemuser/request/vendor';
    const apiResponse = await api.sendPostRequest<{ confirmUrl: string }>(payload, endpoint, token);
    return apiResponse.confirmUrl; // Return the Confirmation URL to use in the test
  }
});