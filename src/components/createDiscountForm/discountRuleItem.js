import React, { useEffect, useState } from "react";
import "@shopify/polaris/build/esm/styles.css";
import {
  BlockStack,
  Button,
  Card,
  FormLayout,
  Text,
  TextField,
  Box,
  Divider,
  Select,
  InlineGrid,
} from "@shopify/polaris";
import { DeleteMajor } from "@shopify/polaris-icons";

export default function DiscountRuleItem(props) {
  const { data, count, onUpdate, deleteRule, itemError } = props;

  const [dataForm, setDataForm] = useState({
    title: "",
    subtitle: "",
    label: "",
    quantity: "",
    discountType: "",
    amount: "",
  });
  useEffect(() => {
    setDataForm(data);
  }, [data]);

  const [error, setError] = useState({
    title: false,
    quantity: false,
    amount: false,
  });

  const handleInputChange = (key, value) => {
    setDataForm((prevData) => ({ ...prevData, [key]: value }));
    setError((prevError) => ({ ...prevError, [key]: false }));

    onUpdate(data, { ...dataForm, [key]: value });
  };

  const optionsList = [
    {
      label: "None",
      value: "None",
    },
    {
      label: "% discount",
      value: "% discount",
    },
    {
      label: "Discount / each",
      value: "Discount / each",
    },
  ];
  const [isPercent, setIsPercent] = useState(false);
  const [isHideAmount, setIsHideAmount] = useState(true);

  const checkAmount = (e) => {
    if (e === "% discount") {
      setIsHideAmount(false);
      setIsPercent(true);
    } else if (e === "None") {
      setIsHideAmount(true);
    } else {
      setIsHideAmount(false);
      setIsPercent(false);
    }
  };

  useEffect(() => {
    checkAmount(dataForm?.discountType);
  }, [dataForm]);

  const validateFields = () => {
    const newError = {
      title: false,
      quantity: false,
    };

    if (!dataForm.title || dataForm.title.trim() === "") {
      newError.title = true;
    }

    if (
      !dataForm.quantity ||
      isNaN(dataForm.quantity) ||
      dataForm.quantity <= 0
    ) {
      newError.quantity = true;
    }

    setError(newError);

    return !newError.title && !newError.quantity;
  };

  return (
    <Card roundedAbove="sm">
      <BlockStack gap={400}>
        <BlockStack gap={200}>
          <Text alignment="start" as="h1" variant="headingSm">
            Volume discount rule
          </Text>
        </BlockStack>

        <BlockStack>
          <Divider />

          <Box
            width="90px"
            background="bg-fill-critical"
            color="text"
            paddingBlock="150"
            borderEndEndRadius="200"
          >
            <Text
              alignment="center"
              tone="text-inverse"
              as="p"
              variant="bodyMd"
            >
              OPTIONS {count}
            </Text>
          </Box>
        </BlockStack>
        <div className="flex-container">
          <Button
            onClick={() => deleteRule(count - 1)}
            variant="tertiary"
            icon={DeleteMajor}
          ></Button>
        </div>

        <BlockStack gap={200}>
          <FormLayout>
            <FormLayout.Group condensed>
              <InlineGrid gap="400" columns={3}>
                <TextField
                  label="Title"
                  onChange={(value) => handleInputChange("title", value)}
                  autoComplete="off"
                  value={dataForm?.title}
                  error={!dataForm?.title && itemError}
                />
                <TextField
                  label="Subtitle"
                  onChange={(value) => handleInputChange("subtitle", value)}
                  autoComplete="off"
                  value={dataForm?.subtitle}
                />
                <TextField
                  label="Label(optional)"
                  onChange={(value) => handleInputChange("label", value)}
                  autoComplete="off"
                  value={dataForm?.label}
                />
                <TextField
                  label="Quantity"
                  type="number"
                  value={dataForm?.quantity}
                  autoComplete="off"
                  onChange={(value) => handleInputChange("quantity", value)}
                  error={!dataForm?.quantity && itemError}
                />
                <Select
                  label="Discount type"
                  autoComplete="off"
                  options={optionsList}
                  onChange={(e) => {
                    checkAmount(e);
                    handleInputChange("discountType", e);
                  }}
                  value={dataForm?.discountType}
                />
                {!isHideAmount && (
                  <TextField
                    label="Amount"
                    type="number"
                    onChange={(value) => handleInputChange("amount", value)}
                    autoComplete="off"
                    suffix={isPercent ? "%" : "$"}
                    value={dataForm?.amount}
                    error={error.amount}
                  />
                )}
              </InlineGrid>
            </FormLayout.Group>
          </FormLayout>
        </BlockStack>
      </BlockStack>
    </Card>
  );
}
