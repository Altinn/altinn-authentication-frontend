import { test } from '@playwright/test';
import { SystemUserPage } from '../pages/systemUserPage';

test('should be able to select a system vendor', async ({ page }): Promise<void> => {
  const systemUserPage = new SystemUserPage(page);
  await systemUserPage.selectSystemVendor('Trippletex');
});
