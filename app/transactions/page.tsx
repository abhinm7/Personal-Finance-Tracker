import Chart from "@/components/common/Chart"
import { TransactionTable } from "@/components/transactions/TransactionTable"


const Transactions = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-white space-y-6 p-6">
      <TransactionTable/>
      <Chart/>
    </div>
  )
}

export default Transactions
