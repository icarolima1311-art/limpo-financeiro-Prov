
import React, { useState } from 'react';
import { Plus, Trash2, TrendingDown, DollarSign, PieChart as PieChartIcon, List, CreditCard } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Expense } from '../types';

const INITIAL_EXPENSES: Expense[] = [
  { id: '1', description: 'Conta de Luz', amount: 150.50, category: 'Moradia', date: new Date().toISOString(), paymentMethod: 'debit' },
  { id: '2', description: 'Internet Fibra', amount: 99.90, category: 'Serviços', date: new Date().toISOString(), paymentMethod: 'credit' },
  { id: '3', description: 'Mercado Semanal', amount: 450.00, category: 'Alimentação', date: new Date().toISOString(), paymentMethod: 'credit' },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

const ExpenseDashboard: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'debit' | 'cash'>('credit');

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newExpense: Expense = {
      id: Date.now().toString(),
      description,
      amount: parseFloat(amount),
      category: 'Outros', // Simplification for the prompt
      date: new Date().toISOString(),
      paymentMethod: paymentMethod
    };

    setExpenses([newExpense, ...expenses]);
    setDescription('');
    setAmount('');
    setPaymentMethod('credit');
  };

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  // Prepare data for chart
  const chartData = expenses.map(exp => ({
    name: exp.description,
    value: exp.amount
  }));

  const getPaymentLabel = (method: string) => {
    switch (method) {
      case 'credit': return 'Crédito';
      case 'debit': return 'Débito';
      case 'cash': return 'Dinheiro';
      default: return method;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-emerald-600 text-white pt-10 pb-24 px-6 rounded-b-[2.5rem] shadow-lg relative">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Limpo Financeiro</h1>
            <p className="text-emerald-100 text-sm">Seu controle pessoal</p>
          </div>
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
            <TrendingDown className="text-white w-6 h-6" />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 -mt-16 space-y-6 relative z-10">
        
        {/* Total Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center animate-fade-in-up">
          <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Gasto</span>
          <h2 className="text-4xl font-bold text-gray-800 mt-2 flex items-start">
            <span className="text-lg mt-1 mr-1 text-gray-400">R$</span>
            {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
        </div>

        {/* Add Expense Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-500" />
            Novo Gasto
          </h3>
          <form onSubmit={handleAddExpense} className="flex flex-col gap-3">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="O que você comprou?"
              className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
            
            <div className="grid grid-cols-2 gap-3">
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as 'credit' | 'debit' | 'cash')}
                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-gray-700"
              >
                <option value="credit">Crédito</option>
                <option value="debit">Débito</option>
                <option value="cash">Dinheiro</option>
              </select>

              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Valor (R$)"
                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 mt-1"
            >
              <Plus className="w-5 h-5" />
              Adicionar Conta
            </button>
          </form>
        </div>

        {/* Dashboard / Chart Area */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <PieChartIcon className="w-5 h-5 text-purple-500" />
            Dashboard
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => `R$ ${value.toFixed(2)}`}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
            <List className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-gray-700">Histórico de Contas</h3>
          </div>
          <ul className="divide-y divide-gray-100">
            {expenses.map((expense) => (
              <li key={expense.id} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">{expense.description}</span>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                    <span>{expense.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-medium">
                      <CreditCard className="w-3 h-3" />
                      {getPaymentLabel(expense.paymentMethod)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-red-500">
                    - R$ {expense.amount.toFixed(2)}
                  </span>
                  <button 
                    onClick={() => handleDelete(expense.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
            {expenses.length === 0 && (
              <li className="p-8 text-center text-gray-400">Nenhuma conta cadastrada.</li>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default ExpenseDashboard;
