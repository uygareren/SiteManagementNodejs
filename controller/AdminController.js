const AdminModel = require('../model/AdminModel');
const UserModel = require('../model/UserModel');
const FlatModel = require('../model/FlatModel');
const DebtModel = require('../model/DebtModel');

class AdminController {
    static async postAddDebt(req, res) {
        const { admin_id, user_id, amount, deadline } = req.body;

        if (!admin_id || !user_id || !amount || !deadline) {
            return res.status(400).json({ message: 'Tüm alanlar doldurulmalıdır.' });
        }

        try {
            const admin = await AdminModel.findById(admin_id);
            if (!admin) return res.status(404).json({ message: 'Geçersiz admin ID.' });

            const user = await UserModel.findById(user_id);
            if (!user) return res.status(404).json({ message: 'Geçersiz kullanıcı ID.' });

            const data = {
                admin_id,
                user_id,
                amount,
                deadline: new Date(deadline),
            };

            const result = await DebtModel.create(data);
            if (result) {
                res.status(201).json({ message: 'Borç başarıyla atandı.' });
            } else {
                res.status(500).json({ message: 'Borç ataması başarısız oldu.' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async adminAssignFlatToUser(req, res) {
        const { admin_id, user_id, flat_id } = req.body;
    
        if (!admin_id || !user_id || !flat_id) {
            return res.status(400).json({ message: 'Tüm alanlar doldurulmalıdır.' });
        }
    
        try {
            const admin = await AdminModel.findById(admin_id);
            if (!admin) return res.status(404).json({ message: 'Geçersiz admin ID.' });
    
            const flat = await FlatModel.getFlatById(flat_id);
            if (!flat) return res.status(404).json({ message: 'Geçersiz flat ID.' });
    
            const existingUser = await UserModel.findByFlatId(flat_id);
            if (existingUser) {
                return res.status(400).json({ message: 'Bu daire başka bir kullanıcıya atanmış.' });
            }
    
            const user = await UserModel.findById(user_id);
            if (!user) return res.status(404).json({ message: 'Geçersiz kullanıcı ID.' });
    
            const result = await UserModel.updateFlat(user_id, flat_id);
            if (result) {
                res.status(200).json({ message: 'Daire başarıyla atandı.' });
            } else {
                res.status(500).json({ message: 'Daire ataması başarısız oldu.' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
}

module.exports = AdminController;
