export interface EngineMeta {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: string;
  logo?: string;
  upstreamUrl?: string;
  pypi: string;
  firstShipped: "v1.0" | "v1.0 (new)";
  broker: string[];
  nativeActions: string[];
  brainPolyfilledActions: string[];
  nonSupported: string[];
  eventCapture: string;
  reconcile: string;
  docsHref: string;
  schedulerSlug: string;
}

export const ENGINES: EngineMeta[] = [
  {
    slug: "celery",
    name: "z4j-celery",
    shortName: "Celery",
    tagline: "The industry standard, covered end-to-end.",
    description:
      "Full feature parity with every action Celery's remote-control channel exposes, plus signal and broker-event dual capture for lossless event streams even under worker restarts.",
    icon: "celery",
    logo: "/logos/celery.png",
    upstreamUrl: "https://docs.celeryq.dev/",
    pypi: "z4j-celery",
    firstShipped: "v1.0",
    broker: ["Redis", "RabbitMQ", "SQS", "any Kombu-supported"],
    nativeActions: [
      "submit_task",
      "retry_task",
      "cancel_task",
      "bulk_retry",
      "purge_queue",
      "requeue_dead_letter",
      "restart_worker",
      "pool_grow / pool_shrink",
      "add_consumer / cancel_consumer",
      "rate_limit",
    ],
    brainPolyfilledActions: [],
    nonSupported: [],
    eventCapture:
      "Signals (in-process) + broker-events monitoring (fanout). Auto-switches based on worker pool type.",
    reconcile:
      "celery.result.AsyncResult, authoritative; covers every backend (redis, rpc, db, etc.).",
    docsHref: "https://z4j.dev/engines/celery/",
    schedulerSlug: "celery-beat",
  },
  {
    slug: "rq",
    name: "z4j-rq",
    shortName: "RQ",
    tagline: "Lightweight Redis queue, fully instrumented.",
    description:
      "RQ's worker model has no remote-control channel, but every data-plane action is implemented: retry, cancel, bulk retry, purge, requeue-dead-letter, plus worker-wrap event capture.",
    icon: "rq",
    logo: "/logos/rq.png",
    upstreamUrl: "https://python-rq.org/",
    pypi: "z4j-rq",
    firstShipped: "v1.0",
    broker: ["Redis"],
    nativeActions: [
      "submit_task",
      "retry_task",
      "cancel_task",
      "bulk_retry",
      "purge_queue",
      "requeue_dead_letter",
    ],
    brainPolyfilledActions: [],
    nonSupported: ["restart_worker (graceful self-exit instead)", "rate_limit"],
    eventCapture:
      "Worker-wrap monkey-patch plus per-job callbacks. No code changes required in your jobs.",
    reconcile: "rq.job.Job: status + ended_at + exc_info from the Redis hash.",
    docsHref: "https://z4j.dev/engines/rq/",
    schedulerSlug: "rq-scheduler",
  },
  {
    slug: "dramatiq",
    name: "z4j-dramatiq",
    shortName: "Dramatiq",
    tagline: "Middleware-driven Dramatiq observability.",
    description:
      "Ships as a single Z4JMiddleware with no monkey-patching. Dual broker support on day one (Redis + RabbitMQ). Abortable-gated cancel promoted into capabilities only when the middleware is installed.",
    icon: "dramatiq",
    logo: "/logos/dramatiq.png",
    upstreamUrl: "https://dramatiq.io/",
    pypi: "z4j-dramatiq",
    firstShipped: "v1.0",
    broker: ["Redis", "RabbitMQ"],
    nativeActions: [
      "submit_task",
      "retry_task",
      "cancel_task (Abortable-gated)",
      "purge_queue",
      "bulk_retry",
      "requeue_dead_letter",
    ],
    brainPolyfilledActions: [],
    nonSupported: ["restart_worker (graceful self-exit instead)", "rate_limit"],
    eventCapture: "Z4JMiddleware, Dramatiq's blessed observability hook.",
    reconcile:
      "Results middleware (when configured). Reads back stored results; falls through to unknown otherwise.",
    docsHref: "https://z4j.dev/engines/dramatiq/",
    schedulerSlug: "apscheduler",
  },
  {
    slug: "huey",
    name: "z4j-huey",
    shortName: "Huey",
    tagline: "Lightweight Redis/SQLite queue, first-class.",
    description:
      "Huey 2.x and 3.x both supported. Event capture via huey.signals (enqueued / executing / complete / error / retried / revoked). Pair with z4j-hueyperiodic to surface @periodic_task schedules.",
    icon: "huey",
    logo: "/logos/huey.png",
    upstreamUrl: "https://huey.readthedocs.io/",
    pypi: "z4j-huey",
    firstShipped: "v1.0 (new)",
    broker: ["Redis", "SQLite", "Memory (dev)", "File storage"],
    nativeActions: ["submit_task", "retry_task", "cancel_task"],
    brainPolyfilledActions: ["bulk_retry", "requeue_dead_letter"],
    nonSupported: ["purge_queue (engine limitation)", "restart_worker (graceful self-exit)", "rate_limit"],
    eventCapture: "huey.signals decorator, installed via adapter.connect_signals().",
    reconcile: "Huey result store (peek_data). Returns pending/success/unknown.",
    docsHref: "https://z4j.dev/engines/huey/",
    schedulerSlug: "huey-periodic",
  },
  {
    slug: "arq",
    name: "z4j-arq",
    shortName: "arq",
    tagline: "Async Redis queue for FastAPI-era Python.",
    description:
      "arq has no native re-enqueue-by-id primitive, so retry_task is polyfilled brain-side via submit_task using captured args. Event capture chains onto arq's WorkerSettings on_job_start / on_job_end hooks.",
    icon: "arq",
    logo: "/logos/arq.png",
    upstreamUrl: "https://arq-docs.helpmanual.io/",
    pypi: "z4j-arq",
    firstShipped: "v1.0 (new)",
    broker: ["Redis"],
    nativeActions: ["submit_task", "cancel_task (Job.abort)"],
    brainPolyfilledActions: ["retry_task", "bulk_retry", "requeue_dead_letter"],
    nonSupported: ["purge_queue", "restart_worker (graceful self-exit)", "rate_limit"],
    eventCapture:
      "attach_to_worker_settings() chains onto on_job_start / on_job_end. Optional; lifecycle still works without.",
    reconcile:
      "arq.jobs.Job.status() + result_info(): clean deferred/queued/in_progress/complete mapping.",
    docsHref: "https://z4j.dev/engines/arq/",
    schedulerSlug: "arq-cron",
  },
  {
    slug: "taskiq",
    name: "z4j-taskiq",
    shortName: "taskiq",
    tagline: "Broker-agnostic async task framework.",
    description:
      "taskiq's value is broker-flexibility (Redis, NATS, AMQP). Per-broker quirks mean cancel/retry need per-broker drivers; v1.0 ships the universal submit_task + reconcile path. Event capture via Z4JTaskiqMiddleware.",
    icon: "taskiq",
    logo: "/logos/taskiq.png",
    upstreamUrl: "https://taskiq-python.github.io/",
    pypi: "z4j-taskiq",
    firstShipped: "v1.0 (new)",
    broker: ["Redis Streams", "NATS (v1.1)", "AMQP (v1.1)", "In-memory (test)"],
    nativeActions: ["submit_task"],
    brainPolyfilledActions: ["retry_task", "bulk_retry", "requeue_dead_letter"],
    nonSupported: [
      "cancel_task (broker-specific; v1.1 per-broker)",
      "restart_worker (graceful self-exit)",
      "rate_limit",
    ],
    eventCapture:
      "Z4JTaskiqMiddleware: pre_send / pre_execute / post_execute / on_error.",
    reconcile:
      "result_backend.is_result_ready() + get_result(). Works across every backend taskiq ships.",
    docsHref: "https://z4j.dev/engines/taskiq/",
    schedulerSlug: "taskiq-scheduler",
  },
];

export function getEngine(slug: string): EngineMeta | undefined {
  return ENGINES.find((e) => e.slug === slug);
}
