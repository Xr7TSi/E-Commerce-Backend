// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


// Associations below may be incomplete.  Consider renaming foreign keys to more descriptive names.
// Products belongsTo Category
Product.hasOne(Category, {
  foreignKey: 'id',
})

// Categories have many Products 
Category.hasMany(Product, {
  foreignKey: 'id',
})

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'id',
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'id',
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
