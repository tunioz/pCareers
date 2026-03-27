FROM node:20-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts && npx --yes node-pre-gyp install --directory=node_modules/better-sqlite3 --target_arch=x64 --target_platform=linux 2>/dev/null || npm rebuild better-sqlite3

COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN mkdir -p /app/data && npm run build

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV DB_DIR="/app/data"

CMD ["npm", "run", "start"]
