import test from "@playwright/test"
import { readUsersFromCsv, readCheckoutFromCsv } from '../helpers/csvReader';
import { LoginPage } from '../pages/LoginPage';
import path from 'path';
import { BuyPage } from "../pages/BuyPage";

const USER_INDEX = 4;
const users = readUsersFromCsv(path.resolve(__dirname, '../data/users.csv'));
const user = users[USER_INDEX];

const CHECKOUT_INDEX = parseInt(process.env.TEST_CHECKOUT_INDEX ?? '0', 10);
const checkouts = readCheckoutFromCsv(path.resolve(__dirname, '../data/checkout.csv'));
const checkout = checkouts[CHECKOUT_INDEX];

test.describe('Flujo completo de compra de producto (E2E)', () => {
  test('Compra exitosa de un producto (flujo completo)', async ({ page }) => {
    const loginPage = new LoginPage(page);
      const buyPage = new BuyPage(page);

      await loginPage.navigate();
      await loginPage.login({ cedula: user.cedula, password: user.password });

      await buyPage.goToAccessories();
      await buyPage.selectFirstProduct();
      await buyPage.buyNow();
      await buyPage.goToCheckout();
      await buyPage.continue();
      await buyPage.fill(checkout);
      await buyPage.acceptTermsAndPlaceOrder();
      await page.waitForTimeout(5000); // Espera adicional para asegurar que la página de Wompi cargue completamente
      await buyPage.assertOrderSuccess();
  })

  test('Agregar producto al carrito sin iniciar sesión', async ({ page }) => {
    const buyPage = new BuyPage(page);

    await page.goto('/');
    await buyPage.goToBolsos();
    await buyPage.selectSecondProduct();
    await buyPage.addToCart();
    await buyPage.assertCartCounterUpdated();
  })
})

