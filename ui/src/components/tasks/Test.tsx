import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Calendar,
  Mail,
  Trello,
  ListTodo,
  LayoutGrid,
  List,
  GanttChart,
  Table,
  CheckCheck,
  SlidersHorizontal,
  MoreVertical,
  Check,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Calendar, label: "Calendar" },
  { icon: Mail, label: "Mail" },
  { icon: Trello, label: "Kanban" },
  { icon: ListTodo, label: "Tasks", badge: 3 },
];

const lists = [
  { label: "Leads", color: "#3b82f6" },
  { label: "Integrations", color: "#10b981" },
  { label: "Past Customers", color: "#a855f7" },
];

const viewTabs = [
  { icon: LayoutGrid, label: "Summary" },
  { icon: Trello, label: "Board" },
  { icon: List, label: "List" },
  { icon: GanttChart, label: "Gantt" },
  { icon: Calendar, label: "Calendar" },
  { icon: Table, label: "Table" },
];

const initialTasks = [
  { id: 1, title: "Task", checked: false, expanded: false, children: [] },
  {
    id: 2,
    title: "Wireframing and Prototyping",
    checked: false,
    expanded: true,
    children: [],
  },
  {
    id: 3,
    title: "User Research and Analysis",
    checked: true,
    expanded: true,
    children: [],
  },
  {
    id: 4,
    title: "Information Architecture Development",
    checked: true,
    expanded: true,
    children: [],
  },
  {
    id: 5,
    title: "Color Scheme and Typography Selection",
    checked: false,
    expanded: true,
    children: [],
  },
  {
    id: 6,
    title: "Icon and Graphic Design",
    checked: false,
    expanded: true,
    children: [],
  },
  {
    id: 7,
    title: "Interactive Component Creation",
    checked: false,
    expanded: true,
    children: [],
  },
  {
    id: 8,
    title: "Mobile Responsiveness Optimization",
    checked: false,
    expanded: true,
    children: [
      {
        id: 9,
        title: "Usability Testing and Feedback Incorporation",
        checked: false,
      },
      { id: 10, title: "Accessibility Enhancement", checked: false },
    ],
  },
];

function Checkbox({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all border-2 ${
        checked
          ? "bg-blue-500 border-blue-500"
          : "border-gray-300 bg-transparent hover:border-gray-400"
      }`}
    >
      {checked && <Check size={14} className="text-white" strokeWidth={3} />}
    </button>
  );
}

function TaskItem({ task, level = 0, onToggle, onExpand }) {
  const hasChildren = task.children && task.children.length > 0;

  return (
    <div>
      <div
        className={`flex items-center gap-3 py-3 px-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer transition-colors ${
          level > 0 ? "pl-14" : ""
        }`}
      >
        {level === 0 && (
          <button
            onClick={() => onExpand(task.id)}
            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded"
          >
            {hasChildren ? (
              <ChevronDown size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>
        )}
        <Checkbox checked={task.checked} onChange={() => onToggle(task.id)} />
        <span
          className={`${task.checked ? "text-gray-400 line-through" : "text-gray-700"}`}
        >
          {task.title}
        </span>
      </div>
      {hasChildren &&
        task.expanded &&
        task.children.map((child) => (
          <TaskItem
            key={child.id}
            task={child}
            level={level + 1}
            onToggle={onToggle}
            onExpand={onExpand}
          />
        ))}
    </div>
  );
}

export default function ProjectManagement() {
  const [activeTab, setActiveTab] = useState("List");
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) return { ...task, checked: !task.checked };
        if (task.children) {
          return {
            ...task,
            children: task.children.map((child) =>
              child.id === id ? { ...child, checked: !child.checked } : child,
            ),
          };
        }
        return task;
      }),
    );
  };

  const expandTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, expanded: !task.expanded } : task,
      ),
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-sm">
      <main className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto p-6">
          {/* Task List */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onExpand={expandTask}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
