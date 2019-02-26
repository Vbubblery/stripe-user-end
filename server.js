const Koa = require('koa');
const Router = require('koa-router')
const next = require('next');
const fs = require('fs');
const cors = require('@koa/cors');
const koaBody = require('koa-body');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = app.getRequestHandler();
const PORT = parseInt(process.env.PORT, 10) || 3000

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  server.use(koaBody());
  server.use(cors());

  router.get('*', async ctx => {
    await handler(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })
  server.use(router.routes())
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on https://localhost:${PORT}`)
  })
})
