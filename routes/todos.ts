import { Router } from 'https://deno.land/x/oak/mod.ts';
import { Todo } from '../models/Todo.ts';

const router = new Router();

// type CreateResponseTodo = {
//   message: string;
//   todo: Todo;
// };

let todos: Todo[] = [];

router.get('/todos', (ctx) => {
  ctx.response.body = { todos };
});

router.post('/todos', async (ctx) => {
  const data = await ctx.request.body();

  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: data.value.text,
  };

  todos.push(newTodo);

  // TODO: Investigate how to type responses
  /*
    ctx.response.body = {
      message: 'Created Todo!',
      todo: newTodo,
    } as CreateResponseTodo;
  */

  ctx.response.body = {
    message: 'Created Todo!',
    todo: newTodo,
  };
});

router.put('/todos/:id', async (ctx) => {
  const { id } = ctx.params;
  const data = await ctx.request.body();

  const index = todos.findIndex((todo) => {
    return todo.id === id;
  });
  todos[index] = { id: todos[index].id, text: data.value.text };
  ctx.response.body = { message: 'Updated Todo' };
});

router.delete('/todos/:id', (ctx) => {
  const { id } = ctx.params;
  todos = todos.filter((todo) => todo.id !== id);

  ctx.response.body = { message: 'Deleted Todo' };
});

export default router;
