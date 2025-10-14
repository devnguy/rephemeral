"use client";

import {
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
import {
  Control,
  useFieldArray,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { StandardSessionFormSchema } from "./standard-session-form";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp, Plus, Trash } from "lucide-react";
import { ButtonGroup } from "../ui/button-group";

export function SectionLabel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-1/2">
      <div>
        <FormLabel>Number of Images</FormLabel>
      </div>
      <div>
        <FormLabel>Interval</FormLabel>
      </div>
    </div>
  );
}

export function SectionRow({
  index,
  control,
  onSwapAction,
  onRemoveAction,
}: {
  index: number;
  control: Control<StandardSessionFormSchema>;
  onSwapAction: (from: number, to: number) => void;
  onRemoveAction: (i: number) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-1/2">
      <FormField
        control={control}
        name={`sections.${index}.count` as const}
        render={({ field }) => (
          <FormItem className="w-full">
            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        control={control}
        name={`sections.${index}.interval` as const}
        render={({ field }) => (
          <FormItem className="w-full">
            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
      <ButtonGroup>
        <ButtonGroup>
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              if (index !== 0) {
                console.log("swap", index, index - 1);
                onSwapAction(index, index - 1);
              }
            }}
          >
            <ChevronUp />
          </Button>
          <Button variant="outline" type="button" onClick={() => {}}>
            <ChevronDown />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              console.log(index);
              onRemoveAction(index);
            }}
          >
            <Trash />
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    </div>
  );
}

export function SectionRows(props: {
  control: Control<StandardSessionFormSchema>;
}) {
  const { control } = props;

  const sectionsField = useFieldArray({ name: "sections" });

  return (
    <div className="">
      <SectionLabel />
      <div className="space-y-4 flex flex-col">
        {sectionsField.fields.map((val, i) => {
          return (
            <SectionRow
              key={val.id}
              index={i}
              control={control}
              onSwapAction={sectionsField.swap}
              onRemoveAction={sectionsField.remove}
            />
          );
        })}
      </div>

      <div className="w-1/2">
        <Button
          variant={"outline"}
          type="button"
          onClick={() => {
            sectionsField.append({
              count: "10",
              interval: "10",
            });
          }}
        >
          <span>
            <Plus />
          </span>
          <span>Add Section</span>
        </Button>
      </div>
    </div>
  );
}
