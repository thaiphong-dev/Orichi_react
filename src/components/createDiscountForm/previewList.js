import { BlockStack, Card, DataTable, Text } from "@shopify/polaris";
import React from "react";

export default function PreviewList(props) {
  const { rows } = props;
  const headers = [
    "Title",
    "Subtitle",
    "Label",
    "Quantity",
    "Discount Type",
    "Amount",
  ];
  return (
    <Card roundedAbove="sm">
      <BlockStack gap={400}>
        <Text alignment="start" as="h1" variant="headingSm">
          Preview
        </Text>
        <Text alignment="center" as="h1" variant="headingSm">
          Buy more and save
        </Text>
        <Text alignment="start" as="h1">
          Apply for all products in store
        </Text>
        <div style={{ margin: "20px" }}>
          <DataTable
            columnContentTypes={[
              "text",
              "text",
              "text",
              "numeric",
              "text",
              "text",
            ]}
            headings={headers}
            rows={rows}
            hideScrollIndicator
          />
        </div>
      </BlockStack>
    </Card>
  );
}
