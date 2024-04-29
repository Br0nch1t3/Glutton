#!/bin/sh

curl -f http://builder:3002/health

if [ $? == 0 ]; then
    exit 0
fi

echo "Sending notification"
# send notification
exit 1
