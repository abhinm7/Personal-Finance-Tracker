import { HandCoins } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center space-y-4">
      {/* Icon Section */}
      <div className="text-6xl text-indigo-600">
        <HandCoins />
      </div>

      {/* Title Section */}
      <h2 className="text-2xl font-semibold text-gray-800">
        Track your personal finances
      </h2>

      {/* Description Section */}
      <p className="text-gray-600">
        Easily manage your spending, set budgets, and monitor your financial health.
      </p>
    </div>
  )
}

export default Header
