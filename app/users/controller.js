const user = require('./model')
const bcrypt = require('bcryptjs')

module.exports = {
  signin: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage")
      const alertStatus = req.flash("alertStatus")

      const alert = {message: alertMessage, status: alertStatus}
      if (req.session.user === null || req.session.user === undefined) {
        res.render('admin/users/sign-in', {
          alert
        })
      } else {
        res.redirect('/dashboard')
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/')
    }
  },
  _signin: async (req, res) => {
    try {
      const {email, password} = req.body
      const data = await user.findOne({email: email})

      if (data) {
        if (data.status === 'Y') {
          const check = await bcrypt.compare(password, data.password)
          if (check) {
            req.session.user = {
              id: data._id,
              email: data.email,
              status: data.status,
              name: data.name,
            }
            res.redirect('/dashboard')
          } else {
            req.flash("alertMessage", `Email / Password salah`)
            req.flash("alertStatus", "danger")
            res.redirect('/')
          }
        } else {
          req.flash("alertMessage", `Akun di matikan`)
          req.flash("alertStatus", "danger")
          res.redirect('/')
        }
      } else {
        req.flash("alertMessage", `Akun tidak ditemukan`)
        req.flash("alertStatus", "danger")
        res.redirect('/')
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/')
    }
  }, 
  signout: (req, res) => {
    req.session.destroy()
    res.redirect('/')
  }
}