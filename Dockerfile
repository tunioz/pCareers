FROM node:20-bookworm-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci

COPY frontend/ .
COPY data/ ./data/

# Build with in-memory DB
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV NEXT_BUILD_MODE=1
ENV DB_DIR=/app/data
RUN timeout 600 npx next build; echo "Build exit: $?"

# UNSET build mode for runtime so real DB is used
ENV NEXT_BUILD_MODE=
ENV HOSTNAME=0.0.0.0
EXPOSE 3000

CMD ["sh", "-c", "unset NEXT_BUILD_MODE && exec npx next start -H 0.0.0.0 -p ${PORT:-3000}"]
