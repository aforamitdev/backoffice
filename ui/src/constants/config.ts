/**
 * Application configuration constants
 * Move sensitive values to .env in production
 */

export const CLICKUP_CONFIG = {
  DEFAULT_LIST_ID: import.meta.env.VITE_DEFAULT_LIST_ID || "901612157845",
  DEFAULT_WORKSPACE_ID:
    import.meta.env.VITE_DEFAULT_WORKSPACE_ID || "9016922311",
} as const;

export const APP_CONFIG = {
  APP_NAME: "Command",
  VERSION: "0.0.0",
} as const;
