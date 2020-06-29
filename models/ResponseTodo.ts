import { Todo } from './Todo.ts';

export interface ResponseTodo {
  success: boolean;
  msg?: string;
  data?: Todo | Todo[];
}
