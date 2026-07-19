# IMS Global Supply — Sitio Web Corporativo

Sitio web corporativo de IMS Global Supply S.A., distribuidor panameño de suministros industriales y marinos con más de 30 años de trayectoria. Cliente principal: Autoridad del Canal de Panamá (ACP).

## Estructura del proyecto

```
ims/
├── index.html          Página única (framework DCLogic — ver CLAUDE/CLAUDE.md)
├── config.js            Correo, WhatsApp, ubicación, GPS y API key de Maps — ÚNICO lugar a editar
├── .htaccess             Reglas de servidor (bloquea listados y archivos internos)
├── robots.txt            Reglas para buscadores (actualizar dominio en producción)
├── sitemap.xml           Mapa del sitio (actualizar dominio en producción)
├── css/
│   ├── style.css        Fuente editable — animaciones y efectos que no pueden ir inline
│   └── style.min.css     Versión minificada — la que carga index.html en producción
├── js/
│   └── support.js        Runtime del framework DCLogic — NO TOCAR
├── assets/
│   ├── ims-logo.png       Logo del header / favicon / Open Graph
│   └── img/                Fotos de producto y logos de marcas representadas
└── CLAUDE/
    └── CLAUDE.md         Especificación técnica y reglas de edición del proyecto
```

## Configuración de contacto y ubicación

Todo dato que pueda cambiar (correo, WhatsApp, ubicación, coordenadas GPS del mapa) vive en **`config.js`**, no en `index.html`:

```js
window.IMS_CONFIG = {
  email: 'correo@dominio.com',
  whatsapp: '50765734143',       // solo dígitos, sin "+"
  ubicacion: 'Texto mostrado en la sección de contacto',
  zonaHoraria: 'GMT-5',
  gps: { lat: 0.0, lng: 0.0 },    // mueve el pin del mapa embebido
  googleMapsApiKey: '',           // ver sección "Mapa de Google" abajo
  emailjs: { serviceId: '', templateId: '', publicKey: '' }  // ver sección "Envío de correo" abajo
};
```

Editar solo este archivo actualiza automáticamente: el enlace de WhatsApp (header, menú móvil, hero, botón flotante, sección de contacto), el envío del formulario, el texto de ubicación/horario y el mapa embebido de Google Maps. No es necesario tocar `index.html` para estos cambios.

## Envío de correo del formulario

El formulario intenta enviar por **EmailJS** (directo, sin abrir nada en el navegador del visitante) y si no está configurado, cae automáticamente a `mailto:` (abre el cliente de correo del usuario) — el sitio nunca se rompe por falta de configuración.

Para activar el envío directo (gratis, ~5 min):

1. Crear cuenta en [emailjs.com](https://www.emailjs.com/).
2. **Email Services** → *Add New Service* → conectar el Gmail de `config.js` → copiar el **Service ID**.
3. **Email Templates** → *Create New Template* → usar las variables `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{message}}`, `{{to_email}}` en el cuerpo → copiar el **Template ID**.
4. **Account → General** → copiar la **Public Key**.
5. Pegar los 3 valores en `config.js` → `emailjs`.

Mientras cualquiera de los 3 campos esté vacío, sigue funcionando como antes (mailto). Si EmailJS falla al enviar (por ejemplo sin internet), también cae a mailto automáticamente.

## Mapa de Google

Sin una API key, el mapa se muestra pero da error ("No se pudo cargar la información del lugar") al hacer click en el pin — es una limitación del embed sin key. Para tener el mapa completo:

1. Ir a [console.cloud.google.com](https://console.cloud.google.com/), crear/seleccionar un proyecto.
2. Habilitar **Maps Embed API**.
3. Credenciales → Crear credencial → Clave de API.
4. Restringir la clave por *Referentes HTTP* y agregar `http://localhost/*` (desarrollo) y el dominio real cuando se despliegue (ej. `https://tudominio.com/*`).
5. Pegar la clave en `config.js` → `googleMapsApiKey`.

Mientras el campo esté vacío, el sitio sigue funcionando con el mapa básico (sin necesidad de key).

## Marcas / certificaciones

El cintillo de marcas en la sección "Clientes" usa imágenes reales de `assets/img/`, definidas en el arreglo `brandSlots` dentro de `index.html` (bloque `<script type="text/x-dc" data-dc-script>`). Para agregar o cambiar una marca, editar ese arreglo con `{ id, label, src }`.

## CSS minificado

No hay build step, así que `style.min.css` se genera y mantiene a mano. `index.html` carga `style.min.css`, **no** `style.css`. Al editar estilos:

1. Editar `css/style.css` (fuente legible).
2. Copiar el contenido a `css/style.min.css` quitando espacios, saltos de línea y comentarios (o pedirle a Claude que lo regenere).

No se minificó `index.html` ni `js/support.js`: el primero lo parsea un runtime propietario (DCLogic) sensible a la estructura de sus tags (`<x-dc>`, `<helmet>`, `<sc-if>`, `<sc-for>`) y el segundo ya viene generado/compilado — minificarlos agrega riesgo sin beneficio real en un sitio de una sola página.

## Reglas de edición

Ver [CLAUDE/CLAUDE.md](CLAUDE/CLAUDE.md) para las reglas completas del framework DCLogic, paleta de colores, tipografía y convenciones del proyecto. Resumen:

- No modificar `js/support.js`.
- No hardcodear correo, WhatsApp ni GPS — siempre leer de `window.IMS_CONFIG`.
- No agregar dependencias externas (Tailwind, Bootstrap, librerías de íconos). Solo Google Fonts Barlow y el SDK de EmailJS (para el envío de correo).
- Mantener paleta, tipografía y `max-width:1100px` en cualquier sección nueva.

## Despliegue

Sitio 100% estático (HTML/CSS/JS), sin backend ni build step. Se sirve directamente vía Apache (XAMPP) desde esta carpeta. El formulario de contacto envía por EmailJS si está configurado, o cae a `mailto:` si no (ver "Envío de correo del formulario").

`.htaccess` bloquea el listado de directorios y el acceso directo a archivos internos (`.md`, ocultos, backups) para evitar exposición de documentación o configuración sensible desde fuera.

### Antes de pasar a producción

- [ ] Configurar `googleMapsApiKey` en `config.js` y restringir la clave al dominio real (ver sección "Mapa de Google").
- [ ] Configurar `emailjs` en `config.js` para envío directo del formulario (ver sección "Envío de correo del formulario").
- [ ] Reemplazar `https://TUDOMINIO.com/` en `robots.txt` y `sitemap.xml` por el dominio definitivo.
- [ ] Confirmar `ubicacion` y `gps` en `config.js` (actualmente: Edificio Toledo, Punta Paitilla, Av. Balboa).
- [ ] Conseguir foto real de instalaciones/bodega para el slot `perfil-empresa` y foto de equipo de trabajo para `contacto-img` — hoy quedan sin imagen porque no hay ningún archivo en `assets/img/` que corresponda a esas dos secciones (todas las demás imágenes de producto y marcas ya están asignadas).
