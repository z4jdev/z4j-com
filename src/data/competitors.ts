export interface CapabilityRow {
  cap: string;
  theirs: string;
  z4j: string;
  theirsOK?: boolean;
  z4jOK?: boolean;
}

export interface CompetitorMeta {
  slug: string;
  name: string;
  tagline: string;
  scope: string;
  positioning: string;
  licensing: string;
  upstreamUrl?: string;
  pros: string[];
  capabilityTable: CapabilityRow[];
  migrationSteps?: { title: string; body: string }[];
  honestTradeoffs: string[];
  ctaSecondaryHref?: string;
  ctaSecondaryLabel?: string;
}

export const COMPETITORS: CompetitorMeta[] = [
  {
    slug: "flower",
    name: "Flower",
    tagline: "The classic Celery viewer. Built in 2011.",
    scope: "Celery only",
    positioning: "Read-only viewer",
    licensing: "BSD-3, open source",
    upstreamUrl: "https://flower.readthedocs.io/",
    pros: [
      "Battle-tested on Celery for over a decade",
      "Single process, no database, very simple to deploy",
      "Live broker-event stream gives good real-time feel",
      "Familiar to anyone who has ever run Celery in production",
    ],
    capabilityTable: [
      { cap: "Engine coverage", theirs: "Celery only", z4j: "Celery, RQ, Dramatiq, Huey, arq, taskiq" },
      { cap: "Persistent history", theirs: "In-memory only, lost on restart", z4j: "Postgres-backed, every task ever seen", z4jOK: true },
      { cap: "Actions (retry, cancel, bulk)", theirs: "None, strictly a viewer", z4j: "Universal across every engine", z4jOK: true },
      { cap: "Bulk operations", theirs: "None", z4j: "bulk_retry, purge_queue with filters", z4jOK: true },
      { cap: "Schedule management", theirs: "Read-only via Celery Beat viewer", z4j: "Full CRUD: create, edit, delete, enable/disable, trigger-now", z4jOK: true },
      { cap: "RBAC / multi-user", theirs: "Single basic-auth user", z4j: "Owner / Admin / Operator / Viewer per project", z4jOK: true },
      { cap: "Invitation flow", theirs: "None", z4j: "Admin mints links, SMTP auto-send, single-use tokens", z4jOK: true },
      { cap: "Password reset", theirs: "N/A (no user model)", z4j: "Constant-time, single-use tokens, session revoke", z4jOK: true },
      { cap: "Audit log", theirs: "None", z4j: "HMAC-chained, tamper-evident", z4jOK: true },
      { cap: "Reconciliation worker", theirs: "None - tasks stuck 'started' stay that way", z4j: "Periodic probe closes the gap automatically", z4jOK: true },
      { cap: "Historical trends", theirs: "None", z4j: "Built-in: success, failure, p50/p95/p99 over time", z4jOK: true },
      { cap: "Visual DAG (chains/groups/chords)", theirs: "Flat parent/child list", z4j: "Tidy-tree SVG with runtime badges", z4jOK: true },
      { cap: "Secret redaction", theirs: "Raw args shown in UI", z4j: "Recursive scrubber + per-task overrides", z4jOK: true },
      { cap: "Notifications", theirs: "None", z4j: "Email / Slack / Telegram / webhook, SSRF-hardened", z4jOK: true },
      { cap: "Real-time updates", theirs: "Polling", z4j: "WebSocket with HMAC-signed frames", z4jOK: true },
    ],
    migrationSteps: [
      {
        title: "Keep Flower running during the migration",
        body: "z4j and Flower don't interfere. Leave Flower up; install z4j alongside; compare views during the cut-over week. Turn Flower off when you're confident.",
      },
      {
        title: "Install the z4j-celery adapter in the same worker process",
        body: "Flower subscribes to Celery's broker events via a separate process. z4j-celery uses the same events, plus worker signals, plus the result backend for reconciliation. Both can observe concurrently.",
      },
      {
        title: "Point z4j at the same broker + result backend",
        body: "z4j reads your existing CELERY_BROKER_URL + CELERY_RESULT_BACKEND. No data migration. Historical tasks that Flower forgot on its last restart won't appear in z4j, but every task after z4j install is persistent.",
      },
      {
        title: "Mint per-operator users",
        body: "Flower's single-user basic-auth was always a compromise. z4j has real RBAC: invite your team, give each person a login, make operators actual operators. Audit log shows who retried what and when.",
      },
      {
        title: "Delete your Flower docker-compose entry",
        body: "Keep the compose file in git. If you hit a z4j bug, you can re-enable Flower in one minute. You won't need to.",
      },
    ],
    honestTradeoffs: [
      "Flower has been around since 2011. It is battle-tested on Celery in a way z4j will not be for another year.",
      "Flower is a single-process deploy: one container, no database. z4j needs SQLite at minimum, Postgres for production. That is a real operational delta.",
      "If your stack is pure Celery and you only need a viewer, Flower is fine.",
    ],
    ctaSecondaryHref: "https://z4j.dev/migrate/from-flower/",
    ctaSecondaryLabel: "Full migration guide",
  },
  {
    slug: "rq-dashboard",
    name: "RQ Dashboard",
    tagline: "The simple web view for RQ.",
    scope: "RQ only",
    positioning: "Lightweight viewer with basic requeue",
    licensing: "MIT, open source",
    upstreamUrl: "https://github.com/Parallels/rq-dashboard",
    pros: [
      "Zero setup beyond RQ itself - one pip install and a Flask app",
      "Clean, unpretentious UI focused on RQ's primitives",
      "Good enough for small projects that only use RQ",
      "Supports requeue of failed jobs and queue emptying",
    ],
    capabilityTable: [
      { cap: "Engine coverage", theirs: "RQ only", z4j: "Celery, RQ, Dramatiq, Huey, arq, taskiq" },
      { cap: "Persistent history", theirs: "Only what RQ keeps in Redis (TTL-bound)", z4j: "Postgres-backed, full retention", z4jOK: true },
      { cap: "Retry / cancel actions", theirs: "Requeue failed only", z4j: "Retry, cancel, bulk-retry, requeue-DLQ", z4jOK: true },
      { cap: "Multi-queue across projects", theirs: "All queues on one Redis", z4j: "Per-project scoping with RBAC", z4jOK: true },
      { cap: "Schedule management", theirs: "Not included (needs rq-scheduler separately)", z4j: "Integrated via z4j-rqscheduler adapter", z4jOK: true },
      { cap: "RBAC / multi-user", theirs: "Basic-auth or none", z4j: "Owner / Admin / Operator / Viewer", z4jOK: true },
      { cap: "Audit log", theirs: "None", z4j: "HMAC-chained, tamper-evident", z4jOK: true },
      { cap: "Historical trends", theirs: "None", z4j: "Success, failure, runtime over time", z4jOK: true },
      { cap: "Visual DAG / workflow graph", theirs: "None", z4j: "Tidy-tree SVG layout", z4jOK: true },
      { cap: "Secret redaction", theirs: "Raw args visible", z4j: "Recursive scrubber + per-task overrides", z4jOK: true },
      { cap: "Real-time updates", theirs: "Poll-based refresh", z4j: "WebSocket with HMAC-signed frames", z4jOK: true },
    ],
    migrationSteps: [
      {
        title: "Run both side-by-side",
        body: "Both tools read from Redis. There is no conflict running them in parallel. Leave RQ Dashboard up while you validate z4j.",
      },
      {
        title: "Install z4j-rq alongside your worker",
        body: "The RQ adapter instruments job lifecycle without monkey-patching. Your existing workers keep running unchanged.",
      },
      {
        title: "Point at the same Redis",
        body: "z4j picks up the same queues, jobs, and workers RQ Dashboard shows. You gain persistent history from the moment z4j starts recording.",
      },
      {
        title: "Switch off RQ Dashboard once z4j covers your workflow",
        body: "Keep the docker-compose entry for emergency fallback. Most teams never re-enable it.",
      },
    ],
    honestTradeoffs: [
      "RQ Dashboard is a much smaller tool than z4j. If you only use RQ and never need audit trails, bulk actions, or multi-project scoping, it is simpler to operate.",
      "z4j's value grows with scale. A single developer on a single queue may not need it.",
    ],
  },
  {
    slug: "diy-grafana",
    name: "Grafana + Prometheus",
    tagline: "The DIY metrics approach. Great for SRE, wrong tool for task ops.",
    scope: "Any engine, via custom exporters",
    positioning: "Metrics and alerting, not task-level control",
    licensing: "AGPL-3 (Grafana) + Apache-2 (Prometheus)",
    upstreamUrl: "https://grafana.com/",
    pros: [
      "Already in every production stack - no new tool to sell to your platform team",
      "Excellent for aggregate trends, SLO dashboards, and alerting",
      "Integrates with existing on-call / PagerDuty routing",
      "Arbitrary dashboards for whatever you can export as a metric",
    ],
    capabilityTable: [
      { cap: "Aggregate throughput / latency charts", theirs: "Excellent", z4j: "Built-in, no exporter needed", theirsOK: true, z4jOK: true },
      { cap: "Per-task drill-down (args, kwargs, stack)", theirs: "Not possible - metrics strip that", z4j: "Every task, every attempt, with redaction", z4jOK: true },
      { cap: "Retry / cancel / bulk actions", theirs: "None - read-only dashboards", z4j: "Universal across every engine", z4jOK: true },
      { cap: "Schedule CRUD", theirs: "None", z4j: "Create / edit / delete / trigger-now", z4jOK: true },
      { cap: "Audit log", theirs: "None", z4j: "HMAC-chained, tamper-evident", z4jOK: true },
      { cap: "Setup cost", theirs: "Hours to days - exporters, dashboards, alert rules", z4j: "One docker compose up", z4jOK: true },
      { cap: "Engine-specific signals", theirs: "Whatever you export yourself", z4j: "Built-in adapters for 6 engines", z4jOK: true },
      { cap: "Multi-tenant project scoping", theirs: "Grafana Orgs (heavy)", z4j: "Per-project RBAC out of the box", z4jOK: true },
    ],
    honestTradeoffs: [
      "If your platform team already runs Grafana, you already have aggregate metrics. z4j is a complement, not a replacement - it owns the task-level layer.",
      "For site-wide SLO dashboards and alerting, Grafana is the right tool. z4j focuses on task operators: the person who has to figure out why a specific job is stuck.",
      "We recommend running both. z4j exposes Prometheus metrics at /metrics so your Grafana dashboards can pull from it.",
    ],
  },
];

export function getCompetitor(slug: string): CompetitorMeta | undefined {
  return COMPETITORS.find((c) => c.slug === slug);
}
