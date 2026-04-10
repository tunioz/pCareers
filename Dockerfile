FROM node:20-bookworm-slim

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci

COPY frontend/ .

# Build with build mode (skips DB connection during build)
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV NEXT_BUILD_MODE=1
RUN npx next build

# Runtime: unset build mode so real PostgreSQL is used
# DATABASE_URL is injected by Railway at runtime
ENV NEXT_BUILD_MODE=
ENV HOSTNAME=0.0.0.0
EXPOSE 3000

CMD ["sh", "-c", "unset NEXT_BUILD_MODE && exec npx next start -H 0.0.0.0 -p ${PORT:-3000}"]
