"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Cell } from "../common/constants";
import { formatDate } from "../common/utils";

interface DropDownProps {
  column: Cell;
  rowNumber: number;
  onBaseProjectChange?: Function;
  onNameChange?: Function;
  onProductionRoleChange?: Function;
  onWorkFlowChange?: Function;
  onQTypeChange?: Function;
  clearfilter?: boolean;
}

const Dropdown = ({
  column,
  rowNumber,
  onBaseProjectChange,
  onNameChange,
  onProductionRoleChange,
  onWorkFlowChange,
  onQTypeChange,
  clearfilter
}: DropDownProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(column.value || "");
  useEffect(() => {
    setValue(column.value || "");
  }, [column.value]);

  const handleTextChange = async (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);
    if (onBaseProjectChange) {
      onBaseProjectChange(currentValue === value ? "" : currentValue);
    }
    if (onNameChange) {
      onNameChange(currentValue === value ? "" : currentValue);
    }
    if (onProductionRoleChange) {
      onProductionRoleChange(currentValue === value ? "" : currentValue);
    }
    if (onWorkFlowChange) {
      onWorkFlowChange(currentValue === value ? "" : currentValue);
    }
    if (onQTypeChange) {
      onQTypeChange(currentValue === value ? "" : currentValue);
    }
    setOpen(false);
    if (!column.columnNum) {
      return;
    }
    if (rowNumber < 2) return;
    const req1 = new Request(
      `/api/roster?range=${column.columnNum}${rowNumber}`
    );
    const req2 = new Request(`/api/roster?range=AI${rowNumber}`);
    const response1 = await fetch(req1, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentValue),
    });

    const response2 = await fetch(req2, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        `Field: ${column.label}, Date:${formatDate(new Date(Date.now()))}`
      ),
    });

    return response1;
  };

  const getValue = () => {
    if(clearfilter) return column.placeHolder;
    return value
      ? (column.options || []).find((o) => o.value === value)?.label
      : column.placeHolder;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-[${column.width ? column.width : "200px"}] justify-between`}
        >
          {getValue()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`w-[${column.width ? "230px" : "200px"}] p-0`}>
        <Command>
          <CommandInput placeholder={column.placeHolder} />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {(column.options || []).map((o) => (
                <CommandItem
                  key={o.value}
                  value={o.value}
                  onSelect={(currentValue) => handleTextChange(currentValue)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === o.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {o.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Dropdown;
