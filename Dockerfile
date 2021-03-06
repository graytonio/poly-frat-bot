# Start from a base image which includes Deno (https://github.com/hayd/deno-docker)
FROM hayd/alpine-deno:1.4.6

# Create and move into /bot directory
WORKDIR /bot

# Use user deno so the bot isn't running as root
USER deno

# Copy and cache all of the dependencies so they don't need to be downloaded every run
COPY deps.ts .
RUN deno --unstable cache deps.ts

# # Copy all the rest of the files and type check them so they don't need to be checked every run
ADD . .

# Finally run the bot
CMD ["run" "--allow-net" "--allow-write" "--allow-read" "--allow-env" "--allow-plugin" "--no-check" "--unstable" "--config" "tsconfig.json" "mod.ts"]