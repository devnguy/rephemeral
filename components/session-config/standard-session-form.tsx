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

const numericString = z.string().refine(
  (v) => {
    const n = Number(v);
    return !isNaN(n) && v?.length > 0;
  },
  { message: "Invalid number" },
);

const FormSchema = z.object({
  total: numericString,
  interval: numericString,
  board: z.string(),
});

export type StandardSessionFormSchema = z.infer<typeof FormSchema>;

export function StandardSessionForm() {
  const router = useRouter();
  const { state, dispatch } = useDrawingSessionContext();

  const form = useForm<StandardSessionFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      total: "10",
      interval: "30",
    },
  });

  function onSubmit(data: StandardSessionFormSchema) {
    // TODO: parse data to validate
    console.log({ data });
    // dispatch({
    //   type: "CONFIGURE",
    //   payload: data,
    // });
    // router.push("/app/session");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="board"
          render={({ field }) => (
            <FormItem>
              <BoardGroup
                value={field.value}
                onValueChangeAction={field.onChange}
              />
            </FormItem>
          )}
        />

        <div className="w-full flex flex-col items-center justify-center space-y-8">
          <div className="flex space-x-12 w-1/2">
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
