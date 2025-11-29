import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Task from "./Task";
import type { UnitTask } from "@/types/taskUnit.type";

const tasks: UnitTask[] = [
  {
    title: "DOT_NET COURSE ",
    details: "",
    tags: ["parent"],
    unitType: "GOAL",

    childs: [
      {
        title: "Async React!!",
        details: "",
        tags: [""],
        unitType: "MILESTONE",
        childs: [
          {
            title: "Subtask",
            unitType: "TASK",
            details: "",
            tags: [""],
            childs: [
              {
                title: "units 121212",
                unitType: "SUBTASK",
                details: "",
                tags: [""],
                childs: [
                  {
                    title: "THISS IS TASK",
                    details: "",
                    tags: [""],
                    unitType: "UNIT",
                  },
                ],
              },
            ],
          },
          {
            title: "this is subtask !!!",
            unitType: "TASK",
            details: "",
            tags: [""],
          },
        ],
      },
    ],
  },
  {
    title: "GOLANG  asas",
    details: "",
    tags: ["parent"],
    unitType: "GOAL",
  },
];

export function TableDemo() {
  return (
    <Table className="border ">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12"></TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Method</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <Task
            title={task.title}
            details={task.details}
            tags={task.tags}
            unitType={task.unitType}
            childs={task.childs}
            hasChild={Boolean(task.childs?.length)}
            level={1}
          />
        ))}
      </TableBody>
    </Table>
  );
}
