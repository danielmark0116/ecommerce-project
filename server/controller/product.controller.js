const Product = require('../model/product.model');

exports.getPublished = async (req, res) => {
  try {
    let response = await Product.find({ published: true }).sort({
      createdAt: 'desc'
    });

    res.json({
      response,
      error: false,
      success: true,
      msg: ''
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      success: false,
      msg: e.message
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    let response = await Product.find().sort({ createdAt: 'desc' });

    res.json({
      response,
      error: false,
      success: true,
      msg: ''
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      success: false,
      msg: e.message
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    let response = await Product.find(
      { _id: { $in: req.query.ids } },
      'name category sex price img'
    ).sort({
      name: '1'
    });

    res.json({
      response
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      success: false,
      msg: e.message
    });
  }
};

exports.getById = async (req, res) => {
  try {
    let response = await Product.find({ _id: req.params.id });

    res.json({
      response,
      error: false,
      success: true,
      msg: ''
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      success: false,
      msg: e.message
    });
  }
};

exports.postProduct = async (req, res) => {
  try {
    let response = await new Product(req.body).save();

    res.json({
      response,
      error: false,
      success: true,
      msg: ''
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      success: false,
      msg: e.message
    });
  }
};

exports.editProduct = async (req, res) => {
  try {
    let response = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    res.json({
      response: [response],
      error: false,
      success: true,
      msg: ''
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      success: false,
      msg: e.message
    });
  }
};

exports.publishProduct = async (req, res) => {
  try {
    let productToUpdate = await Product.findById(req.params.id);

    productToUpdate.published = !productToUpdate.published;

    let response = await productToUpdate.save();

    res.json({
      response: [response],
      error: false,
      success: true,
      msg: ''
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      success: false,
      msg: e.message
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    let response = await Product.findByIdAndDelete(req.params.id);

    res.json({
      response: [response],
      error: false,
      success: true,
      msg: ''
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      success: false,
      msg: e.message
    });
  }
};

const filterQuery = queries => {
  const { category, sex } = queries;

  return {
    category: category ? category : { $regex: /.*/, $options: 'i' },
    sex: sex ? sex : { $regex: /.*/, $options: 'i' }
  };
};

const sortQuery = queries => {
  const defaultSort = ['createdAt', 'desc'];
  const { sort } = queries;

  return sort
    ? [
        /date/.test(sort)
          ? ['createdAt', parseInt(sort.split('date')[1])]
          : /price/.test(sort)
          ? ['price', parseInt(sort.split('price')[1])]
          : /name/.test(sort)
          ? ['name', parseInt(sort.split('name')[1])]
          : /sold/.test(sort)
          ? ['sold', parseInt(sort.split('sold')[1])]
          : defaultSort
      ]
    : [defaultSort];
};

exports.productsFilters = async (req, res) => {
  try {
    let documentsQ = await Product.countDocuments({
      ...filterQuery(req.query),
      published: true
    });

    let response = await Product.find({
      ...filterQuery(req.query),
      published: true
    })
      .sort(sortQuery(req.query))
      .skip(parseInt(req.params.skip))
      .limit(parseInt(req.params.limit));

    res.json({
      quantity: documentsQ,
      response,
      error: false,
      success: true,
      msg: ''
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      success: false,
      msg: e.message
    });
  }
};

exports.productsAllFilters = async (req, res) => {
  try {
    let response = await Product.find(filterQuery(req.query))
      .sort(sortQuery(req.query))
      .skip(parseInt(req.params.skip))
      .limit(parseInt(req.params.limit));

    let documentsQ = await Product.countDocuments({
      ...filterQuery(req.query)
    });

    res.json({
      quantity: documentsQ,
      response,
      error: false,
      success: true,
      msg: ''
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      success: false,
      msg: e.message
    });
  }
};

// exports.getRangeProducts = async (req, res) => {
//   try {
//     let documentQ = await Product.countDocuments();
//     let response = await Product.find({ published: true })
//       .sort({
//         createdAt: 'desc'
//       })
//       .skip(parseInt(req.params.start))
//       .limit(parseInt(req.params.limit));

//     res.json({
//       response,
//       documentsCount: documentQ,
//       error: false,
//       success: true,
//       msg: ''
//     });
//   } catch (e) {
//     res.status(500).json({
//       error: true,
//       success: false,
//       msg: e.message
//     });
//   }
// };

// exports.getRangeAllProducts = async (req, res) => {
//   try {
//     let documentQ = await Product.countDocuments();
//     let response = await Product.find({})
//       .sort({
//         createdAt: 'desc'
//       })
//       .skip(parseInt(req.params.start))
//       .limit(parseInt(req.params.limit));

//     res.json({
//       response,
//       documentsCount: documentQ,
//       error: false,
//       success: true,
//       msg: ''
//     });
//   } catch (e) {
//     res.status(500).json({
//       error: true,
//       success: false,
//       msg: e.message
//     });
//   }
// };
