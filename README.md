# PureSight Demo

This repository provides the **PureSight Demo**, a showcase e-commerce experience built on **StreamX**, designed to demonstrate the platform’s capabilities in real-world scenarios.

Unlike the base accelerator, this project comes with **PureSight branding** and **pre-integrated data sources**, enabling a richer, production-like demonstration environment out of the box.

---

# Overview

PureSight Demo demonstrates how StreamX enables:

* **Multi-source content orchestration**
* **Dynamic data aggregation from multiple systems**
* **Composable, microservices-based frontend architecture**

The project is preconfigured to work with:

* **AEM (Adobe Experience Manager)**
* **EDS (Edge Delivery Services)**

This allows you to explore how content and commerce data can be unified into a single experience.

---

# Key Capabilities

## Multi-Source Data Aggregation

PureSight Demo highlights StreamX’s ability to:

* Ingest data from **multiple independent sources**
* Aggregate and unify content into a single model
* Resolve conflicts and combine data dynamically

---

## Dynamic Commerce & Content Pages

The demo provides out-of-the-box support for:

* **Product Detail Pages (PDP)** — dynamically generated from aggregated data
* **Product Category Pages (PCP)** — powered by multiple content sources
* **Product Listings** — enriched with external data
* **Static / CMS pages** — delivered from systems like AEM

All pages are generated dynamically based on ingested and merged data.

---

## Search & Discovery

Built-in search capabilities include:

* Indexing across **multiple data sources**
* Full-text search
* **Faceted filtering** for product exploration
* Unified search experience across content and commerce

---

## Dynamic Sitemap Generation

The platform automatically generates:

* **Sitemaps aggregated from multiple sources**
* URLs for products, categories, and content pages
* A unified structure regardless of origin system

---

# Architecture Overview

```
AEM / EDS / Other Sources
          │
          │ (Cloud Events)
          ▼
     StreamX Ingestion
          │
          ├── Data Aggregation Layer
          ├── Unified Storage
          ├── Search Index
          └── Delivery Services
                  │
                  ▼
          PureSight Frontend
```

---

# Purpose

This project serves as a **demonstration of StreamX platform capabilities**, focusing on:

* Multi-source integration
* Data aggregation and composition
* Dynamic content generation
* Unified search and discovery
* Scalable, composable architecture

---

# Result

With PureSight Demo, you can quickly explore how StreamX enables building **modern, composable digital experiences** powered by multiple systems — without heavy custom integration work.

It is designed to **demonstrate possibilities**, accelerate understanding, and serve as a foundation for further customization.