import { expect, test } from '@playwright/test';
import { SystemUserPage } from '../pages/systemUserPage';
import { TestdataApi } from 'playwright/util/TestdataApi';
import { ApiRequests } from 'playwright/api-requests/ApiRequests';


test.describe('System Register', async () => {
  let system: string;

  test.beforeEach(async () => {
    const api = new ApiRequests();
    system = await api.createSystemSystemRegister(); // Create system before each test
  });

  test('Create system user and verify landing page', async ({ page }): Promise<void> => {
    const systemUserPage = new SystemUserPage(page);
    await systemUserPage.selectSystem(system);
    await systemUserPage.CREATE_SYSTEM_USER_BUTTON.click();
    await expect(systemUserPage.SYSTEMUSER_CREATED_HEADING).toBeVisible();
    await expect(page.getByText(system).first()).toBeVisible();
  });

  test.afterEach(async () => {
    if (system) {
      await TestdataApi.removeSystem(system);
    }
  });
});
