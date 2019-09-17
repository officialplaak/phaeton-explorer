FROM node:8 AS builder

RUN useradd --create-home phaeton && \
    apt-get update && \
    apt-get install -y nasm && \
    npm install --global bower
# As of Mai 2018 cloud.docker.com runs docker 17.06.1-ce
# however v17.12 is required to use the chown flag
#COPY --chown=phaeton:phaeton . /home/phaeton/phaeton-explorer/
COPY . /home/phaeton/phaeton-explorer/
RUN chown phaeton:phaeton --recursive /home/phaeton/phaeton-explorer

USER phaeton
WORKDIR /home/phaeton/phaeton-explorer
RUN npm install && \
    npm run build


FROM node:8-alpine

RUN adduser -D phaeton 
#COPY --chown=phaeton:phaeton --from=builder /home/phaeton/phaeton-explorer /home/phaeton/phaeton-explorer/
COPY --from=builder /home/phaeton/phaeton-explorer /home/phaeton/phaeton-explorer/
RUN chown phaeton:phaeton --recursive /home/phaeton/phaeton-explorer

USER phaeton
WORKDIR /home/phaeton/phaeton-explorer
CMD ["node", "app.js"]
