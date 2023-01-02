const Voucher = require('../voucher/model');
const Category = require('../category/model');
const Payment = require('../payment/model');
const Bank = require('../bank/model');
const Nominal = require('../nominal/model');
const Transaction = require('../transaction/model');
const Player = require('../player/model');

exports.landingPage = async (req, res) => {
  try {
    const voucher = await Voucher.find()
      .populate('category')
      .select('_id name status category thumbnail');

    res.status(200).json({
      Message: 'Getting Data Success',
      data: voucher,
    });
  } catch (err) {
    res.status(500).json({
      Message: err.message || 'Internal server error',
    });
  }
};

exports.getDetailPlayer = async (req, res) => {
  const { _id } = req.params;

  try {
    const voucher = await Voucher.findOne({ _id })
      .populate('category')
      .populate('nominals')
      .populate('user', '_id name phoneNumber');

    const payment = await Payment.find().populate('banks');

    if (!voucher) {
      return res.status(404).json({
        Message: 'Your voucher is not found',
      });
    }
    return res.status(200).json({
      Message: 'Data voucher found!',
      data: { detail: voucher, payment },
    });
  } catch (err) {
    res.status(500).json({
      Message: err.message || 'Internal Server Error',
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.find();

    return res.status(200).json({
      Message: 'Get Category Success',
      data: category,
    });
  } catch (err) {
    res.status(500).json({
      Message: err.message || 'Internal Server Error',
    });
  }
};

exports.checkoutAction = async (req, res) => {
  const { accountUser, name, nominal, voucher, payment, bank } = req.body;

  try {
    const res_voucher = await Voucher.findOne({ _id: voucher })
      .select('name category _id image user')
      .populate('category')
      .populate('user');
    if (!res_voucher)
      return res.status(404).json({ Message: 'Voucher not found' });

    const res_nominal = await Nominal.findOne({ _id: nominal });
    if (!res_voucher)
      return res.status(404).json({ Message: 'Nominal not found' });

    const res_payment = await Payment.findOne({ _id: payment });
    if (!res_voucher)
      return res.status(404).json({ Message: 'payment not found' });

    const res_bank = await Bank.findOne({ _id: bank });
    if (!res_voucher)
      return res.status(404).json({ Message: 'bank not found' });
    const tax = 0.1 * res_nominal._doc.price;
    const value = res_nominal._doc.price + tax;

    const payload = {
      accountUser,
      name,
      historyVoucherTopup: {
        gameName: res_voucher._doc.gameName,
        category: res_voucher._doc ? res_voucher._doc.name : '',
        image: res_voucher._doc.image,
        coinName: res_nominal._doc.coinName,
        coinQuantity: res_nominal._doc.coinQuantity,
        price: res_nominal._doc.price,
      },
      historyPayment: {
        name: res_bank._doc.name,
        type: res_payment._doc.type,
        bankName: res_bank._doc.bankName,
        noRekening: res_bank._doc.noRekening,
      },
      tax,
      value,
      player: req.player._id,
      historyUser: {
        name: res_voucher._doc.user?.name,
        phoneNumber: res_voucher._doc.user?.phoneNumber,
      },
      category: res_voucher._doc.category?._id,
      user: res_voucher._doc.user?._id,
    };

    const transaction = new Transaction(payload);
    await transaction.save();

    return res.status(201).json({
      Message: 'Create Data Success',
      data: transaction,
    });
  } catch (err) {
    return res.status(500).json({
      Message: err.message || 'Internal Server Error',
      field: err.errors,
    });
  }
};

exports.historyAction = async (req, res) => {
  try {
    const { status = '' } = req.query;

    let criteria = {};

    if (status.length) {
      criteria = {
        ...criteria,
        status: { $regex: status, $options: 'i' },
      };
    }

    if (req.player._id) {
      criteria = {
        ...criteria,
        player: req.player._id,
      };
    }
    const history = await Transaction.find(criteria);

    const totalPrice = await Transaction.aggregate([
      { $match: criteria },
      {
        $group: {
          _id: null,
          value: { $sum: '$value' },
        },
      },
    ]);

    return res.status(200).json({
      Message: 'Getting history success',
      totalPrice: totalPrice ? totalPrice[0].value : 0,
      data: history,
    });
  } catch (err) {
    return res.status(500).json({
      Message: err.message || 'Internal Server Error',
      field: err.errors,
    });
  }
};

exports.historyDetail = async (req, res) => {
  try {
    const { _id } = req.params;

    const detailTransaction = await Transaction.findOne({ _id });

    if (detailTransaction.length <= 0) {
      return res.status(404).json({
        Message: 'Data Id not Found',
        data: _id,
      });
    }

    return res.status(200).json({
      Message: 'Getting detail history transaction was success ',
      data: detailTransaction,
    });
  } catch (err) {
    return res.status(500).json({
      Message: err.message || 'Internal Server Error',
      field: err.errors,
    });
  }
};

exports.dashboardAPI = async (req, res) => {
  try {
    const countPrice = await Transaction.aggregate([
      {
        $match: {
          player: req.player._id,
        },
      },
      {
        $group: {
          _id: '$category',
          value: { $sum: '$value' },
        },
      },
    ]);

    const category = await Category.find();

    category.forEach((categry) => {
      countPrice.forEach((cnt) => {
        if (cnt._id.toString() === categry._id.toString()) {
          cnt.category = categry;
        }
      });
    });

    const history = await Transaction.find({ player: req.player._id })
      .populate('category')
      .sort({ updateAt: -1 });

    res.status(200).json({ data: { history, countPrice } });
  } catch (err) {
    return res.status(500).json({
      Message: err.message || 'Internal Server Error',
      field: err.errors,
    });
  }
};

exports.readProfileAPI = async (req, res) => {
  try {
    const _id = req.player._id;
    const player = await Player.findOne({ _id });

    res.status(200).json({
      data: {
        _id: player._id,
        email: player.email,
        name: player.name,
        image: player.image,
      },
    });
  } catch (err) {
    return res.status(500).json({
      Message: err.message || 'Internal Server Error',
      field: err.errors,
    });
  }
};

exports.editProfileAPI = async (req, res) => {
  try {
    const { _id } = req.player;

    const payload = req.body;

    if (req.file) {
      payload.image = req.file.path;
    }

    const player = await Player.findOneAndUpdate({ _id }, payload, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      Message: 'Update data user was sucess',
      data: {
        _id: player._id,
        name: player.name,
        email: player.email,
        image: player.image,
      },
    });
  } catch (err) {
    return res.status(500).json({
      Message: err.message || 'Internal Server Error',
      field: err.errors,
    });
  }
};
