#!/bin/bash  
# Purpose of this script is to clean phaeton database and load a snapshot to it

if [ -z "$1" ]
  then
    echo "One required argument missing: path to folder with plkx core app.js"
    exit 1
fi

if [ ! -f blockchain_explorer.db.gz ]; then
  wget https://downloads.phaeton.io/phaeton-explorer/dev/blockchain_explorer.db.gz
fi

pwd=`pwd`
cp ./test/known.test.json ./known.json
cp test/data/config.json $1/config.json
cd $1
pm2 stop phaeton-core
dropdb phaeton_test
createdb phaeton_test
gunzip -fcq "$pwd/blockchain_explorer.db.gz" | psql -d phaeton_test
cp test/data/genesis_block.json ./
pm2 start app.js --name=phaeton-core
sleep 5
cd -
