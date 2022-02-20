const mongoose = require('mongoose')
let voucherSchema = mongoose.Schema({
  type: {
    type: String,
    require : [true, 'Tipe pembayara harus diisi']
  },
  status: {
    type: String,
    enum: ['Y', 'N'],
    default : 'Y'
  },
  banks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bank'
  }],
})

module.exports = mongoose.model('Payment', voucherSchema)