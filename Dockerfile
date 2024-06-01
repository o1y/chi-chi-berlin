FROM debian:bookworm-slim

# This creates a Frankenstein image of Debian that includes an unoptimized version of Python 2.7.18, 
# Hugo 0.54.0, and Node.js 8.17.0. Python 2.7.18 is required to compile node-sass used by npm.
# This image is optimized for arm64 only.

WORKDIR /app

ENV PYTHON_VERSION=2.7.18

RUN rm -rf /etc/apt/sources.list.d/* && \
    echo "deb http://ftp2.de.debian.org/debian/ bookworm main" > /etc/apt/sources.list && \
    echo "deb http://ftp2.de.debian.org/debian/ bookworm-updates main" >> /etc/apt/sources.list && \
    echo "deb http://security.debian.org/debian-security bookworm-security main" >> /etc/apt/sources.list && \ 
    apt-get update && apt-get install -y --no-install-recommends \
    wget \
    ca-certificates \
    build-essential \
    zlib1g-dev \
    libncurses5-dev \
    libgdbm-dev \
    libnss3-dev \
    libssl-dev \
    libreadline-dev \
    libffi-dev \
    libsqlite3-dev \
    curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

RUN wget https://www.python.org/ftp/python/${PYTHON_VERSION}/Python-${PYTHON_VERSION}.tgz && \
    tar -xzf Python-${PYTHON_VERSION}.tgz && \
    cd Python-${PYTHON_VERSION} && \
    ./configure && \
    make -j$(nproc) && \
    make altinstall && \
    cd .. && \
    rm -rf Python-${PYTHON_VERSION} Python-${PYTHON_VERSION}.tgz

RUN ln -s /usr/local/bin/python2.7 /usr/bin/python

ENV HUGO_VERSION 0.54.0

RUN curl -LO https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_Linux-ARM64.tar.gz \
    && tar -xvf hugo_${HUGO_VERSION}_Linux-ARM64.tar.gz \
    && mv hugo /usr/bin/hugo \
    && rm hugo_${HUGO_VERSION}_Linux-ARM64.tar.gz

ENV NODE_VERSION 8.17.0
ENV NVM_DIR /usr/local/nvm

RUN mkdir $NVM_DIR && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

EXPOSE 3000

CMD npm install && npm run start
