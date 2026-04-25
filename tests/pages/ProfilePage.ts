import { Page, Locator, expect } from '@playwright/test';

export class ProfilePage {
  readonly page: Page;

  // Locators
  private readonly userIconWrap: Locator;
  private readonly datosLink: Locator;
  private readonly actualizarInfoBtn: Locator;
  private readonly firstNameInput: Locator;
  private readonly saveBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userIconWrap      = page.locator('#user-icon-wrap');
    this.datosLink         = page.locator('#header-account-menu').getByRole('link', { name: 'Datos' });
    this.actualizarInfoBtn = page.getByRole('button', { name: 'Actualizar Información' });
    this.firstNameInput    = page.locator('input[name="first_name"]');
    this.saveBtn           = page.getByRole('button', { name: 'Guardar' });
  }

  async openProfileMenu() {
    await this.userIconWrap.hover();
    await this.datosLink.waitFor({ state: 'visible' });
  }

  async goToDatos() {
    await this.datosLink.click();
    await this.actualizarInfoBtn.waitFor({ state: 'visible' });
  }

  async editFirstName(newFirstName: string) {
    await this.actualizarInfoBtn.click();
    await this.firstNameInput.waitFor({ state: 'visible' });
    await this.firstNameInput.click();
    await this.firstNameInput.fill(newFirstName);
    await this.saveBtn.click();
  }

  async assertFirstNameUpdated(newFirstName: string) {
    await expect(
      this.page.getByText(newFirstName),
      `No se muestra el nombre actualizado: ${newFirstName}`
    ).toBeVisible();
  }

  async updateFirstName(newFirstName: string) {
    await this.openProfileMenu();
    await this.goToDatos();
    await this.editFirstName(newFirstName);
  }
}
