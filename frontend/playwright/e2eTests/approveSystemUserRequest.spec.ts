//Dummy URL to test with: https://authn.ui.at22.altinn.cloud/authfront/ui/auth/vendorrequest?id=fa82738b-d948-48d7-b58f-b2709dccec55
import test, { expect } from '@playwright/test';
import { ApiRequests } from '../api-requests/ApiRequests';
import { Token } from 'playwright/api-requests/Token';
import { TestdataApi } from 'playwright/util/TestdataApi';

test('Avvis Systembrukerforespørsel', async ({ page }): Promise<void> => {
  const api = new ApiRequests(); // Create an instance
  const tokenclass = new Token();
  var confirmUrl = await prepareSystemUserRequest(api, tokenclass);

  await page.goto(confirmUrl);
  await page.getByRole('button', { name: 'Avvis' }).click();
  const logoutButton = page.locator('span.sr-only', { hasText: 'Logg inn/Min profil' });
  await expect(logoutButton).toBeVisible();
});

test('Godkjenn Systembrukerforespørsel', async ({ page }): Promise<void> => {
  const api = new ApiRequests(); // Create an instance
  const tokenclass = new Token();
  var confirmUrl = await prepareSystemUserRequest(api, tokenclass);

  await page.goto(confirmUrl);
  await page.getByRole('button', { name: 'Godkjenn' }).click();
  const logoutButton = page.locator('span.sr-only', { hasText: 'Logg inn/Min profil' });
  await expect(logoutButton).toBeVisible();
});

//Clean up test users
test.afterAll(async () => {
  await TestdataApi.cleanUpTestUsers();
});

async function prepareSystemUserRequest(api: ApiRequests, tokenclass: Token) {
  const payload = api.generatePayloadSystemUserRequest();
  const scopes =
    'altinn:authentication/systemuser.request.read altinn:authentication/systemuser.request.write';
  const token = await tokenclass.getEnterpriseAltinnToken(scopes);
  const endpoint = 'v1/systemuser/request/vendor';
  const apiResponse = await api.sendPostRequest(payload, endpoint, token);
  return apiResponse.confirmUrl; // Return the Confirmation URL to use in the test
}

//Lag ny test: https://authn.ui.at22.altinn.cloud/authfront/ui/auth/creation - Lag ny systemtilgang
