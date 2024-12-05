import { expect, test } from '@playwright/test';
import { SystemUserPage } from '../pages/systemUserPage';

test('Create system user and verify landing page', async ({ page }): Promise<void> => {
  const system = 'E2E - Playwright - Authentication';
  const systemUserPage = new SystemUserPage(page);
  await systemUserPage.selectSystem(system);
  await systemUserPage.CREATE_SYSTEM_USER_BUTTON.click();
  await expect(systemUserPage.SYSTEMUSER_CREATED_HEADING).toBeVisible();
  await expect(page.getByText(system).first()).toBeVisible();
});
