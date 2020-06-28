import { Application } from 'https://deno.land/x/oak/mod.ts';

// always with the file extension
import todosRoutes from './routes/todos.ts';

const app = new Application();

// To execute middlewares this should be async
app.use(async (ctx, next) => {
  console.log('Middleware');
  await next();
});

app.use(todosRoutes.routes());
app.use(todosRoutes.allowedMethods());

await app.listen({ port: 5000 });
