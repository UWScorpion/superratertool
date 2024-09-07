import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ADD_ACTIVEPROJECT_CONFIG,
  Cell,
  ActiveProjectRow,
} from "../common/constants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import TableEntry from "./TableEntry";

const Addprojectrow = () => {
  const save = () => {};
  const handleInputChange = () => {};
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add</Button>
      </DialogTrigger>
      <DialogContent className="w-200 overflow-auto bg-white">
        <div className="grid gap-4 ">
          <DialogHeader className="space-y-2 bg-sky-600 text-white p-6">
            <DialogTitle className="font-medium leading-none font-bold">Active Project</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Add an entry for active project
            </p>
          </DialogHeader>
          <div className="grid gap-2 grid-cols-2 p-6">
            {Object.values(ADD_ACTIVEPROJECT_CONFIG)
              .filter((c) => (c as Cell).columnNum)
              .map((c) => (
                <div
                  key={(c as Cell).columnNum}
                  className="grid grid-cols-3 items-center gap-4"
                >
                  <Label htmlFor={(c as Cell).label}>{(c as Cell).label}</Label>
                  <div className="capitalize min-w-40 mr-4">
                    <TableEntry
                      column={c as Cell}
                      rowNumber={0}
                      onInputChange={handleInputChange}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
        <DialogClose>
          <Button onClick={save} className="bg-blue-100 mr-8 w-28">
            Save
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default Addprojectrow;
