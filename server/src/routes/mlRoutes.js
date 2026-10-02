import express from 'express'
import { predictPrice } from '../controllers/mlController.js'
import { validateRequest } from '../utils/validateRequest.js'
import { predictionSchema } from '../validations/mlValidation.js'

const router = express.Router()

router.post('/predict', validateRequest(predictionSchema), predictPrice)

export default router
