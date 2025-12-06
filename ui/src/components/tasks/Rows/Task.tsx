import { memo, useMemo } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { TableCell, TableRow } from '@/components/ui/table';
import type { UnitTask } from '@/types/taskUnit.type';

type TaskProps = UnitTask & { hasChild: boolean; level: number };

const Task = memo(function Task(props: TaskProps) {
  const { title, details, tags, unitType, childs, level } = props;

  const rows = useMemo(() => {
    const out: JSX.Element[] = [];

    const walk = (task: UnitTask, lvl: number, path: string) => {
      const keyBase = `${path}:${lvl}`;
      const indentPx = lvl * 16;

      out.push(
        <TableRow key={keyBase}>
          <TableCell className='font-medium'>
            <Checkbox />
          </TableCell>
          <TableCell>
            <div
              className={`flex gap-2 items-center`}
              style={{ marginLeft: indentPx }}
            >
              {task.title}
            </div>
          </TableCell>
        </TableRow>
      );

      if (task.childs?.length) {
        task.childs.forEach((c, i) => walk(c, lvl + 1, `${keyBase}/${i}`));
      }
    };

    walk({ title, details, tags, unitType, childs }, level, title ?? 'task');
    return out;
  }, [title, details, tags, unitType, childs, level]);

  return <>{rows}</>;
});

export default Task;
