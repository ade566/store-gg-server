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
        alert,
        name: req.session.user.name,
        title: 'Voucher'
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
        name: req.session.user.name,
        title: 'Tambah Voucher'
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
  edit: async (req, res) => {
    try {
      const {id} = req.params
      const data = await Voucher.findOne({_id: id})
      const category = await Category.find()
      const nominal = await Nominal.find()
      res.render('admin/voucher/edit', {
        data, category, nominal,
        name: req.session.user.name,
        title: `Voucher ${data.name}`
      })
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/voucher')
    }
  },
  _edit : async(req, res) => {
    try {
      const {id} = req.params
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
            const voucher = await Voucher.findOne({_id: id})

            let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`
            if (fs.existsSync(currentImage)) {
              fs.unlinkSync(currentImage)
            }

            await Voucher.findOneAndUpdate({
              _id: id
            }, {
              name, category, nominals,
              thumbnail: filename
            })

            req.flash('alertMessage', 'Berhasil ubah voucher')
            req.flash('alertStatus', 'success')
            res.redirect('/voucher')
          } catch (error) {
            
          }
        })
      }else{
        await Voucher.findOneAndUpdate({
          _id: id
        }, {
          name, category, nominals
        })
  
        req.flash('alertMessage', 'Berhasil ubah voucher')
        req.flash('alertStatus', 'success')
  
        res.redirect('/voucher')
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/voucher')
    }
  },
  _delete : async(req, res) => {
    try {
      const {id} = req.params
      const data = await Voucher.findByIdAndRemove({_id: id})
      let currentImage = `${config.rootPath}/public/uploads/${data.thumbnail}`
      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage)
      }
      req.flash('alertMessage', 'Berhasil hapus voucher')
      req.flash('alertStatus', 'success')
      res.redirect('/voucher')
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/voucher')
    }
  },
  _status : async(req, res) => {
    try {
      const {id} = req.params
      const voucher = await Voucher.findOne({_id: id})
      let status = voucher.status === 'Y' ? 'N': 'Y'
     
      await Voucher.findOneAndUpdate({
        _id: id
      }, {
        status
      })
  
      req.flash('alertMessage', 'Berhasil ubah status voucher')
      req.flash('alertStatus', 'success')
  
      res.redirect('/voucher')
    } catch (error) {
      req.flash("alertMessage", `${error.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/voucher')
    }
  },
}