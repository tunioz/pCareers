FROM node:20-bookworm-slim AS builder

RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci
COPY frontend/ .
RUN mkdir -p ./data
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV DB_DIR=/app/data
RUN npm run build

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["npm", "run", "start"]
