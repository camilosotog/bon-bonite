import { IUser } from '../interfaces/IUser';

const FIRST_NAMES = [
  'Valentina', 'Santiago', 'Camila', 'Sebastián', 'Isabella',
  'Mateo', 'Sofía', 'Nicolás', 'Salomé', 'Andrés',
  'Daniela', 'Julián', 'Mariana', 'Felipe', 'Laura',
  'Alejandro', 'Paula', 'Esteban', 'Natalia', 'Tomás',
];

const LAST_NAMES = [
  'García', 'Rodríguez', 'Martínez', 'López', 'González',
  'Pérez', 'Sánchez', 'Ramírez', 'Torres', 'Flores',
  'Rivera', 'Gómez', 'Díaz', 'Reyes', 'Morales',
  'Cruz', 'Vargas', 'Herrera', 'Mendoza', 'Castillo',
];

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom<T>(arr: T[]): T {
  return arr[randomInt(0, arr.length - 1)];
}

export function randomCedula(): string {
  // Cédulas colombianas: entre 8 y 10 dígitos, primer dígito no cero
  const length = randomInt(8, 10);
  const firstDigit = randomInt(1, 9).toString();
  const rest = Array.from({ length: length - 1 }, () => randomInt(0, 9)).join('');
  return firstDigit + rest;
}

export function randomFirstName(): string {
  return pickRandom(FIRST_NAMES);
}

export function randomLastName(): string {
  return pickRandom(LAST_NAMES);
}

export function randomEmail(firstName: string, lastName: string): string {
  const suffix = randomInt(1000, 9999);
  const clean = (s: string) =>
    s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '');
  return `${clean(firstName)}.${clean(lastName)}${suffix}@mailtest.com`;
}

export function randomPassword(): string {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  const symbols = '!@#$%^&*.-_';
  const all = upper + lower + digits + symbols;

  // Garantiza al menos un carácter de cada grupo (requisito habitual de contraseñas)
  const required = [
    upper[randomInt(0, upper.length - 1)],
    lower[randomInt(0, lower.length - 1)],
    digits[randomInt(0, digits.length - 1)],
    symbols[randomInt(0, symbols.length - 1)],
  ];

  const extra = Array.from({ length: randomInt(8, 12) }, () => all[randomInt(0, all.length - 1)]);
  const password = [...required, ...extra].sort(() => Math.random() - 0.5).join('');
  return password;
}

export function randomUser(): IUser {
  const firstName = randomFirstName();
  const lastName = randomLastName();
  return {
    cedula: randomCedula(),
    firstName,
    lastName,
    email: randomEmail(firstName, lastName),
    password: randomPassword(),
  };
}
