SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
pushd "${SCRIPT_DIR}/../" || exit

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <key> <price>"
  exit 1
fi

PRODUCT_KEY=$1
NEW_PRICE=$2
CONTENT="{\"price\":{\"value\":\"$NEW_PRICE\",\"discountedValue\":\"$NEW_PRICE\"}}"
BASE64_ENCODED_CONTENT=$(printf $CONTENT | base64)
EVENT_ID=$(od -An -N4 -tu4 /dev/urandom | tr -d ' ')

TEMP_STREAM_FILE=$(mktemp)
cat <<EOF > "$TEMP_STREAM_FILE"
{
  "specversion": "1.0",
  "id" : "$EVENT_ID",
  "source" : "demo-puresight-starter",
  "type" : "com.streamx.blueprints.data.published.v1",
  "datacontenttype" : "application/json",
  "subject": "price:${PRODUCT_KEY}",
  "time" : "2026-01-01T00:00:00.000000Z",
  "data": {
    "content": "$BASE64_ENCODED_CONTENT",
    "type": "data/price"
  }
}
EOF

export streamx publish stream "$TEMP_STREAM_FILE"

rm -f "$TEMP_STREAM_FILE"

popd || exit
