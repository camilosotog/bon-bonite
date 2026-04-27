import * as fs from 'fs';
import * as path from 'path';
import { IUser } from '../interfaces/IUser';
import { ICheckout } from '../interfaces/ICheckout';
import { IPQRS } from '../interfaces/IPQRS';

export function readUsersFromCsv(filePath: string): IUser[] {
  const absolutePath = path.resolve(filePath);
  const content = fs.readFileSync(absolutePath, 'utf-8');
  const lines = content.split('\n').map(l => l.trim()).filter(Boolean);

  // La primera línea es el encabezado
  const [_header, ...rows] = lines;

  return rows.map(row => {
    const [cedula, firstName, lastName, email, password, phone] = row.split(',');
    return { cedula, firstName, lastName, email, password, phone };
  });
}

export function readCheckoutFromCsv(filePath: string): ICheckout[] {
  const absolutePath = path.resolve(filePath);
  const content = fs.readFileSync(absolutePath, 'utf-8');
  const lines = content.split('\n').map(l => l.trim()).filter(Boolean);

  const [_header, ...rows] = lines;

  return rows.map(row => {
    const [department, city, address, phone] = row.split(',');
    return { department, city, address, phone };
  });
}

export function readPQRSFromCsv(filePath: string): IPQRS[] {
  const absolutePath = path.resolve(filePath);
  const content = fs.readFileSync(absolutePath, 'utf-8');
  const lines = content.split('\n').map(l => l.trim()).filter(Boolean);

  const [_header, ...rows] = lines;

  return rows.map(row => {
    const [puntoDeVenta, nombreCompleto, direccion, tipoDocumento, numeroDocumento, telefono, correo, tipoPQRS, causa, descripcion] = row.split(',');
    return { puntoDeVenta, nombreCompleto, direccion, tipoDocumento, numeroDocumento, telefono, correo, tipoPQRS, causa, descripcion };
  });
}
