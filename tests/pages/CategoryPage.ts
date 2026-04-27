import { Page, Locator, expect } from '@playwright/test';

export class CategoryPage {
  readonly page: Page;

  // Locators
  private readonly zapatosLink: Locator;
  private readonly bolsosLink: Locator;
  private readonly cinturonesLink: Locator;
  private readonly accesoriosLink: Locator;
  private readonly outletLink: Locator;
  private readonly pqrLink: Locator;
  constructor(page: Page) {
    this.page = page;
    this.zapatosLink = page.locator('#menu-item-10').getByRole('link', { name: 'Zapatos' });
    this.bolsosLink = page.locator('#menu-item-8').getByRole('link', { name: 'Bolsos' });
    this.cinturonesLink = page.locator('#menu-item-9').getByRole('link', { name: 'Cinturones' });
    this.accesoriosLink = page.locator('#menu-item-7').getByRole('link', { name: 'Accesorios' });
    this.outletLink = page.locator('#menu-item-355651').getByRole('link', { name: 'Outlet' });
    this.pqrLink = page.locator('#menu-item-1008849').getByRole('link', { name: 'PQRS' });
  }

  async goToZapatos() {
    await this.zapatosLink.click();
  }

  async goToBolsos() {
    await this.bolsosLink.click();
  }

  async goToCinturones() {
    await this.cinturonesLink.click();
  }

  async goToAccessories() {
    await this.accesoriosLink.click();
  }

  async goToOutlet() {
    await this.outletLink.click();
  }

  async goToPQR() {
    await this.pqrLink.click();
  }

  async assertZapatosURL() {
    await expect(
      this.page,
      'No se redirigió a la categoría de Zapatos Mujer'
    ).toHaveURL('https://www.bon-bonite.com/categoria-producto/zapatos-mujer/');
  }

  async assertBolsosURL() {
    await expect(
      this.page,
      'No se redirigió a la categoría de Bolsos Mujer'
    ).toHaveURL('https://www.bon-bonite.com/categoria-producto/bolsos-mujer/');
  }

  async assertCinturonesURL() {
    await expect(
      this.page,
      'No se redirigió a la categoría de Cinturones Mujer'
    ).toHaveURL('https://www.bon-bonite.com/categoria-producto/cinturones-mujer/');
  }

  async assertAccessoriesURL() {
    await expect(
      this.page,
      'No se redirigió a la categoría de Accesorios Mujer'
    ).toHaveURL('https://www.bon-bonite.com/categoria-producto/accesorios-mujer/');
  }

  async assertOutletURL() {
    await expect(
      this.page,
      'No se redirigió a la categoría de Outlet'
    ).toHaveURL('https://www.bon-bonite.com/categoria-producto/outlet/');
  }
}
