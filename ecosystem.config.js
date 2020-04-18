module.exports = {
    apps: [{
        name: 'solo',
        script: 'npm',

        // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
        args: 'run serve',
        min_uptime: 30000,
        max_restarts: 3,
        instances: 1,
        autorestart: true,
        watch: false,
        env: {
            PORT: 80,
            API_SERVER_URL: '101.132.121.111',
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production'
        }
    }],

    deploy: {
        production: {
            user: 'root',
            host: [
                '101.132.121.111'
            ],
            port: '22',
            ref: 'origin/dev',
            repo: 'git@github.com:chaosBreaking/solo.git',
            path: '/var/www/solo',
            'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production'
        }
    }
};
