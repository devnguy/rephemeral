import { useEffect, useState } from "react";

type TimerProps = {
  seconds: number;
  onTimeElapsed: () => void;
};

export function Timer(props: TimerProps) {
  const { seconds, onTimeElapsed } = props;
  const [timeRemaining, setTimeRemaining] = useState(seconds);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (timeRemaining >= 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else {
      if (interval) {
        clearInterval(interval);
      }
      onTimeElapsed();
      // incorrectly setting it to the previous state seconds value
      // and needs to know when to stop resetting
      handleReset(seconds);
    }

    return () => clearInterval(interval);
  }, [timeRemaining, onTimeElapsed, seconds]);

  const handleReset = (s: number) => {
    setTimeRemaining(s);
  };

  return <div>{timeRemaining}</div>;
}
