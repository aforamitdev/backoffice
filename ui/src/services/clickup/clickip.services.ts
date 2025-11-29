import type { Task } from '@/types/task.type';
import type { TimeEntryPayload, TimeResponse } from '@/types/time.type';
import axios from 'axios';

const CLICKUP_BASE = 'https://api.clickup.com/api/v2';

export const getTasks = async (listId: string): Promise<Task[]> => {
  const apiToken = import.meta.env.VITE_CLICK_UP;

  if (!apiToken)
    throw new Error(
      'ClickUp API token required (pass token or set CLICKUP_TOKEN).'
    );

  const results: Task[] = [];
  let page = 0;

  try {
    while (true) {
      const resp = await axios.get(
        `${CLICKUP_BASE}/list/${encodeURIComponent(listId)}/task`,
        {
          headers: { Authorization: apiToken },
          params: { subtasks: true, page },
        }
      );

      const tasks = Array.isArray(resp.data?.tasks) ? resp.data.tasks : [];
      results.push(...tasks);

      if (resp.data?.has_more === false || tasks.length === 0) break;
      page += 1;
    }
  } catch (err: unknown) {
    const error = err as { response?: { data?: unknown }; message?: string };
    const msg = error?.response?.data || error?.message || 'Unknown error';
    throw new Error(`Failed to fetch ClickUp tasks: ${JSON.stringify(msg)}`);
  }
  return results;
};

export const startTask = async (
  params: TimeEntryPayload
): Promise<TimeResponse> => {
  const apiToken = import.meta.env.VITE_CLICK_UP;

  if (!apiToken) {
    throw new Error(
      'ClickUp API token required (pass token or set CLICKUP_TOKEN).'
    );
  }

  try {
    const resp = await axios.post<TimeResponse>(
      `${CLICKUP_BASE}/team/${params.workSpaceId}/time_entries/start?custom_task_ids=false`,
      { tid: params.tid },
      { headers: { Authorization: apiToken } }
    );

    if (resp.data) {
      return resp.data;
    }

    throw new Error('No data returned from ClickUp API');
  } catch (err: unknown) {
    const error = err as { response?: { data?: unknown }; message?: string };
    const msg = error?.response?.data || error?.message || 'Unknown error';
    throw new Error(`Failed to start task: ${JSON.stringify(msg)}`);
  }
};

export const getCurrentActiveTask = async (workSpaceId: string) => {
  const apiToken = import.meta.env.VITE_CLICK_UP;

  if (!apiToken) {
    throw new Error(
      'ClickUp API token required (pass token or set CLICKUP_TOKEN).'
    );
  }

  try {
    const resp = await axios.get(
      `${CLICKUP_BASE}/team/${workSpaceId}/time_entries/current`,
      { headers: { Authorization: apiToken } }
    );
    return resp;
  } catch (err: unknown) {
    const error = err as { response?: { data?: unknown }; message?: string };
    const msg = error?.response?.data || error?.message || 'Unknown error';
    throw new Error(`Failed to get current active task: ${JSON.stringify(msg)}`);
  }
};

export interface CreateTaskPayload {
  name: string;
  description?: string;
  parent?: string;
  priority?: number;
  status?: string;
  tags?: string[];
}

export const createTask = async (
  listId: string,
  payload: CreateTaskPayload
): Promise<Task> => {
  const apiToken = import.meta.env.VITE_CLICK_UP;

  if (!apiToken) {
    throw new Error(
      'ClickUp API token required (pass token or set CLICKUP_TOKEN).'
    );
  }

  try {
    const resp = await axios.post<Task>(
      `${CLICKUP_BASE}/list/${encodeURIComponent(listId)}/task`,
      {
        name: payload.name,
        description: payload.description || '',
        parent: payload.parent || null,
        priority: payload.priority || null,
        status: payload.status || null,
        tags: payload.tags || [],
      },
      { headers: { Authorization: apiToken } }
    );

    if (resp.data) {
      return resp.data;
    }

    throw new Error('No data returned from ClickUp API');
  } catch (err: unknown) {
    const error = err as { response?: { data?: unknown }; message?: string };
    const msg = error?.response?.data || error?.message || 'Unknown error';
    throw new Error(`Failed to create task: ${JSON.stringify(msg)}`);
  }
};
