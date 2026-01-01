"use client";

import {
  DrawingSessionAction,
  reducer,
} from "@/components/drawing-session/reducer";
import { DrawingSessionState } from "@/components/drawing-session/types";
import {
  ActionDispatch,
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";

type DrawingSessionContextType = {
  state: DrawingSessionState;
  dispatch: ActionDispatch<[action: DrawingSessionAction]>;
};

const DrawingSessionContext = createContext<
  DrawingSessionContextType | undefined
>(undefined);

function getDefaultState(): DrawingSessionState {
  return {
    index: 0,
    total: 0,
    history: [],
    pool: {
      images: [],
      intervals: [],
    },
    isStopped: false,
    isPaused: false,
    isHardModeEnabled: false,
  };
}

export function DrawingSessionContextProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, undefined, getDefaultState);

  return (
    <DrawingSessionContext value={{ state, dispatch }}>
      {children}
    </DrawingSessionContext>
  );
}

export function useDrawingSessionContext() {
  const context = useContext(DrawingSessionContext);
  if (!context) {
    throw new Error(
      "useDrawingSessionContext must be used within DrawingSessionContextProvider",
    );
  }
  return context;
}
