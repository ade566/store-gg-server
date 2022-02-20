const Payment = require('./model')
const Bank = require('../bank/model')

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage")
      const alertStatus = req.flash("alertStatus")

      const alert = {message: alertMessage, status: alertStatus}
      const data = await Payment.find().populate('banks')
      res.render('admin/payment/index', {
        data,
        alert
      })
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/payment')
    }
  },
  create: async (req, res) => {
    try {
      const bank = await Bank.find()
      res.render('admin/payment/create', {
        bank
      })
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/payment')
    }
  },
  _create : async(req, res) => {
    try {
      const {type, banks} = req.body
      const data = new Payment({
        type, banks
      })
      await data.save()
  
      req.flash('alertMessage', 'Berhasil tambah payment')
      req.flash('alertStatus', 'success')
       res.redirect('/payment')
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/payment')
    }
  },
  edit: async (req, res) => {
    try {
      const {id} = req.params
      const data = await Payment.findOne({_id: id})
      const bank = await Bank.find()
      res.render('admin/payment/edit', {
        data, bank
      })
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/payment')
    }
  },
  _edit : async(req, res) => {
    try {
      const {id} = req.params
      const {type, status, banks} = req.body
      await Payment.findOneAndUpdate({
        _id: id
      }, {
        type, status, banks
      })
  
      req.flash('alertMessage', 'Berhasil ubah payment')
      req.flash('alertStatus', 'success')
      res.redirect('/payment')
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/payment')
    }
  },
  _delete : async(req, res) => {
    try {
      const {id} = req.params
      const data = await Payment.findByIdAndRemove({_id: id})
      req.flash('alertMessage', 'Berhasil hapus payment')
      req.flash('alertStatus', 'success')
      res.redirect('/payment')
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/payment')
    }
  },
  _status : async(req, res) => {
    try {
      const {id} = req.params
      const data = await Payment.findOne({_id: id})
      let status = data.status === 'Y' ? 'N': 'Y'
     
      await Payment.findOneAndUpdate({
        _id: id
      }, {
        status
      })
  
      req.flash('alertMessage', 'Berhasil ubah status payment')
      req.flash('alertStatus', 'success')
  
      res.redirect('/payment')
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/payment')
    }
  },
}