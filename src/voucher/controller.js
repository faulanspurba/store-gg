const Voucher = require('./model');
const Category = require('../category/model');
const Nominal = require('../nominal/model');

exports.dashboardVoucher = async (req, res) => {
  const category = await Category.find().select('categoryName');
  const nominal = await Nominal.find().select('coinName price');

  return res.status(200).json({
    Message: 'Berhasil membuka dashboard',
    dataCategory: category,
    dataNominal: nominal,
  });
};

exports.getAllVoucher = async (req, res) => {
  const voucher = await Voucher.find().populate('category');

  if (voucher.length === 0) {
    return res.status(200).json({
      message: 'Isi Data Voucher Masih Kosong',
    });
  }
  if (voucher === undefined) {
    return res.status(404).json({
      message: 'Gagal Mendapatkan Voucher',
    });
  }
  return res.json({
    message: 'Berhasil mendapatkan semua data voucher',
    data: voucher,
  });
};

exports.postDataVoucher = async (req, res) => {
  const { name, category } = req.body;
  // const image = req.file.path;
  console.log(req.file);
  try {
    const voucher = new Voucher({ name });
    await voucher.save();
    return res.status(201).json({
      message: 'Data created',
      data: voucher,
    });
  } catch (error) {
    console.log(error.message);
  }
};
