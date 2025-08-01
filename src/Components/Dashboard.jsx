import React from 'react';
import BalanceCard from '../Components/BalanceCard';
import ExpensesCard from '../Components/ExpensesCard';
import ActiveCards from '../Components/ActiveCard';
import CategoriesCard from '../Components/CategoriesCard';
import DissectionChart from '../Components/DissectionChart';
import SpendingParameters from '../Components/SpendingParameter';
import TransactionsCard from '../Components/TransactionsCard'; 

import InvestmentsCard from '../Pages/InvestmentsCard';
import IncomeExpensesChart from '../Pages/IncomeExpensesChart';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-start">
      {/* Row 1 */}
      <BalanceCard />
      <ExpensesCard />
      <ActiveCards />
      <CategoriesCard />

      {/* Row 2 */}
      <div className="col-span-full xl:col-span-2">
        <DissectionChart />
      </div>
      <div className="col-span-full xl:col-span-2">
        <SpendingParameters />
      </div>

      {/* Row 3 */}
      <div className="col-span-full lg:col-span-1">
        <TransactionsCard />
      </div> 
      <div className="col-span-full lg:col-span-1">
        <InvestmentsCard />
      </div>
      <div className="col-span-full lg:col-span-2">
        <IncomeExpensesChart />
      </div>
    </div>
  );
};

export default Dashboard;
