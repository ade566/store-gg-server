module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage")
      const alertStatus = req.flash("alertStatus")

      const alert = {message: alertMessage, status: alertStatus}
      res.render('admin/users/sign-in', {
        alert
      })
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/')
    }
  }
}