import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Category } from '../../interfaces/category.intefaces';
import { CategoryService } from '../../services/category.services';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
})
export default class CategoriesPage implements OnInit {

  categories: Category[] = [];

  categoryName = '';

  editingId: string | null = null;

  constructor(
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {

    this.loadCategories();
  }

  loadCategories(): void {

    this.categories =
      this.categoryService.getCategories();
  }

  createCategory(): void {

    if (!this.categoryName.trim()) return;

    this.categoryService.addCategory(
      this.categoryName
    );

    this.categoryName = '';

    this.loadCategories();
  }

  startEdit(category: Category): void {

    this.editingId = category.id;

    this.categoryName = category.name;
  }

  saveEdit(): void {

    if (!this.editingId) return;

    this.categoryService.updateCategory(
      this.editingId,
      this.categoryName
    );

    this.editingId = null;

    this.categoryName = '';

    this.loadCategories();
  }

  deleteCategory(id: string): void {

    this.categoryService.deleteCategory(id);

    this.loadCategories();
  }
}
