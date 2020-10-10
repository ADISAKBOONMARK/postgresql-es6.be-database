echo -e '\033[0;32m'"---> Down the service . . ."'\033[0m'
echo

echo -e '\033[0;32m'"######################### stop process #########################"'\033[0m'
docker stop $(docker ps -aq)
echo

echo -e '\033[0;32m'"######################### container prune #########################"'\033[0m'
docker container prune -f
echo

echo -e '\033[0;32m'"######################### network prune #########################"'\033[0m'
docker network prune -f
echo

echo -e '\033[0;32m'"######################### volume prune #########################"'\033[0m'
docker volume prune -f
echo

./helpcheck.sh