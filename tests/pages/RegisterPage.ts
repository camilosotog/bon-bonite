import { Page, Locator, expect } from '@playwright/test';
import { IUser } from '../interfaces/IUser';

export class RegisterPage {
  readonly page: Page;

  // Locators
  private readonly accountMenuToggle: Locator;
  private readonly showRegisterBtn: Locator;
  private readonly cedulaInput: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;
  private readonly termsCheckbox: Locator;
  private readonly submitBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountMenuToggle = page.locator('#toggle-account-menu > .hover\\:opacity-70');
    this.showRegisterBtn    = page.locator('#show_register');
    this.cedulaInput        = page.getByRole('textbox', { name: 'Número de cédula Obligatorio' });
    this.firstNameInput     = page.locator('#first_name');
    this.lastNameInput      = page.locator('#last_name');
    this.emailInput         = page.getByRole('textbox', { name: 'Dirección de correo electrónico Obligatorio' });
    this.passwordInput      = page.getByRole('textbox', { name: 'Contraseña Obligatorio', exact: true });
    this.confirmPasswordInput = page.getByRole('textbox', { name: 'Confirmar contraseña' });
    this.termsCheckbox      = page.getByRole('checkbox', { name: 'Autorizo el tratamiento de' });
    this.submitBtn          = page.getByRole('button', { name: 'Registrarme' });
  }

  async navigate() {
    await this.page.goto('/mi-cuenta/');
  }

  async openRegisterModal() {
    await this.showRegisterBtn.waitFor({ state: 'visible' });
    await this.showRegisterBtn.click();
    // Esperar a que el formulario de registro esté completamente visible
    await this.cedulaInput.waitFor({ state: 'visible' });
  }

  async fillForm(user: IUser) {
    await this.cedulaInput.fill(user.cedula);
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.password);
    await this.termsCheckbox.check();
  }

  async submit() {
    await this.submitBtn.click();
  }

  async register(user: IUser) {
    await this.openRegisterModal();
    await this.fillForm(user);
    await this.submit();
  }

  async assertRegistrationFailure() {
    await expect(
      this.page.getByText('Error en el registro'),
      'No se muestra el mensaje de error'
    ).toBeVisible();
  }

  async assertRegistrationSuccess(user: IUser) {
    await expect(
      this.page,
      'No se redirigió a la página de mi cuenta'
    ).toHaveURL(/mi-cuenta/);

    await expect(
      this.page.getByRole('heading', { name: `Hola, ${user.firstName.split(' ')[0]}.` }),
      'No se muestra el mensaje de bienvenida'
    ).toBeVisible();

    await expect(
      this.submitBtn,
      'El botón de registro sigue visible tras registrarse'
    ).not.toBeVisible();
  }
}
