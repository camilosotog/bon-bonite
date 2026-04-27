import { Page, Locator, expect } from '@playwright/test';
import { readPQRSFromCsv } from '../helpers/csvReader';
import path from 'node:path';

const pqrsData = readPQRSFromCsv(path.resolve('tests/data/pqrs.csv'))[0];

export class PQRSPage {
  readonly page: Page;

  // Locators
  private readonly puntoDeVentaSelect: Locator;
  private readonly nombreCompletoInput: Locator;
  private readonly direccionInput: Locator;
  private readonly tipoDocumentoSelect: Locator;
  private readonly numeroDocumentoInput: Locator;
  private readonly telefonoInput: Locator;
  private readonly correoInput: Locator;
  private readonly tipoPQRSInput: Locator;
  private readonly causaSelect: Locator;
  private readonly descripcionInput: Locator;
  private readonly terminosCheckbox: Locator;
  private readonly crearPQRSBtn: Locator;
  private readonly numeroRadicadoHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.puntoDeVentaSelect       = page.getByLabel('Selecciona un punto de venta').getByText('Selecciona un punto de venta');
    this.nombreCompletoInput      = page.getByRole('textbox', { name: 'Nombre completo del cliente *' });
    this.direccionInput           = page.getByRole('textbox', { name: 'Dirección y ciudad *' });
    this.tipoDocumentoSelect      = page.getByLabel('Selecciona el tipo de').getByText('Selecciona el tipo de');
    this.numeroDocumentoInput     = page.getByRole('textbox', { name: 'Número de documento *' });
    this.telefonoInput            = page.getByRole('textbox', { name: 'Teléfono *' });
    this.correoInput              = page.getByRole('textbox', { name: 'Correo electrónico *' });
    this.tipoPQRSInput            = page.getByRole('textbox', { name: 'Selecciona una opción' });
    this.causaSelect              = page.getByLabel('Elige la causa relacionada').getByText('Elige la causa relacionada');
    this.descripcionInput         = page.getByRole('textbox', { name: 'Descripción de la solicitud *' });
    this.terminosCheckbox         = page.locator('.forminator-checkbox-box');
    this.crearPQRSBtn             = page.getByRole('button', { name: 'CREAR PQRS' });
    this.numeroRadicadoHeading    = page.getByRole('heading', { name: 'Número de radicado:' });
  }

  async fillForm() {
    await this.puntoDeVentaSelect.click();
    await this.page.getByRole('option', { name: pqrsData.puntoDeVenta }).click();

    await this.nombreCompletoInput.fill(pqrsData.nombreCompleto);
    await this.direccionInput.fill(pqrsData.direccion);

    await this.tipoDocumentoSelect.click();
    await this.page.getByRole('option', { name: pqrsData.tipoDocumento }).click();

    await this.numeroDocumentoInput.fill(pqrsData.numeroDocumento);
    await this.telefonoInput.fill(pqrsData.telefono);
    await this.correoInput.fill(pqrsData.correo);

    await this.tipoPQRSInput.click();
    await this.page.getByRole('option', { name: pqrsData.tipoPQRS }).click();

    await this.causaSelect.click();
    await this.page.getByRole('option', { name: pqrsData.causa }).click();

    await this.descripcionInput.fill(pqrsData.descripcion);
  }

  async acceptTerms() {
    await this.terminosCheckbox.click();
  }

  async submit() {
    await this.crearPQRSBtn.click();
  }

  async submitPQRS() {
    await this.fillForm();
    await this.acceptTerms();
    await this.submit();
  }

  async assertPQRSCreated() {
    await expect(
      this.numeroRadicadoHeading,
      'No se encontró el número de radicado: la PQRS no fue creada exitosamente'
    ).toBeVisible();
  }
}
