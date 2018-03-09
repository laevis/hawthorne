#!/bin/sh
# this is adopted from the oh-my-zsh install script

dir=/hawthorne
interactive=1
utils=0

if which tput >/dev/null 2>&1; then
  ncolors=$(tput colors)
fi

if [ -t 1 ] && [ -n "$ncolors" ] && [ "$ncolors" -ge 8 ]; then
  RED="$(tput setaf 1)"
  GREEN="$(tput setaf 2)"
  YELLOW="$(tput setaf 3)"
  BLUE="$(tput setaf 4)"
  BOLD="$(tput bold)"
  NORMAL="$(tput sgr0)"
else
  RED=""
  GREEN=""
  YELLOW=""
  BLUE=""
  BOLD=""
  NORMAL=""
fi

set -e


cleanup() {
  # I AM THE CLEANUP CREW DO NOT MIND ME ^-^
  printf "${RED}Installation failed... Cleaning up${NORMAL}"
  rm -rf $dir
}
trap cleanup 1 2 3 6

usage() {
  echo "The hawthorne installation tool is an effort to make installation easier."
  echo ""
  echo "Parameters that are currently supported:"
  echo "\t${GREEN}-n${NORMAL}   --non-interactive (not recommended)"
  echo "\t${GREEN}-f${NORMAL}   --full"
  echo "\t${GREEN}-h${NORMAL}   --help"
  echo ""
}

select() {
  while [ "$1" != "" ]; do
    case $1 in
        -n | --non-interactive) interactive=0
                                ;;
        -f | --full)            utils=1
                                ;;
        -h | --help | help)     usage
                                exit
                                ;;
        * )                     usage
                                exit 1
    esac
    shift
  done
  main

}

main() {
  # Use colors, but only if connected to a terminal, and that terminal
  # supports them.
  if which tput >/dev/null 2>&1; then
    ncolors=$(tput colors)
  fi

  if [ -t 1 ] && [ -n "$ncolors" ] && [ "$ncolors" -ge 8 ]; then
    RED="$(tput setaf 1)"
    GREEN="$(tput setaf 2)"
    YELLOW="$(tput setaf 3)"
    BLUE="$(tput setaf 4)"
    BOLD="$(tput bold)"
    NORMAL="$(tput sgr0)"
  else
    RED=""
    GREEN=""
    YELLOW=""
    BLUE=""
    BOLD=""
    NORMAL=""
  fi

  # Only enable exit-on-error after the non-critical colorization stuff,
  # which may fail on systems lacking tput or terminfo
  set -e

  if ! [ $(id -u) = 0 ];
    then echo "Please run as ${RED}root${NORMAL}"
    exit 1
  fi

  export LC_ALL=C

  printf "${YELLOW}This is the automatic and guided installation. ${NORMAL}\n"

  if [ $utils -ne 1 ]; then
    printf "${RED}You still need to install a webserver of your choosing and provide a mysql server. ${NORMAL}\n\n"
  else
    printf "${RED}You chose the full installation, that installs nginx and mysql-server.${NORMAL}\n\n"
  fi

  printf "Everything will be configured by itelf.\n"
  printf "The configured installation path used will be ${GREEN}${dir}${NORMAL}\n"

  while true; do
    read -p "Do you want to define a custom path? ${GREEN}(y)${NORMAL}es or ${RED}(n)${NORMAL}o: " yn
    case $yn in
        [Yy]* ) read -p "Where should hawthorne be installed? " dir; break;;
        [Nn]* ) break;;
        * ) echo "Please answer with the answers provided.";;
    esac
  done

  umask g-w,o-w

  printf "${BLUE}Installing the package requirements...${NORMAL}\n"
  if hash apt >/dev/null 2>&1; then
    apt update
    apt install -y --force-yes --fix-missing python3 python3-dev python3-pip ruby ruby-dev redis-server libmysqlclient-dev libxml2-dev libxslt1-dev libssl-dev libffi-dev git supervisor mysql-client build-essential

    if [ $utils -eq 1 ]; then
      if [ $interactive -eq 0 ]; then
        debconf-set-selections | 'mysql-server mysql-server/root_password password root'
        debconf-set-selections | 'mysql-server mysql-server/root_password_again password root'
      fi
      apt install -y --force-yew --fix-missing mysql-server nginx
    fi

  elif hash yum >/dev/null 2>&1; then
    yum -y update
    yum -y install yum-utils wget
    yum-builddep python
    curl -O https://www.python.org/ftp/python/3.6.4/Python-3.6.4.tgz
    tar xf Python-3.6.4.tgz
    rm Python-3.6.4.tgz
    cd Python-3.6.4
    ./configure
    make
    make install
    cd ..
    rm -rf Python-3.6.4

    yum -y install epel-release
    yum -y update
    yum -y install redis
    systemctl start redis
    systemctl enable redis

    yum -y install mysql mysql-devel mysql-lib
    yum -y install libxml2-devel libffi-devel libxslt-devel openssl-devel
    yum -y install git supervisor
  else
    printf "Your package manager is currently not supported. Please contact the maintainer\n"
    printf "${BLUE}opensource@indietyp.com${NORMAL} or open an issure\n"
  fi

  # we need that toal path boi
  dir=$(python3 -c "import os; print(os.path.abspath(os.path.expanduser('$dir')))")


  hash git >/dev/null 2>&1 || {
    echo "Error: git is not installed"
    exit 1
  }

  printf "${BLUE}Cloning the project...${NORMAL}\n"
  env git clone https://github.com/indietyp/hawthorne $dir || {
    printf "${RED}Error:${NORMAL} git clone of hawthorne repo failed\n"
    exit 1
  }

  printf "${BLUE}Installing python3 dependencies...${NORMAL}\n"

  pip3 install cryptography || {
    printf "${BOLD}Too old pip3 version... upgrading${NORMAL}\n"
    python3 -c "$(curl -fsSL https://bootstrap.pypa.io/get-pip.py)"
  }

  pip3 install gunicorn
  pip3 install -r $dir/requirements.txt

  printf "${BLUE}Installing ruby and npm dependencies...${NORMAL}\n"
  curl -sL deb.nodesource.com/setup_8.x | sudo -E bash -
  apt install -y nodejs
  npm install -g pug coffeescript
  gem install sass --no-user-install

  printf "${BLUE}Configuring the project...${NORMAL}\n"
  cp $dir/panel/local.default.py $dir/panel/local.py
  cp $dir/supervisor.default.conf $dir/supervisor.conf
  mkdir -p /var/log/hawthorne

  printf "\n\n${YELLOW}Database configuration:${NORMAL}\n"
  while true; do
    if [ $interactive -eq 1 ]; then
      read -p 'Host     (default: localhost):  ' dbhost
      read -p 'Port     (default: 3306):       ' dbport
      read -p 'User     (default: root):       ' dbuser
      read -p 'Database (default: hawthorne):  ' dbname
      read -p 'Password:                       ' dbpwd
    fi

    dbhost=${dbhost:-localhost}
    dbport=${dbport:-3306}
    dbuser=${dbuser:-root}
    dbname=${dbname:-hawthorne}

    if [ $interactive -eq 0 ]; then
      dbpwd=root
    fi

    export MYSQL_PWD=$dbpwd
    export MYSQL_HOST=$dbhost
    export MYSQL_TCP_PORT=$dbport

    if mysql -u $dbuser -e "CREATE DATABASE IF NOT EXISTS $dbname"; then
      printf "\n${GREEN}successfully connected to mysql and created the database.${NORMAL}\n"
      break;
    else
      printf "\n${YELLOW}I could not connected to mysql with the credentials you provided, try again.${NORMAL}\n"
    fi
  done

  printf "\n\n${YELLOW}SteamAPI configuration:${NORMAL}\n"
  if [ $interactive -eq 1 ]; then
    read -p 'Steam API Key: ' stapi
  fi

  printf "\n\n${GREEN}Just doing some file transmutation magic:${NORMAL}\n"
  # replace the stuff in the local.py and supervisor.conf file
  sed -i "s/'HOST': 'localhost'/'HOST': '$dbhost'/g" $dir/panel/local.py
  sed -i "s/'PORT': 'root'/'PORT': '$dbport'/g" $dir/panel/local.py
  sed -i "s/'NAME': 'hawthorne'/'NAME': '$dbname'/g" $dir/panel/local.py
  sed -i "s/'USER': 'root'/'USER': '$dbuser'/g" $dir/panel/local.py
  sed -i "s/'PASSWORD': ''/'PASSWORD': '$dbpwd'/g" $dir/panel/local.py

  if [ $interactive -eq 1 ]; then
    sed -i "s/SOCIAL_AUTH_STEAM_API_KEY = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'/SOCIAL_AUTH_STEAM_API_KEY = '$stapi'/g" $dir/panel/local.py
  fi

  sed -i "s#directory=<replace>#directory=$dir#g" $dir/supervisor.conf
  printf "${BLUE}Executing project setupcommands...${NORMAL}\n"
  sed -i "s/SECRET_KEY = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'/SECRET_KEY = '$(python3 $dir/manage.py generatesecret | tail -1)'/g" $dir/panel/local.py

  python3 $dir/manage.py migrate

  if [ $interactive -eq 1 ]; then
    python3 $dir/manage.py superusersteam
  fi

  python3 $dir/manage.py compilestatic
  python3 $dir/manage.py collectstatic --noinput

  printf "${BLUE}Linking to supervisor...${NORMAL}\n"
  ln -sr $dir/supervisor.conf /etc/supervisor/conf.d/hawthorne.conf
  supervisorctl reread
  supervisorctl update
  supervisorctl restart hawthorne
  printf "Started the unix socket at: ${YELLOW}/tmp/hawthorne.sock${NORMAL}\n"

  printf "${BLUE}Linking the hawthorne command line tool...${NORMAL}\n"
  ln -s $dir/tools/toolchain.sh /usr/bin/hawthorne
  ln -s $dir/tools/toolchain.sh /usr/bin/ht
  chmod +x /usr/bin/hawthorne
  chmod +x /usr/bin/ht

  # still need to paste example nginx config

  printf "\n\n${GREEN}You did it (Well rather I did). Everything seems to be installed.${NORMAL}\n"
  printf "Please look over the $dir/${RED}panel/local.py${NORMAL} to see if you want to configure anything. And restart the supervisor with ${YELLOW}supervisorctl restart hawthorne${NORMAL}\n"
  printf "To configure your webserver please refer to the project wiki: ${YELLOW}https://github.com/indietyp/hawthorne/wiki/Webserver-Configuration${NORMAL}\n"

  if [ $interactive -eq 0 ]; then
    printf "PLEASE RUN ${YELLOW}$dir/manage.py superusersteam${NORMAL}\n"
    printf "INSERT YOUR DEVKEY IN ${YELLOW}$dir/${RED}panel/local.py${NORMAL}\n"
  fi

}

select
