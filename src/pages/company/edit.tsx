import { Col, Form, Input, InputNumber, Row, Select } from "antd";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { UPDATE_COMPANY_MUTATION } from "@/graphql/mutations";
import CustomAvatar from "@/components/custom-avatar";
import { getNameInitials } from "@/utilities";
import SelectOptionWithAvatar from "@/components/select-option-with-avatar";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { UsersSelectQuery } from "@/graphql/types";
import { USERS_SELECT_QUERY } from "@/graphql/queries";
import {
  businessTypeOptions,
  companySizeOptions,
  industryOptions,
} from "@/constants";
import { CompanyContactsTable } from "./contacts-table";

const EditPage = () => {
  const { saveButtonProps, formProps, formLoading, queryResult } = useForm({
    redirect: false,
    meta: {
      gqlMutation: UPDATE_COMPANY_MUTATION,
    },
  });

  const { avatarUrl, name } = queryResult?.data?.data || {};

  const { selectProps, queryResult: queryResultUsers } = useSelect<
    GetFieldsFromList<UsersSelectQuery>
  >({
    resource: "users",
    optionLabel: "name",
    pagination: {
      mode: "off",
    },
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
  });

  return (
    <div>
      <Row gutter={[12, 32]}>
        <Col xs={24} xl={12}>
          <Edit
            isLoading={formLoading}
            saveButtonProps={saveButtonProps}
            breadcrumb={false}
          />
          <Form {...formProps} layout="vertical">
            <CustomAvatar
              shape="square"
              src={avatarUrl}
              name={getNameInitials(name || "")}
              style={{ width: 96, height: 96, margin: " 24px 0" }}
            />
            <Form.Item
              label="Sales owner"
              name="salesOwnerId"
              initialValue={formProps?.initialValues?.salesOwner?.id}
            >
              <Select
                placeholder="Please select a sales owner"
                {...selectProps}
                options={
                  queryResultUsers.data?.data.map((user) => ({
                    value: user.id,
                    label: (
                      <SelectOptionWithAvatar
                        name={user.name}
                        avatarUrl={user.avatarUrl ?? undefined}
                      />
                    ),
                  })) ?? []
                }
              />
            </Form.Item>
            <Form.Item>
              <Select options={companySizeOptions} />
            </Form.Item>
            <Form.Item>
              <InputNumber
                autoFocus
                addonBefore="$"
                min={0}
                placeholder="0,00"
              />
            </Form.Item>
            <Form.Item label="Industry">
              <Select options={industryOptions} />
            </Form.Item>
            <Form.Item label="Business type">
              <Select options={businessTypeOptions} />
            </Form.Item>
            <Form.Item label="Country" name="name">
              <Input placeholder="country" />
            </Form.Item>
            <Form.Item label="website" name="website">
              <Input placeholder="website" />
            </Form.Item>
          </Form>
        </Col>
        <Col xs={24} xl={12}>
          <CompanyContactsTable />
        </Col>
      </Row>
    </div>
  );
};

export default EditPage;
