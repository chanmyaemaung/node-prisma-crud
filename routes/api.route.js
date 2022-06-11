const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')

// Initialize Prisma Client
const prisma = new PrismaClient()

/* Get all products */
router.get('/products', async (req, res, next) => {
	try {
		const getAllProducts = await prisma.product.findMany({
			include: { Category: true },
		})

		// Get all categories
		/* const categories = await prisma.category.findMany({
			include: { products: true },
		}) */

		res.json(getAllProducts)
	} catch (error) {
		next(error)
	}
})

// Get product by id
router.get('/products/:id', async (req, res, next) => {
	try {
		const { id } = req.params

		const getProductByID = await prisma.product.findUnique({
			where: { id: Number(id) },
			include: { Category: true },
		})

		res.json(getProductByID)
	} catch (error) {
		next(error)
	}
})

// Post new product
router.post('/products', async (req, res, next) => {
	try {
		const createProduct = await prisma.product.create({
			data: req.body,
		})

		res.json(createProduct)
	} catch (error) {
		next(error)
	}
})

// Delete product
router.delete('/products/:id', async (req, res, next) => {
	try {
		const { id } = req.params

		const deleteProduct = await prisma.product.delete({
			where: { id: Number(id) },
		})

		res.json(deleteProduct)
	} catch (error) {
		next(error)
	}
})

// Update product
router.patch('/products/:id', async (req, res, next) => {
	try {
		const { id } = req.params

		const updateProduct = await prisma.product.update({
			where: { id: Number(id) },
			data: req.body,
			include: { Category: true },
		})

		res.json(updateProduct)
	} catch (error) {
		next(error)
	}
})

module.exports = router
