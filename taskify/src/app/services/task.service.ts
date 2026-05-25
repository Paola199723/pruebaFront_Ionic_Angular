import { Injectable } from '@angular/core';

import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  private storageKey = 'tasks';

  getTasks(): Task[] {

    const tasks =
      localStorage.getItem(this.storageKey);

    return tasks
      ? JSON.parse(tasks)
      : [];
  }

  saveTasks(tasks: Task[]): void {

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(tasks)
    );
  }

  addTask(
    title: string,
    categoryId: string
  ): void {

    const tasks = this.getTasks();

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      categoryId,
      createdAt: new Date(),
    };

    tasks.push(newTask);

    this.saveTasks(tasks);
  }

  updateTask(
    id: string,
    title: string,
    categoryId: string
  ): void {

    const tasks = this.getTasks();

    const updated = tasks.map(task =>
      task.id === id
        ? {
            ...task,
            title,
            categoryId,
          }
        : task
    );

    this.saveTasks(updated);
  }

  toggleTask(id: string): void {

    const tasks = this.getTasks();

    const updated = tasks.map(task =>
      task.id === id
        ? {
            ...task,
            completed: !task.completed,
          }
        : task
    );

    this.saveTasks(updated);
  }

  deleteTask(id: string): void {

    const tasks = this.getTasks();

    const filtered =
      tasks.filter(task => task.id !== id);

    this.saveTasks(filtered);
  }
}