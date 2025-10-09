"use client";

import { useCallback } from "react";
import { Controller } from "@/components/drawing-session/controller";
import { CurrentImage } from "@/components/drawing-session/current-image";
import { useDrawingSessionContext } from "@/components/drawing-session/context";
import { Timer } from "@/components/drawing-session/timer";

export default function DrawingSession() {
  const { state, dispatch } = useDrawingSessionContext();

  const handleForward = useCallback(() => {
    dispatch({ type: "FORWARD" });
  }, []);

  return (
    <div className="py-12 px-4 h-screen">
      {state.isStopped ? (
        <div className="flex flex-col justify-center space-y-4 items-center h-full">
          Done
        </div>
      ) : (
        <div className="flex flex-col justify-center space-y-4 items-center h-full">
          <div className="relative w-full h-[80vh] flex items-center justify-center">
            <CurrentImage src={state.current.src} />
          </div>
          <Controller />
          <Timer
            seconds={state.current.interval}
            onTimeElapsed={handleForward}
            isPaused={state.isPaused}
          />
        </div>
      )}
    </div>
  );
}

/*

requirements for config:

how long to display image
what image to display

Section = {
  count: 5
  interval: 30
}

Config = {
  sections: Array<Section>
  total: number
  pool: Array<Reference>
}

Config -> Session State


*/
