set -e
cname=codeTattoo

export MSYS_NO_PATHCONV=1
starttime=$(date +%s)
CC_SRC_LANGUAGE="javascript"
CC_SRC_PATH="$(pwd)/chaincode/$cname/"
echo $CC_SRC_PATH

pushd /home/ubuntu/fabric-samples/test-network
./network.sh deployCC -ccn $cname -ccv 1 -cci initLedger -ccl ${CC_SRC_LANGUAGE} -ccp ${CC_SRC_PATH}
popd

cat <<EOF

$cname chaincode deploy Done!!
EOF