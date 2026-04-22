export interface SchedulerMeta {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: string;
  logo?: string;
  pypi: string;
  engineSlug: string;
  capabilities: string[];
  limitations: string[];
  docsHref: string;
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
    pypi: "z4j-celerybeat",
    engineSlug: "celery",
    capabilities: ["List schedules", "Create schedule", "Update schedule", "Delete schedule", "Enable / disable", "Trigger-now"],
    limitations: [],
    docsHref: "https://z4j.dev/schedulers/celery-beat/",
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
    pypi: "z4j-rqscheduler",
    engineSlug: "rq",
    capabilities: ["List schedules", "Enable / disable", "Delete", "Trigger-now"],
    limitations: ["create_schedule / update_schedule deferred to v1.1"],
    docsHref: "https://z4j.dev/schedulers/rq-scheduler/",
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
    pypi: "z4j-apscheduler",
    engineSlug: "dramatiq",
    capabilities: ["List", "Read", "Enable / disable", "Delete", "Trigger-now"],
    limitations: ["Create / update deferred to v1.1"],
    docsHref: "https://z4j.dev/schedulers/apscheduler/",
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
    pypi: "z4j-hueyperiodic",
    engineSlug: "huey",
    capabilities: ["List", "Read"],
    limitations: ["Decorator-defined: no runtime create / update / delete", "No enable / disable toggle", "No trigger-now primitive"],
    docsHref: "https://z4j.dev/schedulers/huey-periodic/",
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
    pypi: "z4j-arqcron",
    engineSlug: "arq",
    capabilities: ["List", "Read"],
    limitations: ["Statically configured: no runtime mutation", "No enable / disable toggle", "No trigger-now primitive"],
    docsHref: "https://z4j.dev/schedulers/arq-cron/",
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
    pypi: "z4j-taskiqscheduler",
    engineSlug: "taskiq",
    capabilities: ["List", "Read", "Delete (when source supports it)"],
    limitations: ["Create / update are source-specific", "No generic enable / disable"],
    docsHref: "https://z4j.dev/schedulers/taskiq-scheduler/",
  },
];

export function getScheduler(slug: string): SchedulerMeta | undefined {
  return SCHEDULERS.find((s) => s.slug === slug);
}
