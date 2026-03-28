FROM node:20-bookworm-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 1. Install dependencies
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci

# 2. Copy source code
COPY frontend/ .

# 3. Copy pre-seeded database
COPY data/ ./data/

# 4. Build Next.js (in-memory DB to avoid hang, timeout to force exit)
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV DB_DIR=/app/data
ENV NEXT_BUILD_MODE=1
RUN timeout 600 npx next build; echo "Build step done with exit $?"

# 5. Runtime config
ENV HOSTNAME=0.0.0.0
EXPOSE 3000

# 6. Start — unset NEXT_BUILD_MODE so real DB is used at runtime
CMD NEXT_BUILD_MODE= DB_DIR=/app/data npx next start -H 0.0.0.0 -p ${PORT:-3000}
