FROM denoland/deno:alpine
EXPOSE 8000
WORKDIR /app
ADD . /app

# Add dependencies to the container's Deno cache
RUN deno cache main.ts
CMD ["task", "preview"]
