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
    const systemUserRequestResponse = await prepareSystemUserRequest(api, token);

    await page.goto(systemUserRequestResponse.confirmUrl);
    await page.getByRole('button', { name: 'Avvis' }).click();

    //Expect user to be logged out
    await expect(loginPage.LOGIN_BUTTON).toBeVisible();
    await expect(page).toHaveURL('https://info.altinn.no');

    //Read from status api to verify that status is not rejected after clicking "Avvis"
    var statusApiRequest = await getStatusForRequestApi(systemUserRequestResponse.id, token);
    expect(statusApiRequest.status).toBe('Rejected');
  });

  test('Godkjenn Systembrukerforespørsel', async ({ page }): Promise<void> => {
    const systemUserRequestResponse = await prepareSystemUserRequest(api, token);

    await page.goto(systemUserRequestResponse.confirmUrl);
    await page.getByRole('button', { name: 'Godkjenn' }).click();

    //Expect user to be logged out
    await expect(loginPage.LOGIN_BUTTON).toBeVisible();
    await expect(page).toHaveURL('https://info.altinn.no');

    //Read from status api to verify that status is not Accepted after clicking "Avvis"
    var statusApiRequest = await getStatusForRequestApi(systemUserRequestResponse.id, token);
    expect(statusApiRequest.status).toBe('Accepted');
  });

  async function prepareSystemUserRequest(api: ApiRequests, tokenclass: Token) {
    const payload = api.generatePayloadSystemUserRequest();
    const scopes =
      'altinn:authentication/systemuser.request.read altinn:authentication/systemuser.request.write';
    const token = await tokenclass.getEnterpriseAltinnToken(scopes);
    const endpoint = 'v1/systemuser/request/vendor';
    const apiResponse = await api.sendPostRequest<{ confirmUrl: string; id: string }>(
      payload,
      endpoint,
      token,
    );
    return { confirmUrl: apiResponse.confirmUrl, id: apiResponse.id }; // Return the Confirmation URL and the ID to use in the test
  }

  async function getStatusForRequestApi(id: string, tokenclass: Token) {
    const scopes =
      'altinn:authentication/systemuser.request.read altinn:authentication/systemuser.request.write';
    const token = await tokenclass.getEnterpriseAltinnToken(scopes);
    var statusResponse = api.getStatusForSystemUserRequest<{ status: string }>(token, id);
    return statusResponse;
  }
});