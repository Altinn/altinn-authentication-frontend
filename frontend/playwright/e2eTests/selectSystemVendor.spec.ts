import { expect, test } from '@playwright/test';
import { SystemUserPage } from '../pages/systemUserPage';
import { TestdataApi } from 'playwright/util/TestdataApi';
import { ApiRequests } from 'playwright/api-requests/ApiRequests';

test('Create system user and verify landing page', async ({ page }): Promise<void> => {
  //Make sure system user does not exist first
  let api: ApiRequests = new ApiRequests();

  await TestdataApi.removeAllSystemUsers();
  var system = await api.CreateSystemSystemRegister();
  console.log(system);

  const systemUserPage = new SystemUserPage(page);
  await systemUserPage.selectSystem(system);
  await systemUserPage.CREATE_SYSTEM_USER_BUTTON.click();
  await expect(systemUserPage.SYSTEMUSER_CREATED_HEADING).toBeVisible();
  await expect(page.getByText(system).first()).toBeVisible();

  //Cleanup
  await TestdataApi.removeSystem(system);
});
