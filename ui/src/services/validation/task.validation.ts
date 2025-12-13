

import * as z from "zod"; 
 
export const TaskValidation = z.object({ 
  title: z.string(),
  detail: z.string(),
  priority:z.string(),
  type:z.string(),
  due_date:z.string().datetime({offset:true}).transform(val=>new Date(val)),
  status:z.string()
});

export type TaskPayload = z.infer<typeof TaskValidation>;
