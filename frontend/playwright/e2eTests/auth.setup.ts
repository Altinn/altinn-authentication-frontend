import { test as setup } from '@playwright/test';
import { LoginWithUserPage } from 'playwright/pages/loginPage';

setup('Login with TestID', async ({ page }) => {
  const login = new LoginWithUserPage(page);

  await login.loginAndChooseReportee('14824497789', 'AKTVERDIG RETORISK APE');
});
