// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


// Associations below may be incomplete.  Consider renaming foreign keys to more descriptive names.
// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
})

// Categories have many Products 
Category.hasMany(Product, {
  foreignKey: 'product_id',
})

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'tag_id',
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'product_id',
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
