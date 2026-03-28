FROM node:20-bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci
COPY frontend/ .
COPY data/ ./data/
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV DB_DIR=/app/data
ENV NEXT_BUILD_MODE=1
RUN npm run build
ENV HOSTNAME=0.0.0.0
EXPOSE 3000
CMD npx next start -H 0.0.0.0 -p ${PORT:-3000}
