import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Suspense } from "react";
import { FormField, FormItem, FormMessage } from "../ui/form";
import { BoardGroup } from "../image-group";
import { BoardGroupSkeleton } from "../ui/skeleton";
import { BoardItem, ImageSourceResponse } from "@/app/types";
import { SessionConfigFormSchema } from ".";
import { useFormContext } from "react-hook-form";

type ChooseBoardDialogProps = {
  boardsPromise: Promise<ImageSourceResponse<BoardItem>>;
};

export function ChooseBoardDialog(props: ChooseBoardDialogProps) {
  const { boardsPromise } = props;
  const { control } = useFormContext<SessionConfigFormSchema>();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Choose Board</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose Board</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <ScrollArea className="h-[420px]">
          <Suspense fallback={<BoardGroupSkeleton />}>
            <div className="">
              <FormField
                control={control}
                name="boardId"
                render={({ field }) => (
                  <FormItem>
                    <BoardGroup
                      boardsPromise={boardsPromise}
                      onValueChangeAction={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Suspense>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
