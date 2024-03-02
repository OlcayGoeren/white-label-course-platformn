import { Column } from '@/components/kanban/BoardColumn';
import { Task } from '@/components/kanban/TaskCard';
import React, { createContext, useContext, useState, ReactNode, FC } from 'react';

interface DrawerContextType {
  columns: Column[];
  tasks: Task[];
  setColumns: (columns: Column[]) => void;
  setTasks: (tasks: Task[]) => void;
}

export const ColumnsAndTasksContext = createContext<DrawerContextType | undefined>(undefined);

export const useColTasks = () => {
  const context = useContext(ColumnsAndTasksContext);
  if (context === undefined) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
};
