const Document = require('../models/Document');

exports.uploadDocument = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const { filename } = req.file;

  try {
    const document = new Document({ filename, uploadedBy: req.user.id });
    await document.save();
    res.status(201).json({ message: 'Document uploaded successfully', document });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.approveDocument = async (req, res) => {
  const { documentId } = req.body;
  try {
    const document = await Document.findById(documentId);
    if (!document) return res.status(404).json({ message: 'Document not found' });

    document.approved = true;
    document.approvedBy = req.user.id;
    await document.save();

    res.status(200).json({ message: 'Document approved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ approved: false }).populate('uploadedBy', 'username');
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};