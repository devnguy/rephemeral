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
    dispatch({ type: "FORWARD" });
  }, [dispatch]);

  const handleBack = useCallback(() => {
    dispatch({ type: "BACK" });
  }, [dispatch]);

  const handleTogglePause = useCallback(() => {
    dispatch({ type: "TOGGLE_PAUSE" });
  }, [dispatch]);

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
      <Button variant="outline" onClick={handleBack}>
        <ChevronLeft />
      </Button>
      <Button variant="outline" onClick={handleTogglePause}>
        {state.isPaused ? <Play /> : <Pause />}
      </Button>
      <Button variant="outline" onClick={handleStop}>
        <Square />
      </Button>
      <Button variant="outline" onClick={handleForward}>
        <ChevronRight />
      </Button>
      <Button variant="outline">
        <ChevronsRight />
      </Button>
    </div>
  );
}
