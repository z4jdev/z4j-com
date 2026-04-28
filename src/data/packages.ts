/**
 * Canonical package + release data for both z4j.com and z4j.dev.
 *
 * Source of truth: J:/z4j/sites/_shared/packages.ts
 * Sync targets:
 *   - J:/z4j/sites/z4j-com/src/data/packages.ts
 *   - J:/z4j/sites/z4j-dev/src/data/packages.ts
 *
 * Run `make sync-packages` after editing this file to push the same
 * content into both site copies. Each site keeps a LOCAL copy (not
 * a relative import) so the polyrepo deploy via release-split.sh
 * produces a self-contained site repo.
 *
 * When you ship a new package version:
 *   1. Bump `latest` and `releaseDate` in PACKAGES below.
 *   2. Prepend a new entry to RELEASES.
 *   3. Run `make sync-packages` from the monorepo root.
 *   4. Both sites pick up the change everywhere they consume it
 *      (homepage banner, deployment cards, changelog, etc.).
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type PackageCategory =
  | "umbrella"
  | "brain"
  | "core"
  | "framework"
  | "engine"
  | "scheduler";

export type PackageLicense = "AGPL-3.0" | "Apache-2.0";

export interface PackageMeta {
  /** PyPI distribution name. Used as the lookup key in PACKAGES. */
  name: string;
  /** Bucket for grouping in indexes / sidebars / changelog filters. */
  category: PackageCategory;
  /** SPDX-style license identifier. */
  license: PackageLicense;
  /** Latest stable version on PyPI. */
  latest: string;
  /** Release date of the latest version. ISO `YYYY-MM-DD`. */
  releaseDate: string;
  /** Optional time-of-day for finer-grained ordering. Free-form string. */
  releaseTime?: string;
  /** PyPI project URL. */
  pypi: string;
  /** GitHub repository URL. */
  github: string;
  /** Docker Hub image URL (only set for packages that ship a Docker image). */
  dockerhub?: string;
  /** Marketing landing page on z4j.com (when present). */
  landing?: string;
  /** Documentation page on z4j.dev (when present). */
  docs?: string;
  /** Upstream project this adapter wraps (when present). e.g. Celery's docs site. */
  upstream?: string;
  /** One-line description for cards / table cells. */
  description: string;
}

export type ChangeType =
  | "added"
  | "changed"
  | "fixed"
  | "security"
  | "deprecated"
  | "removed";

export interface ChangelogEntry {
  type: ChangeType;
  summary: string;
}

export interface PackageRelease {
  /** PyPI name of the package this release is for. Must exist in PACKAGES. */
  package: string;
  /** Version that shipped. */
  version: string;
  /** Release date. ISO `YYYY-MM-DD`. */
  date: string;
  /** Optional time-of-day for finer-grained ordering. Free-form string. */
  time?: string;
  /** Bullet entries. */
  entries: ChangelogEntry[];
}

// ---------------------------------------------------------------------------
// Constants used in copy
// ---------------------------------------------------------------------------

/** Headline version for "z4j" as a project. The brain version is canonical. */
export const Z4J_HEADLINE_VERSION = "1.1.0";

/** Minor line that all v1.1.x ecosystem-anchor packages share. */
export const Z4J_LINE = "1.1";

// ---------------------------------------------------------------------------
// Packages
// ---------------------------------------------------------------------------

export const PACKAGES: Record<string, PackageMeta> = {
  // Umbrella ---------------------------------------------------------------
  "z4j": {
    name: "z4j",
    category: "umbrella",
    license: "AGPL-3.0",
    latest: "1.1.0",
    releaseDate: "2026-04-28",
    pypi: "https://pypi.org/project/z4j/",
    github: "https://github.com/z4jdev/z4j",
    dockerhub: "https://hub.docker.com/r/z4jdev/z4j",
    landing: "https://z4j.com/install/z4j",
    docs: "https://z4j.dev/getting-started/install/",
    description: "All-in-one umbrella. Brain + core + adapters via extras.",
  },

  // Brain ------------------------------------------------------------------
  "z4j-brain": {
    name: "z4j-brain",
    category: "brain",
    license: "AGPL-3.0",
    latest: "1.1.0",
    releaseDate: "2026-04-28",
    pypi: "https://pypi.org/project/z4j-brain/",
    github: "https://github.com/z4jdev/z4j-brain",
    dockerhub: "https://hub.docker.com/r/z4jdev/z4j",
    docs: "https://z4j.dev/getting-started/install/",
    description: "Brain server: dashboard, API, migrations, audit log.",
  },

  // Core --------------------------------------------------------------------
  "z4j-core": {
    name: "z4j-core",
    category: "core",
    license: "Apache-2.0",
    latest: "1.1.0",
    releaseDate: "2026-04-28",
    pypi: "https://pypi.org/project/z4j-core/",
    github: "https://github.com/z4jdev/z4j-core",
    description: "Shared protocol types, models, redaction engine.",
  },
  "z4j-scheduler": {
    name: "z4j-scheduler",
    category: "core",
    license: "Apache-2.0",
    latest: "1.1.0",
    releaseDate: "2026-04-28",
    pypi: "https://pypi.org/project/z4j-scheduler/",
    github: "https://github.com/z4jdev/z4j-scheduler",
    docs: "https://z4j.dev/scheduler/",
    description: "Engine-agnostic dynamic scheduler companion process.",
  },
  "z4j-bare": {
    name: "z4j-bare",
    category: "core",
    license: "Apache-2.0",
    latest: "1.1.0",
    releaseDate: "2026-04-28",
    pypi: "https://pypi.org/project/z4j-bare/",
    github: "https://github.com/z4jdev/z4j-bare",
    docs: "https://z4j.dev/frameworks/bare/",
    description: "Framework-free agent runtime + WebSocket transport.",
  },

  // Framework adapters ------------------------------------------------------
  "z4j-django": {
    name: "z4j-django",
    category: "framework",
    license: "Apache-2.0",
    latest: "1.1.0",
    releaseDate: "2026-04-28",
    pypi: "https://pypi.org/project/z4j-django/",
    github: "https://github.com/z4jdev/z4j-django",
    landing: "https://z4j.com/frameworks/django",
    docs: "https://z4j.dev/frameworks/django/",
    upstream: "https://www.djangoproject.com/",
    description: "Django framework adapter.",
  },
  "z4j-flask": {
    name: "z4j-flask",
    category: "framework",
    license: "Apache-2.0",
    latest: "1.1.0",
    releaseDate: "2026-04-28",
    pypi: "https://pypi.org/project/z4j-flask/",
    github: "https://github.com/z4jdev/z4j-flask",
    landing: "https://z4j.com/frameworks/flask",
    docs: "https://z4j.dev/frameworks/flask/",
    upstream: "https://flask.palletsprojects.com/",
    description: "Flask framework adapter.",
  },
  "z4j-fastapi": {
    name: "z4j-fastapi",
    category: "framework",
    license: "Apache-2.0",
    latest: "1.1.0",
    releaseDate: "2026-04-28",
    pypi: "https://pypi.org/project/z4j-fastapi/",
    github: "https://github.com/z4jdev/z4j-fastapi",
    landing: "https://z4j.com/frameworks/fastapi",
    docs: "https://z4j.dev/frameworks/fastapi/",
    upstream: "https://fastapi.tiangolo.com/",
    description: "FastAPI framework adapter.",
  },

  // Engine adapters ---------------------------------------------------------
  "z4j-celery": {
    name: "z4j-celery",
    category: "engine",
    license: "Apache-2.0",
    latest: "1.1.0",
    releaseDate: "2026-04-28",
    pypi: "https://pypi.org/project/z4j-celery/",
    github: "https://github.com/z4jdev/z4j-celery",
    landing: "https://z4j.com/engines/celery",
    docs: "https://z4j.dev/engines/celery/",
    upstream: "https://docs.celeryq.dev/en/stable/",
    description: "Celery 5+ engine adapter.",
  },
  "z4j-rq": {
    name: "z4j-rq",
    category: "engine",
    license: "Apache-2.0",
    latest: "1.0.1",
    releaseDate: "2026-04-22",
    pypi: "https://pypi.org/project/z4j-rq/",
    github: "https://github.com/z4jdev/z4j-rq",
    landing: "https://z4j.com/engines/rq",
    docs: "https://z4j.dev/engines/rq/",
    upstream: "https://python-rq.org/",
    description: "RQ engine adapter.",
  },
  "z4j-dramatiq": {
    name: "z4j-dramatiq",
    category: "engine",
    license: "Apache-2.0",
    latest: "1.0.1",
    releaseDate: "2026-04-22",
    pypi: "https://pypi.org/project/z4j-dramatiq/",
    github: "https://github.com/z4jdev/z4j-dramatiq",
    landing: "https://z4j.com/engines/dramatiq",
    docs: "https://z4j.dev/engines/dramatiq/",
    upstream: "https://dramatiq.io/",
    description: "Dramatiq engine adapter.",
  },
  "z4j-huey": {
    name: "z4j-huey",
    category: "engine",
    license: "Apache-2.0",
    latest: "1.1.0",
    releaseDate: "2026-04-28",
    pypi: "https://pypi.org/project/z4j-huey/",
    github: "https://github.com/z4jdev/z4j-huey",
    landing: "https://z4j.com/engines/huey",
    docs: "https://z4j.dev/engines/huey/",
    upstream: "https://huey.readthedocs.io/",
    description: "Huey engine adapter.",
  },
  "z4j-arq": {
    name: "z4j-arq",
    category: "engine",
    license: "Apache-2.0",
    latest: "1.0.1",
    releaseDate: "2026-04-22",
    pypi: "https://pypi.org/project/z4j-arq/",
    github: "https://github.com/z4jdev/z4j-arq",
    landing: "https://z4j.com/engines/arq",
    docs: "https://z4j.dev/engines/arq/",
    upstream: "https://arq-docs.helpmanual.io/",
    description: "arq (async Redis queue) engine adapter.",
  },
  "z4j-taskiq": {
    name: "z4j-taskiq",
    category: "engine",
    license: "Apache-2.0",
    latest: "1.0.1",
    releaseDate: "2026-04-22",
    pypi: "https://pypi.org/project/z4j-taskiq/",
    github: "https://github.com/z4jdev/z4j-taskiq",
    landing: "https://z4j.com/engines/taskiq",
    docs: "https://z4j.dev/engines/taskiq/",
    upstream: "https://taskiq-python.github.io/",
    description: "TaskIQ engine adapter.",
  },

  // Scheduler adapters ------------------------------------------------------
  "z4j-celerybeat": {
    name: "z4j-celerybeat",
    category: "scheduler",
    license: "Apache-2.0",
    latest: "1.1.0",
    releaseDate: "2026-04-28",
    pypi: "https://pypi.org/project/z4j-celerybeat/",
    github: "https://github.com/z4jdev/z4j-celerybeat",
    landing: "https://z4j.com/schedulers/celery-beat",
    docs: "https://z4j.dev/schedulers/celery-beat/",
    upstream: "https://docs.celeryq.dev/en/stable/userguide/periodic-tasks.html",
    description: "Celery-beat scheduler adapter.",
  },
  "z4j-rqscheduler": {
    name: "z4j-rqscheduler",
    category: "scheduler",
    license: "Apache-2.0",
    latest: "1.0.1",
    releaseDate: "2026-04-22",
    pypi: "https://pypi.org/project/z4j-rqscheduler/",
    github: "https://github.com/z4jdev/z4j-rqscheduler",
    landing: "https://z4j.com/schedulers/rq-scheduler",
    docs: "https://z4j.dev/schedulers/rq-scheduler/",
    upstream: "https://github.com/rq/rq-scheduler",
    description: "rq-scheduler adapter.",
  },
  "z4j-apscheduler": {
    name: "z4j-apscheduler",
    category: "scheduler",
    license: "Apache-2.0",
    latest: "1.0.1",
    releaseDate: "2026-04-22",
    pypi: "https://pypi.org/project/z4j-apscheduler/",
    github: "https://github.com/z4jdev/z4j-apscheduler",
    landing: "https://z4j.com/schedulers/apscheduler",
    docs: "https://z4j.dev/schedulers/apscheduler/",
    upstream: "https://apscheduler.readthedocs.io/",
    description: "APScheduler adapter.",
  },
  "z4j-hueyperiodic": {
    name: "z4j-hueyperiodic",
    category: "scheduler",
    license: "Apache-2.0",
    latest: "1.0.1",
    releaseDate: "2026-04-22",
    pypi: "https://pypi.org/project/z4j-hueyperiodic/",
    github: "https://github.com/z4jdev/z4j-hueyperiodic",
    landing: "https://z4j.com/schedulers/huey-periodic",
    docs: "https://z4j.dev/schedulers/huey-periodic/",
    upstream: "https://huey.readthedocs.io/en/latest/api.html#periodic-tasks",
    description: "Huey @periodic_task scheduler adapter.",
  },
  "z4j-arqcron": {
    name: "z4j-arqcron",
    category: "scheduler",
    license: "Apache-2.0",
    latest: "1.0.1",
    releaseDate: "2026-04-22",
    pypi: "https://pypi.org/project/z4j-arqcron/",
    github: "https://github.com/z4jdev/z4j-arqcron",
    landing: "https://z4j.com/schedulers/arq-cron",
    docs: "https://z4j.dev/schedulers/arq-cron/",
    upstream: "https://arq-docs.helpmanual.io/#cron-jobs",
    description: "arq cron-job scheduler adapter.",
  },
  "z4j-taskiqscheduler": {
    name: "z4j-taskiqscheduler",
    category: "scheduler",
    license: "Apache-2.0",
    latest: "1.0.1",
    releaseDate: "2026-04-22",
    pypi: "https://pypi.org/project/z4j-taskiqscheduler/",
    github: "https://github.com/z4jdev/z4j-taskiqscheduler",
    landing: "https://z4j.com/schedulers/taskiq-scheduler",
    docs: "https://z4j.dev/schedulers/taskiq-scheduler/",
    upstream: "https://taskiq-python.github.io/guide/scheduling.html",
    description: "TaskIQ scheduler adapter.",
  },
};

// ---------------------------------------------------------------------------
// Releases (newest first)
// ---------------------------------------------------------------------------

export const RELEASES: PackageRelease[] = [
  // -------------------------------------------------------------------------
  // 2026-04-28 v1.1.0 wave-2 - round-6 audit + framework auto-discovery
  // expansion + Huey submit_task fix + cross-stack first-class support.
  //
  // Round-6 audit: 10 HIGH security + availability findings closed
  // across the brain ↔ agent transport, agent crash isolation, and
  // migration safety surfaces. Plus the MEDIUM batch (frame caps,
  // Slack/Discord host-lock, email CRLF guard).
  //
  // Framework expansion: z4j-flask + z4j-fastapi now auto-discover
  // all 6 engine adapters (celery + rq + arq + dramatiq + huey +
  // taskiq), not just celery. Cross-stack combos like Flask + RQ and
  // FastAPI + arq are first-class supported with 0/0 failures across
  // an 11-project docker e2e (4 framework × celery + 5 engine × bare
  // + 2 cross-stack).
  //
  // Bugs fixed: z4j-huey submit_task was broken on Huey 2.x/3.x
  // (Task class instantiation pattern). z4j-celery submit_task now
  // honors task_always_eager via apply_async-when-locally-registered.
  // z4j-bare's schedule.fire dispatcher routes to engine.submit_task
  // (was sending to scheduler adapter which a worker doesn't have).
  //
  // Six framework + engine packages bump from 1.0.x to 1.1.0 to ship
  // with the family: bare 1.0.7→1.1.0, django 1.0.7→1.1.0, flask
  // 1.0.4→1.1.0, fastapi 1.0.4→1.1.0, celery 1.0.3→1.1.0,
  // celerybeat 1.0.2→1.1.0, huey 1.0.1→1.1.0. Engine adapters
  // without production-code changes (rq, arq, dramatiq, taskiq +
  // 5 scheduler adapters) stay at 1.0.1.
  // -------------------------------------------------------------------------
  {
    package: "z4j-brain",
    version: "1.1.0",
    date: "2026-04-28",
    entries: [
      { type: "security", summary: "WS-HIGH-1 (round-6): drain-race double-deliver closed. Pre-fix websocket/gateway.py:466 pushed the command frame BEFORE marking it dispatched; the reconcile loop concurrently pushed the same un-dispatched command. Agent in-memory dedup caught it within 300s, but a process restart between the two pushes could deliver destructive commands (purge_queue, restart_worker, bulk_retry) twice. Fix: mark_dispatched runs BEFORE push in both gateway.py and main.py reconcile loop." },
      { type: "security", summary: "WS-HIGH-2 (round-6): long-poll re-includes DISPATCHED commands on reconnect. Pre-fix a long-poll/WS handler that marked a command DISPATCHED but failed to deliver bytes (HTTP write error, WS drop) left the command stranded - only recovered via CommandTimeoutWorker minutes later. New agent_longpoll_redispatch_seconds window pulls DISPATCHED commands back into the long-poll response on reconnect." },
      { type: "security", summary: "WS-HIGH-3 (round-6): rate limit on /ws/agent + /api/v1/agent/events. Pre-fix a leaked bearer could connect unboundedly. New _agent_connect_bucket (600/min/IP) caps reconnect storms; 1000 agents reconnecting simultaneously would have opened 3000 concurrent DB sessions before any drain ran." },
      { type: "security", summary: "Mig-HIGH-1 (round-6): events DROP TABLE idempotent guard. The 0001 initial migration did DROP TABLE events then re-created as partitioned - 'safe because table is empty' only on first run. A partial-failure recovery hit this and destroyed an existing populated events table. Now guarded with a row-count check + IF EXISTS." },
      { type: "security", summary: "Mig-HIGH-2 (round-6): CREATE INDEX CONCURRENTLY discipline + transaction_per_migration=True. Stops migrations from taking write locks on potentially-50M-row tables for the duration of a re-application. Combined with the 3-second db_lock_timeout_ms, prevents every concurrent INSERT from failing during migration." },
      { type: "security", summary: "Mig-HIGH-3 (round-6): downgrade no-op for _drop_extensions. Pre-fix migrate downgrade base did DROP EXTENSION pg_trgm/citext/pgcrypto. Operators sharing a Postgres cluster got those silently broken. Now a documented no-op - extensions stay installed across upgrade/downgrade." },
      { type: "security", summary: "SR-HIGH (round-6): multi-key acceptance for Z4J_SECRET rotation. Pre-fix rotating the master secret invalidated every prior audit-log row's HMAC, breaking compliance for operators with 90-day mandatory rotation. New Z4J_PREVIOUS_SECRETS and Z4J_PREVIOUS_SESSION_SECRETS env vars accept comma-separated old keys for verify-only fallback, enabling zero-downtime rotation." },
      { type: "security", summary: "Notif-HIGH (round-6): user-channel test endpoints now write user_notifications.channel.test audit rows. Pre-fix /api/v1/user/channels/{id}/test and /api/v1/user/channels/test (unsaved-config preflight) dispatched real notifications to operator-controlled URLs but left no audit row, defeating the security review trail." },
      { type: "security", summary: "MEDIUM batch (round-6): WebSocket frame_router caps adapter_health keys at 256, queue_depths inner entries at 1024, event_batch at 1000 frames per inbound. Slack outbound webhooks host-locked to hooks.slack.com; Discord webhooks host-locked to four official Discord webhook hosts. Email Subject/From/To headers now stripped of CR/LF before SMTP send (closes header injection)." },
    ],
  },
  {
    package: "z4j-celery",
    version: "1.1.0",
    date: "2026-04-28",
    entries: [
      { type: "security", summary: "Agent-HIGH-1 (round-6): broker poison-message ack+drop+counter. Pre-fix events/broker.py:166 requeued a poisoned message AND re-raised into Kombu, causing a tight ~2s reconnect loop in the customer's Celery worker - visible CPU/IO storm. Now the agent's broker-events listener acks the poisoned message, drops it, and bumps z4j_celery.broker_events_poisoned_total." },
      { type: "security", summary: "Agent-HIGH-2 (round-6): PID-guard prefork stale loop. engine.py:122 captured the asyncio loop reference in the parent process; Celery's prefork pool then forked workers that inherited the stale ref. Every task in prefork mode logged an error stacktrace; events could be silently dropped if the parent had moved on. New PID-guard refuses to use a captured loop from a different PID and re-creates the sink lazily in the child." },
      { type: "fixed", summary: "submit_task now honors task_always_eager. Pre-fix the adapter unconditionally called app.send_task(name, ...) which bypasses the local task registry - so task_always_eager=True (CI / dev mode) had no effect on brain-dispatched fires. Now prefers app.tasks[name].apply_async(...) when the task is locally registered, falling back to send_task for at-distance scheduling. Also picks up the task's decorator options (default queue, retry policy, time limits)." },
      { type: "changed", summary: "Family bump to 1.1.0. Floors: z4j-core>=1.1.0, z4j-bare>=1.1.0. Brain 1.1.0 + scheduler 1.1.0 + celery 1.0.3 was unsupported (the schedule.fire dispatcher fix lives in z4j-bare 1.1.0). The new floor refuses that mixed install." },
    ],
  },
  {
    package: "z4j-bare",
    version: "1.1.0",
    date: "2026-04-28",
    entries: [
      { type: "fixed", summary: "schedule.fire dispatcher routes to engine.submit_task. Pre-1.1 the agent dispatcher routed every schedule.* action to _dispatch_scheduler, which only handled enable/disable/trigger_now/delete. The brain-side z4j-scheduler 1.1.0 emits schedule.fire on every tick, and the agent always rejected it with one of two errors: 'unrecognized schedule action schedule.fire' or 'no scheduler adapter registered for None' (a Celery WORKER agent doesn't register a SchedulerAdapter - celery-beat is a separate process). Result: every brain-side scheduled tick produced a command.failed audit row, and no scheduled work ever ran end-to-end. New _dispatch_schedule_fire routes to QueueEngineAdapter.submit_task using the payload the brain populates. Verified live in multi-engine docker e2e." },
      { type: "changed", summary: "Family bump 1.0.7→1.1.0. Floor z4j-core>=1.1.0." },
    ],
  },
  {
    package: "z4j-huey",
    version: "1.1.0",
    date: "2026-04-28",
    entries: [
      { type: "fixed", summary: "submit_task now actually enqueues on Huey 2.x and 3.x. Pre-1.1 the adapter called callable_obj(*args, **kwargs) against the registry entry, which works only if Huey stores the TaskWrapper decorator in _registry._registry. Both supported Huey lines actually store the underlying Task subclass there, and instantiating the class with task args directly trips Task.__init__() (which accepts args/kwargs as keyword tuples, not splatted task arguments). The brain-side z4j-scheduler 1.1.0 schedule.fire dispatcher relies on this method. New flow: instantiate Task(args=..., kwargs=..., eta=..., priority=...) then huey.enqueue(task_instance). Verified end-to-end in docker (huey-app project, 100% completion)." },
      { type: "changed", summary: "Family bump 1.0.1→1.1.0. Floor z4j-core>=1.1.0." },
    ],
  },
  {
    package: "z4j-flask",
    version: "1.1.0",
    date: "2026-04-28",
    entries: [
      { type: "added", summary: "Engine auto-discovery for all 6 engines (celery + rq + arq + dramatiq + huey + taskiq), not just celery. Z4J(app) now reads app.config['RQ_REDIS_URL'] / ARQ_REDIS_SETTINGS / DRAMATIQ_BROKER / HUEY / TASKIQ_BROKER alongside CELERY_APP. Real-world combos like Flask + RQ are now first-class supported. Verified end-to-end in docker (flask-rq-app project, 100% completion)." },
      { type: "changed", summary: "Family bump 1.0.4→1.1.0. Floors z4j-core>=1.1.0, z4j-bare>=1.1.0." },
    ],
  },
  {
    package: "z4j-fastapi",
    version: "1.1.0",
    date: "2026-04-28",
    entries: [
      { type: "added", summary: "Engine auto-discovery for all 6 engines via z4j_lifespan(...) and install_z4j(...). New kwargs: rq_app, arq_redis_settings, arq_function_names, arq_queue_name, dramatiq_broker, huey, taskiq_broker. Real-world combos like FastAPI + arq (the classic async stack) are now first-class supported. Verified end-to-end in docker (fastapi-arq-app project, 100% completion)." },
      { type: "changed", summary: "Family bump 1.0.4→1.1.0. Floors z4j-core>=1.1.0, z4j-bare>=1.1.0." },
    ],
  },
  {
    package: "z4j-django",
    version: "1.1.0",
    date: "2026-04-28",
    entries: [
      { type: "changed", summary: "Family bump 1.0.7→1.1.0 to align with the v1.1.0 ecosystem. Floors z4j-core>=1.1.0, z4j-bare>=1.1.0. The driving fix lives in z4j-bare 1.1.0: the agent dispatcher correctly routes schedule.fire to the queue engine's submit_task, instead of rejecting every brain-side scheduler tick. Operators on brain 1.1.0 + scheduler 1.1.0 with z4j-django 1.0.x had every scheduled task silently fail." },
    ],
  },
  {
    package: "z4j-celerybeat",
    version: "1.1.0",
    date: "2026-04-28",
    entries: [
      { type: "changed", summary: "Family bump 1.0.2→1.1.0. Floors z4j-core>=1.1.0, z4j-bare>=1.1.0. The brain-side z4j-scheduler 1.1.0 takes over the 'fire next tick' responsibility this adapter used to share with celery-beat's own loop; this adapter still owns the schedule CRUD path against the django-celery-beat tables." },
    ],
  },

  // -------------------------------------------------------------------------
  // 2026-04-27 v1.1.0 - coordinated ecosystem baseline release.
  // Four anchor packages (z4j-core, z4j-brain, z4j-scheduler, z4j umbrella)
  // ship at 1.1.0 simultaneously. v1.0.x had real upgrade/downgrade hazards
  // (1.0.18 -> 1.0.17 alembic flap loops, scheduler workers eating
  // connection-pool slots, stale SPA index.html, extra='forbid' rolling-
  // upgrade traps). v1.1.0 fixes all of them and codifies the contract
  // (docs/MIGRATIONS.md) - every patch within v1.1.x upgrades AND
  // downgrades cleanly to/from every other v1.1.x patch. Also lands the
  // embedded scheduler sidecar feature, the new Schedule.catch_up/source/
  // source_hash fields + CatchUpPolicy enum, the gRPC too_many_pings
  // keepalive fix, and z4j-scheduler's first PyPI publish. Adapter
  // packages (z4j-celery, z4j-django, z4j-flask, etc.) stay at their
  // current versions - none have changes worth shipping in this wave.
  // -------------------------------------------------------------------------
  {
    package: "z4j-brain",
    version: "1.1.0",
    date: "2026-04-27",
    entries: [
      { type: "fixed", summary: "Schema-version skew now warns instead of raising. startup_version.check_and_update_schema_version previously raised SchemaVersionError if the DB's z4j_meta.schema_version was newer than the running code, killing boot. After downgrade (1.0.18 -> 1.0.17) this caused systemd flap loops. Now logs a warning and continues - old code can boot against forward-migrated DBs. The SchemaVersionError class is kept as a back-compat shim." },
      { type: "fixed", summary: "auto-migrate detects unknown DB head before invoking alembic. When the DB is stamped at a revision the running wheel doesn't ship (downgrade scenario), alembic exited with `Can't locate revision identified by '...'` and the brain flap-looped. Now _detect_unknown_db_head pre-flights the DB's alembic_version against the code's known revisions and raises a clean _UnknownDBRevisionError that the serve handler catches → warns + continues boot." },
      { type: "fixed", summary: "Scheduler workers gated behind Z4J_SCHEDULER_GRPC_ENABLED. v1.0.18 shipped 3 unconditional periodic workers (pending_fires_replay, schedule_circuit_breaker, schedule_fires_prune) that consumed connection-pool slots. Operators reported agents flapping to 'offline' after upgrade because the heartbeat path couldn't get a slot. These three workers now only register when the gRPC scheduler service is opted in. Default-off operators get zero scheduler-worker activity." },
      { type: "fixed", summary: "SubscriptionFilters relaxed to extra='ignore'. Pre-1.1 used extra='forbid' so a newer dashboard adding any unknown filter key would 422 against an older brain. Now unknown keys are silently dropped. The two security-relevant extra='forbid' schemas (BulkDeleteRequest, UserSubscriptionCreate - both R3 audit defenses against project_id/user_id smuggling) are deliberately NOT relaxed." },
      { type: "fixed", summary: "SPA fallback index.html ships Cache-Control: no-cache, no-store, must-revalidate. Pre-1.1 the dashboard SPA entry point was served with default caching, so browsers held a stale index.html (referencing hashed asset filenames that no longer existed) after a brain upgrade. Hashed assets under /assets/ keep their long-lived caching, by design." },
      { type: "fixed", summary: "gRPC too_many_pings reconnect storm. The brain's SchedulerGrpcServer used stock defaults for keepalive_min_recv_ping_interval_without_data_ms (300_000 ms), so the scheduler client's 30s keepalive was treated as abuse and the server sent GOAWAY too_many_pings every ~150 seconds. The watch stream then reconnected and re-issued a full sync. Net effect: 12-20 spurious watch reconnects per hour silently churning the cache. Now sets matching server options (10_000 ms intervals, max_ping_strikes=0)." },
      { type: "fixed", summary: "mTLS interceptor accepted bytes-keyed AuthContext only. _enforce_cn looked up the peer cert under auth_ctx.get(b'x509_common_name', []). grpc.aio 1.6+ returns the same logical entries under str keys, so every CN check silently returned [] and any client cert was rejected as 'peer CNs []'. Both interceptors now look up under both shapes and decode bytes/str values defensively. Mirrored fix on the scheduler-side trigger interceptor." },
      { type: "added", summary: "Embedded scheduler sidecar (Z4J_EMBEDDED_SCHEDULER=true). Brain spawns z4j-scheduler serve as a supervised subprocess in its own lifespan when the flag is set. Auto-mints loopback mTLS certs at boot, supervises with bounded auto-restart and graceful SIGTERM-then-SIGKILL teardown. Default-off (per the new contract: every supervised subprocess is opt-in). Intended for the single-container homelab deploy." },
      { type: "added", summary: "Schedule fire-history fields (source, catch_up, source_hash) surfaced on SchedulePublic. Wire-protocol additive; older clients ignore the fields. Schema additions in z4j-core 1.1.0 let external SDK consumers deserialize the responses cleanly." },
      { type: "added", summary: "POST /projects/{slug}/schedules:diff - dry-run preview of the :import reconciler. Returns four buckets (insert/update/unchanged/delete) with proposed + current shapes. ADMIN-gated (mirrors :import); writes no audit row. Backed by a new dashboard route /projects/{slug}/schedules/reconcile with paste-box, mode selector, source filter, and color-coded result panel." },
      { type: "added", summary: "z4j-brain migrate sync - recovery escape hatch for operators who land in DB-ahead-of-code state in spite of the new contract. Default behavior shows the drift and refuses to act; with --allow-future-schema --i-know-this-can-corrupt-data it stamps the DB to the code's head and drops unknown tables. Documented in docs/MIGRATIONS.md." },
    ],
  },
  {
    package: "z4j-core",
    version: "1.1.0",
    date: "2026-04-27",
    entries: [
      { type: "added", summary: "Schedule model gains catch_up, source, source_hash to match the brain's SQLAlchemy schema. Without these, every external SDK consumer that called GET /api/schedules against a brain on the new schema would have failed Pydantic validation (the model uses extra='forbid'). All three fields ship with defaults so callers building a Schedule from scratch don't need to pass them." },
      { type: "added", summary: "CatchUpPolicy StrEnum (skip/fire_one_missed/fire_all_missed) for type-safe access to the new field. Exported from z4j_core.models." },
    ],
  },
  {
    package: "z4j-scheduler",
    version: "1.1.0",
    date: "2026-04-27",
    entries: [
      { type: "added", summary: "First PyPI release. Engine-agnostic dynamic scheduler companion process that talks to z4j-brain over gRPC. Supports cron + interval + one-shot triggers, leader election via Postgres advisory lock, /health /ready /metrics /info endpoints, and migration importers for celery beat, django-celery-beat, rq-scheduler, APScheduler 3.x/4.x, and system crontab files. Joins the v1.1.x ecosystem baseline." },
      { type: "added", summary: "Defensive periodic full re-sync (15-min default). The WatchStream spawns a parallel timer that runs _full_sync() on a fixed cadence even when the watch event stream is healthy. Catches missed DELETE events. Cadence: Z4J_SCHEDULER_RECONCILE_INTERVAL_SECONDS=900 (set to 0 to disable). Idempotent under _sync_lock." },
      { type: "fixed", summary: "Exporters emitted JSON literals where Python literals were expected. exporters/celery.py, exporters/rq.py, and exporters/apscheduler.py used json.dumps() for args/kwargs, emitting true/false/null rather than True/False/None. Operators pasting the rendered output into a Python module hit NameError. Extracted a shared py_repr() helper; all three Python-target exporters now produce valid Python source. Round-trip pinned by tests that exec() the rendered output." },
      { type: "fixed", summary: "mTLS interceptor accepted bytes-keyed AuthContext only - same fix as the brain side, mirrored for the scheduler-side trigger-gRPC interceptor." },
    ],
  },
  {
    package: "z4j",
    version: "1.1.0",
    date: "2026-04-27",
    entries: [
      { type: "changed", summary: "Bumps z4j-brain pin to >=1.1.0,<1.2 and z4j-core pin to >=1.1.0,<1.2. v1.1.0 is the always-works ecosystem baseline - every patch within v1.1.x is bidirectionally upgrade/downgrade compatible per docs/MIGRATIONS.md. Adapter packages (z4j-celery, z4j-django, z4j-flask, etc.) stay at their current versions; the umbrella's adapter extras pin compatible floors." },
      { type: "added", summary: "z4j-scheduler joins the ecosystem at 1.1.0. First PyPI release of the engine-agnostic dynamic scheduler companion. Operators who want the embedded single-container deploy set Z4J_EMBEDDED_SCHEDULER=true on the brain; operators who want a separate scheduler process install pip install z4j-scheduler and connect via gRPC. Either way the brain's SchedulerService stays gated behind Z4J_SCHEDULER_GRPC_ENABLED so default installs pay nothing." },
    ],
  },
  // -------------------------------------------------------------------------
  // 2026-04-27 v1.0.18 - notification settings reorganization (Option C) +
  // edit flows for personal subscriptions and project defaults + new
  // personal Delivery History endpoint + filter parity between the two
  // surfaces. Pure UI/UX release: zero schema changes, all endpoints
  // backwards-compatible. The five separate notification routes
  // collapse into two role-based hubs (Global Notifications for
  // personal scope, Project Notifications for admin scope), with all
  // five old URLs redirecting permanently so bookmarks survive.
  // -------------------------------------------------------------------------
  {
    package: "z4j-brain",
    version: "1.0.18",
    date: "2026-04-27",
    entries: [
      { type: "added", summary: "Edit personal subscriptions in the dashboard. Pre-1.0.18 the /settings/notifications page only let users toggle is_active + delete; adjusting channels, filters, cooldown, or trigger required delete-and-recreate. Now: pencil icon next to the trash icon on each row opens the unified create/edit dialog with all fields prefilled. Backend extended PATCH /api/v1/user/subscriptions/{id} with a `trigger` field for full parity with the project-defaults edit endpoint shipped in this release; (user_id, project_id, trigger) uniqueness defended with a clean 409 on rename collision (race-safe via IntegrityError fallback)." },
      { type: "added", summary: "Edit project default subscriptions in the dashboard (mirror of the personal-sub fix). Pencil + unified create/edit dialog wired against the new PATCH /api/v1/projects/{slug}/notifications/defaults/{id} endpoint. Pinned by 7 tests covering add-channel-to-existing, partial-update, trigger rename, trigger collision 409, foreign-channel 409, IDOR cross-project 404, and empty-body noop." },
      { type: "added", summary: "GET /api/v1/user/deliveries - personal delivery history across all the user's projects. Mirror of the per-project audit log, scoped to the calling user via a join to user_subscriptions.user_id. Cursor-paginated (50/page) with optional ?project_slug= filter. Includes deliveries from projects the user is no longer a member of (audit data outlives membership; the dashboard renders ex-membership rows with a 'you left this project' badge so the row reads honestly). 6 regression tests covering cross-project listing, filter, IDOR isolation, ex-membership, pagination." },
      { type: "added", summary: "Filter parity between personal subscriptions and project defaults dialogs. Backend SubscriptionFilters has supported priority + task_name_pattern + queue since v1.0.x but the dashboard exposed only some on each surface. v1.0.18 adds: project defaults gain priority + task_name_pattern + queue (none were rendered); personal subs gain queue (priority + task_name were already there). Both dialogs now show inline help on the priority filter explaining the @z4j_meta(priority='critical') annotation requirement so users understand why the filter silently matches nothing if their task code doesn't annotate priority. Personal sub dialog also gained the project-channels picker so members can route personal subs through admin-managed shared channels." },
      { type: "added", summary: "DeliveryPublic.project_id field exposed so the new personal Delivery History tab can group by project and badge ex-membership rows. Backwards-compatible additive field." },
      { type: "changed", summary: "Notification settings reorganized into role-based hubs (Option C). Pre-1.0.18 the dashboard exposed five separate notification routes whose ownership was confusing. Two channel pages were 1252+1256 lines of nearly duplicated UI. Collapsed by ROLE: /settings/notifications becomes 'Global Notifications' hub with three tabs (My Subscriptions / My Channels / My Delivery History - personal scope only); /projects/{slug}/settings/notifications becomes 'Project Notifications' hub (admin-gated, three tabs: Project Channels / Default Subscriptions / Delivery Log). All five old URLs permanently redirect to the appropriate ?tab= of the new hubs. Zero data-model changes, same DB tables, same API endpoints, same permissions. Non-admin project members lose visibility of the project Notifications sidebar entry - they manage their notifications from the personal hub instead." },
      { type: "fixed", summary: "Latent cursor off-by-one in the project delivery-log endpoint silently skipped one row per page boundary. Fixed in both the project endpoint and the new personal /user/deliveries endpoint (encode the last visible row, not the overflow row). Pre-existing bug; nobody had a regression test against it before v1.0.18." },
    ],
  },
  {
    package: "z4j",
    version: "1.0.18",
    date: "2026-04-27",
    entries: [
      { type: "added", summary: "Bumps z4j-brain floor to >=1.0.18,<1.1 which lands edit flows for personal subscriptions + project defaults (no more delete-and-recreate to change channels), the new GET /api/v1/user/deliveries endpoint (personal cross-project audit log), and filter parity between personal subs and project defaults (priority + task_name + queue inputs on both, with inline @z4j_meta help)." },
      { type: "changed", summary: "Notification settings reorganized into role-based hubs (Option C). Five notification routes collapse into two tabbed hubs: 'Global Notifications' (personal scope, three tabs) and 'Project Notifications' (admin scope, three tabs). Old URLs redirect permanently so bookmarks survive. Pure UI reorganization - zero schema changes, all endpoints backwards-compatible. See z4j-brain 1.0.18 CHANGELOG." },
      { type: "fixed", summary: "Latent cursor off-by-one in the project delivery-log endpoint silently skipped one row per page boundary. Fixed in both endpoints." },
    ],
  },
  // -------------------------------------------------------------------------
  // 2026-04-27 v1.0.17 - SQLite hotfix for a latent v1.0.0 bug. Saving a
  // default subscription (or per-user subscription) with channel ids
  // 500'd because the SQLite uuid_array() fallback couldn't JSON-
  // serialize uuid.UUID instances. Postgres path was unaffected.
  // SQLite-only fix; bumps a TypeDecorator that converts UUIDs <-> strings
  // transparently. Reported live by an operator on tasks.jfk.work.
  // -------------------------------------------------------------------------
  {
    package: "z4j-brain",
    version: "1.0.17",
    date: "2026-04-27",
    entries: [
      { type: "fixed", summary: "SQLite default-subscription save with channel ids no longer 500s. POST /api/v1/projects/{slug}/notifications/defaults with a non-empty project_channel_ids list raised TypeError: Object of type UUID is not JSON serializable on commit and surfaced as {\"error\":\"internal_error\"}. The uuid_array() column adapter fell back to plain SQLAlchemy JSON on SQLite, which calls json.dumps on the bind value - and json.dumps doesn't know how to serialize uuid.UUID. Wrapped the SQLite variant in a TypeDecorator that converts UUIDs to strings on write and back to UUIDs on read. Bug present in v1.0.0..v1.0.16; SQLite-only (Postgres unaffected). Three columns affected: user_subscriptions.project_channel_ids, user_subscriptions.user_channel_ids, project_default_subscriptions.project_channel_ids. Operator action: `pip install -U z4j-brain` and restart - no DB migrations, no env changes." },
    ],
  },
  {
    package: "z4j",
    version: "1.0.17",
    date: "2026-04-27",
    entries: [
      { type: "fixed", summary: "Bumps z4j-brain floor to >=1.0.17,<1.1 which fixes a SQLite bug: saving a default or per-user subscription with channel ids 500'd because the uuid_array() SQLite fallback couldn't JSON-serialize uuid.UUID instances. Bug present in v1.0.0..v1.0.16; SQLite-only (Postgres unaffected). Operator action: `pip install -U z4j` and restart." },
    ],
  },
  // -------------------------------------------------------------------------
  // 2026-04-27 v1.0.16 - hotfix for the v1.0.11 SPA-bundle regression
  // that re-emerged in the 1.0.15 release-split script. The 1.0.15 wheel
  // on PyPI was missing dashboard/dist/ entirely so GET / returned
  // {"detail":"Not Found"} on every fresh `pip install z4j-brain`. Pure
  // packaging fix; no Python code change. Belt-and-suspenders: the
  // release script now refuses to publish a z4j-brain wheel that contains
  // fewer than 100 SPA asset entries, so this regression cannot reach
  // PyPI again. Docker users were unaffected.
  // -------------------------------------------------------------------------
  {
    package: "z4j-brain",
    version: "1.0.16",
    date: "2026-04-27",
    entries: [
      { type: "fixed", summary: "Wheel ships the bundled dashboard SPA again (v1.0.11 regression). The 1.0.15 wheel on PyPI was missing dashboard/dist/ entirely so `pip install z4j-brain && z4j-brain serve` returned {\"detail\":\"Not Found\"} for GET / on every fresh install. Pure packaging defect: the release-split script's rsync `--exclude='dist'` rule was unanchored and matched the SPA's bundle directory at backend/src/z4j_brain/dashboard/dist/ along with the intended top-level dist/ build output. Fixed by anchoring the exclude to the package root only. Belt-and-suspenders: the release script now refuses to publish a z4j-brain wheel that's missing the SPA. Operator action: `pip install -U z4j-brain` and restart - no DB migrations, no env changes. API endpoints, /metrics, WebSocket gateway, CLI, and migrations all worked correctly in 1.0.15 - only the dashboard HTML was missing. Docker users were unaffected." },
    ],
  },
  {
    package: "z4j",
    version: "1.0.16",
    date: "2026-04-27",
    entries: [
      { type: "fixed", summary: "Bumps z4j-brain floor to >=1.0.16,<1.1 which restores the dashboard SPA in the wheel. The 1.0.15 wheel on PyPI was missing dashboard/dist/ (a v1.0.11 packaging regression that re-emerged in the release-split script) so GET / returned {\"detail\":\"Not Found\"} on every fresh install. Operator action: `pip install -U z4j` and restart - no DB migrations, no env changes. Docker users were unaffected." },
    ],
  },
  // -------------------------------------------------------------------------
  // 2026-04-27 v1.0.15 - enterprise-grade hardening release. Closes the
  // P-1 batched-heartbeat-upsert performance gap explicitly deferred from
  // v1.0.14 (one INSERT...ON CONFLICT per batch instead of N+1 round-trips
  // per event), hardens the SPA catch-all so typo'd /api/ URLs return
  // clean 404 JSON instead of HTML, fixes the SQLite migration downgrade
  // path via batch_alter_table, and closes a HIGH mTLS-allow-list
  // bypass (lstrip-vs-removeprefix) in an internal opt-in service.
  // Test gate: 402 brain unit + 1019 cross-package unit + 26 brain
  // integration on Postgres 18 + full migration roundtrip + E2E P-1
  // verified against a live brain (50 events / 3 workers collapse to
  // 3 worker rows, heartbeat-at-max delta 0.000s).
  // -------------------------------------------------------------------------
  {
    package: "z4j-brain",
    version: "1.0.15",
    date: "2026-04-27",
    entries: [
      { type: "security", summary: "mTLS allow-list bypass closed in an internal opt-in gRPC service. The interceptor used `str.lstrip(\"DNS:\")` which strips a SET of characters; any leading D/N/S/colon got eaten from the CN itself. A legitimate cert with CN starting with one of those characters would silently fail the allow-list match (locking out a legitimate cert); a hostile cert whose mangled CN happened to coincide with an allow-list entry would have been accepted. Switched to `str.removeprefix`. The affected service is dormant by default; only deployments that explicitly opt in were ever exposed." },
      { type: "changed", summary: "P-1 batched heartbeat upsert: replaces N+1 worker upsert round-trips per event batch with a single INSERT...ON CONFLICT DO UPDATE on Postgres + SQLite (≥3.24). Dedupes (engine, worker_name) tuples in the EventIngestor accumulator, preserves no-key-no-touch semantics (a heartbeat-only batch can't blank hostname/concurrency), and runs inside a begin_nested savepoint with per-row fallback on OperationalError so a deadlock can't poison the outer transaction. Heartbeat now carries max(occurred_at) so cross-replica now() skew can't reorder agent liveness. 200-event batch issues exactly one INSERT against workers (was 200 SELECTs + up to 200 INSERTs/UPDATEs)." },
      { type: "changed", summary: "Replay-worker N+1 batched: the pending-fires replay worker's catch-up logic used to call schedules_repo.get(...) once per distinct schedule in the batch; replaced with a single WHERE id IN (...) lookup. 5-schedule batch issues one SELECT instead of five." },
      { type: "fixed", summary: "Trigger-schedule route no longer reaches into a private attribute of CommandDispatcher to find the brain's Settings. Replaced with proper Depends(get_settings) injection plus a process-wide singleton on app.state. Eliminates a fragile private-API access path that would silently break if CommandDispatcher's layout changes." },
      { type: "security", summary: "SPA catch-all hardening: any unmatched path under /api/, /ws/, /metrics, /auth/, /setup/, /healthz, /.well-known/, /openapi.json, /docs, /redoc, /assets/ now returns a clean 404 instead of serving the dashboard SPA index.html. Pre-1.0.15 a typo'd /api/v1/typoo returned 200 text/html and frontend code choked on 'Unexpected token <' trying to parse HTML as JSON." },
      { type: "fixed", summary: "Migration 2026_04_26_0004-scheduler_columns downgrade is now SQLite-safe (uses op.batch_alter_table). SQLite's ALTER TABLE DROP COLUMN does a full table rebuild and re-evaluates remaining constraints; dropping the four scheduler columns one by one would fail with 'no such column: catch_up' on the rebuild. Postgres path unchanged. Required for the test_migration downgrade-roundtrip suite and any operator on SQLite who needs to roll back." },
      { type: "fixed", summary: "Latent ImportError on certain personal-notification 403 paths (api/user_notifications.py imported a non-existent ForbiddenError, raising HTTP 500 instead of HTTP 403). Switched to AuthorizationError so the 403 envelope actually fires." },
      { type: "added", summary: "Brain-side gRPC SchedulerService (dormant in 1.0.15): registered behind Z4J_SCHEDULER_GRPC_ENABLED=False (default). When disabled, grpcio is never imported and port 7701 is never bound - existing deployments see zero behavior change. When enabled (`pip install z4j-brain[scheduler-grpc]` + Z4J_SCHEDULER_GRPC_ENABLED=1), accepts mTLS-protected gRPC connections from the forthcoming z4j-scheduler companion package (alpha; see docs/SCHEDULER.md). Implements ListSchedules, WatchSchedules, FireSchedule, AcknowledgeFireResult, Ping. Operator mints client certs via `z4j-brain mint-scheduler-cert`." },
      { type: "added", summary: "/metrics regression test coverage: explicitly verifies 401 without bearer, 401 with wrong bearer, and 200 with correct bearer. Closes the gap that allowed v1.0.13 to ship with a stale metrics_returns_prometheus_text test that asserted 200 unconditionally." },
      { type: "added", summary: "Settings.disable_spa_fallback (default False) - test fixtures set this to True so include_router can register API routes after build time without the SPA catch-all shadowing them." },
    ],
  },
  {
    package: "z4j",
    version: "1.0.15",
    date: "2026-04-27",
    entries: [
      { type: "security", summary: "Bumps z4j-brain floor to >=1.0.15,<1.1 which closes a HIGH mTLS allow-list bypass (lstrip-vs-removeprefix bug) in an internal opt-in service. Default-off path is untouched - no shipping deployment was exposed." },
      { type: "changed", summary: "Bumps z4j-brain floor to >=1.0.15,<1.1 which lands the P-1 batched-heartbeat upsert (one INSERT...ON CONFLICT per event batch instead of N+1 round-trips), the SPA catch-all hardening (typo'd /api/ returns 404 JSON not HTML), and the SQLite-safe migration downgrade. See z4j-brain 1.0.15 CHANGELOG for the full breakdown." },
    ],
  },
  // -------------------------------------------------------------------------
  // 2026-04-24 v1.0.14 - notification-channel feature wave + 21-item
  // security audit hardening pass. Adds PagerDuty + Discord native
  // dispatchers, multi-select cross-import between project channels and
  // personal channels, `z4j metrics-token rotate` for token hygiene,
  // `--environment` CLI flag, and a fail-closed dev/non-loopback gate.
  // Audit pass closed 3 High + 9 Medium + 9 Low findings (Codex audit +
  // independent triple audit) covering notification-error secret leakage,
  // ReDoS guard, DoS-input caps, per-IP rate limits on test/import/bulk
  // endpoints, deepcopy of imported configs, atomic 0o600 metrics-token
  // file creation, channel-name/type snapshot on delivery rows, WebSocket
  // notification fan-out backpressure, plus a bonus pre-existing-bug fix
  // (ForbiddenError ImportError → AuthorizationError). 1 P-1 finding
  // (heartbeat batch upsert N+1) explicitly deferred to v1.0.15.
  // -------------------------------------------------------------------------
  {
    package: "z4j-brain",
    version: "1.0.14",
    date: "2026-04-24",
    entries: [
      { type: "security", summary: "BREAKING: dev-mode + non-loopback bind is now fail-closed. `z4j serve` refuses to start when Z4J_ENVIRONMENT=dev AND host is non-loopback (the unsafe combo that exposed dev cookies + disabled host validation to anyone reachable on the port). Default bind in dev mode is now 127.0.0.1 (was 0.0.0.0). Production deploys must set Z4J_ENVIRONMENT=production, Z4J_PUBLIC_URL, and Z4J_ALLOWED_HOSTS - see /operations/dev-vs-production/ for the systemd-unit migration recipe." },
      { type: "added", summary: "PagerDuty notification channel (Events API v2 trigger), Discord notification channel (Slack-compatible webhook). Both are first-class channels alongside webhook/email/Slack/Telegram with the same SSRF/DNS-pinning/secret-masking discipline. PagerDuty channels accept a per-trigger severity_map; map values are validated against a strict pattern + 32-char cap to block injection." },
      { type: "added", summary: "Multi-select cross-import between project channels ↔ personal channels. From any provider page select N rows and copy them into your personal /settings/channels (or pull personal channels into a project, admin-only). Imports run through copy.deepcopy of the source config so reference aliasing can't leak mutations across owners." },
      { type: "added", summary: "`z4j metrics-token rotate` CLI subcommand. Atomically rewrites Z4J_METRICS_AUTH_TOKEN in ~/.z4j/secret.env using O_EXCL + 0o600 + temp-file-then-rename so a crash mid-rotate never leaves a half-written file or world-readable token. Emits a structured log line on success." },
      { type: "added", summary: "`z4j serve --environment dev|production` (alias `--env`) CLI flag. Overrides Z4J_ENVIRONMENT for the launched process; surfaces the resolved value in `z4j serve --help` and the boot banner so operators see the choice they made." },
      { type: "added", summary: "Test-dispatch entries now show up on the Deliveries page with a synthetic `test.dispatch` trigger so admins can confirm test sends without checking the audit log. Channel name + channel type are snapshotted into notification_deliveries at write time so renaming or deleting a channel doesn't rewrite history." },
      { type: "security", summary: "Notification audit-log writes are sanitized (sanitize_audit_text). Strips control chars, masks URL-bearing config values found in error/response_body bodies, collapses SSRF DNS-leak errors, masks private IPs, truncates to 2048 bytes. Closes audit H-1/H-2/H-3 - previously a malformed webhook URL or upstream error could echo the raw secret into the deliveries error column." },
      { type: "security", summary: "Per-IP rate limits on notification test (20/min), notification import (30/min), and bulk-action endpoints (10/min - bulk delete/retry tasks, purge queue, schedule trigger). Closes audit M-* DoS findings - previously an attacker with valid creds could fan out unbounded outbound test sends or trigger queue purges in a tight loop." },
      { type: "security", summary: "Notification channel config payloads capped at 16 KiB (validator on ChannelCreate/Update/TestRequest + UserChannelCreate/Update). Closes audit P-8 - previously a multi-MB config could be persisted and then loaded into memory on every dispatch." },
      { type: "security", summary: "ReDoS runtime guard on PagerDuty severity-map matching: skip patterns with >5 wildcards or >3 char-classes instead of running them. Closes audit M-* - a crafted severity_map regex could pin a worker." },
      { type: "security", summary: "Channels DNS resolve wrapped in asyncio.wait_for(timeout=5.0); returns empty list on TimeoutError + caches the negative result so a slow resolver can't stall the dispatch loop." },
      { type: "security", summary: "WebSocket notification fan-out and dashboard postgres-notify fan-out now use detached asyncio.create_task with strong refs + done_callback exception logging + a 256-task pending cap. Closes audit finding - previously slow notification dispatch could backpressure the WS frame router." },
      { type: "security", summary: "`tasks_export_max_rows` ceiling lowered from 5,000,000 to 100,000 (default 50,000). Closes audit M-* - the previous ceiling let a single export request OOM the brain. Tenants needing higher caps can raise via Settings; the new ceiling is documented as the safe upper bound." },
      { type: "security", summary: "`list_for_project` on agents/workers/notification-channels repos now takes a `limit` parameter (default 500, max 5000). Closes audit M-* - admin list endpoints previously fetched unbounded result sets that scaled with tenant size." },
      { type: "security", summary: "Imported channel configs are now copy.deepcopy'd before persistence (project↔user import + user↔project import). Closes audit L-4 - mutating an imported channel previously aliased back to the source config in the same request." },
      { type: "fixed", summary: "Bonus pre-existing bug fix surfaced during audit smoke pass: api/user_notifications.py imported `ForbiddenError` which doesn't exist, so any 403 path raised an ImportError → HTTP 500. Switched to `AuthorizationError` (http_status=403). Latent since the personal-channel routes shipped." },
      { type: "fixed", summary: "Telegram channel handles `&` in URL safely (parse with urllib instead of string split); Slack channel signature-verification timing-floor matches password-reset path; Discord channel rate-limit headers are surfaced into the deliveries audit row." },
      { type: "added", summary: "Alembic migration 2026_04_26_0005-delivery_channel_snapshot.py adds nullable channel_name + channel_type columns to notification_deliveries. Auto-applied on `z4j serve` boot; pre-1.0.14 rows show NULL and fall back to the live channel join (lossy if the channel was renamed; new rows are lossless)." },
    ],
  },
  {
    package: "z4j",
    version: "1.0.14",
    date: "2026-04-24",
    entries: [
      { type: "security", summary: "BREAKING: bumps z4j-brain floor to >=1.0.14,<1.1 which makes dev-mode + non-loopback bind fail-closed. Production deployments need three env vars added to their systemd unit (Z4J_ENVIRONMENT=production, Z4J_PUBLIC_URL, Z4J_ALLOWED_HOSTS) and a restart - see /operations/dev-vs-production/ for the migration recipe. Default dev bind is now 127.0.0.1 (was 0.0.0.0)." },
      { type: "added", summary: "Bumps z4j-brain floor to >=1.0.14,<1.1 which adds PagerDuty + Discord native notification channels, multi-select cross-import between project ↔ personal channels, `z4j metrics-token rotate` CLI for token hygiene, `--environment`/`--env` flag on `z4j serve`, and a 21-item security audit hardening pass (notification-error secret-leak fix, ReDoS guard, DoS-input caps, per-IP rate limits on test/import/bulk endpoints, atomic file creation for the metrics token, deepcopy of imported configs, plus a bonus pre-existing-bug fix). See z4j-brain 1.0.14 CHANGELOG for the full audit summary." },
    ],
  },
  {
    package: "z4j-brain",
    version: "1.0.13",
    date: "2026-04-24",
    entries: [
      { type: "security", summary: "BREAKING: /metrics is now fail-secure by default. Previously (1.0.11 / 1.0.12) the bearer-token guard was optional - unset Z4J_METRICS_AUTH_TOKEN meant 'serve without auth' and the brain just logged a startup warning. Every fresh pip install z4j && z4j serve exposed project IDs, queue names, task names, and in-memory-state counters to anyone who could reach the endpoint. Now: Z4J_METRICS_AUTH_TOKEN is auto-minted on first boot and persisted to ~/.z4j/secret.env alongside Z4J_SECRET; /metrics requires Authorization: Bearer <token>; unauthenticated requests get 401. In-place upgrades from 1.0.12 append the new token to the existing secret.env and log the fact once." },
      { type: "added", summary: "z4j metrics-token CLI subcommand. Prints the /metrics bearer token from env or ~/.z4j/secret.env for pasting into Prometheus scrape configs. Shell-safe: curl -H 'Authorization: Bearer $(z4j metrics-token)' ... works out of the box." },
      { type: "added", summary: "Z4J_METRICS_PUBLIC=1 explicit opt-in for unauthenticated /metrics (closed networks, sidecar Prometheus). Logs a loud WARNING at startup and z4j doctor flags it so the choice doesn't drift into forgotten default." },
    ],
  },
  {
    package: "z4j",
    version: "1.0.13",
    date: "2026-04-24",
    entries: [
      { type: "security", summary: "Bumps z4j-brain floor to >=1.0.13,<1.1 which makes /metrics fail-secure by default. Token is auto-minted on upgrade; pip install -U z4j, restart, then update your Prometheus scrape config with the bearer token (run `z4j metrics-token` to print it). See z4j-brain 1.0.13 CHANGELOG for full operator migration notes." },
    ],
  },
  {
    package: "z4j-brain",
    version: "1.0.12",
    date: "2026-04-24",
    entries: [
      { type: "fixed", summary: "GET / returned {\"detail\":\"Not Found\"} after upgrade. The 1.0.11 wheel on PyPI shipped the Python code without the bundled dashboard SPA (the backend/src/z4j_brain/dashboard/dist/ directory was missing from the artifact), so the SPA catch-all at main.py:558 never registered because dashboard_dir.is_dir() was false. Every fresh install of 1.0.11 got a bare 404 on every dashboard URL. The pre-build dash-bundle step is now verified explicitly before each wheel build, and the wheel-manifest check confirms index.html + assets/ + 260+ files land inside the distribution. No code change; pure packaging fix. Operator action: pip install -U z4j and restart - no DB migrations, no env changes." },
    ],
  },
  {
    package: "z4j",
    version: "1.0.12",
    date: "2026-04-24",
    entries: [
      { type: "fixed", summary: "Bumps z4j-brain floor to >=1.0.12,<1.1 which restores the dashboard SPA broken in the 1.0.11 wheel. pip install -U z4j and restart; no DB migrations or config changes." },
    ],
  },
  {
    package: "z4j-brain",
    version: "1.0.11",
    date: "2026-04-24",
    entries: [
      { type: "security", summary: "/metrics Prometheus endpoint gained an optional bearer-token guard. Set Z4J_METRICS_AUTH_TOKEN and the endpoint requires Authorization: Bearer <token> (constant-time compared). When unset, legacy open-by-default behaviour is preserved but the brain now logs a loud startup WARNING telling the operator to either set the token or block /metrics at the reverse proxy. Closes audit 2026-04-24 Medium-1 - Prometheus labels leak project IDs, queue/task names, and in-memory state, so an unauthenticated reachable /metrics is a low-noise reconnaissance channel." },
      { type: "fixed", summary: "purge_queue now works end-to-end. PurgeQueueRequest gained confirm_token and force fields that the endpoint forwards into the command payload. The agent-side Celery action was already enforcing these server-side (HMAC of queue_name+queue_depth, plus force=True bypass), but the brain was sending None for both, so every dashboard purge failed closed with 'missing confirm_token'. Audit 2026-04-24 Medium-3." },
      { type: "fixed", summary: "Schedule commands (enable/disable/trigger_now) now route to the correct agent. New _pick_scheduler_agent helper filters by state==ONLINE AND scheduler in agent.scheduler_adapters, ordered freshest-first. Raises differentiated NotFoundError (no_online_agent vs scheduler_not_installed) so the UI can surface the root cause. Previously picked next(iter(list_for_project)) - any agent regardless of online state or scheduler support, which misrouted schedule commands in Django+Celery+RQ projects. Audit 2026-04-24 Medium-4." },
      { type: "changed", summary: "admin_project_list_cap (default 500, range 10..100_000) and tasks_export_max_rows (default 50_000, range 100..5_000_000) are now configurable via Settings instead of being hardcoded constants in api/projects.py, api/home.py, and api/tasks.py. Lets larger tenants raise the ceiling without forking. Audit 2026-04-24 Low-3." },
      { type: "added", summary: "Notification channel test endpoints. POST /projects/{slug}/notifications/channels/test with {type, config} dispatches a canned 'z4j.test' payload through the real SMTP/webhook/Slack/Telegram dispatcher without persisting - lets admins verify credentials in the create dialog before saving. POST /channels/{id}/test runs the same preflight against a saved channel's stored config. Neither variant writes to the delivery audit log. Admin-only; same _validate_channel_config SSRF/format guards as create/update." },
      { type: "added", summary: "Edit notification channel from the dashboard. The Project Channels page gained pencil + test-tube buttons next to Delete on every channel card; clicking Edit opens the same dialog in edit mode with the stored config prefilled (type locked; masked secrets show as empty inputs with a 'Leave blank to keep current' placeholder). Backend PATCH /channels/{id} already existed with the _safe_merge_config mask-preserving merge; this wires the UI to it. Empty secret fields are omitted from the PATCH body so the backend merge keeps the stored value instead of overwriting with empty string." },
      { type: "added", summary: "Global /settings/channels page reaches feature parity with the per-project Providers page. Previously 'My Channels' only supported create + delete; now it has the same pencil (Edit) + test-tube (Test) buttons on every card, the same SMTP quick presets (Gmail/Workspace, Mailgun, Brevo, SendGrid, Postmark) + Gmail app-password hint, and the same masked-secret edit flow. Two new user-scoped backend endpoints back the test button: POST /user/channels/test for unsaved configs (preflight from the dialog) and POST /user/channels/{id}/test for saved channels. Both scoped to the owning user via get_for_user - a leaked UUID can't cross-test another user's channel. The test-payload and response shape are imported from api.notifications so both pages share one dashboard toast renderer." },
      { type: "added", summary: "Command palette (Ctrl+K) now actually searches tasks. Previously the palette advertised 'search tasks' but only returned hardcoded navigation items - typing a task name like cleanup_stale_scrape_jobs returned 'No results found' even when the task existed. Now debounced (200ms useDebouncedValue) queries /projects/{slug}/tasks?search= when the operator is in a project context and the query is >= 2 chars; matches render in a new 'Tasks' group above Navigate with TaskStateBadge + TaskPriorityBadge. Clicking a result drops into the task detail page." },
      { type: "changed", summary: "Topbar NotificationBell no longer crowds the user avatar. Toolbar flex gap bumped from gap-1 (4px) to gap-2 (8px) across ThemeToggle/NotificationBell/UserMenu. Operators reported hitting the avatar dropdown when aiming for the bell on touch laptops." },
      { type: "security", summary: "Telegram channel dispatcher (domain/notifications/channels.py::deliver_telegram) now DNS-pins its POST to api.telegram.org at dispatch time, matching the webhook / Slack / email paths. Defense-in-depth parity - api.telegram.org is a trusted public host so the rebinding risk was lower than for user-supplied URLs, but the asymmetry with the other three dispatchers risked future drift and costs nothing (same resolve_and_pin helper, same cached resolver)." },
      { type: "fixed", summary: "aiosmtplib is now a declared dependency (>=3.0) so email notification channels actually work on a fresh install. Previously referenced in domain/notifications/channels.py::deliver_email but missing from pyproject.toml; the dispatcher fell through its ImportError guard to 'aiosmtplib is not installed; email notifications unavailable'. Latent packaging bug since v1.0 - tests mock SMTP so it never surfaced in CI. Email is a first-class channel type, not an optional extra: making this a direct dep avoids the bad first-run UX where a user creates an email channel, tests it, and gets an install-instruction error. ~150 KB pure-Python, no native deps." },
      { type: "fixed", summary: "Toaster visibility across every dashboard page. Sonner was mounted with a ``classNames.toast`` override forcing ``bg-card`` on every toast type (success/error/warning/info), which defeated the ``richColors`` green/red tint so toasts blended into the page. Also top-right positioning collided with action-button regions so the eye missed them. Fixed: dropped the generic bg override (richColors now owns color), moved to top-center, enabled closeButton + expand. Per-card test result also renders inline inside the channel card with a dismiss × - belt-and-suspenders so operators never miss the feedback." },
      { type: "fixed", summary: "Login page now shows an inline error Alert on auth failure (wrong password, account disabled, rate-limited) instead of only a corner toast. The card is where the user's focus is; a toast in the top corner after a failed login was routinely missed. Also aria-invalid on both inputs + role='alert' + aria-live='polite' on the banner. Banner auto-clears the moment the user edits either field." },
    ],
  },
  {
    package: "z4j-core",
    version: "1.0.5",
    date: "2026-04-24",
    entries: [
      { type: "security", summary: "Config.model_validator now rejects transport='longpoll' with an empty or non-UUID agent_id. Before, a missing agent_id flowed into the long-poll transport which silently coerced it to a fresh uuid4() inside _safe_uuid, the FrameSigner bound to that random UUID, and every brain<->agent frame failed HMAC verification. Config fails fast at construction time instead. Audit 2026-04-24 Medium-2." },
    ],
  },
  {
    package: "z4j-bare",
    version: "1.0.7",
    date: "2026-04-24",
    entries: [
      { type: "added", summary: "install_agent() gained agent_id and transport kwargs, and the internal resolver now surfaces Z4J_AGENT_ID and Z4J_TRANSPORT. Before, bare had no way to pass these through - long-poll deployments reached the transport layer with agent_id='' and silently failed HMAC. Audit 2026-04-24 Medium-2." },
      { type: "changed", summary: "clamp_buffer_path promoted from private (_clamp_buffer_path in install.py) to a public helper in z4j_bare.storage so framework adapters can apply the same ~/.z4j / $TMPDIR/z4j-{uid} sandbox that install_agent applied. Returns a ValueError (callers wrap it in their package-local error class). Audit 2026-04-24 Low-2." },
    ],
  },
  {
    package: "z4j-django",
    version: "1.0.7",
    date: "2026-04-24",
    entries: [
      { type: "added", summary: "New _check_hmac_secret system check. manage.py check now refuses to pass when Z4J_HMAC_SECRET (or settings.Z4J['hmac_secret']) is missing. Before, the check only validated brain_url/token/project_id - a deploy could be 'green' at preflight but the agent silently refused to start because AppConfig.ready() caught the RuntimeError and continued without z4j. Audit 2026-04-24 Low-1." },
      { type: "security", summary: "settings.Z4J['buffer_path'] and Z4J_BUFFER_PATH are now clamped to the agent's allowed roots (~/.z4j or $TMPDIR/z4j-{uid}). A typo or compromised env var that pointed at /etc/... or C:\\Windows\\... is rejected at config-build time. Audit 2026-04-24 Low-2." },
      { type: "added", summary: "Z4J_AGENT_ID surfaced in the settings/env resolver. Required for transport='longpoll' (Config now enforces this). Audit 2026-04-24 Medium-2." },
    ],
  },
  {
    package: "z4j-flask",
    version: "1.0.4",
    date: "2026-04-24",
    entries: [
      { type: "security", summary: "app.config['Z4J_BUFFER_PATH'] (or the nested Z4J dict) is now clamped to ~/.z4j or $TMPDIR/z4j-{uid}. Audit 2026-04-24 Low-2." },
      { type: "added", summary: "Z4J_AGENT_ID surfaced in the config resolver. Required for transport='longpoll'. Audit 2026-04-24 Medium-2." },
    ],
  },
  {
    package: "z4j-fastapi",
    version: "1.0.4",
    date: "2026-04-24",
    entries: [
      { type: "security", summary: "buffer_path kwarg / Z4J_BUFFER_PATH env is now clamped to ~/.z4j or $TMPDIR/z4j-{uid}. Audit 2026-04-24 Low-2." },
      { type: "added", summary: "agent_id kwarg on install_z4j / z4j_lifespan, and Z4J_AGENT_ID env var. Required for transport='longpoll'. Audit 2026-04-24 Medium-2." },
    ],
  },
  {
    package: "z4j-fastapi",
    version: "1.0.3",
    date: "2026-04-24",
    entries: [
      { type: "added", summary: "python -m z4j_fastapi doctor - connectivity diagnostics from the same package operators already pip-installed. Wraps z4j-bare's shared CLI doctor; runs the buffer-path / DNS / TCP / TLS / WebSocket probe ladder. JSON output via --json. Exits 0 on all-green, 1 on any failure." },
      { type: "changed", summary: "Bumped minimum z4j-core to >=1.0.4 and z4j-bare to >=1.0.6. Picks up the smart buffer-path fallback automatically: deployments under uvicorn/gunicorn with an unwritable HOME (the www-data class of failure) now relocate the buffer to $TMPDIR/z4j-{uid}/buffer-{pid}.sqlite and log a single WARNING instead of crashing at startup." },
    ],
  },
  {
    package: "z4j-flask",
    version: "1.0.3",
    date: "2026-04-24",
    entries: [
      { type: "added", summary: "python -m z4j_flask doctor - connectivity diagnostics from the same package operators already pip-installed. Wraps z4j-bare's shared CLI doctor; runs the buffer-path / DNS / TCP / TLS / WebSocket probe ladder. JSON output via --json." },
      { type: "changed", summary: "Bumped minimum z4j-core to >=1.0.4 and z4j-bare to >=1.0.6. Picks up the smart buffer-path fallback automatically: deployments under uwsgi/gunicorn with an unwritable HOME (www-data class of failure) now relocate the buffer to $TMPDIR/z4j-{uid}/buffer-{pid}.sqlite and log a single WARNING." },
    ],
  },
  {
    package: "z4j-django",
    version: "1.0.6",
    date: "2026-04-24",
    entries: [
      { type: "added", summary: "python manage.py z4j_doctor - end-to-end agent connectivity check. Runs the same probes the agent runtime would (buffer dir writable, brain DNS, TCP, TLS, WebSocket upgrade), but synchronously and without starting the persistent agent. Diagnoses the gunicorn-under-www-data startup failure and NAT/firewall/cert/wrong-token issues without grep'ing service logs. Reports auto-detected engines so operators can confirm celery is being found from the web process." },
      { type: "changed", summary: "Bumped minimum z4j-core to >=1.0.4 and z4j-bare to >=1.0.6. Picks up the smart buffer-path fallback: gunicorn under www-data now relocates the buffer to $TMPDIR/z4j-{uid}/buffer-{pid}.sqlite instead of crashing on mkdir /var/www/.z4j." },
    ],
  },
  {
    package: "z4j-bare",
    version: "1.0.6",
    date: "2026-04-24",
    entries: [
      { type: "added", summary: "Smart buffer-path fallback. New z4j_bare.storage module owns the policy: try ~/.z4j first, fall back to $TMPDIR/z4j-{uid} (mode 0700) when HOME is unwritable. BufferStore.__init__ relocates the buffer file (preserving the filename) instead of crashing with PermissionError. Fixes the gunicorn-under-www-data class of failure where the agent silently failed to start because Path.home() resolved to /var/www. WARNING is logged when the fallback is selected." },
      { type: "added", summary: "z4j_bare.diagnostics module with reusable probes for z4j-doctor style commands: probe_buffer_path(), probe_dns(), probe_tcp(), probe_tls(), probe_websocket(), plus a run_all(config) orchestrator. Probes return structured ProbeResult records, never raise. Used by z4j-django's manage.py z4j_doctor and z4j-flask/fastapi's python -m z4j_* doctor wrappers." },
      { type: "added", summary: "python -m z4j_bare doctor subcommand - shared CLI doctor used as the implementation for every framework adapter's doctor command. Reads Z4J_* env vars + flags, runs the probe ladder, exits 0 on all-green or 1 on failure. Human-readable text by default, --json for scripts." },
      { type: "fixed", summary: "Agent no longer fails to start under low-privilege service users (gunicorn/www-data, uvicorn under DynamicUser, etc.). Was a regression visible since v1.0.0 but only surfaced in deployments where Path.home() resolved to a directory the running user could not write to." },
      { type: "changed", summary: "_clamp_buffer_path now accepts paths under either of the two allowed roots (primary HOME-based or fallback tmp-based). Security boundary preserved - operator-set Z4J_BUFFER_PATH still must live under a user-private root." },
      { type: "changed", summary: "Bumped minimum z4j-core to >=1.0.4 for the new BufferStorageError exception class." },
    ],
  },
  {
    package: "z4j-core",
    version: "1.0.4",
    date: "2026-04-24",
    entries: [
      { type: "added", summary: "BufferStorageError exception (subclass of ConfigError). Raised by the agent when the on-disk SQLite buffer directory is unwritable AND every fallback location was also unusable. Operators see a clean diagnostic line with the offending path, the running uid, and the canonical Z4J_BUFFER_PATH override - instead of a raw PermissionError traceback buried in worker logs. Required for the buffer-path fallback in z4j-bare 1.0.6." },
    ],
  },
  {
    package: "z4j-celery",
    version: "1.0.3",
    date: "2026-04-24",
    entries: [
      { type: "fixed", summary: "Worker agents now report the correct host framework. A Django+Celery worker process now sends framework: django in its hello frame; same for Flask+Celery (flask) and FastAPI+Celery (fastapi). Standalone-Celery still reports bare. Previously every Celery worker reported framework: bare because z4j-bare's install_agent had no way to override the default BareFrameworkAdapter. The dashboard's Framework column now shows the operator's actual stack." },
      { type: "changed", summary: "_on_worker_init now passes the resolved framework class via the existing _resolve_framework_adapter precedence chain (FastAPI -> Flask -> Django -> bare) to install_agent(framework=...). Requires z4j-bare >= 1.0.5." },
    ],
  },
  {
    package: "z4j-bare",
    version: "1.0.5",
    date: "2026-04-24",
    entries: [
      { type: "added", summary: "install_agent(framework=...) kwarg. Accepts a FrameworkAdapter instance or a class. When a class, instantiated with the resolved Config. Defaults to BareFrameworkAdapter (preserves existing behavior). Lets engine bootstrappers like z4j-celery's worker_bootstrap pass through the right framework so the agent's hello frame reports framework: django/flask/fastapi instead of always bare." },
    ],
  },
  {
    package: "z4j-brain",
    version: "1.0.10",
    date: "2026-04-24",
    entries: [
      { type: "fixed", summary: "z4j doctor raised NameError ('os' not defined) - missing import in _run_doctor. Brain-only patch; no behavioural change beyond the command no longer crashing." },
    ],
  },
  {
    package: "z4j-bare",
    version: "1.0.4",
    date: "2026-04-24",
    entries: [
      { type: "added", summary: "Orphan cleanup on BufferStore.close(): when the buffer is empty at shutdown, the SQLite files (*.sqlite, *.sqlite-wal, *.sqlite-shm) are removed from disk. Combined with the per-process buffer-{pid}.sqlite default in z4j-core 1.0.3, this prevents accumulation of stale buffer-{old-pid}.sqlite files across many process restarts." },
      { type: "fixed", summary: "Multi-process 'cached counters drifted negative' WARNING resolved (root cause was the shared default buffer path; fixed via per-process default in z4j-core 1.0.3)." },
      { type: "changed", summary: "Bumped minimum z4j-core to >=1.0.3 to pick up the per-process buffer-path default." },
    ],
  },
  {
    package: "z4j-core",
    version: "1.0.3",
    date: "2026-04-24",
    entries: [
      { type: "changed", summary: "Config.buffer_path default is now per-process: ~/.z4j/buffer-{pid}.sqlite (was the shared ~/.z4j/buffer.sqlite). Fixes a real drift bug where two agent runtimes (web + worker) sharing one file kept their own in-memory cached counters that drifted out of sync, producing 'cached counters drifted negative' warnings. Per-process paths make the bug structurally impossible." },
    ],
  },
  {
    package: "z4j",
    version: "1.0.10",
    date: "2026-04-24",
    entries: [
      { type: "changed", summary: "Umbrella now requires z4j-brain >= 1.0.10." },
    ],
  },
  {
    package: "z4j-brain",
    version: "1.0.9",
    date: "2026-04-24",
    entries: [
      { type: "security", summary: "invalid_host 400 response is now ALWAYS minimal regardless of environment. The dev-mode-verbose gate from 1.0.8 was insufficient: homelab operators on the SQLite/pip path (defaults to dev mode) exposed via reverse proxy were still leaking internal LAN IPs + Tailscale node names + ready-to-paste Z4J_ALLOWED_HOSTS values. Verbose detail is now operator-log-only (always), correlatable via request_id. Audited the rest of the middleware - no other leaks." },
      { type: "added", summary: "z4j backup / z4j restore CLI. SQLite via VACUUM INTO (online), PostgreSQL via pg_dump -Fc / pg_restore. Backend auto-detected from Z4J_DATABASE_URL." },
      { type: "added", summary: "z4j doctor command - health + configuration audit with warnings (dev mode on non-loopback bind, Z4J_DEBUG_HOST_ERRORS leaking, auto-minted secrets needing off-host backup, no users/projects/agents yet)." },
      { type: "added", summary: "z4j serve --debug-host-errors opt-in flag for local-laptop verbose host-rejection responses. Refused outside dev mode. Prints a loud warning at startup." },
      { type: "added", summary: "Dashboard: host_name is now a top-level column on /projects/{slug}/agents (was a sub-label)." },
      { type: "added", summary: "CI: pip-audit + trivy security workflow on the public brain repo. Runs on push, PR, and daily cron. Uploads SARIF to GitHub Security tab." },
      { type: "added", summary: "Operations runbooks: /operations/allowed-hosts/, /operations/backup-restore/, /operations/upgrade-rollback/, /operations/incident-response/." },
    ],
  },
  {
    package: "z4j",
    version: "1.0.9",
    date: "2026-04-24",
    entries: [
      { type: "changed", summary: "Umbrella now requires z4j-brain >= 1.0.9." },
    ],
  },
  {
    package: "z4j-brain",
    version: "1.0.8",
    date: "2026-04-24",
    entries: [
      { type: "added", summary: "Persistent allow-list file at ~/.z4j/allowed-hosts (one host per line, # comments allowed). Read by `z4j serve` on every boot and merged into the auto-detected hostname/IP set. Answers 'where do I put my public DNS name so I don't have to set Z4J_ALLOWED_HOSTS every time'." },
      { type: "added", summary: "`z4j allowed-hosts` subcommand to manage the file from the CLI: list / add / remove / path. Atomic + idempotent." },
      { type: "added", summary: "Boot banner now calls out the persisted file source explicitly when ~/.z4j/allowed-hosts is non-empty." },
      { type: "security", summary: "invalid_host 400 response no longer leaks internal hostnames in non-dev mode. Previously the rejection payload included rejected_host, the full allowed_hosts array (LAN IPs, Tailscale node names), and a ready-to-paste env-var value - visible to any unauthenticated HTTP client. Now the verbose detail is dev-mode-only (Django-style); production responses are minimal `{error, message, request_id}`. Operators correlate via request_id against the verbose INFO log line." },
    ],
  },
  {
    package: "z4j",
    version: "1.0.8",
    date: "2026-04-24",
    entries: [
      { type: "changed", summary: "Umbrella now requires z4j-brain >= 1.0.8." },
    ],
  },
  {
    package: "z4j-brain",
    version: "1.0.7",
    date: "2026-04-23",
    entries: [
      { type: "added", summary: "Auto-detect LAN and interface IPs on the SQLite/dev path. 1.0.6 auto-added hostname + FQDN; 1.0.7 also enumerates every IP returned by socket.gethostbyname_ex(hostname) plus the primary outbound IP (via the UDP-socket trick). Covers the homelab case where operators reach the brain via 192.168.x.x. Tailscale and Docker-bridge IPs are included automatically." },
    ],
  },
  {
    package: "z4j",
    version: "1.0.7",
    date: "2026-04-23",
    entries: [
      { type: "changed", summary: "Umbrella now requires z4j-brain >= 1.0.7." },
    ],
  },
  {
    package: "z4j-brain",
    version: "1.0.6",
    date: "2026-04-23",
    entries: [
      { type: "added", summary: "`z4j serve --allowed-host` (repeatable) for ad-hoc Host-header allow-list additions. Merges with Z4J_ALLOWED_HOSTS env, the auto-detected hostname, and localhost." },
      { type: "added", summary: "Auto-detect the server's hostname + FQDN on the SQLite/dev path. `pip install z4j && z4j serve` on a remote VM now accepts requests to that hostname out of the box without any Z4J_ALLOWED_HOSTS config." },
      { type: "added", summary: "Boot banner showing the resolved Host: allow-list, plus how to add more." },
      { type: "added", summary: "Agent host_name field on `GET /api/v1/projects/{slug}/agents`. Persisted from the agent's hello-frame `host.name` (z4j-bare 1.0.3+, populated by Z4J_AGENT_NAME)." },
      { type: "fixed", summary: "invalid_host rejection error is now actionable. The 400 response includes rejected_host, allowed_hosts, and a concrete fix string showing both the env-var form and the CLI-flag form. Also logged at INFO." },
      { type: "fixed", summary: "Dashboard timestamps no longer render as 'in 4 hours' for non-UTC operators. The new parseTimestamp helper appends Z to any timestamp string with no timezone marker before parsing. Applies to formatRelative, formatAbsolute, trends-chart tick labels, and notification mute states." },
      { type: "fixed", summary: "Dashboard renders host_name on the agents page (when present and different from the mint-time name)." },
    ],
  },
  {
    package: "z4j",
    version: "1.0.6",
    date: "2026-04-23",
    entries: [
      { type: "changed", summary: "Umbrella now requires z4j-brain >= 1.0.6 (transitively pulls all current adapters)." },
    ],
  },
  {
    package: "z4j-django",
    version: "1.0.5",
    date: "2026-04-23",
    entries: [
      { type: "added", summary: "Canonical engine extras: [celery], [rq], [dramatiq], [huey], [arq], [taskiq], [all]. `pip install z4j-django[celery]` now pulls the engine adapter AND its companion scheduler in one shot." },
      { type: "changed", summary: "Minimum z4j-core and z4j-bare deps bumped to 1.0.2 / 1.0.3 so transitive installs always land on the fixed versions." },
    ],
  },
  {
    package: "z4j-flask",
    version: "1.0.2",
    date: "2026-04-23",
    entries: [
      { type: "added", summary: "Canonical engine extras matching z4j-django: [celery], [rq], [dramatiq], [huey], [arq], [taskiq], [all]. [celery] now includes celery-beat (was split across [celery] and [celerybeat] in 1.0.1)." },
      { type: "changed", summary: "Minimum z4j-core and z4j-bare deps bumped to 1.0.2 / 1.0.3." },
    ],
  },
  {
    package: "z4j-fastapi",
    version: "1.0.2",
    date: "2026-04-23",
    entries: [
      { type: "added", summary: "Canonical engine extras matching z4j-django: [celery], [rq], [dramatiq], [huey], [arq], [taskiq], [all]. [arq] is now the recommended async-native pairing." },
      { type: "changed", summary: "Minimum z4j-core and z4j-bare deps bumped to 1.0.2 / 1.0.3." },
    ],
  },
  {
    package: "z4j-brain",
    version: "1.0.5",
    date: "2026-04-23",
    entries: [
      { type: "added", summary: "z4j is now the primary CLI; z4j-brain remains as an alias." },
      { type: "added", summary: "New management commands: reset, createsuperuser, changepassword, check, status." },
      { type: "added", summary: "bootstrap-admin auto-mints HMAC secrets and runs migrations before provisioning." },
      { type: "added", summary: "Settings dashboard 'About' card with version, license, and project links." },
      { type: "fixed", summary: "Dashboard could log you out immediately after first-boot setup (timestamp-precision bug)." },
      { type: "fixed", summary: "/login now redirects to /setup for first-boot users with no admin." },
      { type: "fixed", summary: "Dashboard version display reads the installed wheel at runtime." },
      { type: "fixed", summary: "Schema-mismatch errors at startup refuse-to-start loudly with a hint to run `z4j migrate upgrade head`." },
      { type: "fixed", summary: "Setup-token rate limit no longer self-perpetuates (first_boot_attempts_per_ip default raised to 30)." },
      { type: "fixed", summary: "Orphan stale databases from earlier crashes are renamed to z4j.db.stale-bak so first-boot can proceed." },
      { type: "fixed", summary: "audit verify --limit default lowered to 5000 to match the per-chunk cap." },
    ],
  },
  {
    package: "z4j",
    version: "1.0.5",
    date: "2026-04-23",
    entries: [
      { type: "changed", summary: "Umbrella now requires z4j-brain >= 1.0.5 (transitively pulls all current adapters)." },
    ],
  },
  {
    package: "z4j-django",
    version: "1.0.4",
    date: "2026-04-23",
    entries: [
      { type: "fixed", summary: "Django StatReloader spawned two WebSocket connections; the brain force-closed the older one with code 4002. Now skips startup in the autoreload parent process." },
      { type: "fixed", summary: "'no Celery app located' even with a working celery.py. Auto-detect now tries 5 candidates: settings.CELERY_APP, <root>.celery_app, <root>.app, celery.current_app, <root>.celery.app. <root> is searched across ROOT_URLCONF, WSGI_APPLICATION, ASGI_APPLICATION, and BASE_DIR.name." },
      { type: "fixed", summary: "Worker process never started the agent when z4j-django ran first with no engine. Now skips startup under celery worker / celery beat invocations." },
      { type: "added", summary: "Eager `import z4j_celery` at module-load so the worker_init signal handler is always registered." },
      { type: "added", summary: "agent_name reader for settings.Z4J['agent_name'] and Z4J_AGENT_NAME env." },
      { type: "changed", summary: "'no Celery app' and 'no engines installed' warnings downgraded to INFO with proper context." },
    ],
  },
  {
    package: "z4j-bare",
    version: "1.0.3",
    date: "2026-04-23",
    entries: [
      { type: "fixed", summary: "ValueError: refusing plain ws:// connection on local dev. The TLS guard now auto-allows ws:// to loopback hosts (localhost, 127.0.0.1, ::1)." },
      { type: "added", summary: "agent_name kwarg + Z4J_AGENT_NAME env read in install_agent(). Plumbed through WebSocketTransport into the hello frame's host.name field." },
      { type: "changed", summary: "Rejection error message for non-loopback ws:// is now multi-line and points at Z4J_DEV_MODE=true." },
    ],
  },
  {
    package: "z4j-core",
    version: "1.0.2",
    date: "2026-04-23",
    entries: [
      { type: "added", summary: "agent_name: str | None field on Config. Travels in the hello frame as host.name." },
    ],
  },
  {
    package: "z4j-celery",
    version: "1.0.2",
    date: "2026-04-23",
    entries: [
      { type: "fixed", summary: "Missing z4j-bare runtime dependency declaration. A standalone `pip install z4j-celery` would ModuleNotFoundError on first import. Now correctly declares z4j-bare>=1.0.3 and z4j-core>=1.0.2." },
    ],
  },
  {
    package: "z4j-celerybeat",
    version: "1.0.2",
    date: "2026-04-23",
    entries: [
      { type: "fixed", summary: "Missing z4j-bare runtime dependency declaration. Now correctly declares z4j-bare>=1.0.3 and z4j-core>=1.0.2." },
    ],
  },

  // ---- v1.0.0 - initial release of every package ------------------------
  {
    package: "z4j-brain",
    version: "1.0.0",
    date: "2026-04-15",
    entries: [
      { type: "added", summary: "Initial release. FastAPI backend + React dashboard, async Postgres or SQLite, RBAC, HMAC-chained audit log, reconciliation worker, multi-user invitations, password-reset flow, Prometheus metrics." },
    ],
  },
  {
    package: "z4j",
    version: "1.0.0",
    date: "2026-04-15",
    entries: [
      { type: "added", summary: "Initial release of the umbrella package." },
    ],
  },
  {
    package: "z4j-core",
    version: "1.0.0",
    date: "2026-04-15",
    entries: [
      { type: "added", summary: "Initial release. Protocol types, models, redaction engine, wire-protocol v1." },
    ],
  },
  {
    package: "z4j-bare",
    version: "1.0.0",
    date: "2026-04-15",
    entries: [
      { type: "added", summary: "Initial release. Framework-free agent runtime, WebSocket transport, on-disk SQLite buffer." },
    ],
  },
  {
    package: "z4j-django",
    version: "1.0.0",
    date: "2026-04-15",
    entries: [
      { type: "added", summary: "Initial release. Django AppConfig integration with auto-registration." },
    ],
  },
  {
    package: "z4j-flask",
    version: "1.0.0",
    date: "2026-04-15",
    entries: [{ type: "added", summary: "Initial release. Standard Flask extension pattern Z4J(app)." }],
  },
  {
    package: "z4j-fastapi",
    version: "1.0.0",
    date: "2026-04-15",
    entries: [{ type: "added", summary: "Initial release. FastAPI lifespan integration." }],
  },
  {
    package: "z4j-celery",
    version: "1.0.0",
    date: "2026-04-15",
    entries: [{ type: "added", summary: "Initial release. Celery signal-based event capture; full action surface." }],
  },
  {
    package: "z4j-celerybeat",
    version: "1.0.0",
    date: "2026-04-15",
    entries: [{ type: "added", summary: "Initial release. Read-write scheduler adapter for Celery beat." }],
  },
  {
    package: "z4j-rq",
    version: "1.0.0",
    date: "2026-04-15",
    entries: [{ type: "added", summary: "Initial release. RQ engine adapter via worker-wrap." }],
  },
  {
    package: "z4j-rqscheduler",
    version: "1.0.0",
    date: "2026-04-15",
    entries: [{ type: "added", summary: "Initial release. rq-scheduler adapter (read-only)." }],
  },
  {
    package: "z4j-dramatiq",
    version: "1.0.0",
    date: "2026-04-15",
    entries: [{ type: "added", summary: "Initial release. Z4JMiddleware for Dramatiq actors." }],
  },
  {
    package: "z4j-huey",
    version: "1.0.0",
    date: "2026-04-15",
    entries: [{ type: "added", summary: "Initial release. Huey signal-based event capture." }],
  },
  {
    package: "z4j-hueyperiodic",
    version: "1.0.0",
    date: "2026-04-15",
    entries: [{ type: "added", summary: "Initial release. Huey @periodic_task surface (read-only)." }],
  },
  {
    package: "z4j-arq",
    version: "1.0.0",
    date: "2026-04-15",
    entries: [{ type: "added", summary: "Initial release. arq engine adapter via attach_to_worker_settings()." }],
  },
  {
    package: "z4j-arqcron",
    version: "1.0.0",
    date: "2026-04-15",
    entries: [{ type: "added", summary: "Initial release. arq cron_jobs surface (read-only)." }],
  },
  {
    package: "z4j-taskiq",
    version: "1.0.0",
    date: "2026-04-15",
    entries: [{ type: "added", summary: "Initial release. TaskIQ middleware for full lifecycle capture." }],
  },
  {
    package: "z4j-taskiqscheduler",
    version: "1.0.0",
    date: "2026-04-15",
    entries: [{ type: "added", summary: "Initial release. TaskIQ scheduler-source adapter." }],
  },
  {
    package: "z4j-apscheduler",
    version: "1.0.0",
    date: "2026-04-15",
    entries: [{ type: "added", summary: "Initial release. APScheduler engine-agnostic scheduler adapter." }],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Look up a package by PyPI name. Throws on unknown name (caller bug). */
export function getPackage(name: string): PackageMeta {
  const pkg = PACKAGES[name];
  if (!pkg) {
    throw new Error(`Unknown z4j package: ${name}`);
  }
  return pkg;
}

/** All packages in a category, sorted by name. */
export function packagesInCategory(category: PackageCategory): PackageMeta[] {
  return Object.values(PACKAGES)
    .filter((p) => p.category === category)
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** All releases for a given package, newest first. */
export function releasesFor(packageName: string): PackageRelease[] {
  return RELEASES.filter((r) => r.package === packageName).sort((a, b) =>
    b.version.localeCompare(a.version, undefined, { numeric: true }),
  );
}

/** Ordered category list for sidebar / index rendering. */
export const CATEGORY_ORDER: { id: PackageCategory; label: string }[] = [
  { id: "umbrella", label: "Umbrella" },
  { id: "brain", label: "Brain" },
  { id: "core", label: "Core" },
  { id: "framework", label: "Frameworks" },
  { id: "engine", label: "Engines" },
  { id: "scheduler", label: "Schedulers" },
];
