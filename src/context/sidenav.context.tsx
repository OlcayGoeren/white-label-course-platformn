"use client";

import React, { Dispatch, createContext, useReducer } from "react";

type StateType = {
  isOpen: boolean;
};

type ActionType = {
  type: string;
};

const initialState: StateType = {
  isOpen: false,
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "open":
      return { isOpen: true };
    case "close":
      return { isOpen: false };
    default:
      return state;
  }
};

export const SideNavContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const CounterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SideNavContext.Provider value={{ state, dispatch }}>
      {children}
    </SideNavContext.Provider>
  );
};
