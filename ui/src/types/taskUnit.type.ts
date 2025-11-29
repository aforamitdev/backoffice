type TaskType = "GOAL" | "MILESTONE" | "TASK" | "SUBTASK" | "UNIT";

export type UnitTask = {
  title: string;
  details: string;
  tags: string[];
  unitType: TaskType;
  childs?: UnitTask[];
};
