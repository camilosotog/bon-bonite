import test from "@playwright/test";
import { readUsersFromCsv } from "../helpers/csvReader";
import { randomFirstName } from "../helpers/randomData";
import path from "node:path";
import { LoginPage } from "../pages/LoginPage";
import { ProfilePage } from "../pages/ProfilePage";

test.describe('Modificar datos del perfil de usuario', () => {

  const csvUsers = readUsersFromCsv(path.resolve('tests/data/users.csv'));

  for (const user of csvUsers) {
    test(`Modificar datos del perfil de usuario - ${user.firstName} ${user.lastName} (${user.cedula})`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const profilePage = new ProfilePage(page);
      const newFirstName = randomFirstName();

      await loginPage.navigate();
      await loginPage.login({ cedula: user.cedula, password: user.password });
      await profilePage.updateFirstName(newFirstName);
      await profilePage.assertFirstNameUpdated(newFirstName);
    });
  }

});
