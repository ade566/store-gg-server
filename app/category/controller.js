module.exports = {
  index: async (req, res) => {
    try {
      res.render('admin/category/index')
    } catch (error) {
      console.log(error);
    }
  }
}