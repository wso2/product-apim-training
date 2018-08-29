#!/bin/sh

# resolve links - $0 may be a softlink
PRG="$0"

while [ -h "$PRG" ]; do
    ls=`ls -ld "$PRG"`
    link=`expr "$ls" : '.*-> \(.*\)$'`
    if expr "$link" : '.*/.*' > /dev/null; then
        PRG="$link"
    else
        PRG=`dirname "$PRG"`/"$link"
    fi
done

# Get standard environment variables
PRGDIR=`dirname "$PRG"`
PRG_HOME=`cd "$PRGDIR/.." ; pwd`

cd $PRG_HOME/project/Back-End/
echo "Deploying services..."
$PRG_HOME/bin/ballerina run DeployServices > /dev/null &

echo "Starting Web Server..."
cd $PRG_HOME/project/Front-End/
$PRG_HOME/bin/ballerina run host > /dev/null &
echo "Services started successfully."

# Exit all child processes when CTRL+C or script process is killed
trap "exit" INT TERM
trap "kill 0" EXIT

wait
