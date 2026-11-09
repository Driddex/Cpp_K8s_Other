api="http://localhost"
if curl -s --head api | head -n 14 | grep "200" > /dev/null; then
    echo "200"
fi