FROM node:20.15.0-alpine AS base

ARG NEXT_PUBLIC_LIFF_ID=""
ARG NEXT_PUBLIC_TARGET_DATE=01-15-2025
ARG NODE_ENV=production
ARG NEXT_PUBLIC_BASE_URL

ENV NEXT_PUBLIC_LIFF_ID=${NEXT_PUBLIC_LIFF_ID}
ENV NEXT_PUBLIC_TARGET_DATE=${NEXT_PUBLIC_TARGET_DATE}
ENV NODE_ENV=${NODE_ENV}
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production=false

FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD [ "node", "server.js" ]
