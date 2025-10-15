import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CountSelect({ ...props }: React.ComponentProps<typeof Select>) {
  return (
    <Select {...props}>
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
  );
}

export function IntervalSelect({
  ...props
}: React.ComponentProps<typeof Select>) {
  return (
    <Select {...props}>
      <FormControl>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="30">30</SelectItem>
        <SelectItem value="60">60</SelectItem>
        <SelectItem value="120">120</SelectItem>
        <SelectItem value="180">180</SelectItem>
        <SelectItem value="300">300</SelectItem>
        <SelectItem value="600">600</SelectItem>
        <SelectItem value="1200">1200</SelectItem>
      </SelectContent>
    </Select>
  );
}
