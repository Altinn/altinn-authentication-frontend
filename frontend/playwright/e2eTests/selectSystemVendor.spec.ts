import { expect, test } from '@playwright/test';
import { SystemUserPage } from '../pages/systemUserPage';
import { TestdataApi } from 'playwright/util/TestdataApi';

test('should be able to select a system vendor', async ({ page }): Promise<void> => {
  const systemUserPage = new SystemUserPage(page);
  await systemUserPage.selectSystemVendor('TripletexN/A (914286018)');
});

test('Create system user and verify landing page', async ({ page }): Promise<void> => {
  const systemUserPage = new SystemUserPage(page);
  await systemUserPage.selectSystemVendor('TripletexN/A (914286018)');
  await systemUserPage.CREATE_ACCESS_BUTTON.click();
  await expect(systemUserPage.SYSTEMUSER_CREATED_HEADING).toBeVisible();
  await expect(page.getByText('Tripletex').first()).toBeVisible();
});

//Tdo - lag test for å slette og avbryte

//Clean up test users
test.afterAll(async () => {
  await TestdataApi.cleanUpTestUsers();
});
