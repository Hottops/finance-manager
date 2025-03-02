const Transaction = require('../models/Transaction');

const addTransaction = async (req, res) => {
  const { type, amount, note } = req.body;

  const transaction = new Transaction({
    user: req.user._id,
    type,
    amount,
    note,
  });

  const createdTransaction = await transaction.save();
  res.status(201).json(createdTransaction);
};

const getTransactions = async (req, res) => {
  const transactions = await Transaction.find({ user: req.user._id });
  res.json(transactions);
};

const deleteTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (transaction) {
    await transaction.remove();
    res.json({ message: 'Transaction removed' });
  } else {
    res.status(404).json({ message: 'Transaction not found' });
  }
};

module.exports = { addTransaction, getTransactions, deleteTransaction };