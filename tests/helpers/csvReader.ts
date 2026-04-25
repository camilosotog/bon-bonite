import * as fs from 'fs';
import * as path from 'path';
import { IUser } from '../interfaces/IUser';

export function readUsersFromCsv(filePath: string): IUser[] {
  const absolutePath = path.resolve(filePath);
  const content = fs.readFileSync(absolutePath, 'utf-8');
  const lines = content.split('\n').map(l => l.trim()).filter(Boolean);

  // La primera línea es el encabezado
  const [_header, ...rows] = lines;

  return rows.map(row => {
    const [cedula, firstName, lastName, email, password] = row.split(',');
    return { cedula, firstName, lastName, email, password };
  });
}
