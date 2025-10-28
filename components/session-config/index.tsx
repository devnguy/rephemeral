"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRow,
} from "@/components/ui/form";
import { useDrawingSessionContext } from "@/components/drawing-session/context";
import { useRouter } from "next/navigation";
import { BoardGroup } from "@/components/image-group";
import { Suspense, useEffect, useState } from "react";
import { ClassModeForm } from "@/components//session-config/class-mode-form";
import { StandardModeForm } from "@/components//session-config/standard-mode-form";
import { BoardItem, ImageSourceResponse } from "@/app/types";
import { getPinsByBoardId } from "@/lib/api/pinterest/queries";
import { getImagesFromResponse } from "@/components/drawing-session/helpers";
import { BoardGroupSkeleton } from "@/components/ui/skeleton";
import { Separator } from "../ui/separator";
import { SectionHeading } from "../ui/typography";
import { ScrollArea } from "../ui/scroll-area";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { ImageSourceSelect, SessionTypeSelect } from "./select";
import { Images } from "lucide-react";

const numericString = z.string().refine(
  (v) => {
    const n = Number(v);
    return !isNaN(n) && v?.length > 0;
  },
  { message: "Invalid number" },
);

const FormSchema = z.object({
  boardId: z.string(),
  sections: z.array(
    z.object({
      count: numericString,
      interval: numericString,
    }),
  ),
});

export type SessionConfigFormSchema = z.infer<typeof FormSchema>;

export enum SessionType {
  STANDARD = "STANDARD",
  CLASS = "CLASS",
  CUSTOM = "CUSTOM",
}

export enum ImageSourceType {
  PINTEREST = "PINTEREST",
  LOCAL = "LOCAL",
}

export const DEFAULT_SECTION_CONFIG = {
  count: "10",
  interval: "30",
};

type SessionConfigProps = {
  boardsPromise: Promise<ImageSourceResponse<BoardItem>>;
  // boardsPromise: ImageSourceResponse<BoardItem>;
};

export function SessionConfig(props: SessionConfigProps) {
  const { boardsPromise } = props;
  const router = useRouter();
  const { state, dispatch } = useDrawingSessionContext();
  const [sessionType, setSessionType] = useState<SessionType>(
    SessionType.STANDARD,
  );
  const [imageSourceType, setImageSourceType] = useState<ImageSourceType>(
    ImageSourceType.LOCAL,
  );

  function PinterestBoardInput() {
    return (
      <ScrollArea className="h-[420px]">
        <Suspense fallback={<BoardGroupSkeleton />}>
          <div className="">
            <FormField
              control={form.control}
              name="boardId"
              render={({ field }) => (
                <FormItem>
                  <BoardGroup
                    boardsPromise={boardsPromise}
                    value={field.value}
                    onValueChangeAction={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Suspense>
      </ScrollArea>
    );
  }

  const form = useForm<SessionConfigFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // sections: [DEFAULT_SECTION_CONFIG],
      sections: [
        {
          count: "5",
          interval: "30",
        },
        {
          count: "10",
          interval: "60",
        },
        {
          count: "15",
          interval: "90",
        },
        {
          count: "20",
          interval: "180",
        },
        {
          count: "30",
          interval: "300",
        },
        {
          count: "50",
          interval: "600",
        },
      ],
    },
  });

  const sectionsField = useFieldArray({
    name: "sections",
    control: form.control,
  });

  async function onSubmit(data: SessionConfigFormSchema) {
    // remove any form changes from class mode
    if (sessionType === SessionType.STANDARD) {
      data.sections = data.sections.slice(0, 1);
    }

    const response = await getPinsByBoardId(data.boardId);
    const images = getImagesFromResponse(response);

    dispatch({
      type: "INIT",
      payload: { ...data, images },
    });

    router.push("/app/session");
  }

  useEffect(() => {
    console.log({ state });
  }, [state]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <SectionHeading>Customize Session</SectionHeading>

        <FormRow>
          <div className="flex flex-col flex-3 gap-1">
            <FormLabel>Image Source</FormLabel>
            <FormDescription>Location of the reference images</FormDescription>
          </div>
          <div className="flex-1">
            <ImageSourceSelect
              defaultValue={imageSourceType}
              onValueChange={(val: ImageSourceType) => {
                setImageSourceType(val);
              }}
            />
          </div>
        </FormRow>

        <Separator />

        {imageSourceType === ImageSourceType.PINTEREST ? (
          <PinterestImageInputField />
        ) : (
          <LocalImageInputField />
        )}

        <Separator />

        <div>
          <FormRow>
            <div className="flex flex-col flex-3 gap-1">
              <FormLabel>Session Type</FormLabel>
              <FormDescription>The type of drawing session</FormDescription>
            </div>
            <div className="flex-1">
              <SessionTypeSelect
                defaultValue={sessionType}
                onValueChange={(val: SessionType) => {
                  setSessionType(val);
                }}
              />
            </div>
          </FormRow>
          <Separator />

          {sessionType === SessionType.STANDARD ? (
            <StandardModeForm control={form.control} />
          ) : (
            <ClassModeForm control={form.control} fieldArray={sectionsField} />
          )}

          <FormRow>
            <div className="flex flex-col flex-3 gap-1">
              <FormLabel>Hard Mode</FormLabel>
              <FormDescription>
                Disable pause, back, and skip controls during the session
              </FormDescription>
            </div>
            <div>
              <Switch />
            </div>
          </FormRow>

          <Separator />

          <div className="flex w-full pt-3">
            <Button type="submit">Start</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

function PinterestImageInputField() {
  return (
    <FormRow>
      <div className="flex flex-col flex-3 gap-1">
        <FormLabel>Board</FormLabel>
        <FormDescription>
          The Pinterest board containing the reference images
        </FormDescription>
      </div>
      <div className="flex-1">
        <Button variant="outline" type="button">
          Choose Board
        </Button>
      </div>
    </FormRow>
  );
}
function LocalImageInputField() {
  return (
    <FormRow>
      <div className="flex flex-col flex-3 gap-1">
        <FormLabel>Image Files</FormLabel>
        <FormDescription>
          The reference images to use during the session
        </FormDescription>
      </div>
      <div className="flex-1">
        <Input type="file" multiple accept="image/*" />
      </div>
    </FormRow>
  );
}

function LocalImageDropZone() {
  return (
    <div className="h-full w-full flex flex-col justify-between items-center bg-background rounded-md border border-dashed border-accent p-5">
      <div className="flex items-center h-full">
        <div className="flex items-center space-x-2">
          <Images />
          <p>Drag images or a folder here</p>
        </div>
      </div>

      <div>
        <div>OR</div>
        <div>
          <Input type="file" multiple accept="image/*" />
        </div>
      </div>
    </div>
  );
}

// async function getFile() {
//   // Open file picker and destructure the result the first handle
//   const [fileHandle] = await window.showOpenFilePicker();
//   const file = await fileHandle.getFile();
//   return file;
// }
