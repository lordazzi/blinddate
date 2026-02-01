#bin/bash

cd ..;

echo "1. Creating .gitconfig"
echo "Github user name:"
read githubnome

echo "Github user e-mail:"
read githubemail

echo "With no spaces, write a label to ssh key:"
read sshnome

echo "2. Generating ssh keys"
mkdir .ssh
ssh-keygen -t ed25519 -C $sshnome -f ".ssh/id_ed25519"

echo "[user]
    email = $githubemail
    name = $githubnome

[core]
    editor = code --wait

[safe]
    directory = /blinddate" > .gitconfig

echo "now paste the content of .ssh/id_ed25519.pub into https://github.com/settings/ssh/new"
