#!/usr/bin/env bash
# Marr Learning Hub: update the live app from GitHub.
#   Run on the droplet:  bash /opt/learning/deploy/update-from-git.sh
# Keeps .env and data/ (git-ignored). No `set -e`, safe to paste.
APP=learning
DIR=/opt/learning
cd "$DIR" || { echo "UPDATE FAILED: $DIR not found"; exit 1; }
STAMP=$(date +%Y%m%d-%H%M%S)
tar -czf "/root/learning-data-backup-$STAMP.tar.gz" -C "$DIR" data .env 2>/dev/null && echo "Backed up data to /root/learning-data-backup-$STAMP.tar.gz"
git config --global --add safe.directory "$DIR" 2>/dev/null
OLD=$(git rev-parse --short HEAD 2>/dev/null)
if ! git fetch origin main; then echo "UPDATE FAILED: couldn't reach GitHub (check the deploy key)"; exit 1; fi
git reset --hard origin/main
NEW=$(git rev-parse --short HEAD)
echo "Code: $OLD -> $NEW"
if ! npm ci --omit=dev --no-audit --no-fund; then echo "UPDATE FAILED: npm ci failed"; exit 1; fi
chown -R $APP:$APP "$DIR"; chmod 600 "$DIR/.env"
systemctl restart $APP
for i in $(seq 1 40); do curl -sf -o /dev/null http://127.0.0.1:3119/learning/healthz && break; sleep 0.5; done
if curl -sf -o /dev/null http://127.0.0.1:3119/learning/healthz; then
  echo "UPDATE OK ($NEW)"
else
  echo "UPDATE FAILED: app didn't come back. See: journalctl -u $APP -n 50"
  echo "Roll back with: cd $DIR && git reset --hard $OLD && npm ci --omit=dev && chown -R $APP:$APP $DIR && systemctl restart $APP"
fi
