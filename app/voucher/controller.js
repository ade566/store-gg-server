const Voucher = require('./model')
const Category = require('../category/model')
const Nominal = require('../nominal/model')
const path = require('path')
const fs = require('fs')
const config = require('../../config')

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage")
      const alertStatus = req.flash("alertStatus")

      const alert = {message: alertMessage, status: alertStatus}
      const data = await Voucher.find().populate('category').populate('nominals')
      console.log(data);
      res.render('admin/voucher/index', {
        data,
        alert
      })
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/voucher')
    }
  },
  create: async (req, res) => {
    try {
      const category = await Category.find()
      const nominal = await Nominal.find()
      res.render('admin/voucher/create', {
        category,
        nominal,
      })
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/voucher')
    }
  },
  _create : async(req, res) => {
    try {
      const {name, category, nominals} = req.body

      if (req.file) {
        let tmp_path = req.file.path
        let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1]
        let filename = req.file.filename + '.' + originalExt
        let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)

        const src = fs.createReadStream(tmp_path)
        const dest = fs.createWriteStream(target_path)

        src.pipe(dest)
        src.on('end', async () => {
          try {
            const data = new Voucher({
              name, category, nominals,
              thumbnail: filename
            })

            await data.save()

            req.flash('alertMessage', 'Berhasil tambah voucher')
            req.flash('alertStatus', 'success')
            res.redirect('/voucher')
          } catch (error) {
            
          }
        })
      }else{
        const data = new Voucher({
          name, category, nominals,
        })

        await data.save()
  
        req.flash('alertMessage', 'Berhasil tambah voucher')
        req.flash('alertStatus', 'success')
  
        res.redirect('/voucher')
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/voucher')
    }
  },
  // edit: async (req, res) => {
  //   try {
  //     const {id} = req.params
  //     const nominal = await Nominal.findOne({_id: id})
  //     res.render('admin/nominal/edit', {
  //       e: nominal
  //     })
  //   } catch (error) {
  //     req.flash("alertMessage", `${error.message}`)
  //     req.flash("alertStatus", "danger")
  //     res.redirect('/nominal')
  //   }
  // },
  // _edit : async(req, res) => {
  //   try {
  //     const {coinName, coinQuantity, price} = req.body
  //     const {id} = req.params
  //     const nominal = await Nominal.findOneAndUpdate({_id: id}, {coinName, coinQuantity, price})
  //     req.flash('alertMessage', 'Berhasil edit kategori')
  //     req.flash('alertStatus', 'success')
  //     res.redirect('/nominal')
  //   } catch (error) {
  //     req.flash("alertMessage", `${error.message}`)
  //     req.flash("alertStatus", "danger")
  //     res.redirect('/nominal')
  //   }
  // },
  // _delete : async(req, res) => {
  //   try {
  //     const {id} = req.params
  //     const nominal = await Nominal.findByIdAndRemove({_id: id})
  //     req.flash('alertMessage', 'Berhasil hapus kategori')
  //     req.flash('alertStatus', 'success')
  //     res.redirect('/nominal')
  //   } catch (error) {
  //     req.flash("alertMessage", `${error.message}`)
  //     req.flash("alertStatus", "danger")
  //     res.redirect('/nominal')
  //   }
  // },
}