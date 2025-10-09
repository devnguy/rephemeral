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

export function Controller() {
  const { state, dispatch } = useDrawingSessionContext();
  const handleForward = () => {
    dispatch({ type: "FORWARD" });
  };

  const handleBack = () => {
    dispatch({ type: "BACK" });
  };

  const handleTogglePause = () => {
    dispatch({ type: "TOGGLE_PAUSE" });
  };

  const handleStop = () => {
    dispatch({ type: "STOP" });
  };

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
