const Category = require('./model');

exports.getDataCategory = async (req, res) => {
  try {
    const categories = await Category.find();

    // notif
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');

    const alert = { Message: alertMessage, status: alertStatus };

    if (!categories) {
      return res.json({ Message: 'Gagal mendapatkan data' });
    }

    req.flash('Berhasil mendapatkan Kategory');
    req.flash('Alert Status', 'success');

    res.json({
      Message: 'Berhasil mendapatkan data',
      alert,
      data: categories,
    });
  } catch (err) {
    req.flash('alertMessage', err.Message);
    req.flash('alertStatus', err.status);
  }
};

exports.postDataCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    console.log(categoryName);

    // notif
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { Message: alertMessage, status: alertStatus };

    const category = await Category({ categoryName });
    await category.save();

    req.flash('Berhasil menambahkan Kategory');
    req.flash('Alert Status', 'success');

    return res.json({
      Message: 'Nama sudah berhasil disimpan',
      alert,
      data: category,
    });
  } catch (err) {
    req.flash('alertMessage', err.Message);
    req.flash('alertStatus', err.status);
  }
};

exports.getIdData = async (req, res) => {
  try {
    const { _id } = req.params;
    const category = await Category.findOne({ _id });

    if (category == undefined) {
      return res.json({ Message: 'Data Kategori Tidak Ada' });
    }
    return res.json({ Message: 'Berhasil Mendapatkan Data', data: category });
  } catch (err) {
    console.log(err);
  }
};

exports.putDataCategory = async (req, res) => {
  try {
    const { _id } = req.params;
    const { name } = req.body;

    const category = await Category.findOneAndUpdate({ _id }, { name });

    if (category == undefined) {
      return res.json({ Message: 'Data Id Tidak Ditemukan' });
    }

    return res.json({
      Message: 'Berhasil Mengubah Data',
      data: category,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteDataCategory = async (req, res) => {
  try {
    const { _id } = req.params;
    const category = await Category.findOneAndRemove({ _id });

    if (category == undefined) {
      return res.json({ Message: 'Data Id Tidak Ditemukan' });
    }
    return res.json({ Message: 'Data Berhasil Dihapus', data: category });
  } catch (err) {
    console.log(err);
  }
};
