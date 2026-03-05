/** @type {import('pm2').EcosystemConfig} */
module.exports = {
  apps: [
    {
      name: "joybormi",

      // Bun runs the start script
      script: "bun",
      args: "run start",

      cwd: "/home/joybormi/web",

      // IMPORTANT: prevent PM2 from guessing Node
      interpreter: "none",

      env: {
        NODE_ENV: "production",
        PORT: 4000,
      },

      // Stability
      autorestart: true,
      watch: false,
      max_restarts: 5,
      restart_delay: 2000,

      // Logs
      out_file: "/home/joybormi/web/.pm2/logs/joybormi-out.log",
      error_file: "/home/joybormi/web/.pm2/logs/joybormi-error.log",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss",
    },
  ],
}
