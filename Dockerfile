FROM public.ecr.aws/docker/library/node:20.12-alpine3.19 AS build
WORKDIR /app

ARG ENVIRONMENT="TEST"
ARG OTEL_SERVICE_NAME="dashboard-stg"

ENV ENVIRONMENT=${ENVIRONMENT} \
    OTEL_SERVICE_NAME=${OTEL_SERVICE_NAME}

COPY package*.json ./

RUN npm cache clean --force && npm install -D @swc/cli @swc/core && \
    npm ci && npm install

COPY . .

RUN npm run build 

FROM public.ecr.aws/docker/library/nginx:1.21-alpine AS runtime

WORKDIR /builddir

COPY --from=build /app/out /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]