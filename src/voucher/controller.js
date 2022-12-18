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
  const { name, category, nominals } = req.body;
  if (req.file) {
    const image = req.file.path;
  }
  try {
    const voucher = new Voucher({
      name,
      category,
      nominals,
      image: image ? image : '',
    });
    await voucher.save();
    return res.status(201).json({
      message: 'Data created',
      data: voucher,
    });
  } catch (error) {
    res.status(500).json({
      Message: err.message || 'Internal Server Error',
      field: err.field,
    });
  }
};

exports.updateDataVoucher = async (req, res) => {
  const { _id } = req.params;
  const { name, category, nominals } = req.body;
  if (req.file) {
    const image = req.file.path;
  }

  try {
    const voucher = await Voucher.findOneAndUpdate(
      { _id },
      { name, category, nominals, image }
    );

    res.status(201).json({
      Message: 'Updating data voucher was success',
      data: voucher,
    });
  } catch (err) {
    res.status(500).json({
      Message: err.message || 'Internal Server Error',
      field: err.field,
    });
  }
};

exports.deleteDataVoucher = async (req, res) => {
  const { _id } = req.params;

  try {
    const voucher = Voucher.findOneAndDelete({ _id });

    res.status(200).json({
      Message: 'Deleting data voucher was success',
      data: voucher,
    });
  } catch (err) {
    res.status(500).json({
      Message: err.message || 'Internal Server Error',
      field: err.field,
    });
  }
};
