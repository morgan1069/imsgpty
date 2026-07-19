Proyecto
Sitio web corporativo de IMS Global Supply S.A., distribuidor panameño de suministros industriales y marinos con más de 30 años. Cliente principal: Autoridad del Canal de Panamá (ACP). Tono: profesional, industrial, confiable. Sin decoración innecesaria.


**CLAUDE.md**

```markdown
# CLAUDE.md — IMS Global Supply

## Proyecto

Sitio web corporativo de IMS Global Supply S.A., distribuidor panameño de suministros industriales y marinos con más de 30 años. Cliente principal: Autoridad del Canal de Panamá (ACP). Tono: profesional, industrial, confiable. Sin decoración innecesaria.

## Archivos

```
/proyecto-ims
├── index.html
├── config.js          ← AQUÍ se cambian correo y WhatsApp
├── css/style.css
├── js/support.js      ← NO TOCAR
└── assets/
    ├── ims-logo.png
    └── (imágenes vinculadas por image-slot)
```

## Configuración de Contacto

Todo dato de contacto está en `config.js`. Para cambiar correo o WhatsApp, solo editar ese archivo:

```js
// config.js — Editar solo estos valores
window.IMS_CONFIG = {
  email: 'morgan.meyer@gmail.com',
  whatsapp: '50765734143',
  ubicacion: 'Ciudad de Panamá, Panamá',
  zonaHoraria: 'GMT-5'
};
```

El `renderVals()` del componente lee de `window.IMS_CONFIG`. El `handleSubmit` construye el `mailto:` usando `IMS_CONFIG.email`. El link de WhatsApp usa `IMS_CONFIG.whatsapp`. Nunca hardcodear estos valores en el HTML ni en la lógica del componente.

## Envío de Correo

El formulario sigue sin backend propio, pero envía directo por **EmailJS** (SDK cargado en `<head>`) cuando `window.IMS_CONFIG.emailjs` está completo. Si falta alguna clave, o si EmailJS falla al enviar, cae automáticamente a `mailto:` — el sitio nunca se rompe por falta de configuración.

Flujo en `handleSubmit`:
1. Lee `cfg.emailjs` (serviceId, templateId, publicKey). Si falta alguno o `window.emailjs` no cargó → `sendByMailto()`.
2. Si está completo, arma `params` (`from_name`, `from_email`, `phone`, `message`, `to_email: cfg.email`) y llama `window.emailjs.send(serviceId, templateId, params, publicKey)`.
3. Éxito → `formStatus: true, sentMethod: 'emailjs'`. Fallo → `sendByMailto()` como respaldo.
4. `sendByMailto()` construye el `mailto:` igual que antes (subject codificado `"Solicitud de cotización - {nombre}"`, body con los 4 campos) y hace `window.location.href = mailtoLink`, con `sentMethod: 'mailto'`.
5. El mensaje de confirmación (`confirmMessage` en `renderVals()`) cambia de texto según `sentMethod`.

Nunca hardcodear las claves de EmailJS — siempre leer de `window.IMS_CONFIG.emailjs`.

Requisitos del form:
- Todos los campos obligatorios excepto teléfono
- Validación nativa del navegador (`required`, `type="email"`)
- El mensaje de confirmación aparece con `<sc-if value="{{ formStatus }}">` y desaparece si el usuario modifica cualquier campo del form
- Al limpiar `formStatus`: hacerlo en cada setter (`setName`, `setEmail`, `setPhone`, `setMessage`)

## Framework (NO usar React/Vue/Svelte)

Etiquetas:
- `<x-dc>` — Envoltorio del componente
- `<helmet>` — Inyección en `<head>`
- `<sc-if value="{{ expr }}">` — Condicional, con `hint-placeholder-val` para preview
- `<sc-for list="{{ arr }}" as="item" hint-placeholder-count="N">` — Bucle
- `<image-slot id="nombre" shape="rect|circle" placeholder="texto">` — Imagen vinculada al proyecto

Lógica:
- Estado en `state = {}`, actualizar con `this.setState()`
- Todo dato dinámico se retorna en `renderVals()` como objeto plano
- Funciones se pasan como referencia: `handleSubmit: this.handleSubmit` (sin paréntesis)
- Bindings: `value="{{ var }}"`, `onChange="{{ fn }}"`, `onSubmit="{{ fn }}"`
- `style-hover="prop:val"` para hovers inline
- `componentDidMount()` para efectos, `componentUnmount()` para limpieza

## Imágenes

SIEMPRE usar `<image-slot>`. NUNCA `<img>` para contenido.

| ID | Contenido | Aspecto |
|---|---|---|
| `perfil-empresa` | Bodega o instalaciones | 4:5 |
| `productos-img-1-0` | Piezas metálicas para barcos | 5:4 |
| `productos-img-1-1` | Bombas de agua | 5:4 |
| `productos-img-1-2` | Hélices y ánodos de zinc | 5:4 |
| `productos-img-2-0` | Acoples de eje | 5:4 |
| `productos-img-2-1` | Acoples para tuberías | 5:4 |
| `productos-img-2-2` | Lámparas, luces navegación, sillas | 5:4 |
| `contacto-img` | Equipo de trabajo | 4:3 |
| `brand-1` a `brand-4` | Logos/certificaciones | 1:1 |

Excepción: logo en header (`<img src="assets/ims-logo.png">`) y fondo hero (CSS `url()`).

Nuevas imágenes: crear ID con patrón `seccion-descripcion-N`.

## Diseño

Paleta:
- Fondo principal: `#0f0f0f`
- Fondo secundario: `#141414`
- Fondo claro: `#fafafa`
- Header: degradado `linear-gradient(90deg,#164a76 0%,#0a2342 55%,#081a33 100%)` — azul navy con brillo hacia la izquierda, efecto ola marina
- Footer: `#081a33` — azul navy sólido, borde `#14345c`
- Perfil de la empresa: degradado sutil `linear-gradient(to left,#1c1c1c,#141414)`
- Nuestras líneas de productos: degradado `linear-gradient(to left,#282828,#0a0a0a)`
- Trabajemos en equipo (contacto): degradado radial hacia el centro `radial-gradient(circle at center,#1e1e1e 0%,#0a0a0a 100%)`
- Texto: `#fff`, `#c9c9c9`, `#a3a3a3`, `#8a8a8a`
- Números producto: `#6b6b6b`
- Bordes: `#262626`, `#444`
- WhatsApp: `#25D366`

Fuente: Barlow única. Pesos: 400 (párrafos), 600 (nav), 700 (botones/labels), 800 (subtítulos), 900 (títulos principales).

Contenedores: `max-width:1100px; margin:0 auto`. Fondo alternado entre secciones.

## style.css

Solo animaciones y efectos que no pueden ir inline:

```css
.hero-water { animation: heroDrift 25s ease-in-out infinite alternate; }
@keyframes heroDrift {
  0%   { transform: scale(1.05) translateX(0); }
  100% { transform: scale(1.10) translateX(-15px); }
}
.img-float { opacity: 0; transform: translateY(18px); animation: floatIn 0.9s ease forwards; }
@keyframes floatIn { to { opacity: 1; transform: translateY(0); } }
.marquee-track { animation: marqueeScroll 20s linear infinite; }
@keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
a { transition: color 0.2s, background 0.2s, transform 0.2s; }
input, textarea { font-family: inherit; }
```

No duplicar estilos que ya están inline.

## Comportamiento

- **Menú mobile:** umbral 860px. Toggle con `menuOpen`. Cada link cierra el menú.
- **Carrusel A:** 3 slides, 3200ms, crossfade opacity.
- **Carrusel B:** 3 slides, 3600ms, crossfade opacity. Dots: blanco activo, `#555` inactivo.
- **WhatsApp flotante:** fijo bottom-right, `z-index:200`, hover scale 1.06, enlace `wa.me/{CONFIG.whatsapp}`.
- **Mapa:** iframe Google Maps, filtro grayscale invertido para coincidir con tema oscuro.

## Reglas

1. No romper el framework DCLogic.
2. No cambiar IDs de image-slot.
3. No agregar dependencias (no Tailwind, Bootstrap, icon libs). Solo Google Fonts Barlow.
4. No tocar `support.js`.
5. No hardcodear email ni WhatsApp — leer de `window.IMS_CONFIG`.
6. Secciones nuevas: respetar paleta, tipografía, max-width, y alternar fondo.
7. Tono de texto: profesional cercano. Sin exclamation marks, sin "lo mejor", sin hard sell. Credibilidad por datos concretos.
8. Antes de modificar: leer los archivos actuales. Después: verificar que `renderVals()` retorna todo lo que el HTML espera.

## Flujo

1. Leer archivos actuales
2. Identificar qué cambia
3. Modificar solo lo necesario
4. Verificar: IDs intactos, renderVals completo, config.js referenciado, intervalos limpiados
5. Explicar en español qué se hizo
```

---

**config.js** (archivo nuevo que debes crear en la raíz del proyecto):

```js
// ============================================
// CONFIGURACIÓN DE CONTACTO — IMS Global Supply
// ============================================
// Edita estos valores. Los cambios se reflejan
// automáticamente en todo el sitio sin tocar
// index.html ni la lógica del componente.
// ============================================

window.IMS_CONFIG = {

  // Correo donde llegan las cotizaciones del formulario
  email: 'morgan.meyer@gmail.com',

  // Número de WhatsApp SIN el signo "+" (solo dígitos)
  // Ejemplo para Panamá: 50765734143
  // Ejemplo para Colombia: 573001234567
  whatsapp: '50765734143',

  // Datos de ubicación (se muestran en la sección de contacto)
  ubicacion: 'Ciudad de Panamá, Panamá',
  zonaHoraria: 'GMT-5'
};
```

---

Y en tu `index.html`, justo antes del cierre de `</body>`, agrega esta línea para que `config.js` cargue antes que el componente:

```html
<script src="./config.js"></script>
```

Quedaría así el orden al final del body:

```html
</x-dc>
<script type="text/x-dc" data-dc-script>
class Component extends DCLogic {
  // ...
}
</script>
<script src="./config.js"></script>
</body>
</html>
```