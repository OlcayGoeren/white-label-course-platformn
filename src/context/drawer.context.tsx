import React, { createContext, useContext, useState, ReactNode, FC } from 'react';

interface DrawerContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
};
