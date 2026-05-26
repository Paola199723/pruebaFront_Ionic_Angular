import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Category } from '../../interfaces/category.intefaces';
import { Task } from '../../interfaces/task.interface';

import { initializeApp } from "firebase/app";
import { fetchAndActivate, getRemoteConfig, getValue } from "firebase/remote-config";

import { CategoryService } from '../../services/category.services';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
})

export default class HomePage implements OnInit {

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  categories: Category[] = [];

  taskTitle = '';
  selectedCategory = '';
  search = '';
  filterCategory = '';
  editingId: string | null = null;

  showModal = false;
  showCreateButton = true;

  // Firebase Remote Config
  private app = initializeApp({
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROJECT.firebaseapp.com",
    projectId: "TU_PROJECT_ID",
    appId: "TU_APP_ID"
  });

  private remoteConfig = getRemoteConfig(this.app);

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loadData();
    await this.loadRemoteConfig();
  }

  // 🔥 FEATURE FLAG REAL
  async loadRemoteConfig(): Promise<void> {
    try {
      await fetchAndActivate(this.remoteConfig);

      const value = getValue(
        this.remoteConfig,
        'enable_create_task_button'
      );

      this.showCreateButton = value.asBoolean();

      console.log('Feature flag:', this.showCreateButton);
    } catch (error) {
      console.error('Remote Config error:', error);
      this.showCreateButton = true; // fallback seguro
    }
  }

  loadData(): void {
    this.tasks = this.taskService.getTasks();
    this.filteredTasks = [...this.tasks];
    this.categories = this.categoryService.getCategories();
  }

  createTask(): void {
    if (!this.taskTitle.trim() || !this.selectedCategory) return;

    this.taskService.addTask(
      this.taskTitle,
      this.selectedCategory
    );

    this.resetForm();
    this.loadData();
  }

  startEdit(task: Task): void {
    this.editingId = task.id;
    this.taskTitle = task.title;
    this.selectedCategory = task.categoryId;
    this.showModal = true;
  }

  saveEdit(): void {
    if (!this.editingId) return;

    this.taskService.updateTask(
      this.editingId,
      this.taskTitle,
      this.selectedCategory
    );

    this.loadData();
    this.closeModal();
  }

  toggleTask(id: string): void {
    this.taskService.toggleTask(id);
    this.loadData();
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id);
    this.loadData();
  }

  filterTasks(): void {
    this.filteredTasks = this.tasks.filter(task => {

      const matchesSearch =
        task.title.toLowerCase()
          .includes(this.search.toLowerCase());

      const matchesCategory =
        this.filterCategory
          ? task.categoryId === this.filterCategory
          : true;

      return matchesSearch && matchesCategory;
    });
  }

  getCategoryName(id: string): string {
    return this.categories.find(
      c => c.id === id
    )?.name || 'Sin categoría';
  }

  resetForm(): void {
    this.taskTitle = '';
    this.selectedCategory = '';
    this.editingId = null;
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.resetForm();
  }
}