import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsRight, Pause } from "lucide-react";

type ControllerProps = {
  onForward: () => void;
  onBack: () => void;
};

export function Controller(props: ControllerProps) {
  const { onForward, onBack } = props;
  return (
    <div className="flex space-x-4">
      <Button variant="outline" onClick={onBack}>
        <ChevronLeft />
      </Button>
      <Button variant="outline">
        <Pause />
      </Button>
      <Button variant="outline" onClick={onForward}>
        <ChevronRight />
      </Button>
      <Button variant="outline">
        <ChevronsRight />
      </Button>
    </div>
  );
}
