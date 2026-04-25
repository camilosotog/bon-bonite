# Proyecto Playwright - Bon Bonite

Proyecto de testing automatizado con Playwright para pruebas de aplicaciones web.

## 📋 Requisitos Previos

- Node.js 18+ instalado
- npm o yarn como gestor de paquetes

## 🚀 Instalación

1. **Clonar o crear el proyecto:**
   ```bash
   cd bon-bonite
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Instalar navegadores de Playwright:**
   ```bash
   npx playwright install
   ```

## 🧪 Ejecución de Tests

### Ejecutar todos los tests
```bash
npm test
```

### Ejecutar tests en modo interfaz (UI)
```bash
npm run test:ui
```

### Ejecutar tests en modo debug
```bash
npm run test:debug
```

### Ejecutar tests con navegador visible
```bash
npm run test:headed
```

### Ejecutar tests en navegadores específicos
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

## 🎬 Generar Tests Automáticamente

Usa Playwright Codegen para grabar interacciones:

```bash
npm run codegen https://example.com
```

Esto abre un navegador donde puedes interactuar, y Playwright genera el código de test automáticamente.

## 📁 Estructura del Proyecto

```
bon-bonite/
├── tests/
│   ├── example.spec.ts      # Tests básicos de ejemplo
│   └── advanced.spec.ts     # Tests avanzados
├── playwright.config.ts      # Configuración de Playwright
├── package.json             # Dependencias del proyecto
├── .gitignore              # Archivos a ignorar en Git
└── README.md               # Este archivo
```

## 📝 Archivos de Test

### `tests/example.spec.ts`
Contiene ejemplos básicos:
- Navegación a sitios web
- Búsquedas
- Capturas de pantalla
- Interacción con elementos

### `tests/advanced.spec.ts`
Contiene ejemplos avanzados:
- Esperas de elementos
- Clics en botones
- Relleno de formularios
- Validaciones múltiples
- Manejo de eventos
- Ejecución de JavaScript

## ⚙️ Configuración

El archivo `playwright.config.ts` contiene:
- Configuración de navegadores (Chromium, Firefox, WebKit)
- Timeouts y reintentos
- Reporter HTML
- Trace de debugging

### Habilitar servidor local
Si necesitas correr un servidor antes de los tests, descomenta en `playwright.config.ts`:

```typescript
webServer: {
  command: 'npm run dev',
  url: 'http://127.0.0.1:3000',
  reuseExistingServer: !process.env.CI,
}
```

## 📊 Reportes

Después de ejecutar los tests, se genera un reporte HTML:

```bash
npx playwright show-report
```

## 🔗 Recursos Útiles

- [Documentación Oficial](https://playwright.dev/)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging](https://playwright.dev/docs/debug)

## 📦 Dependencias

- `@playwright/test`: Framework de testing con Playwright

## 🤝 Contribuir

1. Crea nuevos tests en la carpeta `tests/`
2. Sigue la convención de nombrado: `*.spec.ts`
3. Ejecuta los tests antes de hacer commit

## 📄 Licencia

ISC

---

¡Happy Testing! 🎭
