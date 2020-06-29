import { Router } from 'https://deno.land/x/oak/mod.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import { Todo } from '../models/Todo.ts';
import { ResponseTodo } from '../models/ResponseTodo.ts';

const router = new Router();

let todos: Todo[] = [];

router.get('/api/v1/todos', ({ request, response }) => {
  response.body = 200;
  response.body = { success: true, data: todos } as ResponseTodo;
});

router.post('/api/v1/todos', async ({ request, response }) => {
  const body = await request.body();

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: 'No Data',
    } as ResponseTodo;
  } else {
    const newTodo: Todo = {
      id: v4.generate(),
      text: body.value.text,
    };

    todos.push(newTodo);

    response.status = 201;
    response.body = {
      success: true,
      data: newTodo,
    } as ResponseTodo;
  }
});

router.put('/api/v1/todos/:id', async ({ request, response, params }) => {
  const { id } = params;
  const body = await request.body();

  if (!request.hasBody) {
    response.status = 404;
    response.body = {
      success: false,
      msg: 'No Data',
    } as ResponseTodo;
  } else {
    const index = todos.findIndex((todo) => {
      return todo.id === id;
    });
    todos[index] = { id: todos[index].id, text: body.value.text };

    response.status = 201;
    response.body = { success: true, msg: 'Updated Todo' } as ResponseTodo;
  }
});

router.delete('/api/v1/todos/:id', ({ request, response, params }) => {
  const { id } = params;
  todos = todos.filter((todo) => todo.id !== id);

  response.body = { success: true, msg: 'Deleted Todo' } as ResponseTodo;
});

export default router;
