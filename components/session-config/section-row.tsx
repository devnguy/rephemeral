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
import { UseFormReturn } from "react-hook-form";
import { StandardSessionFormSchema } from "./standard-session-form";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp, Plus, Trash } from "lucide-react";
import { ButtonGroup } from "../ui/button-group";
import { useState } from "react";

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

type SectionRowProps = {
  form: UseFormReturn<StandardSessionFormSchema>;
};

export function SectionRow(props: SectionRowProps) {
  const { form } = props;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-1/2">
      <FormField
        control={form.control}
        name="total"
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
        control={form.control}
        name="interval"
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
          <Button variant={"outline"} type="button">
            <ChevronUp />
          </Button>
          <Button variant={"outline"} type="button">
            <ChevronDown />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant={"outline"} type="button">
            <Trash />
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    </div>
  );
}

export function SectionRows(props: SectionRowProps) {
  const { form } = props;

  const [rows, setRows] = useState([{}]);

  return (
    <div className="w-full">
      <div className="space-y-4 flex flex-col justify-center items-center">
        {rows.map((row, i) => (
          <SectionRow key={i} form={form} />
        ))}
      </div>

      <Button
        variant={"outline"}
        type="button"
        onClick={() => {
          setRows((prev) => {
            return [...prev, {}];
          });
        }}
      >
        <span>
          <Plus />
        </span>
        <span>Add Section</span>
      </Button>
    </div>
  );
}
