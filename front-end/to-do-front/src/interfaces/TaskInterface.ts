export interface Task {
    id?: number;
    description: string;
    dueDate?: Date | null;
    finishedDate?: Date | null;
    priority: string;
    completed?: boolean;
  }