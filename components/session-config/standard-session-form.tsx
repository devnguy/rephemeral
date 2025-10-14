"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDrawingSessionContext } from "@/components/drawing-session/context";
import { useRouter } from "next/navigation";
import { BoardGroup } from "@/components/image-group";
import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { SectionRows } from "./section-row";

const numericString = z.string().refine(
  (v) => {
    const n = Number(v);
    return !isNaN(n) && v?.length > 0;
  },
  { message: "Invalid number" },
);

export const FormSchema = z.object({
  total: numericString,
  interval: numericString,
  boardId: z.string(),
  sections: z.array(
    z.object({
      count: numericString,
      interval: numericString,
    }),
  ),
});

export type StandardSessionFormSchema = z.infer<typeof FormSchema>;

enum SessionType {
  STANDARD = "STANDARD",
  CLASS = "CLASS",
}

export function StandardSessionForm() {
  const router = useRouter();
  const { state, dispatch } = useDrawingSessionContext();
  const [sessionType, setSessionType] = useState<SessionType>(
    SessionType.STANDARD,
  );

  const form = useForm<StandardSessionFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      total: "10",
      interval: "30",
    },
  });

  function onSubmit(data: StandardSessionFormSchema) {
    // dispatch({
    //   type: "INIT",
    //   payload: data,
    // });
    //
    // router.push("/app/session");
    console.log({ data });
  }

  useEffect(() => {
    console.log({ state });
  }, [state]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="">
          <FormField
            control={form.control}
            name="boardId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Choose a Board</FormLabel>
                <BoardGroup
                  value={field.value}
                  onValueChangeAction={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full flex flex-col space-y-8">
          <ToggleGroup
            type="single"
            defaultValue={sessionType}
            onValueChange={(val: SessionType) => {
              setSessionType(val);
            }}
          >
            <ToggleGroupItem
              value={SessionType.STANDARD}
              aria-label="Toggle standard"
            >
              <div className="h-4 px-4">Standard</div>
            </ToggleGroupItem>
            <ToggleGroupItem
              value={SessionType.CLASS}
              aria-label="Toggle class"
            >
              <div className="h-4 px-4">Class</div>
            </ToggleGroupItem>
          </ToggleGroup>

          {/* Create separate component? */}
          {sessionType === SessionType.STANDARD ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-1/2">
              <FormField
                control={form.control}
                name="total"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Number of Images</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="15">15</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="30">30</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interval"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Interval</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="30">30</SelectItem>
                        <SelectItem value="60">60</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ) : (
            <SectionRows control={form.control} />
          )}

          <div className="md:w-1/2 w-full">
            <Button size="lg" type="submit">
              Start
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
