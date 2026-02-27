module.exports = {
  apps: [
    {
      name: "dun-dairy-backend",
      script: "./dist/server.js",
      cwd: "/root/dun-dairy-backend",
      instances: "max",       // fork 1 process ต่อ CPU core
      exec_mode: "cluster",   // PM2 cluster mode (แทน manual cluster)
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
      env: {
        NODE_ENV: "production",
        HOST: "::",
        PORT: 80,
      },
      env_development: {
        NODE_ENV: "development",
        HOST: "::",
        PORT: 80,
      },
    },
  ],
};