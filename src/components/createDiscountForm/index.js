/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "@shopify/polaris/build/esm/styles.css";
import {
  BlockStack,
  Button,
  Card,
  FormLayout,
  Page,
  Text,
  TextField,
  Form,
  Grid,
} from "@shopify/polaris";
import { CirclePlusMinor } from "@shopify/polaris-icons";
import DiscountRuleItem from "./discountRuleItem";
import PreviewList from "./previewList";

export default function CreateDiscountForm() {
  const [campaign, setCampaign] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [itemError, setItemError] = useState("");

  const [listRules, setListRule] = useState([
    {
      title: "Single",
      subtitle: "Standard price",
      label: "",
      quantity: 1,
      discountType: "None",
      amount: 0,
    },
    {
      title: "Duo",
      subtitle: "Save 10%",
      label: "",
      quantity: 1,
      discountType: "% discount",
      amount: 10,
    },
  ]);

  const validateGeneralForm = () => {
    if (!campaign) {
      setError("Field is required.");
      return false;
    }
    return true;
  };

  const validateListRuleForm = (rule) => {
    if (!rule.title || !rule.quantity) {
      setItemError("Field is required");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateGeneralForm()) {
      alert("General form is valid");
    }

    const isListRuleFormValid = listRules.every((rule) =>
      validateListRuleForm(rule)
    );

    if (isListRuleFormValid) {
      alert("All discount rule forms are valid");
    }
  };

  const handleCampaignChange = (value) => {
    setCampaign(value);
    setError("");
  };

  const handleTitleChange = (value) => {
    setTitle(value);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const getRowData = () => {
    return listRules.map((x) => {
      return Object.values(x);
    });
  };

  const handleUpdateListRule = (oldData, newData) => {
    setListRule((prevListRules) => {
      const updatedListRules = [...prevListRules];
      const index = updatedListRules.findIndex((rule) => rule === oldData);
      if (index !== -1) {
        updatedListRules[index] = newData;
      }
      return updatedListRules;
    });
  };

  useEffect(() => {
    if (listRules?.length === 0) {
      addRule();
    }
  }, [listRules]);

  const addRule = () => {
    const lastItem = listRules[listRules.length - 1];

    const newItem = {
      title: "",
      subtitle: "",
      label: "",
      quantity: lastItem ? lastItem.quantity + 1 : 1,
      discountType: "None",
      amount: "",
    };

    setListRule((prevListRules) => [...prevListRules, newItem]);
  };

  const deleteRule = (index) => {
    const updatedListRules = [...listRules];

    updatedListRules.splice(index, 1);

    setListRule(updatedListRules);
  };
  return (
    <div>
      <Page
        title="Create volume discount"
        primaryAction={{
          content: "Save",
          onAction: () => handleSubmit(),
        }}
      >
        <Grid columns={2}>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
            <Form>
              <FormLayout>
                <Card roundedAbove="sm">
                  <BlockStack gap={400}>
                    <Text alignment="start" as="h1" variant="headingSm">
                      General
                    </Text>
                    <TextField
                      label="Campaign"
                      value={campaign}
                      onChange={handleCampaignChange}
                      autoComplete="off"
                      placeholder="Volume discount #2"
                      error={error}
                    />
                    <TextField
                      label="Title"
                      value={title}
                      onChange={handleTitleChange}
                      autoComplete="off"
                      placeholder="Buy more and save"
                    />
                    <TextField
                      label="Description"
                      value={description}
                      onChange={handleDescriptionChange}
                      autoComplete="off"
                      placeholder="Apply for all products in store"
                    />
                  </BlockStack>
                </Card>
                {listRules?.map((x, index) => (
                  <div key={index}>
                    <DiscountRuleItem
                      data={x}
                      count={index + 1}
                      onUpdate={(oldData, newData) =>
                        handleUpdateListRule(oldData, newData)
                      }
                      itemError={itemError}
                      deleteRule={deleteRule}
                    ></DiscountRuleItem>
                  </div>
                ))}

                <Button
                  fullWidth
                  icon={CirclePlusMinor}
                  variant="primary"
                  tone="critical"
                  onClick={() => {
                    addRule();
                  }}
                >
                  Add option
                </Button>
              </FormLayout>
            </Form>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
            <PreviewList rows={getRowData() ?? []} />
          </Grid.Cell>
        </Grid>
      </Page>
    </div>
  );
}
