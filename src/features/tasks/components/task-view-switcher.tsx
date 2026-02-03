import { PlusIcon } from "lucide-react";

import { DottedSeparator } from "@/components/dotted-separator";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const TaskViewSwitcher = () => {
  return (
    <Tabs className="flex-1 w-full rounded-lg border">
      <div className="flex overflow-auto flex-col p-4 h-full">
        <div className="flex flex-col gap-y-2 justify-between items-center lg:flex-row">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="w-full h-8 lg:w-auto" value="table">
              Table
            </TabsTrigger>
            <TabsTrigger className="w-full h-8 lg:w-auto" value="kanban">
              Kanban
            </TabsTrigger>
            <TabsTrigger className="w-full h-8 lg:w-auto" value="calendar">
              Calendar
            </TabsTrigger>
          </TabsList>
          <Button size="sm" className="w-full lg:w-auto">
            <PlusIcon className="mr-2 size-4" />
            New
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        Data Filters
        <DottedSeparator className="my-4" />
      </div>
      <>
        <TabsContent className="mt-0" value="table">
          Table
        </TabsContent>
        <TabsContent className="mt-0" value="kanban">
          Kanban
        </TabsContent>
        <TabsContent className="mt-0" value="calendar">
          Calendar
        </TabsContent>
      </>
    </Tabs>
  );
};
