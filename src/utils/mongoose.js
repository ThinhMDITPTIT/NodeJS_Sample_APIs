const mongooseDocumentToObject = function (mongooseDocument) {
  return mongooseDocument ? mongooseDocument.toObject() : mongooseDocument;
};

const multipleMongooseDocumentsToObject = function (mongooseDocuments) {
  return mongooseDocuments.map(document => document.toObject());
};


module.exports = {
  mongooseDocumentToObject,
  multipleMongooseDocumentsToObject
};