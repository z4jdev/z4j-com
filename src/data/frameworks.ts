/**
 * FrameworkMeta = framework-specific copy + install bundle. Anything
 * universal (PyPI URL, GitHub URL, upstream URL, latest version,
 * release date, docs URL) lives in src/data/packages.ts and is
 * looked up via `getPackage(framework.name)` from the page templates.
 */
export interface FrameworkMeta {
  /** URL slug (e.g. "django"). */
  slug: string;
  /** PyPI distribution name (e.g. "z4j-django"). Lookup key in packages.ts. */
  name: string;
  /** Display name shown as the page title. */
  shortName: string;
  tagline: string;
  description: string;
  icon: string;
  logo?: string;
  /** Recommended one-liner install for the most common engine pairing. */
  installCmd: string;
  /** Engine extra that the adapter recommends by default (e.g. "celery", "arq"). */
  recommendedEngine: string;
  /** Multi-line code snippet showing the in-app wiring. */
  quickstart: string;
  /** Framework-specific features bullets. */
  features: string[];
}

/**
 * The canonical set of engine extras every framework adapter ships.
 * Each entry generates one `pip install z4j-<framework>[<extra>]` example
 * on every framework detail page. Update this list only when we add or
 * remove an engine globally.
 */
export const FRAMEWORK_ENGINE_EXTRAS = [
  { extra: "celery",   label: "Celery",   bundled: "celery-beat" },
  { extra: "rq",       label: "RQ",       bundled: "rq-scheduler" },
  { extra: "dramatiq", label: "Dramatiq", bundled: "APScheduler" },
  { extra: "huey",     label: "Huey",     bundled: "huey-periodic" },
  { extra: "arq",      label: "arq",      bundled: "arq-cron" },
  { extra: "taskiq",   label: "TaskIQ",   bundled: "taskiq-scheduler" },
] as const;

export const FRAMEWORKS: FrameworkMeta[] = [
  {
    slug: "django",
    name: "z4j-django",
    shortName: "Django",
    tagline: "Django AppConfig integration, zero boilerplate.",
    description:
      "Adds z4j as a Django app. Reads DATABASES + CELERY_* from your settings, auto-registers with django_celery_beat for schedule CRUD, plays nice with django-celery-results for state. System checks warn when your setup drifts.",
    icon: "django",
    logo: "/logos/django.png",
    installCmd: "pip install z4j-django[celery]",
    recommendedEngine: "celery",
    quickstart: `# settings.py
INSTALLED_APPS += ["z4j_django"]

Z4J = {
    "brain_url":   env("Z4J_BRAIN_URL"),
    "token":       env("Z4J_TOKEN"),
    "hmac_secret": env("Z4J_HMAC_SECRET"),
    "project_id":  env("Z4J_PROJECT_ID"),
    "agent_name":  env("Z4J_AGENT_NAME", default=None),
}
# That's it. No CELERY_APP, no Z4J_DEV_MODE, no dev_mode kwarg.
# Auto-detect handles 95% of layouts. Add CELERY_APP only as a fallback.`,
    features: [
      "Django AppConfig auto-registration",
      "django_celery_beat schedule adapter (read-write)",
      "5-candidate Celery app auto-detect (cookiecutter, ROOT_URLCONF, WSGI/ASGI, BASE_DIR)",
      "Loopback ws:// auto-allowed for local dev (no Z4J_DEV_MODE flag)",
      "Autoreload-parent skip prevents StatReloader 4002 disconnects",
      "Eager z4j-celery import wires worker_init signal in any Django+Celery layout",
    ],
  },
  {
    slug: "flask",
    name: "z4j-flask",
    shortName: "Flask",
    tagline: "Flask extension pattern. One line to install.",
    description:
      "Standard Flask extension shape (Z4J(app)). Discovers Celery or Dramatiq tasks from your extensions/ layout. Reads config from app.config. No monkey-patching, no magic.",
    icon: "flask",
    logo: "/logos/flask.png",
    installCmd: "pip install z4j-flask[celery]",
    recommendedEngine: "celery",
    quickstart: `from flask import Flask
from z4j_flask import Z4J

app = Flask(__name__)
app.config.from_prefixed_env("Z4J_")
z4j = Z4J(app)`,
    features: [
      "Flask extension pattern",
      "Works with Flask-Celery / Flask-Dramatiq",
      "config.from_prefixed_env support",
      "Blueprint-friendly",
      "Gunicorn-safe initialization",
    ],
  },
  {
    slug: "fastapi",
    name: "z4j-fastapi",
    shortName: "FastAPI",
    tagline: "Lifespan-hook integration for async stacks.",
    description:
      "FastAPI lifespan-aware. Most commonly paired with arq or taskiq (both async-native) but works with Celery or RQ when your sync stack calls for them. Dependency-injection friendly.",
    icon: "fastapi",
    logo: "/logos/fastapi.png",
    installCmd: "pip install z4j-fastapi[arq]",
    recommendedEngine: "arq",
    quickstart: `from fastapi import FastAPI
from z4j_fastapi import install

app = FastAPI(lifespan=install)`,
    features: [
      "FastAPI lifespan integration",
      "Async-native (arq / taskiq best fit)",
      "Dependency-injection helpers",
      "Works alongside Celery / RQ too",
      "WebSocket-aware health checks",
    ],
  },
];

export function getFramework(slug: string): FrameworkMeta | undefined {
  return FRAMEWORKS.find((f) => f.slug === slug);
}
