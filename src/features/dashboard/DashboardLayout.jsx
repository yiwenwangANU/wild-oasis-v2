import styled from "styled-components";
import useGetRecentBookings from "./useGetRecentBookings";
import Spinner from "../../ui/Spinner";
import useGetRecentStays from "./useGetRecentStays";
import useGetCabins from "../../features/cabins/useGetCabins";
import Stats from "./Stats";
import SalesChart from "./SalesChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { recentBookings, isPending: isLoadingBookings } =
    useGetRecentBookings();
  const { recentStays, days, isPending: isLoadingStays } = useGetRecentStays();
  const { cabins, isPending: isLoadingCabins } = useGetCabins();
  if (isLoadingBookings || isLoadingStays || isLoadingCabins)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={recentBookings}
        stays={recentStays}
        numDays={days}
        cabinCount={cabins.length}
      />
      <div>Place Holder 2</div>
      <div>Place Holder 4</div>
      <SalesChart days={days} recentBookings={recentBookings} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
