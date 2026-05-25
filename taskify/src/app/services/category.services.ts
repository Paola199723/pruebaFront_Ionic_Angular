import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category.intefaces';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private storageKey = 'categories';

  constructor() {}

  getCategories(): Category[] {

    const categories = localStorage.getItem(this.storageKey);

    return categories ? JSON.parse(categories) : [];
  }

  saveCategories(categories: Category[]): void {

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(categories)
    );
  }

  addCategory(name: string): void {

    const categories = this.getCategories();

    const newCategory: Category = {
      id: crypto.randomUUID(),
      name,
      taskIds: [],
      createdAt: new Date(),
    };

    categories.push(newCategory);

    this.saveCategories(categories);
  }

  updateCategory(id: string, name: string): void {

    const categories = this.getCategories();

    const updated = categories.map(category =>
      category.id === id
        ? { ...category, name }
        : category
    );

    this.saveCategories(updated);
  }

  deleteCategory(id: string): void {

    const categories = this.getCategories();

    const filtered = categories.filter(
      category => category.id !== id
    );

    this.saveCategories(filtered);
  }
}