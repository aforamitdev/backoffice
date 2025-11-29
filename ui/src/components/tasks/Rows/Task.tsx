import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import type { UnitTask } from "@/types/taskUnit.type";

const Task = ({
  title,
  details,
  tags,
  unitType,
  childs,
  level,
  hasChild,
}: UnitTask & { hasChild: boolean; level: number }) => {
  return (
    <>
      <TableRow key={title}>
        <TableCell className="font-medium">
          <Checkbox />
        </TableCell>
        <TableCell>
          <div
            className={`flex gap-2 items-center`}
            style={{ marginLeft: level * 16 }}
          >
            {title}
          </div>
        </TableCell>
      </TableRow>

      {hasChild &&
        childs &&
        childs.map((child) => (
          <Task
            key={child.title}
            title={child.title}
            details={child.details}
            unitType={child.unitType}
            tags={child.tags}
            childs={child.childs}
            hasChild={Boolean(child.childs?.length)}
            level={level + 1}
          />
        ))}
    </>
  );
};

export default Task;
