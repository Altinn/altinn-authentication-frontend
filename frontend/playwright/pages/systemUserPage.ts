/* eslint-disable import/no-unresolved */
import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class SystemUserPage {
  constructor(public page: Page) {}

  async selectSystemVendor(vendorSystem: string) {
    await this.page.goto(`${process.env.SYSYEMUSER_URL}`);
    await this.page.getByLabel('Velg fagsystem').fill(vendorSystem);
    await this.page.getByRole('option', { name: vendorSystem }).click();
    await this.page.getByRole('button', { name: 'Gå videre' }).click();

    const createButton = this.page.getByRole('button', {
      name: 'Opprett systemtilgang',
    });
    await expect(createButton).toBeVisible();
  }
}
