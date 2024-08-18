import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import useGetSettings from "./useGetSettings";
import Spinner from "../../ui/Spinner";
import { useEffect } from "react";
import styled from "styled-components";
import useUpdateSettings from "./useUpdateSettings";

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function UpdateSettingsForm() {
  const { settings, isPending } = useGetSettings();
  const { updateSettings, isUpdating } = useUpdateSettings();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (settings) {
      reset(settings);
    }
  }, [settings, reset]);

  const onSubmit = (updatedSettings) => updateSettings(updatedSettings);
  if (isPending) return <Spinner />;
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          {...register("minBookingLength", { required: true })}
        />
        {errors.minBookingLength && <Error>This field is required</Error>}
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          {...register("maxBookingLength", { required: true })}
        />
        {errors.maxBookingLength && <Error>This field is required</Error>}
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          {...register("maxGuestsPerBooking", { required: true })}
        />
        {errors.maxGuestsPerBooking && <Error>This field is required</Error>}
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          {...register("breakfastPrice", { required: true })}
        />
        {errors.breakfastPrice && <Error>This field is required</Error>}
      </FormRow>
      <FormRow>
        <Button disabled={isUpdating}>Update Settings</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
