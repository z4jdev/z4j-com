export type StackTech = "python" | "pypi" | "sqlite" | "docker" | "postgres";

export interface DeploymentMeta {
  slug: string;
  icon: string;
  badge: string;
  badgeColor: "accent" | "primary" | "warning";
  name: string;
  tagline: string;
  headline: string;
  stack: { name: StackTech; label?: string }[];
  installOneLiner: string;
  audience: string;
  targetTiers: string[];
  install: string;
  installLang: string;
  containers: { name: string; purpose: string; image?: string }[];
  requirements: string[];
  database: string;
  whenToUse: string[];
  whenNotToUse: string[];
  features: { label: string; enabled: boolean }[];
  scaleLimit: string;
  upgradePath: string;
  docsHref: string;
}

export const DEPLOYMENTS: DeploymentMeta[] = [
  {
    slug: "pip",
    icon: "terminal",
    badge: "Lightest",
    badgeColor: "accent",
    name: "Pure Python (pip)",
    tagline: "One pip install. No Docker. No container runtime.",
    headline: "Install from PyPI. Runs as a single Python process with a local SQLite file.",
    stack: [
      { name: "pypi", label: "PyPI package" },
      { name: "python", label: "Python 3.11+" },
      { name: "sqlite", label: "SQLite" },
    ],
    installOneLiner: "pip install z4j-brain",
    audience: "Solo developers, homelab, local dev, bare-metal servers, CI",
    targetTiers: ["Homelab", "Solo developer"],
    install: `# Install the brain (dashboard and backend bundled, SQLite by default)
pip install z4j-brain

# Boot with an admin account. Auto-runs migrations, generates secrets.
z4j-brain serve \\
  --admin-email you@example.com \\
  --admin-password change-me`,
    installLang: "bash",
    containers: [
      { name: "One Python process", purpose: "z4j-brain serves the FastAPI API, the WebSocket agent gateway, and the React dashboard from a single process. SQLite lives on local disk." },
    ],
    requirements: [
      "Python 3.11 or newer",
      "No Docker, no Redis, no broker required",
      "Writes to ~/.z4j/z4j.db (SQLite)",
    ],
    database: "SQLite (auto-created at ~/.z4j/z4j.db)",
    whenToUse: [
      "Running z4j on a Raspberry Pi or homelab NUC",
      "Evaluating z4j locally before committing to a container",
      "CI jobs that need a task dashboard ephemerally",
      "Air-gapped Python environments where Docker is not permitted",
    ],
    whenNotToUse: [
      "Multiple concurrent admins (SQLite is single-writer)",
      "High event throughput (>1k events/minute sustained)",
      "Teams with heterogeneous hosts and OS versions",
    ],
    features: [
      { label: "All 6 engines supported", enabled: true },
      { label: "All 3 framework adapters", enabled: true },
      { label: "Full dashboard UI", enabled: true },
      { label: "RBAC and audit log", enabled: true },
      { label: "HMAC wire protocol", enabled: true },
      { label: "Multi-writer scale-out", enabled: false },
      { label: "Horizontal brain replicas", enabled: false },
    ],
    scaleLimit: "Up to ~10 agents, ~1k events/minute, single-host deployment",
    upgradePath: "Switch to z4j (Docker) or z4j + Postgres by graduating to the Docker compose presets. Your data, users, and schedules all migrate over.",
    docsHref: "https://z4j.dev/getting-started/install/",
  },
  {
    slug: "z4j",
    icon: "server",
    badge: "Default",
    badgeColor: "primary",
    name: "z4j",
    tagline: "One container. Bundled SQLite. Zero required env vars.",
    headline: "A single Docker image with SQLite baked in. docker compose up and you are done.",
    stack: [
      { name: "docker", label: "Docker image" },
      { name: "sqlite", label: "SQLite (bundled)" },
    ],
    installOneLiner: "docker compose up -d",
    audience: "Homelab, small teams, evaluation, proof-of-concept",
    targetTiers: ["Homelab", "Small team", "Evaluation"],
    install: `# The default. One file. docker compose up.
# No secrets to set, no Postgres, no broker. It just works.
docker compose up -d

# Tail logs for the first-boot admin setup URL.
docker compose logs -f z4j-brain

# Or skip the interactive setup with env vars in .env:
#   Z4J_BOOTSTRAP_ADMIN_EMAIL=you@example.com
#   Z4J_BOOTSTRAP_ADMIN_PASSWORD=change-me`,
    installLang: "bash",
    containers: [
      { name: "z4j-brain", image: "z4jdev/z4j:latest", purpose: "One image. Bundles the FastAPI backend, the React dashboard, and the SQLite driver. Auto-generates secrets on first boot, persists them to the z4j_data volume, auto-runs migrations. Exposes port 7700." },
    ],
    requirements: [
      "Docker 20.10 or newer",
      "Port 7700 bound to localhost by default (reverse-proxy for public access)",
      "Persistent volume for SQLite database and persisted secrets",
    ],
    database: "SQLite, stored in the z4j_data named volume",
    whenToUse: [
      "First-time evaluation: clone the repo, docker compose up, done",
      "Internal tools for a team of 2 to 20 developers",
      "Homelab Docker Compose stacks (Synology, Unraid, TrueNAS)",
      "Customer demos and sales engineering POCs",
      "Single-instance production where ops simplicity wins over scale",
    ],
    whenNotToUse: [
      "You already run Postgres and want central backups",
      "You need brain-side horizontal scaling",
      "Dozens of simultaneous admins issuing bulk actions",
    ],
    features: [
      { label: "All 6 engines supported", enabled: true },
      { label: "All 3 framework adapters", enabled: true },
      { label: "Full dashboard UI", enabled: true },
      { label: "RBAC and audit log", enabled: true },
      { label: "HMAC wire protocol", enabled: true },
      { label: "Auto-migrations on boot", enabled: true },
      { label: "Auto-generated + persisted secrets", enabled: true },
      { label: "Horizontal brain replicas", enabled: false },
    ],
    scaleLimit: "Up to ~50 agents, ~5k events/minute, single container deployment",
    upgradePath: "Switch to docker-compose.postgres.yml when you outgrow SQLite. The same image binary auto-detects Postgres from Z4J_DATABASE_URL. Your settings, projects, and audit chain transfer.",
    docsHref: "https://z4j.dev/guides/docker/",
  },
  {
    slug: "z4j-postgres",
    icon: "database",
    badge: "Production",
    badgeColor: "warning",
    name: "z4j + Postgres",
    tagline: "Two services. Same image. Horizontal-scale ready.",
    headline: "The same Docker image pointed at PostgreSQL for central backups, partitioning, and horizontal replicas.",
    stack: [
      { name: "docker", label: "Docker image" },
      { name: "postgres", label: "PostgreSQL 17+" },
    ],
    installOneLiner: "docker compose -f docker-compose.postgres.yml up -d",
    audience: "Medium and larger businesses, regulated environments, compliance-sensitive teams",
    targetTiers: ["Small business", "Medium business", "Enterprise"],
    install: `# Two services. The z4j-brain image is the SAME one from the default
# compose file; it auto-switches to Postgres because Z4J_DATABASE_URL
# is set. No separate image, no custom build.

# Set your secrets in .env first:
#   POSTGRES_PASSWORD=<long random>
#   Z4J_SECRET=<openssl rand -hex 48>
#   Z4J_SESSION_SECRET=<openssl rand -hex 48>
#   Z4J_PUBLIC_URL=https://z4j.yourdomain.com
#   Z4J_ALLOWED_HOSTS=["z4j.yourdomain.com"]

docker compose -f docker-compose.postgres.yml up -d --build

# First-boot admin URL is in the brain logs.
docker compose -f docker-compose.postgres.yml logs -f z4j-brain`,
    installLang: "bash",
    containers: [
      { name: "z4j-brain", image: "z4jdev/z4j:latest", purpose: "Same image as the default. Bundles backend plus dashboard. Connects to external Postgres via Z4J_DATABASE_URL." },
      { name: "z4j-postgres", image: "postgres:18-trixie", purpose: "Your primary datastore. Holds events, tasks, schedules, users, HMAC-chained audit log, and partitioned event history." },
    ],
    requirements: [
      "Docker Compose v2+ or Kubernetes",
      "PostgreSQL 17 or newer (18+ recommended for 3x I/O improvements)",
      "Reverse proxy with TLS (Caddy, nginx, Traefik) or cloud load balancer",
      "Secrets management (env, Vault, Sealed Secrets, etc.)",
    ],
    database: "PostgreSQL 17+ (18.3+ recommended)",
    whenToUse: [
      "Self-hosted production deployments with audit requirements",
      "Central Postgres with point-in-time recovery already in place",
      "Teams with dedicated infrastructure or platform engineering",
      "Compliance regimes (SOC 2, HIPAA, ISO 27001) that require Postgres",
      "Kubernetes stacks with a Helm chart on the roadmap",
    ],
    whenNotToUse: [
      "You are evaluating. Start with the default compose, then migrate.",
      "Single-developer homelab where Postgres is overkill",
    ],
    features: [
      { label: "All 6 engines supported", enabled: true },
      { label: "All 3 framework adapters", enabled: true },
      { label: "Full dashboard UI", enabled: true },
      { label: "RBAC and audit log", enabled: true },
      { label: "HMAC wire protocol", enabled: true },
      { label: "Auto-migrations on boot", enabled: true },
      { label: "Horizontal brain replicas", enabled: true },
      { label: "Range partitioning on events", enabled: true },
      { label: "Full-text search (tsvector)", enabled: true },
      { label: "LISTEN/NOTIFY live updates", enabled: true },
    ],
    scaleLimit: "1000+ agents, 5000+ events/second, multiple brain replicas behind a load balancer",
    upgradePath: "In-place. Bump the z4jdev/z4j image tag. Migrations auto-run on boot.",
    docsHref: "https://z4j.dev/guides/self-hosting/",
  },
];

export function getDeployment(slug: string): DeploymentMeta | undefined {
  return DEPLOYMENTS.find((d) => d.slug === slug);
}
