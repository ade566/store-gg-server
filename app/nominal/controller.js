const Nominal = require('./model')

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage")
      const alertStatus = req.flash("alertStatus")

      const alert = {message: alertMessage, status: alertStatus}
      const nominal = await Nominal.find()
      res.render('admin/nominal/index', {
        nominal,
        alert
      })
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/nominal')
    }
  },
  create: async (req, res) => {
    try {
      res.render('admin/nominal/create')
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/nominal')
    }
  },
  _create : async(req, res) => {
    try {
      const {coinName, coinQuantity, price} = req.body

      let nominal = await Nominal({coinName, coinQuantity, price})
      await nominal.save()

      req.flash('alertMessage', 'Berhasil tambah nominal')
      req.flash('alertStatus', 'success')

      res.redirect('/nominal')
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/nominal')
    }
  },
  // edit: async (req, res) => {
  //   try {
  //     const {id} = req.params
  //     const category = await Category.findOne({_id: id})
  //     res.render('admin/category/edit', {
  //       category
  //     })
  //   } catch (error) {
  //     req.flash("alertMessage", `${error.message}`)
  //     req.flash("alertStatus", "danger")
  //     res.redirect('/category')
  //   }
  // },
  // _edit : async(req, res) => {
  //   try {
  //     const {name} = req.body
  //     const {id} = req.params
  //     const category = await Category.findOneAndUpdate({_id: id}, {name})
  //     req.flash('alertMessage', 'Berhasil edit kategori')
  //     req.flash('alertStatus', 'success')
  //     res.redirect('/category')
  //   } catch (error) {
  //     req.flash("alertMessage", `${error.message}`)
  //     req.flash("alertStatus", "danger")
  //     res.redirect('/category')
  //   }
  // },
  // _delete : async(req, res) => {
  //   try {
  //     const {id} = req.params
  //     const category = await Category.findByIdAndRemove({_id: id})
  //     req.flash('alertMessage', 'Berhasil hapus kategori')
  //     req.flash('alertStatus', 'success')
  //     res.redirect('/category')
  //   } catch (error) {
  //     req.flash("alertMessage", `${error.message}`)
  //     req.flash("alertStatus", "danger")
  //     res.redirect('/category')
  //   }
  // },
}