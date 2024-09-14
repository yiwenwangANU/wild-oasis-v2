import styled from "styled-components";
import useGetRecentBookings from "./useGetRecentBookings";
import Spinner from "../../ui/Spinner";
import useGetRecentStays from "./useGetRecentStays";
import useGetCabins from "../../features/cabins/useGetCabins";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

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
      <TodayActivity />
      <DurationChart recentStays={recentStays} />
      <SalesChart days={days} recentBookings={recentBookings} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
