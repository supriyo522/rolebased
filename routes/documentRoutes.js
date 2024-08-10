// documentRoutes.js
const express = require('express');
const { auth, role } = require('../middleware/authMiddleware');
const { uploadDocument, approveDocument, getDocuments } = require('../controllers/documentController');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', auth, role('A'), upload.single('document'), uploadDocument);
router.post('/approve', auth, role('B'), approveDocument);
router.get('/', auth, role('B'), getDocuments);

module.exports = router;

