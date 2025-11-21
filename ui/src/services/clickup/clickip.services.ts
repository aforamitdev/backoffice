// pk_5752439_8WOMCT3ASRT4O0F46CND5ONWPQUVQORX

import buildTaskTree from "@/components/tasks/utils/taskTree";
import type { Task } from "@/types/task.type";
import axios from 'axios';

const CLICKUP_BASE = 'https://api.clickup.com/api/v2';

/**
 * Fetch all tasks for a ClickUp list, including subtasks.
 *
 * @param listId - ClickUp list ID
 * @param token - ClickUp API token (optional; falls back to process.env.CLICKUP_TOKEN)
 * @returns Promise resolving to an array of tasks
 */
export const getTasks = async (listId: string, token?: string): Promise<Task[]> => {
  const apiToken ="pk_5752439_EAJWUDD5A0VNOJ0GFW51CSMN5MRAXREC"

  if (!apiToken) throw new Error('ClickUp API token required (pass token or set CLICKUP_TOKEN).');

  const results: Task[] = [];
  let page = 0;

  try {
    while (true) {
      const resp = await axios.get(`${CLICKUP_BASE}/list/${encodeURIComponent(listId)}/task`, {
        headers: { Authorization: apiToken },
        params: { subtasks: true, page },
      });

      const tasks = Array.isArray(resp.data?.tasks) ? resp.data.tasks : [];
      results.push(...tasks);

      // Stop when API indicates no more pages or returned no tasks
      if (resp.data?.has_more === false || tasks.length === 0) break;
      page += 1;
    }

    return buildTaskTree(results);
  } catch (err: any) {
    // surface helpful error message
    const msg = err?.response?.data || err?.message || err;
    throw new Error(`Failed to fetch ClickUp tasks: ${JSON.stringify(msg)}`);
  }
};