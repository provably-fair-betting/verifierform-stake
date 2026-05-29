# Multi-stage build — builder runs pnpm build; runtime is Nginx Alpine serving
# the static output. All dependencies are public GitHub repositories, so no
# auth token is needed at build time.

# ── Builder ───────────────────────────────────────────────────────────────────
FROM node:20.20-alpine AS builder

RUN apk add --no-cache git && npm install -g pnpm@10.14.0

WORKDIR /app

# Copy lockfiles first so dependency install is cached independently of source
COPY package.json pnpm-lock.yaml .npmrc ./

# Rewrite SSH git URLs to HTTPS — repos are public so no token needed
RUN git config --global url."https://github.com/".insteadOf "git@github.com:"

RUN pnpm install --frozen-lockfile

COPY . .

# Disable sourcemaps in production image — saves significant space
ARG SOURCEMAP=false
ENV SOURCEMAP=${SOURCEMAP}

RUN pnpm build

# ── Runtime ───────────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runtime

# jq is used by entrypoint.sh to safely encode BET_LOOKUP_URL into config.json
RUN apk add --no-cache jq

COPY --from=builder /app/build /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
