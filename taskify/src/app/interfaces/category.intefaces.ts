export interface Category {
  id: string;
  name: string;

  // Para el futuro
  taskIds?: string[];

  createdAt: Date;
}