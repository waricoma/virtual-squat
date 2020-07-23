FROM node:12.18.2-alpine
ENV TZ=Asia/Tokyo

WORKDIR /work/

RUN apk update && \
    apk add git && \
    apk add --no-cache curl && \
    curl -o- -L https://yarnpkg.com/install.sh | sh
ENV PATH $HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH

COPY ./ /work/

RUN yarn install

RUN cd /work/express && yarn install

RUN cd /work/nuxt && yarn install

EXPOSE 3000
