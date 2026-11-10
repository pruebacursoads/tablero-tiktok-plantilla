---
name: tablero-tiktok-emprendedor
description: Guía completa y sin tecnicismos para que un emprendedor arme su propio tablero de TikTok que se actualiza solo cada día y le dice qué hacer, desde conectar su cuenta de TikTok con Windsor.ai hasta publicarlo con GitHub y Vercel. Úsala cuando el usuario diga "quiero mi tablero de TikTok", "dashboard de TikTok", "métricas de TikTok automáticas", "tablero de Hugo", "conectar TikTok con Windsor", o pida replicar el tablero accionable de El Marketero del Pueblo. Hugo López, El Marketero del Pueblo.
---

# Tablero TikTok para emprendedores

## Qué vas a lograr (dilo así al usuario al empezar)

Un enlace propio que el emprendedor abre cuando quiera y ve:
1. Un **semáforo** (🟢🟡🔴): ¿mi cuenta va bien esta semana?
2. **Qué hacer ahora**: hasta 4 acciones concretas con sus propios datos ("haz otro video como este", "tu perfil no convierte", "publica 2 videos más").
3. Sus números y sus videos ordenados por lo que realmente trae seguidores.

Se **actualiza solo todos los días a las 7:00 am**. No hay que volver a tocar nada.

Tiempo: unos 20-30 minutos la primera vez. Costo: $0 con los planes gratuitos de GitHub y Vercel. Windsor.ai tiene prueba gratuita; que el usuario revise su plan vigente.

## El recorrido completo (explícalo en una línea cada etapa)

| Etapa | Qué pasa | Dónde |
|---|---|---|
| 1 | Crear las 3 cuentas (Windsor, GitHub, Vercel) | web |
| 2 | Conectar TikTok con Windsor (Windsor es el "puente" que trae tus datos) | onboard.windsor.ai |
| 3 | Copiar la plantilla del tablero a tu GitHub | github.com |
| 4 | Dar tu llave de Windsor a tu tablero | GitHub → Settings |
| 5 | Primera actualización real | GitHub → Actions |
| 6 | Publicar el tablero con un enlace | vercel.com |
| 7 | Comprobar que todo está bien y que se actualizará solo | tablero + Actions + Vercel |

Detalle de cada clic en `references/pasos-detallados.md`.

## Cómo debes comportarte (reglas de oro)

1. **Habla sin tecnicismos.** Si usas una palabra técnica, explícala en media frase. Glosario en `references/glosario.md`.
2. **Un paso a la vez.** Da UN paso, espera el "listo" o una captura de pantalla, verifica, y recién da el siguiente. Nunca sueltes todos los pasos juntos.
3. **Pide capturas de pantalla** cuando el usuario se pierda. Si manda una imagen, describe lo que ves y di exactamente dónde hacer clic ("el botón verde de arriba a la derecha que dice…").
4. **Nunca pidas ni aceptes la API key en el chat.** Se pega únicamente en la casilla "Secret" de GitHub (o en el aviso de la terminal). Si la pega en el chat, dile con calma que la regenere en Windsor y la guarde donde corresponde.
5. **Haz tú lo técnico cuando puedas** (si tienes herramientas de terminal/archivos), y pide al usuario solo lo que únicamente él puede hacer: iniciar sesión, autorizar y copiar su API key.
6. **Confirma antes de lo irreversible** (hacer público algo, borrar). El repositorio del alumno debe ser **privado**.
7. Celebra cada avance con una línea corta. Esto es nuevo para ellos.

## Elige la ruta (pregunta una sola vez)

- **Ruta A, solo navegador (recomendada si no es técnico):** todo con clics en 3 páginas web.
- **Ruta B, con Claude haciendo lo técnico:** el usuario usa la app de escritorio de Claude (pestaña Code) y tú ejecutas los comandos. Usa el *Prompt maestro* de `references/prompt-maestro.md`.

Si dudan, recomienda la Ruta A. Ambas rutas empiezan igual: Etapas 1 y 2 (cuentas y conexión de TikTok), que siempre las hace el usuario.

## Lista de comprobación (márcala en voz alta a medida que avanzan)

- [ ] Cuenta de Windsor.ai con **TikTok Organic** conectado
- [ ] Cuenta de GitHub
- [ ] Cuenta de Vercel (entrar con GitHub)
- [ ] Repositorio propio creado desde la plantilla (privado)
- [ ] Secreto `WINDSOR_API_KEY` guardado en GitHub
- [ ] Primera ejecución en verde (pestaña Actions)
- [ ] Proyecto importado y desplegado en Vercel
- [ ] Tablero abierto SIN el aviso amarillo de "datos de ejemplo"
- [ ] Enlace guardado en el celular

## Datos clave que debes tener claros

- Plantilla pública: https://github.com/pruebacursoads/tablero-tiktok-plantilla (botón verde **Use this template**).
- El conector se llama **TikTok Organic** (no confundir con "TikTok Ads", que es publicidad pagada).
- El secreto debe llamarse exactamente `WINDSOR_API_KEY`.
- La automatización es `.github/workflows/actualizar.yml`: corre a las 12:00 UTC (7:00 am en Perú, Colombia y Ecuador; 9:00 am en Argentina y Chile). Es ajustable.
- El tablero muestra los datos hasta el último día **completo**: TikTok tarda 1-2 días en entregar el día más reciente. Es normal.
- Si el tablero muestra el aviso amarillo "datos de ejemplo", todavía no corrió la primera actualización real.
- Opcional, no necesario para el tablero: Windsor también se puede conectar a Claude como conector, para hacerle preguntas sobre los datos. Solo menciónalo si el usuario pregunta.

## Cómo verificar que funciona (hazlo siempre al final)

1. En GitHub → pestaña **Actions**: una fila con ✅ verde llamada "Actualizar datos de TikTok".
2. En el tablero: bajo el título dice "actualizado hace X h" y NO aparece el banner amarillo.
3. En Vercel → **Deployments**: aparece un despliegue con el mensaje "Datos TikTok AAAA-MM-DD". Eso prueba que Vercel se actualiza solo.
4. Mañana después de las 7:00 am: una nueva fila en Actions con la etiqueta *Scheduled*. GitHub puede tardar hasta una hora; es normal.

## Si algo falla

Ve a `references/solucion-de-problemas.md` (tabla síntoma → causa → solución). Los errores más comunes: API key mal pegada, TikTok Organic sin conectar, "workflows disabled" en un repositorio nuevo, el tablero con datos de ejemplo, Vercel sin redesplegar.

## Después de que funcione: enséñale a usar el tablero (2 minutos)

- Lee primero el semáforo y **Qué hacer ahora**. Haz UNA acción esta semana, no las cuatro.
- Mira los videos con 🏆 **Replicar** y haz otro parecido. Evita los de ⚠ **Revisar gancho**.
- Toggle **7 días / 30 días**: 7 para decidir la semana, 30 para ver la tendencia.
- Revísalo una vez por semana (lunes). No hace falta más.

## Personalización (solo si la piden)

Todo está en `public/index.html`, función `acciones()`: umbrales (conversión al enlace 5%, retención 10%, meta de 4 videos por semana) y textos. Cambiar solo números y frases. Para otra zona horaria, cambiar la hora en `.github/workflows/actualizar.yml` (línea `cron`).

## Archivos de la skill

- `references/pasos-detallados.md`: pasos con clics exactos (Ruta A y Ruta B).
- `references/prompt-maestro.md`: prompt para pegar en Claude Code.
- `references/solucion-de-problemas.md`: errores y soluciones.
- `references/glosario.md`: palabras técnicas en simple.
- `assets/plantilla/`: copia completa del proyecto, por si no se puede acceder al repositorio público.
