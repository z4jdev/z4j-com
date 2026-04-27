/**
 * SchedulerMeta = scheduler-specific copy + behaviour. Anything universal
 * (PyPI URL, GitHub URL, upstream URL, latest version, release date,
 * docs URL) lives in src/data/packages.ts and is looked up via
 * `getPackage(scheduler.name)` from the page templates.
 */
export interface SchedulerMeta {
  /** URL slug (e.g. "celery-beat"). */
  slug: string;
  /** PyPI distribution name (e.g. "z4j-celerybeat"). Lookup key in packages.ts. */
  name: string;
  /** Display name shown as the page title. */
  shortName: string;
  tagline: string;
  description: string;
  icon: string;
  logo?: string;
  /** Slug of the paired engine in engines.ts. */
  engineSlug: string;
  /** What the scheduler can do (read, write, trigger-now, ...). */
  capabilities: string[];
  /** Engine-level limitations (not roadmap gaps). */
  limitations: string[];
}

export const SCHEDULERS: SchedulerMeta[] = [
  {
    slug: "celery-beat",
    name: "z4j-celerybeat",
    shortName: "Celery Beat",
    tagline: "Full CRUD for Celery's canonical scheduler.",
    description:
      "The canonical scheduler for Celery. Supports both celery_app.conf.beat_schedule (static config) and django_celery_beat (database-backed PeriodicTasks). Full read + write: create / edit / delete / enable / disable / trigger-now.",
    icon: "clock",
    logo: "/logos/celery-beat.png",
    engineSlug: "celery",
    capabilities: ["List schedules", "Create schedule", "Update schedule", "Delete schedule", "Enable / disable", "Trigger-now"],
    limitations: [],
  },
  {
    slug: "rq-scheduler",
    name: "z4j-rqscheduler",
    shortName: "rq-scheduler",
    tagline: "RQ's optional scheduler, wired to the dashboard.",
    description:
      "Wraps rq-scheduler's Redis sorted-set scheduler. v1 ships read + lifecycle operations; programmatic schedule creation lands in v1.1.",
    icon: "timer",
    logo: "/logos/rq-scheduler.png",
    engineSlug: "rq",
    capabilities: ["List schedules", "Enable / disable", "Delete", "Trigger-now"],
    limitations: ["create_schedule / update_schedule deferred to v1.1"],
  },
  {
    slug: "apscheduler",
    name: "z4j-apscheduler",
    shortName: "APScheduler",
    tagline: "Engine-agnostic scheduler. Pair with anything.",
    description:
      "APScheduler is the best fit when you want one process to drive Dramatiq schedules (or any engine without a native scheduler).",
    icon: "reconciliation",
    logo: "/logos/apscheduler.png",
    engineSlug: "dramatiq",
    capabilities: ["List", "Read", "Enable / disable", "Delete", "Trigger-now"],
    limitations: ["Create / update deferred to v1.1"],
  },
  {
    slug: "huey-periodic",
    name: "z4j-hueyperiodic",
    shortName: "Huey @periodic_task",
    tagline: "Read-only surface for Huey's decorator schedules.",
    description:
      "Huey's @periodic_task is decorator-defined in source code, read-only at runtime. This adapter surfaces every periodic on the Schedules page for visibility and monitoring.",
    icon: "calendar",
    logo: "/logos/hueyperiodic.png",
    engineSlug: "huey",
    capabilities: ["List", "Read"],
    limitations: ["Decorator-defined: no runtime create / update / delete", "No enable / disable toggle", "No trigger-now primitive"],
  },
  {
    slug: "arq-cron",
    name: "z4j-arqcron",
    shortName: "arq cron_jobs",
    tagline: "Read-only surface for arq's WorkerSettings.cron_jobs.",
    description:
      "arq cron jobs are statically configured in WorkerSettings.cron_jobs. Same read-only posture as Huey. This adapter exists for visibility, last-fire tracking, and per-job drill-down.",
    icon: "timer",
    logo: "/logos/arqcron.png",
    engineSlug: "arq",
    capabilities: ["List", "Read"],
    limitations: ["Statically configured: no runtime mutation", "No enable / disable toggle", "No trigger-now primitive"],
  },
  {
    slug: "taskiq-scheduler",
    name: "z4j-taskiqscheduler",
    shortName: "taskiq scheduler",
    tagline: "Wraps LabelScheduleSource + custom sources.",
    description:
      "Wraps taskiq's LabelScheduleSource (or any custom ScheduleSource). v1 supports list + read + delete.",
    icon: "calendar",
    logo: "/logos/taskiqscheduler.png",
    engineSlug: "taskiq",
    capabilities: ["List", "Read", "Delete (when source supports it)"],
    limitations: ["Create / update are source-specific", "No generic enable / disable"],
  },
];

export function getScheduler(slug: string): SchedulerMeta | undefined {
  return SCHEDULERS.find((s) => s.slug === slug);
}
