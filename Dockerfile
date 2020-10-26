# Start from a base image which includes Deno (https://github.com/hayd/deno-docker)
FROM hayd/alpine-deno:1.4.6

# Create and move into /bot directory
WORKDIR /bot

# Use user deno so the bot isn't running as root
USER deno

# Copy and cache all of the dependencies so they don't need to be downloaded every run
COPY deps.ts .
RUN deno cache deps.ts

# Copy all the rest of the files and type check them so they don't need to be checked every run
ADD . .
RUN deno cache mod.ts

RUN deno install --allow-read --allow-run --allow-write --allow-net -f --unstable https://deno.land/x/denon@v2.2.0/denon.ts

# Finally run the bot
CMD ["denon", "start"]
