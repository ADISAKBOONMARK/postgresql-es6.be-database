echo -e '\033[0;32m'"---> Start the service . . ."'\033[0m'
echo

echo -e '\033[0;32m'"######################### create network #########################"'\033[0m'
docker network create postgresql-network
echo

echo -e '\033[0;32m'"######################### start process #########################"'\033[0m'
docker-compose -f ../docker-compose.yml up -d
echo

./helpcheck.sh