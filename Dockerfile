FROM node:17.2.0

ENV PORT=8000
ENV SITE_URL=https://gatsbyjs.org

WORKDIR /app

COPY . ./

RUN yarn global add gatsby-cli && \
  gatsby telemetry --disable && \
  yarn install --production --frozen-lockfile

HEALTHCHECK \
  --interval=10s \
  --timeout=10s \
  --retries=10 \
  CMD curl \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{ "query": "query { site { port } }" }' \
    0.0.0.0:$PORT/___graphql

CMD ["sh", "-c", "gatsby develop --host 0.0.0.0 --port $PORT"]
