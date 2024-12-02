import test, { expect } from '@playwright/test';
import { ApiRequests } from '../api-requests/ApiRequests';
import { Token } from 'playwright/api-requests/Token';

test('Avvis Systembrukerforespørsel', async ({ page }): Promise<void> => {
  const api = new ApiRequests(); // Create an instance
  const tokenclass = new Token();
  const confirmUrl = await prepareSystemUserRequest(api, tokenclass);

  await page.goto(confirmUrl);
  await page.getByRole('button', { name: 'Avvis' }).click();
  const logoutButton = page.locator('span.sr-only', { hasText: 'Logg inn/Min profil' });
  await expect(logoutButton).toBeVisible();
});

test('Godkjenn Systembrukerforespørsel', async ({ page }): Promise<void> => {
  const api = new ApiRequests(); // Create an instance
  const tokenclass = new Token();
  const confirmUrl = await prepareSystemUserRequest(api, tokenclass);

  await page.goto(confirmUrl);
  await page.getByRole('button', { name: 'Godkjenn' }).click();
  const logoutButton = page.locator('span', { hasText: 'Logg inn/Min profil' });
  await expect(logoutButton).toBeVisible();
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

//Lag ny test: https://authn.ui.at22.altinn.cloud/authfront/ui/auth/creation - Lag ny systemtilgang
