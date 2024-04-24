import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';


// @desc    Fetch all products
// @router  Get /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});


// @desc    Fetch product by ID
// @router  Get /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        return res.json(product);
    } else {
        res.status(404);
        throw new Error('Resource not found!');
    }
});


// @desc    Create a new product
// @router  Post /api/products/
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    });

    const createProduct = await product.save();
    res.status(201).json(createProduct);
});


// @desc    Update a product
// @router  PUT /api/products/:idd
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.status(201).json(updatedProduct);
    } else {
        res.status(404);
        throw new error('Resource not found');
    }
});


// @desc    Delete a product
// @router  DELETE /api/products
// @access  Priavte/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({ _id: product._id });
        res.status(201).json("Product deleted");
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});


// @desc    Create a new review
// @router  POST /api/products/:id/reviews
// @access  Priavte
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        const alradyReviewed = product.reviews.find(
            (review) => review.user.toString() === req.user._id.toString()
        );

        if (alradyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;

        product.rating = product.reviews
            .reduce((acc, review) =>
                acc + review.rating, 0
            ) / product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Review Added' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});


export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
};