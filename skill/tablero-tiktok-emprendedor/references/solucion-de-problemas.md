# Solución de problemas

| Qué ves | Causa probable | Qué hacer |
|---|---|---|
| Actions sale ❌ y el log dice `Falta WINDSOR_API_KEY` | El secreto no existe o tiene otro nombre | Settings → Secrets and variables → Actions. Debe existir `WINDSOR_API_KEY`, exactamente así. Créalo de nuevo y vuelve a lanzar **Run workflow**. |
| Log dice `Windsor respondió 401` o `403` | API key mal copiada, con espacios o vencida | Copia otra vez la key en Windsor (Account settings), edita el secreto en GitHub (lápiz) y pega de nuevo, sin espacios al inicio o al final. |
| Log dice `Windsor respondió 4xx` con un mensaje sobre "connector" o "no accounts" | TikTok Organic no está conectado en Windsor | Etapa 2: conecta **TikTok Organic** (no TikTok Ads) y repite. |
| Actions ✅ pero el tablero sigue con el aviso amarillo de "datos de ejemplo" | Vercel aún no se actualizó o abriste una pestaña vieja | Espera 2 minutos y recarga con Ctrl+F5. Revisa en Vercel → Deployments que haya un despliegue "Datos TikTok". |
| El tablero dice "No pude cargar los datos" | `public/data.json` está vacío o con pocos días | Cuentas nuevas o con pocos días de datos: espera unos días de actividad. El tablero necesita al menos 3 días completos. |
| Mensaje "Workflows aren't being run on this repository" | Los repositorios nuevos desactivan las automatizaciones hasta que las activas | Actions → **I understand my workflows, go ahead and enable them**. |
| No aparece el botón **Run workflow** | Estás en la lista general de Actions | Pulsa a la izquierda **Actualizar datos de TikTok**; el botón está arriba a la derecha de la lista. |
| `git push` rechazado: "without `workflow` scope" (solo Ruta B) | Falta el permiso `workflow` en la sesión de gh | `gh auth refresh -h github.com -s workflow` y aprobar el código en https://github.com/login/device. |
| Las cifras de hoy aparecen en 0 o no aparecen | TikTok entrega el día más reciente con 1-2 días de retraso | Es normal. El tablero oculta los días incompletos a propósito. |
| Los números no coinciden con la app de TikTok | "Alcance" suma las personas únicas de cada día, y la app cuenta otra ventana de tiempo | Es normal. Úsalo para comparar semana contra semana, no para cifras exactas. |
| Vercel pide pagar o dice que el repositorio privado no se puede importar | Plan o permisos | Plan Hobby gratis soporta repositorios privados. Revisa Adjust GitHub App Permissions y concede acceso a ese repositorio. |
| Pasaron más de 24 h y no hay nueva ejecución *Scheduled* | GitHub retrasa o pausa automatizaciones en repositorios sin actividad | Lanza **Run workflow** a mano una vez. El tablero ya tiene movimiento diario, así que no debería repetirse. |
| Tengo varias cuentas de TikTok en Windsor y salen números mezclados | El script trae todas las cuentas conectadas | Desconecta las que no quieras en Windsor, o pide ayuda para filtrar por cuenta. |

## Si nada funciona

1. Toma captura de la pantalla del error (la fila roja en Actions, abierta).
2. Pégala en Claude con la skill `tablero-tiktok-emprendedor` activa y escribe: "Estoy en la Etapa N y me pasa esto".
