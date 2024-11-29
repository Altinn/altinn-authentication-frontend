import { Locator, type Page, expect } from '@playwright/test';
import noNb from '../../src/localizations/no_nb.json';

export class SystemUserPage {
  public readonly SELECT_VENDOR_LABEL: Locator;
  public readonly CONTINUE_BUTTON: Locator;
  public readonly CREATE_SYSTEM_USER_BUTTON: Locator;
  public readonly SYSTEMUSER_CREATED_HEADING: Locator;
  public readonly EDIT_SYSTEMUSER_LINK: Locator;
  public readonly DELETE_SYSTEMUSER_BUTTON: Locator;
  public readonly FINAL_DELETE_SYSTEMUSER_BUTTON: Locator;
  public readonly CREATE_NEW_SYSTEMUSER_HEADER: Locator;
  public readonly MAIN_HEADER: Locator;

  constructor(public page: Page) {
    this.SELECT_VENDOR_LABEL = this.page.getByLabel(noNb.authent_creationpage.pull_down_menu_label);
    this.CONTINUE_BUTTON = this.page.getByRole('button', {
      name: noNb.authent_creationpage.confirm_button,
    });
    this.CREATE_SYSTEM_USER_BUTTON = this.page.getByRole('button', {
      name: noNb.authent_includedrightspage.confirm_button,
    });
    this.SYSTEMUSER_CREATED_HEADING = this.page.getByRole('heading', {
      name: noNb.authent_overviewpage.created_system_user_title,
    });

    this.EDIT_SYSTEMUSER_LINK = this.page.getByRole('link', {
      name: noNb.authent_overviewpage.edit_system_user,
    });

    this.DELETE_SYSTEMUSER_BUTTON = this.page.getByRole('button', {
      name: noNb.authent_detailpage.delete_systemuser,
    });

    this.FINAL_DELETE_SYSTEMUSER_BUTTON = this.page.getByRole('dialog').getByRole('button', {
      name: noNb.authent_detailpage.delete_systemuser,
    });

    this.CREATE_NEW_SYSTEMUSER_HEADER = this.page.getByRole('heading', {
      name: noNb.authent_overviewpage.sub_title,
    });

    this.MAIN_HEADER = this.page.getByRole('heading', {
      name: noNb.authent_overviewpage.banner_title,
    });
  }

  async selectSystemVendor(vendorSystem: string) {
    await this.page.goto(`${process.env.SYSYEMUSER_URL}`);
    await this.SELECT_VENDOR_LABEL.fill(vendorSystem.substring(0, 9));
    await this.page.getByLabel(vendorSystem, { exact: true }).click();

    await this.CONTINUE_BUTTON.click();
    await expect(this.CREATE_SYSTEM_USER_BUTTON).toBeVisible();
  }
}
