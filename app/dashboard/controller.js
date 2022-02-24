const Transaction = require('../transaction/model')
const Category = require('../category/model')
const Voucher = require('../voucher/model')
const Player = require('../player/model')

module.exports = {
  index: async (req, res) => {
    try {
      const transaction = await Transaction.countDocuments()
      const category = await Category.countDocuments()
      const voucher = await Voucher.countDocuments()
      const player = await Player.countDocuments()

      res.render('admin/dashboard/index', {
        name: req.session.user.name,
        title: 'Dashboard',
        count: {
          transaction, category, voucher, player
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
}