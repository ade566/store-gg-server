const Bank = require('./model')

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage")
      const alertStatus = req.flash("alertStatus")

      const alert = {message: alertMessage, status: alertStatus}
      const data = await Bank.find()
      res.render('admin/bank/index', {
        data,
        alert
      })
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/bank')
    }
  },
  create: async (req, res) => {
    try {
      res.render('admin/bank/create')
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/bank')
    }
  },
  _create : async(req, res) => {
    try {
      const {name, nameBank, noRekening} = req.body

      let create = await Bank({name, nameBank, noRekening})
      await create.save()

      req.flash('alertMessage', 'Berhasil tambah bank')
      req.flash('alertStatus', 'success')

      res.redirect('/bank')
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/bank')
    }
  },
  edit: async (req, res) => {
    try {
      const {id} = req.params
      const data = await Bank.findOne({_id: id})
      res.render('admin/bank/edit', {
        data
      })
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/bank')
    }
  },
  _edit : async(req, res) => {
    try {
      const {name, nameBank, noRekening} = req.body
      const {id} = req.params
      const update = await Bank.findOneAndUpdate({_id: id}, {name, nameBank, noRekening})
      req.flash('alertMessage', 'Berhasil edit bank')
      req.flash('alertStatus', 'success')
      res.redirect('/bank')
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/bank')
    }
  },
  _delete : async(req, res) => {
    try {
      const {id} = req.params
      const bank = await Bank.findByIdAndRemove({_id: id})
      req.flash('alertMessage', 'Berhasil hapus bank')
      req.flash('alertStatus', 'success')
      res.redirect('/bank')
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/bank')
    }
  },
}