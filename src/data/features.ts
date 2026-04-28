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
    slug: "notification-providers",
    icon: "notifications",
    title: "Notification providers",
    tagline:
      "Six native channels. Plug into the stack you already use.",
    summary:
      "Email, Slack, PagerDuty, Discord, Telegram, and generic HTTPS webhook are first-class channels with a shared CRUD surface, the same SSRF and DNS-pinning protection, and a Test button that dispatches a canned payload through the real provider before you save. Project-wide channels for the team plus per-user personal channels using the same schema, so on-call handoffs do not require touching shared config.",
    bullets: [
      "SMTP email with TLS / STARTTLS, 4-port allow-list, masked passwords on read",
      "Slack incoming webhook with Block Kit formatting",
      "PagerDuty native Events API v2 with severity_map per trigger and dedup keys that collapse repeats into one incident",
      "Discord incoming webhook (Slack-compatible payload, auto /slack suffix)",
      "Telegram bot via sendMessage with regex-validated bot_token and chat_id",
      "Generic HTTPS webhook with HMAC-SHA256 signature in X-Z4J-Signature for replay-safe receivers",
    ],
    highlights: [
      "Test endpoint dispatches through the real provider so credentials are verified before save",
      "SSRF + DNS-pin guard against rebind, 16 KiB config cap, 10s / 5s HTTP timeouts",
      "Sensitive fields (smtp_pass, hmac_secret, bot_token, integration_key) masked on read; empty PATCH preserves stored value",
      "Delivery audit log captures status, response code, and sanitized error body for every send",
    ],
  },
  {
    slug: "notification-levels",
    icon: "severity",
    title: "Severity-aware subscriptions",
    tagline:
      "Page on critical. Email on warning. Drop info into a Slack channel.",
    summary:
      "Every subscription pins a trigger plus a severity tier, then routes to the channel that fits the level. PagerDuty channels accept a per-trigger severity_map (critical / error / warning / info) so task.failed pages oncall while agent.offline only nudges Slack. Combine with priority range, fnmatch task name pattern, and queue filters to narrow the firehose down to exactly what each tier should hear.",
    bullets: [
      "Six triggers covering tasks (failed / succeeded / retried / slow) and agents (online / offline)",
      "Severity tiers: critical / error / warning / info with sensible per-trigger defaults built in",
      "PagerDuty severity_default plus severity_map per trigger; one channel can route every level correctly",
      "Filter by priority_min / priority_max range so a low-priority background job never wakes anyone",
      "fnmatch patterns on task name (billing.*, *.deliver) and exact-match queue filters",
      "Project default subscriptions act as templates new members inherit; users override their own without affecting the team",
    ],
    highlights: [
      "Defaults are tuned so most operators only paste the integration key and go",
      "ReDoS-bounded matcher: complex severity_map regex skipped instead of pinning a worker",
      "Filters evaluated before dispatch, so a muted or out-of-range subscription costs nothing",
    ],
  },
  {
    slug: "notification-cooldown",
    icon: "cooldown",
    title: "Cooldown and mute",
    tagline: "One bad deploy posts once. Not three hundred times.",
    summary:
      "Every subscription has its own cooldown window (0 to 86400 seconds) so a flood of repeated events collapses to a single notification, and a muted_until timestamp so on-call handoffs and maintenance windows are one click away. Per-user controls live alongside per-project ones, so muting your phone for the weekend does not change anyone else's pager.",
    bullets: [
      "cooldown_seconds: drop events that arrive within N seconds of the previous matching event for the same subscription",
      "muted_until: hard-mute until a timestamp; the subscription resumes automatically when the window expires",
      "Per-user personal subscriptions with their own cooldown and mute, independent of team channels",
      "PagerDuty dedup_key collapses repeat firings of (project, trigger, task_id) into one incident upstream",
      "Backpressure-safe dispatch: bounded outbound concurrency (16 per event batch) keeps fan-out from stalling the WebSocket router",
    ],
    highlights: [
      "Cooldown evaluated before dispatch, so dropping costs essentially nothing",
      "256-task pending cap on the dispatch queue protects the brain under burst load",
      "Per-IP rate limit on test, import, and bulk endpoints stops accidental amplification",
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
    slug: "install-pip",
    icon: "terminal",
    title: "Pip + SQLite",
    tagline: "pip install z4j, then z4j serve. Zero containers, zero infra.",
    summary:
      "The lightest deployment tier: a single PyPI install with SQLite as the data store. No Postgres, no Docker daemon, no Kubernetes. Right for a homelab Raspberry Pi, a single-developer laptop, a CI worker, or a small team that just wants a working dashboard in five minutes. Same dashboard, same RBAC, same audit log as the production tiers.",
    bullets: [
      "Pure Python install via pip; no Docker daemon required",
      "SQLite by default, optional Postgres at any time without re-onboarding",
      "First-boot setup wizard mints secrets and writes them to ~/.z4j/secret.env",
      "127.0.0.1 default bind keeps dev installs off the network",
      "Identical feature set to the Docker tiers; nothing is gated to paid plans",
    ],
    highlights: [
      "Five-minute install on any machine with Python 3.13+",
      "Smart buffer-path fallback for service-user installs (gunicorn under www-data)",
      "z4j doctor runs a connectivity ladder (DNS, TCP, TLS, WebSocket) for triage",
    ],
  },
  {
    slug: "install-amd64",
    icon: "cpu-amd64",
    title: "Docker on x86 / AMD64",
    tagline: "Standard cloud VMs. Native, not emulated.",
    summary:
      "The z4jdev/z4j Docker image is built natively for linux/amd64, so it runs at full speed on any standard cloud VM (AWS EC2, GCP, Azure, Hetzner, DigitalOcean) without QEMU emulation. Same image works under docker compose, systemd, ECS, Cloud Run, Fly, Railway, and Kubernetes. The bare metrics endpoint, audit log verification, and notification channels are identical to the pip tier.",
    bullets: [
      "Multi-arch manifest under z4jdev/z4j; AMD64 is the default for all common cloud providers",
      "Single image carries brain + dashboard + migrations; one container is the whole control plane",
      "Postgres recommended in this tier; Z4J_DATABASE_URL points at any reachable Postgres",
      "Works behind Caddy, nginx, Traefik, Cloudflare Tunnel; auto-promotes to production mode when Z4J_PUBLIC_URL is HTTPS and Z4J_ALLOWED_HOSTS is set",
    ],
    highlights: [
      "Native AMD64 build; no QEMU translation overhead",
      "Versioned tags (z4jdev/z4j:1.0.14) plus rolling latest tag",
      "GitHub Actions release pipeline publishes new tags within minutes of a release",
    ],
  },
  {
    slug: "install-arm64",
    icon: "cpu-arm64",
    title: "Docker on ARM64",
    tagline: "Apple Silicon. Raspberry Pi. AWS Graviton. Native, not emulated.",
    summary:
      "Same z4jdev/z4j image, second native arch in the manifest: linux/arm64. Apple Silicon (M-series), Raspberry Pi 4 / 5, AWS Graviton, Oracle Ampere, Hetzner ARM all pull the ARM64 layer automatically. Built natively on ubuntu-24.04-arm runners; no QEMU emulation in the build pipeline or at runtime, so cold starts and steady-state CPU match the AMD64 tier.",
    bullets: [
      "linux/arm64 layer in the same z4jdev/z4j multi-arch manifest; docker pull picks the right one",
      "Native ARM build; matches AMD64 performance without emulation overhead",
      "Good fit for homelab (Pi 4 / Pi 5), edge nodes, and ARM cloud instances",
      "Identical Postgres / SQLite story as AMD64; data files are arch-agnostic so you can move between them",
    ],
    highlights: [
      "Built on GitHub Actions native ubuntu-24.04-arm runners",
      "Pi 4 (4 GB) handles a small homelab fleet comfortably",
      "AWS Graviton instances often beat AMD64 on price / performance",
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
  {
    slug: "dynamic-scheduler",
    icon: "clock",
    title: "Dynamic scheduler",
    tagline: "Edit schedules from the dashboard. Drives every engine.",
    summary:
      "z4j-scheduler is a separate companion process that fires schedules against any of the six engines z4j supports. Schedules live in z4j-brain's database and can be edited from the dashboard, declaratively in app config, or via REST without restarting any daemon.",
    bullets: [
      "Engine-agnostic dispatch: Celery, RQ, Dramatiq, Huey, arq, taskiq",
      "Live edit from dashboard, declarative reconciler, or REST",
      "Per-schedule catch-up policy (skip / fire-one / fire-all)",
      "Importer + exporter for every native scheduler (no lock-in)",
      "Postgres advisory-lock leader for HA",
    ],
  },
];

export function getFeature(slug: string): FeatureMeta | undefined {
  return FEATURES.find((f) => f.slug === slug);
}
