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
    name: "Pip (SQLite)",
    tagline: "Pure Python. No container runtime required.",
    headline: "Install from PyPI. Runs as a single Python process with a local SQLite file. Two commands from zero to dashboard.",
    stack: [
      { name: "pypi", label: "PyPI package" },
      { name: "python", label: "Python 3.11+" },
      { name: "sqlite", label: "SQLite (local file)" },
    ],
    installOneLiner: "pip install z4j && z4j serve",
    audience: "Solo developers, homelab, local dev, bare-metal servers, CI",
    targetTiers: ["Homelab", "Solo developer"],
    install: `# Install the brain + umbrella (dashboard, backend, SQLite, all bundled)
pip install z4j

# Start it. First boot auto-mints HMAC secrets, runs migrations, and prints
# a one-time setup URL to stderr. Open the URL to create the first admin.
# z4j auto-detects the server's hostname, FQDN, and LAN IPs - so you can
# reach the dashboard via any of them out of the box.
z4j serve

# Then open http://<your-server>:7700 in your browser.

# Adding a public domain (e.g. tasks.example.com pointed via reverse proxy):
z4j allowed-hosts add tasks.example.com    # persisted to ~/.z4j/allowed-hosts
z4j allowed-hosts list                      # show what's whitelisted
z4j allowed-hosts remove old-host.example   # idempotent
# Restart z4j serve to pick up changes.

# Useful CLI commands (z4j and z4j-brain are aliases - same entry point):
z4j check               # config + DB + migrations at head
z4j status              # version, DB URL, user/project/agent counts
z4j createsuperuser     # provision an admin without the setup URL
z4j changepassword      # reset a user password
z4j migrate upgrade head    # run alembic migrations explicitly
z4j audit verify        # verify the HMAC-chained audit log
z4j reset-setup         # mint a fresh setup URL (e.g. expired token)`,
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
    name: "Docker (SQLite)",
    tagline: "One container. SQLite bundled in the image. No env vars required.",
    headline: "Single docker compose file. SQLite bundled, auto-mints secrets on first boot, auto-runs migrations. One command from clone to dashboard.",
    stack: [
      { name: "docker", label: "Docker image" },
      { name: "sqlite", label: "SQLite (bundled)" },
    ],
    installOneLiner: "docker compose up -d",
    audience: "Homelab, small teams, evaluation, proof-of-concept",
    targetTiers: ["Homelab", "Small team", "Evaluation"],
    install: `# The default. One file. SQLite bundled in the image.
git clone https://github.com/z4jdev/z4j.git && cd z4j
cp .env.example .env       # fill Z4J_SECRET + Z4J_SESSION_SECRET
docker compose up -d

# Tail logs for the first-boot admin setup URL.
docker compose logs -f z4j-brain

# Or skip interactive setup with bootstrap env vars in .env:
#   Z4J_BOOTSTRAP_ADMIN_EMAIL=you@example.com
#   Z4J_BOOTSTRAP_ADMIN_PASSWORD=<long random>

# Add Caddy auto-HTTPS on top:
docker compose -f docker-compose.yml -f docker-compose.caddy.yml up -d`,
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
    name: "Docker (Postgres)",
    tagline: "Same image, external Postgres. Horizontal-scale ready.",
    headline: "Two services: the z4j image + a Postgres sidecar. Central backups via pg_dump, range partitioning on events, horizontal brain replicas behind a load balancer.",
    stack: [
      { name: "docker", label: "Docker image" },
      { name: "postgres", label: "PostgreSQL 17+" },
    ],
    installOneLiner: "docker compose -f docker-compose.postgres.yml up -d",
    audience: "Medium and larger businesses, regulated environments, compliance-sensitive teams",
    targetTiers: ["Small business", "Medium business", "Enterprise"],
    install: `# Two services. Same z4jdev/z4j image as the default compose; it auto-
# switches to Postgres because Z4J_DATABASE_URL is set. No build required.

git clone https://github.com/z4jdev/z4j.git && cd z4j
cp .env.example .env

# Edit .env and fill in your secrets:
#   POSTGRES_PASSWORD=<long random>
#   Z4J_SECRET=$(openssl rand -hex 32)
#   Z4J_SESSION_SECRET=$(openssl rand -hex 32)
#   Z4J_PUBLIC_URL=https://z4j.yourdomain.com
#   Z4J_ALLOWED_HOSTS=z4j.yourdomain.com

docker compose -f docker-compose.postgres.yml up -d

# Capture the first-boot setup URL from the brain logs:
docker compose -f docker-compose.postgres.yml logs -f z4j-brain

# Or skip interactive setup entirely with bootstrap env vars in .env:
#   Z4J_BOOTSTRAP_ADMIN_EMAIL=you@example.com
#   Z4J_BOOTSTRAP_ADMIN_PASSWORD=<long random>

# Layer Caddy auto-HTTPS on top:
docker compose -f docker-compose.postgres.yml -f docker-compose.caddy.yml up -d`,
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
