import { Page, Locator, expect } from '@playwright/test';
import { ILoginCredentials } from '../interfaces/ILoginCredentials';

export class LoginPage {
  readonly page: Page;

  // Locators
  private readonly cedulaInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cedulaInput  = page.getByRole('textbox', { name: 'Número de cédula Obligatorio' });
    this.passwordInput = page.getByRole('textbox', { name: 'Contraseña Obligatorio' });
    this.submitBtn    = page.getByRole('button', { name: 'Iniciar Sesión' });
  }

  async navigate() {
    await this.page.goto('/mi-cuenta/');
    await this.cedulaInput.waitFor({ state: 'visible' });
  }

  async fillForm(credentials: ILoginCredentials) {
    await this.cedulaInput.fill(credentials.cedula);
    await this.passwordInput.fill(credentials.password);
  }

  async submit() {
    await this.submitBtn.click();
  }

  async login(credentials: ILoginCredentials) {
    await this.fillForm(credentials);
    await this.submit();
  }

  async assertLoginSuccess(firstName: string) {
    await expect(
      this.page,
      'No se redirigió a la página de mi cuenta tras el login'
    ).toHaveURL(/mi-cuenta/);

    await expect(
      this.page.getByRole('heading', { name: `Hola, ${firstName}.` }),
      'No se muestra el mensaje de bienvenida tras el login'
    ).toBeVisible();

    await expect(
      this.submitBtn,
      'El botón de Iniciar Sesión sigue visible tras autenticarse'
    ).not.toBeVisible();
  }

  async assertLoginFailure() {
    await expect(
      this.page.getByText('Error en el inicio de sesión'),
      'No se muestra el mensaje de error tras un login fallido'
    ).toBeVisible();
  }
}
