result=$(node ./src/form.js "$1")

if [[ $result != 'SUCCESS' ]]; then
  echo "Something went wrong, try again!"
  exit 1
fi

open -a Brave\ Browser ./public/index.html
