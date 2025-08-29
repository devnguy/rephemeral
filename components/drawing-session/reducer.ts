import { getRandomInt } from "@/lib/utils";
import { DrawingSessionState } from "./types";

type DrawingSessionActionType = "START" | "NEXT" | "STOP";
export type DrawingSessionAction =
  | DrawingSessionActionStart
  | DrawingSessionActionForward
  | DrawingSessionActionBack
  | DrawingSessionActionStop;

type DrawingSessionActionStart = {
  type: "START";
};
type DrawingSessionActionForward = {
  type: "FORWARD";
};
type DrawingSessionActionBack = {
  type: "BACK";
};
type DrawingSessionActionStop = {
  type: "STOP";
};

export function reducer(
  state: DrawingSessionState,
  action: DrawingSessionAction,
): DrawingSessionState {
  switch (action.type) {
    case "START":
      return state;
    case "FORWARD":
      console.log("forward");
      return forward(state);
    case "BACK":
      console.log("back");
      return back(state);
    case "STOP":
      return state;
    default:
      throw new Error("unsupported action");
  }
}

function forward(state: DrawingSessionState): DrawingSessionState {
  if (state.index === state.total - 1) {
    return state;
  }

  const nextIndex = state.index + 1;

  // We can traverse the history
  if (nextIndex < state.history.length) {
    return {
      ...state,
      index: nextIndex,
      current: state.history[nextIndex],
    };
  }

  // Otherwise, have to take a new item from the pool
  const randomIndex = getRandomInt(state.pool.length);
  const current = state.pool[randomIndex];
  const history = [...state.history, current];
  const newPool = state.pool.filter((_, i) => i !== randomIndex);

  return {
    index: nextIndex,
    total: state.total,
    current,
    history,
    pool: newPool,
  };
}

function back(state: DrawingSessionState): DrawingSessionState {
  if (state.index === 0) {
    return state;
  }

  const previousIndex = state.index - 1;

  return {
    ...state,
    index: previousIndex,
    current: state.history[previousIndex],
  };
}
