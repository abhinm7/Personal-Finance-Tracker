import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../ui/card"
  import { Button } from "../ui/button"
  import { Input } from "../ui/input"
  import { Label } from "../ui/label"
  
  const AddCard = () => {
    return (
      <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <CardHeader className="w-full space-y-1">
          <CardTitle className="text-gray-800 text-xl">Add a Transaction</CardTitle>
          <CardDescription className="text-gray-600 text-sm">
            Keep your finances up to date by logging your expenses.
          </CardDescription>
        </CardHeader>
  
        <CardContent className="w-full space-y-4">
          <form className="space-y-4">
            {/* Inputs Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Title input in its own row */}
              <div className="text-left mt-4">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Electricity bill"
                  className="w-full sm:w-[800px] mt-2" // Increased width for larger screens (twice the previous width)
                />
              </div>
  
              {/* Amount and Date inputs grouped in one row */}
              <div className="sm:col-span-2 grid grid-cols-2 gap-4">
                <div className="text-left">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" placeholder="e.g. 2500" className="mt-2" />
                </div>
  
                <div className="text-left">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" className="mt-2"/>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
  
        {/* Button Container */}
        <CardFooter className="flex justify-center mt-4">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-900 text-white font-medium py-2 px-6 w-full max-w-[200px] rounded-lg transition-colors duration-200 shadow-md"
          >
            Add
          </Button>
        </CardFooter>
      </div>
    )
  }
  
  export default AddCard
  