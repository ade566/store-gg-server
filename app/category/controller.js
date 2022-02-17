const Category = require('./model')

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage")
      const alertStatus = req.flash("alertStatus")

      const alert = {message: alertMessage, status: alertStatus}
      const category = await Category.find()
      res.render('admin/category/index', {
        category,
        alert
      })
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/category')
    }
  },
  create: async (req, res) => {
    try {
      res.render('admin/category/create')
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/category')
    }
  },
  _create : async(req, res) => {
    try {
      const {name} = req.body

      let category = await Category({name})
      await category.save()

      req.flash('alertMessage', 'Berhasil tambah kategori')
      req.flash('alertStatus', 'success')

      res.redirect('/category')
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/category')
    }
  },
  edit: async (req, res) => {
    try {
      const {id} = req.params
      const category = await Category.findOne({_id: id})
      res.render('admin/category/edit', {
        category
      })
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/category')
    }
  },
  _edit : async(req, res) => {
    try {
      const {name} = req.body
      const {id} = req.params
      const category = await Category.findOneAndUpdate({_id: id}, {name})
      req.flash('alertMessage', 'Berhasil edit kategori')
      req.flash('alertStatus', 'success')
      res.redirect('/category')
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/category')
    }
  },
  _delete : async(req, res) => {
    try {
      const {id} = req.params
      const category = await Category.findByIdAndRemove({_id: id})
      req.flash('alertMessage', 'Berhasil hapus kategori')
      req.flash('alertStatus', 'success')
      res.redirect('/category')
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/category')
    }
  },
}