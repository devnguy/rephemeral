import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Pause,
  Play,
  Square,
} from "lucide-react";
import { useDrawingSessionContext } from "./context";
import { useCallback, useEffect } from "react";

export function Controller() {
  const { state, dispatch } = useDrawingSessionContext();
  const handleForward = useCallback(() => {
    if (!state.isHardModeEnabled) {
      dispatch({ type: "FORWARD" });
    }
  }, [dispatch, state.isHardModeEnabled]);

  const handleBack = useCallback(() => {
    if (!state.isHardModeEnabled) {
      dispatch({ type: "BACK" });
    }
  }, [dispatch, state.isHardModeEnabled]);

  const handleTogglePause = useCallback(() => {
    if (!state.isHardModeEnabled) {
      dispatch({ type: "TOGGLE_PAUSE" });
    }
  }, [dispatch, state.isHardModeEnabled]);

  const handleStop = useCallback(() => {
    dispatch({ type: "STOP" });
  }, [dispatch]);

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          handleBack();
          return;
        case "ArrowRight":
          e.preventDefault();
          handleForward();
          return;
        case " ":
          e.preventDefault();
          handleTogglePause();
          return;
        case "Escape":
          e.preventDefault();
          handleStop();
          return;
        default:
          return;
      }
    },
    [handleBack, handleForward, handleTogglePause, handleStop],
  );

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  return (
    <div className="flex space-x-4">
      <Button
        variant="outline"
        disabled={state.isHardModeEnabled}
        onClick={handleBack}
      >
        <ChevronLeft />
      </Button>
      <Button
        variant="outline"
        disabled={state.isHardModeEnabled}
        onClick={handleTogglePause}
      >
        {state.isPaused ? <Play /> : <Pause />}
      </Button>
      <Button variant="outline" onClick={handleStop}>
        <Square />
      </Button>
      <Button
        variant="outline"
        disabled={state.isHardModeEnabled}
        onClick={handleForward}
      >
        <ChevronRight />
      </Button>
      <Button variant="outline" disabled={state.isHardModeEnabled}>
        <ChevronsRight />
      </Button>
    </div>
  );
}
