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
export const Z4J_HEADLINE_VERSION = "1.0.14";

/** Minor line that all v1.0.x packages share. */
export const Z4J_LINE = "1.0";

// ---------------------------------------------------------------------------
// Packages
// ---------------------------------------------------------------------------

export const PACKAGES: Record<string, PackageMeta> = {
  // Umbrella ---------------------------------------------------------------
  "z4j": {
    name: "z4j",
    category: "umbrella",
    license: "AGPL-3.0",
    latest: "1.0.14",
    releaseDate: "2026-04-24",
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
    latest: "1.0.14",
    releaseDate: "2026-04-24",
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
    latest: "1.0.5",
    releaseDate: "2026-04-24",
    pypi: "https://pypi.org/project/z4j-core/",
    github: "https://github.com/z4jdev/z4j-core",
    description: "Shared protocol types, models, redaction engine.",
  },
  "z4j-bare": {
    name: "z4j-bare",
    category: "core",
    license: "Apache-2.0",
    latest: "1.0.7",
    releaseDate: "2026-04-24",
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
    latest: "1.0.7",
    releaseDate: "2026-04-24",
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
    latest: "1.0.4",
    releaseDate: "2026-04-24",
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
    latest: "1.0.4",
    releaseDate: "2026-04-24",
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
    latest: "1.0.3",
    releaseDate: "2026-04-24",
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
    latest: "1.0.1",
    releaseDate: "2026-04-22",
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
    latest: "1.0.2",
    releaseDate: "2026-04-23",
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
