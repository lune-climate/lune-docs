---
sidebar_position: 12
sidebar_label: Transaction documents
hide_table_of_contents: true
---

import Snippet from '@site/src/components/Snippet'
import { ApiReferenceSection } from 'lune-ui-lib'
import Tip from '@site/src/components/Tip';

# Transaction documents

<div className="sections">

<ApiReferenceSection>
<div className="paragraphSections">

<div>

The transaction documents functionality allows you to provide data in multiple formats without any
prior knowledge of the data structure. Lune analyses this input, deduces the transactions, and
calculates the associated emissions.

This functionality is beneficial for cases where you have no concrete information regarding
transactions you want to estimate, but have several pieces of data that can help guide this
discovery such as receipts, invoices, and emails. By leveraging various data sources, the functionality
enables a more comprehensive understanding of your financial activities and their environmental
impact, even when dealing with fragmented or diverse information.

<Tip>

Note: This feature is in beta. Please verify results manually. Contact us to help improve its
accuracy for your specific needs.

</Tip>

</div>
</div>

<>

![Smart Scan](/img/smart-scan.png)

</>

</ApiReferenceSection>

<ApiReferenceSection>
<div className="paragraphSections">

<div>

## Input data

The transactionn documents functionality accepts data in two main formats:

1. **Structured transaction estimate data**

    - Similar to [Transaction estimates](/api-reference/emission-estimates/create-transaction-estimate)
    - Allows you to define known properties of the estimates
    - Guarantees these fields will be respected regardless of other input

2. **Unstructured data in text format**
    - Can contain any relevant information about the transactions
    - Lune parses this to extract relevant data
    - Combined with structured data to produce a final estimate
    - Examples: OCR data extracted from invoices, receipts, etc.

### How It Works

1. Lune analyzes both structured and unstructured data
2. Extracts relevant information from unstructured text
3. Combines this with any provided structured data
4. Produces a final emission estimate

### Example Use Case

-   **Transaction**: US dollar payment for cloud computing services
-   **Scenario**: Full transaction details are on an invoice, not known by the client
-   **Data**: Mindee was used to extract information from the invoice

This approach allows for accurate emission estimates even when complete transaction
details are not initially available to the client.

</div>
</div>

<div className="miniSections">

<Snippet
header="Sample request body"
language="json"
code={`{
  "unstructured_data": {
    "key_value": {
      "billTo": {
        "taxId": "98-7654321",
        "address": {
          "city": "Austin",
          "state": "TX",
          "street": "789 Corporate Blvd",
          "country": "USA",
          "zipCode": "78702"
        },
        "companyName": "Tech Solutions Inc"
      },
      "status": "approved",
      "totals": {
        "total": 3497.17,
        "subtotal": 3299.92,
        "taxTotal": 272.25,
        "shippingCost": 75,
        "discountAmount": 150
      },
      "vendor": {
        "id": "VEN-1234",
        "name": "Office Supply Pro",
        "taxId": "12-3456789",
        "address": {
          "city": "Austin",
          "state": "TX",
          "street": "456 Business Ave",
          "country": "USA",
          "zipCode": "78701"
        },
        "contactEmail": "billing@officesupplypro.com"
      },
      "dueDate": "2024-03-15",
      "currency": "USD",
      "metadata": {
        "projectCode": "OFFICE-UPGRADE-Q1",
        "departmentCode": "IT-EQUIP",
        "purchaseOrderNumber": "PO-2024-156"
      },
      "createdAt": "2024-02-15T09:30:45Z",
      "invoiceId": "INV-2024-0472",
      "lineItems": [
        {
          "itemId": "SKU-001",
          "taxRate": 0.0825,
          "quantity": 5,
          "subtotal": 1499.95,
          "taxAmount": 123.75,
          "unitPrice": 299.99,
          "description": "Ergonomic Office Chair"
        },
        {
          "itemId": "SKU-002",
          "taxRate": 0.0825,
          "quantity": 3,
          "subtotal": 1799.97,
          "taxAmount": 148.5,
          "unitPrice": 599.99,
          "description": "Standing Desk"
        }
      ],
      "auditTrail": [
        {
          "action": "created",
          "userId": "USER123",
          "timestamp": "2024-02-15T09:30:45Z"
        },
        {
          "action": "approved",
          "userId": "MANAGER456",
          "timestamp": "2024-02-15T14:22:33Z"
        }
      ],
      "paymentTerms": "NET30",
      "paymentInstructions": {
        "swift": "FNBNUS44",
        "bankName": "First National Bank",
        "accountHolder": "Office Supply Pro",
        "accountNumber": "XXXXX1234",
        "routingNumber": "074000010",
        "preferredMethod": "ACH"
      }
    }
  }
}`}/>

</div>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## The transaction document estimate

A transaction document estimate provides:

-   Overall transaction information:

    -   `mass`: Total emissions
    -   `quote`: Appropriate offset quote in Lune

-   Detailed item information:
    -   `line_items`: Contains at least one element with details of detected items

Currently, only `transaction` type estimates are available. Future updates will include
activity-based emissions (e.g., flights).

The endpoint accepts:

1. Structured transaction estimate data
2. Unstructured text data (e.g., OCR from invoices)

Lune analyzes both, extracting and combining information to produce the final estimate.

Note: Sample responses omits some fields for readability.

</div>
</div>

<div className="miniSections">

<Snippet
header="Sample emission response (only the relevant parts)"
language="json"
code={`{
  "mass": {
    "unit": "t",
    "amount": "1.118673"
  },
  "quote": {
    "bundles": [
      {
        "quantity": "1.062739",
        "bundle_id": "q9aKx7b6nNXMk3Yv3pD1mlW5Od2eLZE8",
        "unit_price": "6",
        "bundle_name": "Conserving forests in Asia",
        "offset_cost": "6.38",
        "gross_unit_price": "6.67",
        "insufficient_available_quantity": null
      },
      {
        "quantity": "0.055933",
        "bundle_id": "DVndoQ0PZjGMzvYOWY6kbgN1eOJx9B82",
        "unit_price": "350",
        "bundle_name": "Enhanced Rock Weathering",
        "offset_cost": "19.58",
        "gross_unit_price": "388.89",
        "insufficient_available_quantity": null
      }
    ],
    "currency": "USD",
    "requested_value": null,
    "estimated_quantity": "1.118672",
    "requested_quantity": "1.118673",
    "estimated_commission": "2.9",
    "estimated_total_cost": "28.85",
    "estimated_offset_cost": "25.95"
  },
  "line_items": [
    {
      "item": "Ergonomic Office Chair",
      "mass": {
        "unit": "t",
        "amount": "0.508483"
      },
      "type": "transaction",
      "value": {
        "value": "1499.95",
        "currency": "USD"
      },
      "category": "Office Furniture",
      "diet_factor": null,
      "country_code": "USA",
      "category_code": null,
      "exchange_rate": null,
      "emission_factor": {
        "id": "Wqxz5082wZGadpG1mQdyngjl9rP63V1v",
        "name": "Office furniture and custom architectural woodwork and millwork manufacturing",
        "region": "United States of America",
        "source": "epa",
        "category": "furniture",
        "created_at": "2024-07-24T14:00:22.902Z",
        "gas_emissions": {
          "co2": "0.305",
          "co2e": "0.339",
          "other": "0.009",
          "methane": "0.001",
          "nitrous_oxide": "0"
        },
        "numerator_unit": "kg",
        "source_version": "1.1.1",
        "denominator_unit": "USD",
        "publication_year": 2022
      },
      "search_term_match": null,
      "exchange_rate_date": null,
      "search_term_match_score": null,
      "semantic_matching_model": null
    },
    {
      "item": "Standing Desk",
      "mass": {
        "unit": "t",
        "amount": "0.61019"
      },
      "type": "transaction",
      "value": {
        "value": "1799.97",
        "currency": "USD"
      },
      "category": "Office Furniture",
      "diet_factor": null,
      "country_code": "USA",
      "category_code": null,
      "exchange_rate": null,
      "emission_factor": {
        "id": "Wqxz5082wZGadpG1mQdyngjl9rP63V1v",
        "name": "Office furniture and custom architectural woodwork and millwork manufacturing",
        "region": "United States of America",
        "source": "epa",
        "category": "furniture",
        "created_at": "2024-07-24T14:00:22.902Z",
        "gas_emissions": {
          "co2": "0.305",
          "co2e": "0.339",
          "other": "0.009",
          "methane": "0.001",
          "nitrous_oxide": "0"
        },
        "numerator_unit": "kg",
        "source_version": "1.1.1",
        "denominator_unit": "USD",
        "publication_year": 2022
      },
      "search_term_match": null,
      "exchange_rate_date": null,
      "search_term_match_score": null,
      "semantic_matching_model": null
    }
  ],
  "id": "JvWdBbNaDVokYzWzGnDpP9lZG6zwj7K1",
  "request": {
    "name": "Invoice for office supplies from Office Supply Pro to Tech Solutions Inc.",
    "unstructured_data": {
      "key_value": {
        "billTo": {
          "taxId": "98-7654321",
          "address": {
            "city": "Austin",
            "state": "TX",
            "street": "789 Corporate Blvd",
            "country": "USA",
            "zipCode": "78702"
          },
          "companyName": "Tech Solutions Inc"
        },
        "status": "approved",
        "totals": {
          "total": 3497.17,
          "subtotal": 3299.92,
          "taxTotal": 272.25,
          "shippingCost": 75,
          "discountAmount": 150
        },
        "vendor": {
          "id": "VEN-1234",
          "name": "Office Supply Pro",
          "taxId": "12-3456789",
          "address": {
            "city": "Austin",
            "state": "TX",
            "street": "456 Business Ave",
            "country": "USA",
            "zipCode": "78701"
          },
          "contactEmail": "billing@officesupplypro.com"
        },
        "dueDate": "2024-03-15",
        "currency": "USD",
        "metadata": {
          "projectCode": "OFFICE-UPGRADE-Q1",
          "departmentCode": "IT-EQUIP",
          "purchaseOrderNumber": "PO-2024-156"
        },
        "createdAt": "2024-02-15T09:30:45Z",
        "invoiceId": "INV-2024-0472",
        "lineItems": [
          {
            "itemId": "SKU-001",
            "taxRate": 0.0825,
            "quantity": 5,
            "subtotal": 1499.95,
            "taxAmount": 123.75,
            "unitPrice": 299.99,
            "description": "Ergonomic Office Chair"
          },
          {
            "itemId": "SKU-002",
            "taxRate": 0.0825,
            "quantity": 3,
            "subtotal": 1799.97,
            "taxAmount": 148.5,
            "unitPrice": 599.99,
            "description": "Standing Desk"
          }
        ],
        "auditTrail": [
          {
            "action": "created",
            "userId": "USER123",
            "timestamp": "2024-02-15T09:30:45Z"
          },
          {
            "action": "approved",
            "userId": "MANAGER456",
            "timestamp": "2024-02-15T14:22:33Z"
          }
        ],
        "paymentTerms": "NET30",
        "paymentInstructions": {
          "swift": "FNBNUS44",
          "bankName": "First National Bank",
          "accountHolder": "Office Supply Pro",
          "accountNumber": "XXXXX1234",
          "routingNumber": "074000010",
          "preferredMethod": "ACH"
        }
      }
    }
  },
  "metadata": {}
}
}`}/>

</div>

</ApiReferenceSection>

</div>
