const Transaction = require('./model')

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage")
      const alertStatus = req.flash("alertStatus")

      const alert = {message: alertMessage, status: alertStatus}
      const data = await Transaction.find().populate('player')
      console.log(data);
      res.render('admin/transaction/index', {
        data,
        alert,
        name: req.session.user.name,
        title: 'Transaction'
      })
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/transaction')
    }
  },
  action: async (req, res) => {
    try {
      const {id} = req.params
      const {status} = req.query

      const data = await Transaction.findOneAndUpdate({_id: id}, {status})
      req.flash('alertMessage', 'Berhasil ubah status')
      req.flash('alertStatus', 'success')
      res.redirect('/transaction')
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/transaction')
    }
  }
}