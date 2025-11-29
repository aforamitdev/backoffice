import { TableDemo } from "@/components/tasks/Rows/TaskRow";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List, SquareKanban } from "lucide-react";

function TasksPage() {
  return (
    <div>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className=" w-full border-b">
          <div className="flex">
            <div className="flex items-center">
              <TabsTrigger value="account">
                <List className="text-purple-500 size-2.5" />
                The List{" "}
              </TabsTrigger>
            </div>
            <div className="flex items-center">
              <TabsTrigger value="password">
                <SquareKanban
                  strokeWidth={2}
                  className="text-purple-500 size-2.5"
                />
                Board
              </TabsTrigger>
            </div>
          </div>
        </TabsList>
        <TabsContent value="account">
          <div className="mx-3">
            <TableDemo />
          </div>
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}

export default TasksPage;
