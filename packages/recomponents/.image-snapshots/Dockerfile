FROM node:12.13.1-slim

# https://github.com/storybookjs/storybook/blob/master/scripts/workaround-puppeteer-issue-290.sh
# https://github.com/puppeteer/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-in-docker

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get update

RUN apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3
RUN apt-get install -yq libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4
RUN apt-get install -yq libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1
RUN apt-get install -yq libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6
RUN apt-get install -yq ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

RUN mkdir -p /home/pptruser/rebilly/rebilly-recomponents/packages/recomponents/node_modules \
    && mkdir -p /home/pptruser/rebilly/rebilly-recomponents/docs

WORKDIR /home/pptruser/rebilly/rebilly-recomponents/packages/recomponents

COPY /packages/recomponents/package.json /home/pptruser/rebilly/rebilly-recomponents/packages/recomponents/
COPY /packages/recomponents/yarn.lock /home/pptruser/rebilly/rebilly-recomponents/packages/recomponents/

RUN yarn install

COPY /packages/recomponents/ /home/pptruser/rebilly/rebilly-recomponents/packages/recomponents/

RUN cd /home/pptruser/rebilly/rebilly-recomponents/packages/recomponents/

CMD ["yarn",  "run", "test:image-snapshots"]
