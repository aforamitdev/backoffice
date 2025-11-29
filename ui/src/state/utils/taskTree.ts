import type { Task } from "@/types/task.type";

type TaskWithChildren = Task & { children: TaskWithChildren[] };

export default function buildTaskTree(tasks:Task[]) {
    const taskMap: Record<string, TaskWithChildren> = {};
    const tree: TaskWithChildren[] = [];

    // Step 1: Initialize the map and add a 'children' array to each task
    // This creates a reference object where we can look up tasks by ID instantly.
    tasks.forEach(task => {
        // Create a shallow copy to avoid mutating the original data if needed
        taskMap[task.id] = { ...task, children: [] };
    });

    // Step 2: Connect the dots
    tasks.forEach(task => {
        // Get the processed task object (with the children array) from our map
        const currentTask = taskMap[task.id];
        
        if (task.parent && taskMap[task.parent]) {
            // If the task has a parent, and that parent exists in our list,
            // push the current task into the parent's children array.
            taskMap[task.parent].children.push(currentTask);
        } else {
            // If there is no parent, or the parent is not in this list,
            // this task is a root node.
            tree.push(currentTask);
        }
    });

    return tree;
}