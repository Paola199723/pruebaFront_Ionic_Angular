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

  showModal = false;

  search = '';

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

  // FILTRO BUSCADOR
  get filteredCategories(): Category[] {

    return this.categories.filter(category =>
      category.name
        .toLowerCase()
        .includes(this.search.toLowerCase())
    );

  }

  // CREAR
  createCategory(): void {

    if (!this.categoryName.trim()) return;

    this.categoryService.addCategory(
      this.categoryName
    );

    this.categoryName = '';

    this.loadCategories();

    this.closeModal();

  }

  // EDITAR
  startEdit(category: Category): void {

    this.categoryName = category.name;

    this.editingId = category.id;

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

    this.closeModal();

  }

  // ELIMINAR
  deleteCategory(id: string): void {

    this.categoryService.deleteCategory(id);

    this.loadCategories();

  }

  // MODAL CREAR
  openCreateModal(): void {

    this.categoryName = '';

    this.editingId = null;

    this.showModal = true;

  }

  // MODAL EDITAR
  openEditModal(category: Category): void {

    this.categoryName = category.name;

    this.editingId = category.id;

    this.showModal = true;

  }

  // CERRAR MODAL
  closeModal(): void {

    this.showModal = false;

  }

}