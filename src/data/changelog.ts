export type ChangeType = "added" | "changed" | "fixed" | "security" | "deprecated" | "removed";

export interface ChangelogEntry {
  type: ChangeType;
  summary: string;
}

export interface ComponentChangelog {
  slug: string;
  name: string;
  category: "core" | "brain" | "framework" | "engine" | "scheduler";
  categoryLabel: string;
  version: string;
  date: string;
  entries: ChangelogEntry[];
}

export const RELEASES: { version: string; date: string; headline: string }[] = [
  {
    version: "1.0.0",
    date: "April 2026",
    headline: "Initial public release. Every adapter, every scheduler, and the brain all ship together.",
  },
];

export const CHANGELOG: ComponentChangelog[] = [
  {
    slug: "z4j-core",
    name: "z4j-core",
    category: "core",
    categoryLabel: "Core",
    version: "1.0.0",
    date: "April 2026",
    entries: [
      { type: "added", summary: "Protocol definitions for QueueEngine, SchedulerAdapter, EventSink, and TransportEnvelope." },
      { type: "added", summary: "Recursive redaction engine with ~40 default secret patterns and @z4j_meta per-task overrides." },
      { type: "added", summary: "HMAC v2 wire-protocol envelope with nonce, monotonic sequence, and timestamp window." },
      { type: "added", summary: "Domain models for Task, Worker, Schedule, AuditEntry, Project, and Membership." },
      { type: "security", summary: "Constant-time comparison helpers across all signature verification paths." },
    ],
  },
  {
    slug: "z4j-bare",
    name: "z4j-bare",
    category: "core",
    categoryLabel: "Core",
    version: "1.0.0",
    date: "April 2026",
    entries: [
      { type: "added", summary: "Framework-free agent bootstrapper with local SQLite event buffer." },
      { type: "added", summary: "Outbound WebSocket transport with auto-reconnect and HMAC-signed frames." },
      { type: "added", summary: "Event batching, back-pressure, and heartbeat with session-bound frame detection." },
      { type: "added", summary: "pip-installable with no dependencies beyond z4j-core." },
    ],
  },
  {
    slug: "z4j-brain",
    name: "z4j-brain",
    category: "brain",
    categoryLabel: "Brain",
    version: "1.0.0",
    date: "April 2026",
    entries: [
      { type: "added", summary: "FastAPI backend + React dashboard bundled in a single Docker image." },
      { type: "added", summary: "PostgreSQL 17+ and SQLite support with dialect-aware queries (partitioning, trends, full-text)." },
      { type: "added", summary: "RBAC with four roles (Owner, Admin, Operator, Viewer) and per-project membership." },
      { type: "added", summary: "Invitation flow with HMAC-hashed tokens and SMTP auto-send." },
      { type: "added", summary: "Password reset flow: constant-time response, single-use tokens, atomic session revocation." },
      { type: "added", summary: "HMAC-chained audit log (per-row HMAC plus prev_row_hmac anchor) with verify_chain walker." },
      { type: "added", summary: "Reconciliation worker that closes stuck-task gaps against every engine's result backend." },
      { type: "added", summary: "Trends endpoint (1h / 6h / 24h / 72h / 7d) with 500-bucket query guard." },
      { type: "added", summary: "Visual task DAG: tidy-tree SVG layout, runtime badges, orphan + cycle detection." },
      { type: "added", summary: "Notifications: Email, Slack, Telegram, webhook - SSRF-hardened with private-IP block and scheme allow-list." },
      { type: "security", summary: "Argon2id password hashing (64 MiB memory, 3 iterations, parallelism 4) with 3-of-4 character-class policy." },
      { type: "security", summary: "IP-bucket rate limits: /auth/login (20/min), /invitations (30/min), /auth/password-reset (10/min)." },
      { type: "security", summary: "__Host-prefixed CSRF cookie with double-submit token on every mutating endpoint." },
    ],
  },
  {
    slug: "z4j-django",
    name: "z4j-django",
    category: "framework",
    categoryLabel: "Framework adapter",
    version: "1.0.0",
    date: "April 2026",
    entries: [
      { type: "added", summary: "Django AppConfig integration with zero-boilerplate auto-registration." },
      { type: "added", summary: "django_celery_beat schedule adapter for database-backed PeriodicTasks." },
      { type: "added", summary: "System checks that warn on common configuration drift." },
      { type: "added", summary: "CSRF-safe admin integration." },
    ],
  },
  {
    slug: "z4j-flask",
    name: "z4j-flask",
    category: "framework",
    categoryLabel: "Framework adapter",
    version: "1.0.0",
    date: "April 2026",
    entries: [
      { type: "added", summary: "Standard Flask extension pattern (Z4J(app))." },
      { type: "added", summary: "Auto-discovery for Flask-Celery / Flask-Dramatiq project layouts." },
      { type: "added", summary: "config.from_prefixed_env support for Z4J_* environment variables." },
      { type: "added", summary: "Gunicorn-safe initialization and Blueprint-friendly registration." },
    ],
  },
  {
    slug: "z4j-fastapi",
    name: "z4j-fastapi",
    category: "framework",
    categoryLabel: "Framework adapter",
    version: "1.0.0",
    date: "April 2026",
    entries: [
      { type: "added", summary: "FastAPI lifespan integration via install() factory." },
      { type: "added", summary: "Dependency-injection helpers for agent context." },
      { type: "added", summary: "Async-native wiring tuned for arq and taskiq." },
      { type: "added", summary: "WebSocket-aware health checks." },
    ],
  },
  {
    slug: "z4j-celery",
    name: "z4j-celery",
    category: "engine",
    categoryLabel: "Engine adapter",
    version: "1.0.0",
    date: "April 2026",
    entries: [
      { type: "added", summary: "Full parity with every action Celery's remote-control channel exposes." },
      { type: "added", summary: "Dual event capture: signals (in-process) + broker-events monitoring (fanout)." },
      { type: "added", summary: "Reconciliation via celery.result.AsyncResult, authoritative across every backend." },
      { type: "added", summary: "Native pool_restart support (graceful drain, zero task loss)." },
      { type: "added", summary: "Broker support: Redis, RabbitMQ, SQS, and any Kombu-supported transport." },
    ],
  },
  {
    slug: "z4j-rq",
    name: "z4j-rq",
    category: "engine",
    categoryLabel: "Engine adapter",
    version: "1.0.0",
    date: "April 2026",
    entries: [
      { type: "added", summary: "Worker-wrap event capture with no code changes required in jobs." },
      { type: "added", summary: "Per-job callbacks plus global worker hooks." },
      { type: "added", summary: "Reconciliation via rq.job.Job status, ended_at, and exc_info." },
      { type: "added", summary: "bulk_retry and requeue_dead_letter polyfilled brain-side via submit_task." },
    ],
  },
  {
    slug: "z4j-dramatiq",
    name: "z4j-dramatiq",
    category: "engine",
    categoryLabel: "Engine adapter",
    version: "1.0.0",
    date: "April 2026",
    entries: [
      { type: "added", summary: "Z4JMiddleware - Dramatiq's blessed observability hook, no monkey-patching." },
      { type: "added", summary: "Dual broker support day one (Redis + RabbitMQ)." },
      { type: "added", summary: "Abortable-gated cancel promoted only when middleware is installed." },
      { type: "added", summary: "Results middleware integration for reconciliation." },
    ],
  },
  {
    slug: "z4j-huey",
    name: "z4j-huey",
    category: "engine",
    categoryLabel: "Engine adapter",
    version: "1.0.0",
    date: "April 2026",
    entries: [
      { type: "added", summary: "Signal-based event capture via huey.signals (enqueued, executing, complete, error, retried, revoked)." },
      { type: "added", summary: "Huey 2.x and 3.x support." },
      { type: "added", summary: "Reconciliation via Huey result store (peek_data)." },
      { type: "added", summary: "bulk_retry and requeue_dead_letter polyfilled brain-side." },
    ],
  },
  {
    slug: "z4j-arq",
    name: "z4j-arq",
    category: "engine",
    categoryLabel: "Engine adapter",
    version: "1.0.0",
    date: "April 2026",
    entries: [
      { type: "added", summary: "attach_to_worker_settings() chains onto on_job_start / on_job_end hooks." },
      { type: "added", summary: "Reconciliation via arq.jobs.Job.status() and result_info()." },
      { type: "added", summary: "retry_task polyfilled brain-side via submit_task using captured args." },
      { type: "added", summary: "cancel_task via Job.abort." },
    ],
  },
  {
    slug: "z4j-taskiq",
    name: "z4j-taskiq",
    category: "engine",
    categoryLabel: "Engine adapter",
    version: "1.0.0",
    date: "April 2026",
    entries: [
      { type: "added", summary: "Z4JTaskiqMiddleware covering pre_send, pre_execute, post_execute, on_error." },
      { type: "added", summary: "Broker-agnostic support starting with Redis Streams; NATS and AMQP land in 1.1." },
      { type: "added", summary: "retry_task, bulk_retry, and requeue_dead_letter polyfilled brain-side." },
      { type: "added", summary: "Reconciliation via result_backend.is_result_ready() and get_result()." },
    ],
  },
  {
    slug: "z4j-celerybeat",
    name: "z4j-celerybeat",
    category: "scheduler",
    categoryLabel: "Scheduler adapter",
    version: "1.0.0",
    date: "April 2026",
    entries: [
      { type: "added", summary: "Full CRUD for Celery's canonical scheduler." },
      { type: "added", summary: "Supports both celery_app.conf.beat_schedule and django_celery_beat." },
      { type: "added", summary: "Trigger-now for on-demand runs; enable/disable toggles." },
    ],
  },
  {
    slug: "z4j-rqscheduler",
    name: "z4j-rqscheduler",
    category: "scheduler",
    categoryLabel: "Scheduler adapter",
    version: "1.0.0",
    date: "April 2026",
    entries: [
      { type: "added", summary: "Wraps rq-scheduler's Redis sorted-set scheduler." },
      { type: "added", summary: "Read + lifecycle operations: list, enable/disable, delete, trigger-now." },
    ],
  },
  {
    slug: "z4j-apscheduler",
    name: "z4j-apscheduler",
    category: "scheduler",
    categoryLabel: "Scheduler adapter",
    version: "1.0.0",
    date: "April 2026",
    entries: [
      { type: "added", summary: "Engine-agnostic scheduler for Dramatiq or any engine without a native scheduler." },
      { type: "added", summary: "List, read, enable/disable, delete, trigger-now." },
    ],
  },
  {
    slug: "z4j-hueyperiodic",
    name: "z4j-hueyperiodic",
    category: "scheduler",
    categoryLabel: "Scheduler adapter",
    version: "1.0.0",
    date: "April 2026",
    entries: [
      { type: "added", summary: "Read-only surface for Huey's @periodic_task decorator schedules." },
      { type: "added", summary: "Surfaces every periodic on the Schedules page for visibility and monitoring." },
    ],
  },
  {
    slug: "z4j-arqcron",
    name: "z4j-arqcron",
    category: "scheduler",
    categoryLabel: "Scheduler adapter",
    version: "1.0.0",
    date: "April 2026",
    entries: [
      { type: "added", summary: "Read-only surface for arq's WorkerSettings.cron_jobs." },
      { type: "added", summary: "Last-fire tracking and per-job drill-down." },
    ],
  },
  {
    slug: "z4j-taskiqscheduler",
    name: "z4j-taskiqscheduler",
    category: "scheduler",
    categoryLabel: "Scheduler adapter",
    version: "1.0.0",
    date: "April 2026",
    entries: [
      { type: "added", summary: "Wraps taskiq's LabelScheduleSource or any custom ScheduleSource." },
      { type: "added", summary: "List, read, delete (where source supports deletion)." },
    ],
  },
];

export const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "core", label: "Core" },
  { id: "brain", label: "Brain" },
  { id: "framework", label: "Frameworks" },
  { id: "engine", label: "Engines" },
  { id: "scheduler", label: "Schedulers" },
] as const;
