const Transaction = require('./model')

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage")
      const alertStatus = req.flash("alertStatus")

      const alert = {message: alertMessage, status: alertStatus}
      const data = await Transaction.find()
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
  }
}