import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import useCreateCabin from "./useCreateCabin";
import { useContext, useEffect } from "react";
import useEditCabin from "./useEditCabin";
import { modalContext } from "../../ui/Modal";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabinToEdit = {} }) {
  const { handleCloseModal } = useContext(modalContext);
  const toCreateCabin = Object.keys(cabinToEdit).length === 0;
  const { id, ...editData } = cabinToEdit;

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({ defaultValues: editData });

  const { isCreating, createCabin, createIsSuccess } = useCreateCabin();
  const { isEditting, editCabin, editIsSuccess } = useEditCabin();

  const onSubmit = (data) => {
    if (toCreateCabin) createCabin(data);
    else {
      editCabin({ id, data });
    }
  };

  useEffect(() => {
    if (createIsSuccess || editIsSuccess) {
      reset();
      handleCloseModal();
    }
  }, [createIsSuccess, editIsSuccess, reset, handleCloseModal]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          disabled={isCreating || isEditting}
          {...register("name", {
            required: true,
            minLength: 3,
          })}
        />
        {errors.name && errors.name.type === "required" && (
          <Error>This field is required</Error>
        )}
        {errors.name && errors.name.type === "minLength" && (
          <Error>Cabin name must be at least 3 characters long.</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating || isEditting}
          {...register("maxCapacity", {
            required: true,
            min: 1,
          })}
        />
        {errors.maxCapacity && errors.maxCapacity.type === "required" && (
          <Error>This field is required</Error>
        )}
        {errors.maxCapacity && errors.maxCapacity.type === "min" && (
          <Error>Max Capacity must be larger than 0.</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating || isEditting}
          {...register("regularPrice", {
            required: true,
            min: 1,
          })}
        />
        {errors.regularPrice && errors.regularPrice.type === "required" && (
          <Error>This field is required</Error>
        )}
        {errors.regularPrice && errors.regularPrice.type === "min" && (
          <Error>Cabin price must be larger than 0.</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          disabled={isCreating || isEditting}
          {...register("discount", {
            required: true,
            validate: (value) => +value < +getValues("regularPrice"),
          })}
        />
        {errors.discount && errors.discount.type === "required" && (
          <Error>This field is required</Error>
        )}
        {errors.discount && errors.discount.type === "validate" && (
          <Error>Discount must be smaller than price.</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          disabled={isCreating || isEditting}
          {...register("description", { required: true })}
        />
        {errors.description && errors.description.type === "required" && (
          <Error>This field is required</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          disabled={isCreating || isEditting}
          {...register("image", { required: toCreateCabin })}
        />
        {toCreateCabin && errors.image && errors.image.type === "required" && (
          <Error>Cabin image is required</Error>
        )}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isCreating || isEditting}
          onClick={() => {
            reset();
            handleCloseModal();
          }}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isCreating || isEditting}>
          {toCreateCabin ? `Add Cabin` : "Update Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
