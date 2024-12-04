import { expect, test } from '@playwright/test';
import { SystemUserPage } from '../pages/systemUserPage';

test('Delete created system user', async ({ page }): Promise<void> => {
  const systemUserPage = new SystemUserPage(page);
  const system = 'E2E - Playwright - Authentication';

  // Create new system user
  await systemUserPage.selectSystem(system);
  await systemUserPage.CREATE_SYSTEM_USER_BUTTON.click();
  await expect(systemUserPage.SYSTEMUSER_CREATED_HEADING).toBeVisible();
  await expect(page.getByText(system).first()).toBeVisible();

  // Delete system user
  await systemUserPage.EDIT_SYSTEMUSER_LINK.click();
  await systemUserPage.DELETE_SYSTEMUSER_BUTTON.click();
  await systemUserPage.FINAL_DELETE_SYSTEMUSER_BUTTON.click();

  //Back to overview page
  await expect(systemUserPage.MAIN_HEADER).toBeVisible();
});
