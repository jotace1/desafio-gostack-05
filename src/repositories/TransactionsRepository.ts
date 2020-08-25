import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const somadorEntrada = this.transactions.map(transaction =>
      transaction.type === 'income' ? transaction.value : 0,
    );

    const somadorSaida = this.transactions.map(transaction =>
      transaction.type === 'outcome' ? transaction.value : 0,
    );

    const income = somadorEntrada.reduce(
      (accum: number, curr: number) => accum + curr,
      0,
    );

    const outcome = somadorSaida.reduce(
      (accum: number, curr: number) => accum + curr,
      0,
    );

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
