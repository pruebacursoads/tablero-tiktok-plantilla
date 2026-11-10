# Prompt maestro (Ruta B)

Para quien no instaló la skill. Se pega tal cual en la pestaña **Code** de la app de escritorio de Claude, en una carpeta vacía nueva.

Antes de pegarlo, el emprendedor debe tener:
1. Cuenta de **Windsor.ai** con **TikTok Organic** conectado.
2. Cuenta de **GitHub**.
3. Cuenta de **Vercel** (entrar con GitHub).

```
Quiero montar mi propio tablero de TikTok accionable que se actualice solo cada día, siguiendo la plantilla de Hugo López (El Marketero del Pueblo). No soy técnico: habla en palabras simples, dame UN paso a la vez, y pídeme una captura de pantalla si me pierdo.

Reglas:
- Haz tú todo lo técnico (comandos, archivos, git). A mí pídeme solo lo que únicamente yo puedo hacer: iniciar sesión, autorizar y copiar mi API key.
- NUNCA me pidas mi API key de Windsor por el chat. Dime en qué casilla la pego yo.
- Mi repositorio debe ser PRIVADO.
- Antes de crear o publicar algo, dime qué vas a hacer y espera mi "sí".

Pasos que debes seguir:
1. Verifica que tengo GitHub CLI (`gh --version`); si no, guíame para instalarlo desde https://cli.github.com.
2. Inicia sesión en GitHub con `gh auth login` (navegador) y luego `gh auth refresh -h github.com -s workflow`. Cada vez que haya un código de 8 caracteres, dámelo y dime que lo pegue en https://github.com/login/device.
3. Crea mi repositorio privado `tablero-tiktok` desde la plantilla: `gh repo create tablero-tiktok --template pruebacursoads/tablero-tiktok-plantilla --private --clone`, y entra a la carpeta.
4. Guíame para copiar mi API key en Windsor (Account settings) y guardarla yo mismo como secreto de GitHub llamado exactamente WINDSOR_API_KEY (en la web: repositorio → Settings → Secrets and variables → Actions → New repository secret).
5. Lanza la primera ejecución con `gh workflow run actualizar.yml`, vigílala y confírmame cuando termine en verde y cuántos días y videos trajo.
6. Llévame de la mano a Vercel (https://vercel.com/new) para importar el repositorio y hacer Deploy. No cambies ninguna opción.
7. Verifica conmigo: el tablero no muestra el aviso amarillo de "datos de ejemplo", en Vercel hay un despliegue "Datos TikTok", y mañana después de las 7:00 am aparecerá una ejecución con la etiqueta Scheduled en la pestaña Actions de GitHub.
8. Al final explícame en 5 líneas cómo leer mi tablero (semáforo, Qué hacer ahora, videos 🏆 y ⚠) y que lo revise una vez por semana.

Empieza por el paso 1.
```
