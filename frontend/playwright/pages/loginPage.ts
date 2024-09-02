import { type Page, expect } from '@playwright/test';

const authFile = '.playwright/.auth/user.json';

export class LoginWithUserPage {
  constructor(public page: Page) {}

  async loginAndChooseReportee(testUser: string, reportee: string) {
    await this.page.goto(`${process.env.BASE_URL}`);
    await this.page.click("'Logg inn/Min profil'");
    await this.page.getByText('TestID Lag din egen').click();
    await this.page.locator("input[name='pid']").fill(testUser);
    await this.page.click("'Autentiser'");
    await this.page.getByRole('searchbox', { name: 'Søk etter aktør' }).fill(reportee);
    const chosenReportee = this.page.getByRole('button').filter({ hasText: reportee });
    await chosenReportee.click();
    await this.page.goto(`${process.env.BASE_URL}/ui/profile`);
    await this.page.click("'profil'");
    const profileHeader = this.page.getByRole('heading', { name: new RegExp(reportee, 'i') });
    await expect(profileHeader).toBeVisible();
    await this.page.context().storageState({ path: authFile });
  }
}
export class LogoutWithUserPage {
  constructor(public page: Page) {}

  async gotoLogoutPage(logoutReportee: string) {
    await this.page.goto(`${process.env.BASE_URL}/ui/profile`);
    await this.page.getByRole('button', { name: logoutReportee }).click();
    await this.page.getByRole('link', { name: 'Logg ut' }).click();
  }
}
