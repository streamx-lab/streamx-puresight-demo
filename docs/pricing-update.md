# Changing Product Price

This guide explains how to update a product price using **StreamX CLI** in the PureSight Demo project.

---

## Prerequisites

Before running any ingestion scripts, you must configure your **ingestion authentication token**.

Run the following command:

```bash
streamx settings set streamx.ingestion.auth-token <value>
```

Replace `<value>` with your valid ingestion token.

---

## Updating the Price

Once the token is set, you can use the provided script to update a product’s price.

```bash
../scripts/publish-price.sh B072ZLCB3M 123
```

### Parameters:

* `B072ZLCB3M` — Product ID (SKU)
* `123` — New price value

---

## Verification

After running the script:

1. Open the product page in your browser:

   http://edge.127.0.0.1.nip.io/products/rivet-bristol-natural-edge-black-metal-side-table-walnut-b072zlcb3m.html

2. Verify that the displayed price has been updated to:

```
123
```

---

## Notes

* Changes are propagated through StreamX ingestion and should be visible shortly after publishing.
* If the price does not update:

    * Ensure the ingestion token is correctly set
    * Verify the script executed without errors
