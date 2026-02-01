FROM mobiledevops/android-sdk-image
USER root

RUN apt update && \
    apt install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt install -y nodejs && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*

RUN npm install -g typescript @angular/cli cordova

EXPOSE 9229
EXPOSE 4200

WORKDIR /blinddate

EXPOSE 4199

CMD [ "/bin/bash" ]
