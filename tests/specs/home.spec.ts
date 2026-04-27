import test from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { CategoryPage } from "../pages/CategoryPage";
import { PQRSPage } from "../pages/PQRSPage";

test.describe('Envío exitoso de formulario PQRS', () => {
  test('Enviar una PQRS exitosamente', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const categoryPage = new CategoryPage(page);
    const pqrsPage = new PQRSPage(page);

    await loginPage.navigate();
    await categoryPage.goToPQR();

    await pqrsPage.submitPQRS();
    await pqrsPage.assertPQRSCreated();
  });
});
