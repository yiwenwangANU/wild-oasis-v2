import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import useCheckOut from "./useCheckOut";
function CheckoutButton({ bookingId }) {
  const { checkout, isPending } = useCheckOut(bookingId);
  return (
    <Button
      variation="primary"
      size="small"
      onClick={checkout}
      disabled={isPending}
    >
      {isPending ? <SpinnerMini /> : "Check out"}
    </Button>
  );
}

export default CheckoutButton;
