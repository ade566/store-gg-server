const Category = require('./model')

module.exports = {
  index: async (req, res) => {
    try {
      const category = await Category.find()
      res.render('admin/category/index', {
        category
      })
    } catch (error) {
      console.log(error);
    }
  },
  create: async (req, res) => {
    try {
      res.render('admin/category/create')
    } catch (error) {
      console.log(error);
    }
  },
  _create : async(req, res) => {
    try {
      const {name} = req.body

      let category = await Category({name})
      await category.save()

      res.redirect('/category')
    } catch (error) {
      console.log(error);
    }
  }
}