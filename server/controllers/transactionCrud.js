const Transaction = require('../models/transactionModel');

// Add a new transaction
const addTransaction = async (req, res) => {
    try {
        const { title, amount, category, description, transactionType, date } = req.body;
        const userId = req.user._id;

        if (!title || !amount || !category || !description || !transactionType || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const transaction = new Transaction({
            title,
            amount,
            category,
            description,
            transactionType,
            date,
            user: userId
        });

        await transaction.save();
        res.status(201).json({ message: 'Transaction added successfully', transaction });
    } catch (error) {
        console.error('Failed to add transaction:', error);
        res.status(500).json({ message: 'Failed to add transaction', error });
    }
};

// Get all transactions for a user
const getUserTransactions = async (req, res) => {
    try {
        const userId = req.user._id;
        const transactions = await Transaction.find({ user: userId });
        const totalexpense = (await Transaction.find({ user: userId }))
        .filter(tran => tran.transactionType !== "expense")
        .reduce((acc, tran) => acc + tran.amount, 0);
        const totalincome = (await Transaction.find({ user: userId }))
        .filter(tran => tran.transactionType !== "income")
        .reduce((acc, tran) => acc + tran.amount, 0);
        res.status(200).json({ transactions ,totalincome:totalincome,totalexpense:totalexpense});
    } catch (error) {
        console.error('Failed to fetch transactions:', error);
        res.status(500).json({ message: 'Failed to fetch transactions', error });
    }
};
const updateTransaction=async(req,res)=>{
    const { title, amount, category, description, transactionType, date } = req.body;
    const userId=req.user._id;
    const transactionId=req.params.id;
   
    try {
        const transaction=await Transaction.findByIdAndUpdate({_id:transactionId,user:userId});
        if(!transaction){
            res.status(404).json({message:'transaction not found'});
        }
        transaction.title = title || transaction.title;
        transaction.amount = amount || transaction.amount;
        transaction.category = category || transaction.category;
        transaction.description = description || transaction.description;
        transaction.transactionType = transactionType || transaction.transactionType;
        transaction.date = date || transaction.date;
        await transaction.save();
        res.status(200).json({ message: 'Transaction updated successfully', transaction });
    } catch (error) {
        res.status(500).json({message:'failed to update ',error})
    }
}
const deleteTransaction = async (req, res) => {
    const userId = req.user._id;
    const transactionId = req.params.id;

    try {
        // Find the transaction by id and make sure it belongs to the user
        const transaction = await Transaction.findOneAndDelete({ _id: transactionId, user: userId });

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error('Failed to delete transaction:', error);
        res.status(500).json({ message: 'Failed to delete transaction', error });
    }
};
module.exports = {
    addTransaction,
    getUserTransactions,
    updateTransaction,
    deleteTransaction
};
