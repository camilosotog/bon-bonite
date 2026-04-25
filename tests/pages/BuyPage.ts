import { Page, Locator, expect } from '@playwright/test';
import { ICheckout } from '../interfaces/ICheckout';

export class BuyPage {
  readonly page: Page;

  private readonly accesoriosLink: Locator;
  private readonly firstProduct: Locator;
  private readonly buyNowLink: Locator;
  private readonly checkoutLink: Locator;
  private readonly continueBtn: Locator;
  private readonly phoneInput: Locator;
  private readonly termsCheckbox: Locator;
  private readonly placeOrderBtn: Locator;
  private readonly orderHeading: Locator;
  private readonly departmentSelect: Locator;
  private readonly citySelect: Locator;
  private readonly addressInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accesoriosLink = page.locator('#menu-item-7').getByRole('link', { name: 'Accesorios' });
    this.firstProduct = page.locator('.bg-bb-product-gray > .relative').first();
    this.buyNowLink = page.getByRole('link', { name: 'Comprar Ahora' });
    this.checkoutLink = page.getByRole('link', { name: 'Finalizar compra' });
    this.continueBtn = page.getByRole('button', { name: 'Continuar' });
    this.phoneInput = page.getByRole('textbox', { name: 'Teléfono fijo o celular' });
    this.termsCheckbox = page.getByRole('checkbox', { name: 'Autorizo el tratamiento de' });
    this.placeOrderBtn = page.getByRole('button', { name: 'Realizar el pedido' });
    this.orderHeading = page.getByRole('button', { name: 'Paga con Wompi' });
    this.departmentSelect = page.locator('#select2-billing_state-container');
    this.citySelect = page.locator('#select2-billing_city-container');
    this.addressInput = page.locator('#billing_address_1');
  }

  async goToAccessories() {
    await this.accesoriosLink.click();
  }

  async selectFirstProduct() {
    await this.firstProduct.click();
  }

  async buyNow() {
    await this.buyNowLink.click();
  }

  async goToCheckout() {
    await this.checkoutLink.click();
  }

  async continue() {
    await this.continueBtn.click();
  }

  async fill(checkout: ICheckout) {
    await this.departmentSelect.click();
    await this.page.getByRole('option', { name: checkout.department }).click();
    await this.citySelect.click();
    await this.page.getByRole('option', { name: checkout.city }).click();
    await this.addressInput.fill(checkout.address);
    await this.phoneInput.fill(checkout.phone);
  }

  async acceptTermsAndPlaceOrder() {
    await this.termsCheckbox.check();
    await this.placeOrderBtn.click();
  }

  async assertOrderSuccess() {
    await expect(
      this.orderHeading,
      'No se muestra el botón de pago con Wompi'
    ).toBeVisible();
  }
}
