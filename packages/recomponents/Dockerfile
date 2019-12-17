FROM node:12.13.1-slim

RUN mkdir -p /usr/src/rebilly/rebilly-recomponents/packages/recomponents
RUN mkdir -p /usr/src/rebilly/rebilly-recomponents/docs

WORKDIR /usr/src/rebilly/rebilly-recomponents/packages/recomponents

# https://github.com/storybookjs/storybook/blob/master/scripts/workaround-puppeteer-issue-290.sh
# https://github.com/puppeteer/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-in-docker
RUN apt-get update
RUN apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
  libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
  libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
  libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
  ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

#RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
#    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
#    && apt-get update \
#    && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf \
#      --no-install-recommends \
#    && rm -rf /var/lib/apt/lists/*

#RUN yarn add puppeteer
#RUN npm i puppeteer \
#    && groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
#    && mkdir -p /home/pptruser/Downloads \
#    && chown -R pptruser:pptruser /home/pptruser \
#    && chown -R pptruser:pptruser /node_modules

#USER pptruser

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

CMD ["yarn",  "run", "test"]
