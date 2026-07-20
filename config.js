// ============================================
// CONFIGURACIÓN DE CONTACTO — IMS Global Supply
// ============================================
// Edita SOLO estos valores. Los cambios se reflejan
// automáticamente en todo el sitio sin tocar
// index.html ni la lógica del componente.
//
// Este archivo es la ÚNICA fuente de verdad para
// correo, WhatsApp y posición GPS del mapa.
// No debe haber estos datos hardcodeados en index.html.
// ============================================

window.IMS_CONFIG = {

  // Correo donde llegan las cotizaciones del formulario
  email: 'sorayas@imsgspty.com',

  // Número de WhatsApp SIN el signo "+" (solo dígitos)
  // Ejemplo para Panamá: 50768343187
  whatsapp: '50768343187',

  // Datos de ubicación (texto mostrado en la sección de contacto)
  ubicacion: 'Edificio Toledo, Punta Paitilla, Avenida Balboa, Ciudad de Panamá, Panamá',
  zonaHoraria: 'GMT-5',

  // Posición GPS para el mapa embebido (Google Maps)
  // Edificio Toledo — Editar aquí para mover el pin, NO tocar el iframe en index.html
  gps: {
    lat: 8.9750876,
    lng: -79.5153771
  },

  // API Key de Google Maps (Maps Embed API)
  // Sin esta clave, el mapa se ve pero da "Error al cargar la información
  // del lugar" al hacer click en el pin — es una limitación del embed sin key.
  //
  // Cómo obtenerla:
  // 1. https://console.cloud.google.com/ → crear/seleccionar proyecto
  // 2. Habilitar "Maps Embed API"
  // 3. Credenciales → Crear credencial → Clave de API
  // 4. Restringir la clave por "Referentes HTTP" y agregar:
  //    - http://localhost/*  (desarrollo)
  //    - https://tudominio.com/*  (producción, agregar cuando se despliegue)
  // 5. Pegar la clave abajo
  //
  // Mientras esté vacía, el sitio sigue funcionando con el mapa básico (sin key).
  googleMapsApiKey: '',

  // EmailJS — envía el formulario de cotización directo al correo de arriba
  // sin abrir el cliente de correo del usuario (sin backend, gratis hasta
  // 200 envíos/mes).
  //
  // Cómo obtener las 3 claves (5 min, gratis):
  // 1. https://www.emailjs.com/ → crear cuenta gratis
  // 2. Email Services → Add New Service → conectar tu Gmail → copiar el
  //    "Service ID"
  // 3. Email Templates → Create New Template → usar variables
  //    {{from_name}} {{from_email}} {{phone}} {{message}} {{to_email}}
  //    en el cuerpo del template → copiar el "Template ID"
  // 4. Account → General → copiar el "Public Key"
  // 5. Pegar los 3 valores abajo
  //
  // Mientras cualquiera de los 3 esté vacío, el formulario sigue funcionando
  // como antes: abre el cliente de correo del usuario con el mensaje listo
  // (mailto:) — así el sitio nunca se rompe por falta de configuración.
  emailjs: {
    serviceId: '',
    templateId: '',
    publicKey: ''
  }
};
