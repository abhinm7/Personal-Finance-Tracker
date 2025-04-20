import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  const TableList = () => {
    const data = [
      { date: "2025-04-20", category: "Food", amount: "₹250" },
      { date: "2025-04-19", category: "Transport", amount: "₹100" },
      { date: "2025-04-18", category: "Shopping", amount: "₹750" },
    ]
  
    return (
      <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-blue-700">Date</TableHead>
              <TableHead className="text-blue-700">Category</TableHead>
              <TableHead className="text-blue-700">Amount</TableHead>
              <TableHead className="text-blue-700 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, idx) => (
              <TableRow key={idx} className="hover:bg-blue-50">
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell className="text-right text-blue-600 cursor-pointer hover:underline">
                  Edit
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
  
  export default TableList
  