import { expect, test } from '@playwright/test';
import { SystemUserPage } from '../pages/systemUserPage';
import { ApiRequests } from 'playwright/api-requests/ApiRequests';
import { TestdataApi } from 'playwright/util/TestdataApi';

test.describe('System user deletion', () => {
  let systemId: string;
  let api: ApiRequests;

  test.beforeAll(async () => {
    api = new ApiRequests();
  });

  test.beforeEach(async ({ page }) => {
    //Create a system in your "system register" before each test
    systemId = await api.createSystemSystemRegister();

    // 2) Use the UI to create a new system user
    const systemUserPage = new SystemUserPage(page);
    await systemUserPage.selectSystem(systemId);
    await systemUserPage.CREATE_SYSTEM_USER_BUTTON.click();
    await expect(systemUserPage.SYSTEMUSER_CREATED_HEADING).toBeVisible();
    await expect(page.getByText(systemId).first()).toBeVisible();
  });

  test('Delete created system user', async ({ page }) => {
    const systemUserPage = new SystemUserPage(page);

    // Delete system user
    await systemUserPage.EDIT_SYSTEMUSER_LINK.click();
    await systemUserPage.DELETE_SYSTEMUSER_BUTTON.click();
    await systemUserPage.FINAL_DELETE_SYSTEMUSER_BUTTON.click();

    // Confirm we are back on overview page
    await expect(systemUserPage.MAIN_HEADER).toBeVisible();
  });

  test.afterEach(async () => {
    // Remove system
    await TestdataApi.removeSystem(systemId);
  });
});
