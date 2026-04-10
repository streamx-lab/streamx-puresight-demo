SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
pushd "${SCRIPT_DIR}/../" || exit

streamx publish events data
streamx publish stream data/catalog/categories.stream
streamx publish stream data/catalog/products.stream

popd || exit