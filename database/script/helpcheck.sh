echo -e '\033[0;32m'"---> Help check the docker service . . ."'\033[0m'
echo 

echo -e '\033[0;32m'"######################### docker images #########################"'\033[0m'
docker images
echo

echo -e '\033[0;32m'"######################### docker volume #########################"'\033[0m' 
docker volume ls
echo

echo -e '\033[0;32m'"######################### docker network #########################"'\033[0m'
docker network ls
echo

echo -e '\033[0;32m'"######################### docker all process #########################"'\033[0m' 
docker ps -a
echo
