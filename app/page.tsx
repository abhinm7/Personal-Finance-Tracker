import AddCard from "@/components/common/AddCard";
import Chart from "@/components/common/Chart";
import TableList from "@/components/common/TableList";
import Header from "@/components/ui/home-head";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-white space-y-6 p-6">
      <Header />
      <AddCard/>
      <TableList/>
      <Chart/>
    </div>
  );
}
