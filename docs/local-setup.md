# Local Setup

As a prerequisite, ensure that you have StreamX CLI installed in latest preview version:
  ```shell
  brew upgrade streamx-com/tap/streamx
  brew install streamx-com/tap/streamx
  ```

1. **Start StreamX**

   Before proceeding, first configure the [OpenSearch Secrets](#opensearch-secrets).

   Run the StreamX instance
      ```bash
      streamx local run -f ../mesh/mesh.yaml
      ```
   > **Note:** For local development you can also use mesh-light.yaml which comes with the basic
   functionality only that allows to run on limited resources.

2. **Setup ingestion token**
   Run command print ingestion token that needs to be set for streamx command ```streamx settings set streamx.ingestion.auth-token THE_VALUE_FROM run command```
3. **Publish All Resources**

   Use the `publish-all` script to deploy all necessary data to StreamX:
      ```bash
      ../scripts/publish-all.sh
      ```

3. **Launch the web application**

   Verify the application is available and functional:

    * Homepage: http://edge.127.0.0.1.nip.io/homepage.html
    * Furniture category products with filtering: http://edge.127.0.0.1.nip.io/categories/furniture.html
    * Sample Product page: http://edge.127.0.0.1.nip.io/products/rivet-bristol-natural-edge-black-metal-side-table-walnut-b072zlcb3m.html
    * Blog page: http://edge.127.0.0.1.nip.io/blog.html
    * Sitemap: http://edge.127.0.0.1.nip.io/sitemap.xml
    * Search: http://edge.127.0.0.1.nip.io/search/query?query=table


## OpenSearch secrets

The provided [mesh.yaml](../mesh/mesh.yaml) file defines the OpenSearch service.
This service requires sensitive credentials: the **admin username** and the initial **admin password**.
You may choose **any strong password** for the initial admin account.

To supply these credentials, create the following two files:

* `mesh/secrets/plaintext/opensearch-sink.properties` with content:

```properties
quarkus.elasticsearch.username=admin
quarkus.elasticsearch.password=your-password-here
```

* `mesh/secrets/plaintext/opensearch-sink-opensearch.properties` with content:

```properties
OPENSEARCH_INITIAL_ADMIN_PASSWORD=your-password-here
```

Note: the password value in both files must be identical, as they refer to the same OpenSearch admin account.

---

### 🔐 Important note about secrets handling

The `plaintext` directory is intended **only for local development purposes**.
It is used to store unencrypted secrets because local environments typically do not have access to the encryption keys required for secure secret management.

For cloud environments, secrets **must not be stored in plaintext**.

Instead:

* use the `encrypted` directory for production / cloud usage
* all values in `encrypted` files must be encoded using the official encryption tool available in the Cloud Console
* only encrypted secrets are deployed and consumed in cloud environments

This ensures that sensitive credentials are never exposed in source control or local configuration when running in production-like environments.
