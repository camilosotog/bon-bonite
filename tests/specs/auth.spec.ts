import { test } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { randomUser } from '../helpers/randomData';
import { readUsersFromCsv } from '../helpers/csvReader';
import path from 'path';

test.describe('Registro', () => {

  test('Registro exitoso con datos aleatorios', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const user = randomUser();

    await registerPage.navigate();
    await registerPage.register(user);
    await registerPage.assertRegistrationSuccess(user);
  });

  const csvUsers = readUsersFromCsv(path.resolve('tests/data/users.csv'));
  for (const user of csvUsers) {
    test(`Registro exitoso - ${user.firstName} ${user.lastName} (${user.cedula})`, async ({ page }) => {
      const registerPage = new RegisterPage(page);

      await registerPage.navigate();
      await registerPage.register(user);
      await registerPage.assertRegistrationSuccess(user);
    });
  }

});

test.describe('Login', () => {

  const csvUsers = readUsersFromCsv(path.resolve('tests/data/users.csv'));

  for (const user of csvUsers) {
    test(`Login exitoso con credenciales válidas - ${user.firstName} ${user.lastName} (${user.cedula})`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.navigate();
      await loginPage.login({ cedula: user.cedula, password: user.password });
      await loginPage.assertLoginSuccess(user.firstName.split(' ')[0]);
    });

    test(`Login fallido con contraseña incorrecta - ${user.firstName} ${user.lastName} (${user.cedula})`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.navigate();
      await loginPage.login({ cedula: user.cedula, password: 'incorrectPassword' });
      await loginPage.assertLoginFailure();

    });
  }

});
