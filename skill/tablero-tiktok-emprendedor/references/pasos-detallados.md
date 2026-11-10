# Pasos detallados

Los nombres de botones están en inglés porque así los muestran GitHub y Vercel. Si el navegador los traduce, busca el mismo lugar.

---

## RUTA A · Solo navegador (20-30 min)

### Etapa 1 · Crear las 3 cuentas

**1a · GitHub** (omítelo si ya tienes)
1. Entra a https://github.com/signup y crea tu cuenta (correo, contraseña, nombre de usuario).
2. Confirma tu correo con el código que te llega.
3. Resultado: ves tu página de inicio de GitHub y tu usuario arriba a la derecha.

**1b · Vercel**
1. Entra a https://vercel.com/signup.
2. Elige el plan **Hobby** (gratis, para uso personal) y escribe tu nombre.
3. Pulsa **Continue with GitHub** y autoriza.
4. Resultado: ves el panel de Vercel vacío.

**1c · Windsor.ai**
1. Entra a https://onboard.windsor.ai y crea tu cuenta (puedes usar tu correo de Google).
2. Resultado: ves el panel de Windsor.

### Etapa 2 · Conectar tu cuenta de TikTok con Windsor
1. En Windsor busca **Data Sources** (o el botón **+ Add data source / Add new connector**).
2. En el buscador escribe `TikTok` y elige **TikTok Organic**. Ojo: no "TikTok Ads".
3. Pulsa **Connect / Authorize**. Se abre TikTok: inicia sesión con **la cuenta de tu negocio** y acepta los permisos.
4. Vuelves a Windsor. Resultado: tu cuenta de TikTok aparece en la lista de cuentas conectadas, con tu nombre.
5. Si sale un error de permisos, normalmente se arregla pasando tu cuenta de TikTok a tipo **Business** (en TikTok: Configuración y privacidad → Cuenta → Cambiar a cuenta de empresa) y reconectando.

### Etapa 3 · Copiar la plantilla a tu GitHub
1. Abre https://github.com/pruebacursoads/tablero-tiktok-plantilla
2. Arriba a la derecha pulsa el botón verde **Use this template** → **Create a new repository**.
3. En **Repository name** escribe `tablero-tiktok`.
4. Marca **Private** (privado).
5. Pulsa **Create repository** y espera unos segundos.
6. Resultado: ves tu propio repositorio con las carpetas `public`, `scripts` y `.github`, y tu usuario delante del nombre.

### Etapa 4 · Darle a tu tablero la llave de Windsor
1. En Windsor abre **Account settings** (menú de tu perfil, arriba a la derecha) y copia tu **API key**. Si no la encuentras, busca "API key" en la ayuda de Windsor.
2. En tu repositorio de GitHub entra a **Settings** (pestaña con engranaje).
3. A la izquierda: **Secrets and variables** → **Actions**.
4. Pulsa el botón verde **New repository secret**.
5. **Name:** `WINDSOR_API_KEY` (exactamente así, en mayúsculas).
6. **Secret:** pega tu API key. No se la compartas a nadie, ni a Claude por chat.
7. Pulsa **Add secret**.
8. Resultado: en "Repository secrets" aparece `WINDSOR_API_KEY` con un candado. La clave ya no se vuelve a mostrar; es normal.

### Etapa 5 · Primera actualización real
1. En tu repositorio pulsa la pestaña **Actions**.
2. Si aparece un aviso "Workflows aren't being run on this repository", pulsa **I understand my workflows, go ahead and enable them**.
3. A la izquierda elige **Actualizar datos de TikTok**.
4. Pulsa **Run workflow** (a la derecha) y luego el botón verde **Run workflow**.
5. Espera 1-2 minutos y recarga la página. Resultado: una fila con ✅ verde.
6. Si sale ❌ rojo, abre la fila, lee el mensaje y ve a `solucion-de-problemas.md`.

### Etapa 6 · Publicar con Vercel
1. Entra a https://vercel.com/new
2. Si te lo pide, pulsa **Adjust GitHub App Permissions** y da acceso al repositorio `tablero-tiktok`.
3. Junto a `tablero-tiktok` pulsa **Import**.
4. No cambies nada. Pulsa **Deploy**.
5. Espera 1 minuto. Resultado: confeti y un enlace tipo `tablero-tiktok-xxxx.vercel.app`. Ábrelo.

### Etapa 7 · Comprobar
- El tablero muestra tu nombre de cuenta y tus números reales.
- NO aparece el aviso amarillo de "datos de ejemplo". Si aparece, la Etapa 5 no terminó en verde o Vercel desplegó antes: corrige la Etapa 5 y espera 1-2 minutos, porque Vercel se actualiza solo.
- En Vercel → **Deployments** debe aparecer un despliegue con el mensaje "Datos TikTok" y la fecha de hoy.
- Guárdalo en el celular: abre el enlace → menú del navegador → **Añadir a pantalla de inicio**.
- Mañana después de las 7:00 am: nueva fila en Actions con la etiqueta *Scheduled*.

---

## RUTA B · Claude hace lo técnico

Requisitos: app de escritorio de Claude con la pestaña **Code**, y tener hechas las Etapas 1 y 2 de la Ruta A (las cuentas y la conexión de TikTok), que siempre las hace el usuario.

1. Claude comprueba GitHub CLI con `gh --version`. Si no está: https://cli.github.com
2. Inicio de sesión una sola vez: `gh auth login` (GitHub.com → HTTPS → "Login with a web browser"). El usuario copia el código de 8 caracteres en https://github.com/login/device y autoriza.
3. **Permiso extra obligatorio:** `gh auth refresh -h github.com -s workflow` (otro código de 8 caracteres en el mismo enlace). Sin esto GitHub rechaza el archivo de la automatización.
4. Claude crea el repositorio privado desde la plantilla:
   `gh repo create tablero-tiktok --template pruebacursoads/tablero-tiktok-plantilla --private --clone`
   Alternativa sin acceso a la plantilla: copiar `assets/plantilla/` a una carpeta nueva, `git init`, hacer commit y `gh repo create tablero-tiktok --private --source=. --push`.
5. **La API key la pega el usuario, nunca en el chat.** Opción (a): Etapa 4 de la Ruta A en la web. Opción (b): en una terminal propia, `gh secret set WINDSOR_API_KEY` y pegar cuando lo pida.
6. Claude lanza la primera ejecución con `gh workflow run actualizar.yml`, la vigila con `gh run watch` y confirma el mensaje "OK: N días y N videos".
7. Vercel: Etapa 6 de la Ruta A (clics en la web).
8. Claude verifica con la sección "Cómo verificar que funciona" del SKILL.md.

Notas de Windows: si la terminal no muestra el aviso interactivo, Claude puede lanzar el comando en segundo plano, leer el código de 8 caracteres de su salida y dárselo al usuario.
