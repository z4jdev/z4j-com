export interface PlatformMeta {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: string;
  logo?: string;
  upstreamUrl?: string;
  pypi: string;
  installCmd: string;
  quickstart: string;
  features: string[];
  docsHref: string;
}

export const PLATFORMS: PlatformMeta[] = [
  {
    slug: "django",
    name: "z4j-django",
    shortName: "Django",
    tagline: "Django AppConfig integration, zero boilerplate.",
    description:
      "Adds z4j as a Django app. Reads DATABASES + CELERY_* from your settings, auto-registers with django_celery_beat for schedule CRUD, plays nice with django-celery-results for state. System checks warn when your setup drifts.",
    icon: "django",
    logo: "/logos/django.png",
    upstreamUrl: "https://www.djangoproject.com/",
    pypi: "z4j-django[celery]",
    installCmd: "pip install z4j-django[celery]",
    quickstart: `# settings.py
INSTALLED_APPS = [
    *existing_apps,
    "z4j_django",
]

Z4J_BRAIN_URL = "https://brain.example.com"
Z4J_TOKEN = env("Z4J_TOKEN")
Z4J_HMAC_SECRET = env("Z4J_HMAC_SECRET")`,
    features: [
      "Django AppConfig auto-registration",
      "django_celery_beat schedule adapter",
      "System checks for misconfiguration",
      "Signal-handler events (lossless during restarts)",
      "CSRF-safe admin integration",
    ],
    docsHref: "https://z4j.dev/frameworks/django/",
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
    upstreamUrl: "https://flask.palletsprojects.com/",
    pypi: "z4j-flask[celery]",
    installCmd: "pip install z4j-flask[celery]",
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
    docsHref: "https://z4j.dev/frameworks/flask/",
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
    upstreamUrl: "https://fastapi.tiangolo.com/",
    pypi: "z4j-fastapi[arq]",
    installCmd: "pip install z4j-fastapi[arq]",
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
    docsHref: "https://z4j.dev/frameworks/fastapi/",
  },
];

export function getPlatform(slug: string): PlatformMeta | undefined {
  return PLATFORMS.find((p) => p.slug === slug);
}
