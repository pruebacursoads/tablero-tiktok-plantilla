# Tablero TikTok accionable (plantilla)

Un tablero que le dice al emprendedor **qué hacer**, no solo qué pasó. Se actualiza solo cada día a las 7:00 am (hora de Perú).

Hecho por Hugo López, El Marketero del Pueblo. Usa tus datos de TikTok a través de Windsor.ai.

## Lo que ves

- **Semáforo** de la semana (va bien, estable o hay que reaccionar).
- **Qué hacer ahora**: hasta 4 acciones con tus propios datos.
- Tus números con comparación contra el periodo anterior, gráficos por día y tus videos con 🏆 *Replicar* y ⚠ *Revisar gancho*.

## Cómo tener el tuyo

Tienes dos caminos:

1. **Con la guía visual** (recomendado): abre la guía paso a paso que te compartió Hugo y sigue las 7 etapas. Son unos 20-30 minutos y solo usas el navegador.
2. **Con Claude**: instala la skill `tablero-tiktok-emprendedor` (carpeta `skill/`, o el ZIP que te dio Hugo) y escribe "quiero mi tablero de TikTok". También puedes pegar el prompt de `skill/tablero-tiktok-emprendedor/references/prompt-maestro.md`.

Resumen de las etapas: crear cuentas (Windsor, GitHub, Vercel) → conectar TikTok Organic en Windsor → botón **Use this template** → guardar el secreto `WINDSOR_API_KEY` → ejecutar la primera actualización en Actions → importar en Vercel.

## Cómo funciona por dentro

1. `.github/workflows/actualizar.yml` corre todos los días a las 12:00 UTC.
2. `scripts/actualizar.mjs` pide tus datos a Windsor.ai y guarda `public/data.json`.
3. GitHub sube el cambio y Vercel se publica solo con los datos nuevos.

Mientras no se haya hecho la primera actualización real, el tablero muestra datos de ejemplo con un aviso amarillo.

## Probar en tu computadora (opcional)

```bash
node scripts/actualizar.mjs
npx http-server public -p 4173
```

Antes de ejecutar la primera línea define la variable `WINDSOR_API_KEY` con tu clave.
