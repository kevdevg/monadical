#!/bin/sh
while ! python manage.py flush --no-input 2>&1; do
  sleep 3
done

while ! python manage.py migrate  2>&1; do
  sleep 3
done

exec "$@"