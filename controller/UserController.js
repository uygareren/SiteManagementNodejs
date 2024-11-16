const DebtModel = require('../model/DebtModel');
const PaidDebtModel = require('../model/PaidDebtModel');
const UserModel = require('../model/UserModel');

class UserController {
    static async getDebts(req, res) {
        const { viewed_user_id, user_id } = req.body;

        if (viewed_user_id !== user_id) {
            return res.status(403).json({
                status: 403,
                message: 'Başka kullanıcının borçlarını görüntüleyemezsiniz.'
            });
        }

        try {
            const debts = await DebtModel.findByUserId(user_id);
            console.log("debts",debts);
            if (debts) {
                return res.status(200).json({
                    status: 200,
                    message: 'Borçlar başarıyla alındı.',
                    data: debts
                });
            } else {
            }
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Something went wrong.',
                error: error.message
            });
        }
    }

    static async postPayDebt(req, res) {
        const { user_id, admin_id, amount } = req.body;
    
        try {
            const debt = await DebtModel.findByUserId(user_id);
    
            if (debt) {
                const remainingDebt = debt.amount - amount;
    
                if (remainingDebt > 0) {
                    await DebtModel.updateAmount(debt.id, remainingDebt);
                } else {
                    await DebtModel.deleteDebt(debt.id);
                }
    
                const paidDebtData = {
                    admin_id,
                    user_id,
                    amount,
                    created_at: new Date().toISOString()
                };
                await PaidDebtModel.insert(paidDebtData);
    
                return res.status(200).json({
                    status: 200,
                    message: remainingDebt > 0 ? 
                        'Partial payment made. Remaining debt updated.' : 
                        'Debt fully paid and removed from Debt table.',
                    remaining_debt: remainingDebt > 0 ? remainingDebt : 0,
                    paid_data: paidDebtData
                });
            } else {
                return res.status(404).json({
                    status: 404,
                    message: 'Debt not found for the specified user.',
                    user_id,
                    amount
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Something went wrong.',
                error: error.message
            });
        }
    }
    

    static async getPaidDebts(req, res) {
        const { viewed_user_id, user_id } = req.body;

        if (viewed_user_id != user_id) {
            return res.status(403).json({
                status: 403,
                message: 'Başka kullanıcının borçlarını görüntüleyemezsiniz.'
            });
        }

        try {
            const paidDebts = await PaidDebtModel.findByUserId(user_id);
            console.log("padidebt", paidDebts);
            if (paidDebts.length > 0) {
                return res.status(200).json({
                    status: 200,
                    message: 'Ödenmiş borçlar başarıyla alındı.',
                    data: paidDebts
                });
            } else {
                return res.status(404).json({
                    status: 404,
                    message: 'Ödenmiş borç bulunamadı.'
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Something went wrong.',
                error: error.message
            });
        }
    }

    static async getUsersByFilters(req, res) {
        const { minAge, maxAge, startDate, endDate } = req.query;

        if ((startDate && !Date.parse(startDate)) || (endDate && !Date.parse(endDate))) {
            return res.status(400).json({
                status: 400,
                message: 'Geçerli bir startDate ve endDate değeri giriniz. (Y-m-d formatında)'
            });
        }

        try {
            const users = await UserModel.findByFilters(minAge, maxAge, startDate, endDate);
            if (users.length > 0) {
                return res.status(200).json({
                    status: 200,
                    message: 'Belirtilen filtrelere göre kullanıcılar listelendi.',
                    data: users
                });
            } else {
                return res.status(404).json({
                    status: 404,
                    message: 'Belirtilen filtrelere uygun kullanıcı bulunamadı.'
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Something went wrong.',
                error: error.message
            });
        }
    }
}

module.exports = UserController;
