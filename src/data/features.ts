export interface FeatureMeta {
  slug: string;
  icon: string;
  title: string;
  tagline: string;
  summary: string;
  bullets: string[];
  highlights?: string[];
}

export const FEATURES: FeatureMeta[] = [
  {
    slug: "unified-actions",
    icon: "unified-actions",
    title: "Unified action surface",
    tagline: "One button set. Every engine.",
    summary:
      "z4j commits to a single universal primitive, submit_task, that every engine adapter implements. The brain polyfills retry, bulk-retry, and DLQ-requeue on top of it. The dashboard never disables buttons based on engine.",
    bullets: [
      "Single Protocol method (submit_task) implemented by every adapter",
      "Brain-side polyfills for retry, bulk-retry, DLQ-requeue",
      "Dashboard never gates buttons per-engine",
      "Adding a new engine drops from ~15 methods to ~6",
    ],
    highlights: [
      "submit_task / cancel_task always native",
      "retry_task, bulk_retry, requeue_dead_letter polyfilled when absent",
      "Only restart_worker + rate_limit remain engine-gated (Celery physics)",
    ],
  },
  {
    slug: "reconciliation",
    icon: "reconciliation",
    title: "Stuck-task reconciliation",
    tagline: "Tasks started forever. Fixed, automatically.",
    summary:
      "A background worker sweeps tasks stuck in started/pending past a configurable threshold, asks the agent to probe the engine's result backend, and applies the authoritative state back with a task.reconciled audit row.",
    bullets: [
      "Covers every engine (Celery AsyncResult, RQ Job, arq Job.status, Huey result store, taskiq result_backend, Dramatiq Results middleware)",
      "Engine-matched routing: reconcile calls go to an agent that actually runs that engine",
      "Source-anchored state updates (agent cannot spoof engine / task_id)",
      "Rate-limited to protect the broker and audit log",
    ],
  },
  {
    slug: "trends",
    icon: "trends",
    title: "Historical trends",
    tagline: "Success rate, failure rate, throughput over time.",
    summary:
      "Per-bucket task outcome counts and average runtime, returned by a dialect-aware /trends endpoint (same query runs on SQLite dev + Postgres prod). Dashboard renders native-SVG line charts with hover tooltips.",
    bullets: [
      "5 window presets: 1h / 6h / 24h / 72h / 7d",
      "500-bucket guard prevents expensive queries",
      "Dialect-aware time bucketing (Postgres to_timestamp + SQLite strftime)",
      "Stat tiles: success / failure / failure-rate / retries",
    ],
  },
  {
    slug: "visual-dag",
    icon: "dag",
    title: "Visual task DAG",
    tagline: "See your canvas: chains, groups, chords.",
    summary:
      "Tidy-tree SVG layout of Celery canvas structures. Parent nodes are horizontally centered over their children; runtime badges surface per-node timing; failure states ring in red. No heavy graph library, hand-rolled SVG.",
    bullets: [
      "Subtree-width-aware placement",
      "Runtime badges (ms / s / m / h)",
      "Click-through navigation to any node",
      "Orphan + cycle detection (reparents safely)",
    ],
  },
  {
    slug: "rbac",
    icon: "rbac",
    title: "RBAC built-in",
    tagline: "Four roles. Every endpoint gated. UI mirrors server.",
    summary:
      "Owner / Admin / Operator / Viewer. Backend enforces on every mutating endpoint. useCan(slug, action) hook mirrors the policy in the dashboard so users never see buttons that would 403. RoleBadge chips on Members; /settings/memberships shows everyone their role at a glance.",
    bullets: [
      "Backend as source of truth",
      "UI gates match server policy",
      "Debounced 'Permission denied' toast on any 403",
      "Per-project membership + last-admin protection",
    ],
  },
  {
    slug: "invitations",
    icon: "invitations",
    title: "Multi-user invitations",
    tagline: "Mint a link. Email it automatically. Accept in one click.",
    summary:
      "Admin mints an invitation token; if the project has an email channel configured, z4j sends the accept link via SMTP. HMAC-hashed tokens, single-use, TOCTOU-safe accept, accepted_by_user_id stamped on consumption.",
    bullets: [
      "HMAC-SHA256 token storage, plaintext never persisted",
      "Auto-email via configured SMTP channel",
      "IP-throttled (30/min) to bottleneck token brute-force",
      "Single-use with atomic accept transaction",
    ],
  },
  {
    slug: "password-reset",
    icon: "password-reset",
    title: "Password reset flow",
    tagline: "Industry-standard, timing-safe, single-use.",
    summary:
      "Request + confirm endpoints. Responses are constant-shape and constant-time via BackgroundTasks (email dispatch happens after response flush) so email enumeration is impossible. Prior unconsumed tokens invalidated on successful reset. All sessions revoked.",
    bullets: [
      "Constant-shape response: accepted=true for known + unknown emails",
      "BackgroundTasks so response time is flat (~40ms delta under test)",
      "Atomic session revoke on successful confirm",
      "Prior tokens invalidated so a held earlier token cannot second-reset",
    ],
  },
  {
    slug: "redaction",
    icon: "redaction",
    title: "Secure-by-default redaction",
    tagline: "Secrets never leave the agent.",
    summary:
      "Every task args, kwargs, return value, and exception passes through a redaction engine before leaving the agent process. Defense-in-depth: the brain re-scrubs on ingest. Add per-task overrides via @z4j_meta.",
    bullets: [
      "Recursive scrubber for nested dicts / lists / custom classes",
      "Pattern matching: API keys, tokens, AWS creds, private keys, ~40 common patterns",
      "Per-task overrides via @z4j_meta(redact_kwargs=[...])",
      "Brain-side re-scrub (defense in depth, does not trust agent)",
    ],
  },
  {
    slug: "audit-log",
    icon: "audit-log",
    title: "HMAC-chained audit log",
    tagline: "Tamper-evident. Even against DBAs.",
    summary:
      "Every privileged action writes an audit row. Per-row HMAC-SHA256 signed by the server secret; v3 canonical adds prev_row_hmac so consecutive rows form a chain. Deleting any row breaks the next row's anchor, detected by verify_chain.",
    bullets: [
      "Per-row HMAC (tamper-evident against modification)",
      "Chain anchor (tamper-evident against deletion)",
      "verify_chain walker for offline audit",
      "Row id folded into HMAC input (prevents row cloning)",
    ],
  },
  {
    slug: "rate-limiting",
    icon: "rate-limiting",
    title: "Defense-in-depth rate limits",
    tagline: "No brute-force vectors on public endpoints.",
    summary:
      "IP-token-bucket throttles on /auth/login (20/min), /invitations/* (30/min), /auth/password-reset/* (10/min). Inline pruning guarantees bounded memory even under spoofed-XFF attack. Per-account lockout remains as a second line.",
    bullets: [
      "Per-IP sliding-window buckets",
      "Inline prune every 500 hits, no background task needed",
      "120-char IP key cap defeats 10KB XFF memory attack",
      "Composes with per-account lockout for layered defense",
    ],
  },
  {
    slug: "worker-restart",
    icon: "worker-restart",
    title: "Safe worker restart",
    tagline: "Universal restart, zero shell execution.",
    summary:
      "Celery uses native pool_restart (graceful drain). Every other engine uses graceful self-exit via orchestrator respawn. Preflight requires both env + filesystem signals. 60-second flap guard prevents restart loops.",
    bullets: [
      "Celery: native pool_restart (zero task loss)",
      "Others: self-exit + orchestrator respawn (documented in-flight-loss)",
      "Preflight = env signal + filesystem marker",
      "60-second flap guard",
      "Never executes shell commands",
    ],
  },
  {
    slug: "redis-streams",
    icon: "realtime",
    title: "Real-time dashboard",
    tagline: "Live task events. Live worker state.",
    summary:
      "WebSocket channel from brain to dashboard. HMAC-signed envelopes. Replay guard. Every task lifecycle event, every worker heartbeat, every queue depth report, live in the UI. Falls back to long-poll over HTTPS.",
    bullets: [
      "WebSocket with HMAC v2 envelopes",
      "Replay guard (+/-60s + nonce + monotonic seq)",
      "Session-bound frames (agent reconnect detection)",
      "HTTPS long-poll fallback for restrictive networks",
    ],
  },
];

export function getFeature(slug: string): FeatureMeta | undefined {
  return FEATURES.find((f) => f.slug === slug);
}
