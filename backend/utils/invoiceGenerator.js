const PDFDocument = require("pdfkit");

module.exports = (order, res) => {
  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  doc.pipe(res);

  doc.fontSize(20).text("Veda Export Invoice");
  doc.text(`Order ID: ${order._id}`);
  doc.text(`Total: ₹${order.totalAmount}`);

  doc.end();
};
