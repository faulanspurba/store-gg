const Nominal = require('./model');

exports.getDataNominal = async (req, res) => {
  try {
    const nominal = await Nominal.find();

    if (nominal === undefined) {
      return res.json({ Message: 'Gagal mendapatkan data' });
    }

    res.json({
      Message: 'Berhasil mendapatkan data',
      data: nominal,
    });
  } catch (err) {
    res.status(500).json({
      Message: err.message || 'Internal Server Error',
      field: err.errors,
    });
  }
};

exports.postDataNominal = async (req, res) => {
  try {
    const { coinQuantity, coinName, price } = req.body;

    const nominal = await Nominal({ coinQuantity, coinName, price });
    await nominal.save();

    return res.json({
      Message: 'Nominal sudah berhasil disimpan',
      data: nominal,
    });
  } catch (err) {
    res.status(500).json({
      Message: err.message || 'Internal Server Error',
      field: err.errors,
    });
  }
};

exports.getIdData = async (req, res) => {
  try {
    const { _id } = req.params;
    const nominal = await Nominal.findOne({ _id });

    if (nominal == undefined) {
      return res.json({ Message: 'Data Kategori Tidak Ada' });
    }
    return res.json({ Message: 'Berhasil Mendapatkan Data', data: nominal });
  } catch (err) {
    res.status(500).json({
      Message: err.message || 'Internal Server Error',
      field: err.field,
    });
  }
};

exports.updateDataNominal = async (req, res) => {
  try {
    const { _id } = req.params;
    const { coinQuantity, coinName, price } = req.body;

    const nominal = await Nominal.findOneAndUpdate(
      { _id },
      { coinQuantity, coinName, price }
    );

    if (nominal === undefined) {
      return res.json({ Message: 'Data Id Tidak Ditemukan' });
    }

    return res.json({
      Message: 'Berhasil Mengubah Data',
      data: nominal,
    });
  } catch (err) {
    res.status(500).json({
      Message: err.message || 'Internal Server Error',
      field: err.field,
    });
  }
};

exports.deleteDataNominal = async (req, res) => {
  try {
    const { _id } = req.params;
    const nominal = await Nominal.findOneAndRemove({ _id });

    if (nominal == undefined) {
      return res.json({ Message: 'Data Id Tidak Ditemukan' });
    }
    return res.json({ Message: 'Data Berhasil Dihapus', data: nominal });
  } catch (err) {
    res.status(500).json({
      Message: err.message || 'Internal Server Error',
      field: err.field,
    });
  }
};
