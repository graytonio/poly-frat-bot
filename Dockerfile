# Start from a base image which includes Deno (https://github.com/hayd/deno-docker)
FROM hayd/alpine-deno:latest

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

RUN deno install -qAf --unstable https://deno.land/x/denon@2.4.4/denon.ts

# Finally run the bot
CMD ["denon", "start"]
