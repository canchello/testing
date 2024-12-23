import Filters from "../Filters";

const BookingHistoryTable = () => {
  return (
    <div className="py-4">
      <div className="flex items-center justify-between gap-2 mb-4">
        <h2 className="text-xl font-semibold">Booking History</h2>
        <Filters />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Booking ID</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>LG-B00109</td>
            <td>June 19, 2028</td>
            <td>Confirmed</td>
          </tr>
          <tr>
            <td>2</td>
            <td>LG-B00085</td>
            <td>March 20, 2028</td>
            <td>Cancelled</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BookingHistoryTable;
