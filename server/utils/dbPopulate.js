const mongoose = require('mongoose');
const Product = require('../model/product.model');

const populateProducts = () => {
  const categories = ['t-shirt', 'backpack', 'blouse', 'band', 'jacket'];
  const sexes = ['unisex', 'male', 'female'];
  const itemsPerOption = 2;

  categories.forEach(category => {
    sexes.forEach(sex => {
      for (let i = 0; i < itemsPerOption; i++) {
        let newProduct = new Product({
          name: `${
            sex === 'male' ? 'His' : sex === 'female' ? 'Hers' : ''
          } ${category.charAt(0).toUpperCase()}${category
            .slice(1)
            .toLowerCase()} ${i === 0 ? 'PREMIUM' : 'BASIC'}`,
          desc:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          category: category,
          sex: sex,
          ribbon: '',
          published: true,
          price:
            category === 't-shirt'
              ? 19.99
              : category === 'blouse'
              ? 89.99
              : category === 'jacket'
              ? 129.99
              : 59.99,
          size: ['t-shirt', 'blouse', 'jacket'].includes(category)
            ? {
                xs: 20,
                s: 20,
                m: 20,
                l: 20,
                xl: 20,
                xxl: 20
              }
            : {
                xs: 0,
                s: 0,
                m: 30,
                l: 0,
                xl: 0,
                xxl: 0
              },
          soldItems: {
            xs: 0,
            s: 0,
            m: 0,
            l: 0,
            xl: 0,
            xxl: 0
          },
          img:
            sex === 'female'
              ? category === 't-shirt'
                ? 'https://s3.house.pl/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/W/P/WP544-99X-001.jpg'
                : category === 'blouse'
                ? 'https://s1.house.pl/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/X/X/XX771-09M-001.jpg'
                : category === 'jacket'
                ? 'https://s1.house.pl/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/X/A/XA075-34X-002.jpg'
                : category === 'backpack'
                ? 'https://s3.house.pl/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/W/X/WX526-99X-001.jpg'
                : category === 'band'
                ? 'https://s0.house.pl/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/X/Y/XY722-39X-001.jpg'
                : 'https://s0.house.pl/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/X/Y/XY722-39X-001.jpg'
              : sex === 'male'
              ? category === 't-shirt'
                ? 'https://s1.house.pl/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/W/Q/WQ792-85M-001.jpg'
                : category === 'blouse'
                ? 'https://s2.house.pl/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/W/B/WB583-83M-001.jpg'
                : category === 'jacket'
                ? 'https://s1.house.pl/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/V/Y/VY000-55J-001.jpg'
                : category === 'backpack'
                ? 'https://s0.house.pl/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/W/V/WV611-19X-001.jpg'
                : category === 'band'
                ? 'https://s3.house.pl/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/W/L/WL318-33X-002.jpg'
                : 'https://s3.house.pl/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/W/L/WL318-33X-002.jpg'
              : sex === 'unisex'
              ? category === 't-shirt'
                ? 'https://s0.house.pl/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/X/F/XF501-00X-001.jpg'
                : category === 'blouse'
                ? 'https://s2.house.pl/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/X/H/XH220-33X-001.jpg'
                : category === 'jacket'
                ? 'https://s0.house.pl/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/W/W/WW443-99X-001.jpg'
                : category === 'backpack'
                ? 'https://s3.house.pl/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/W/L/WL248-90X-001.jpg'
                : category === 'band'
                ? 'https://lp2.hm.com/hmgoepprod?set=source[/8d/cb/8dcbdeea4adf24aa4bc7fe6ec2616584a2682633.jpg],origin[dam],category[men_accessories_jewellery],type[DESCRIPTIVESTILLLIFE],res[m],hmver[1]&call=url[file:/product/main]'
                : 'https://lp2.hm.com/hmgoepprod?set=source[/8d/cb/8dcbdeea4adf24aa4bc7fe6ec2616584a2682633.jpg],origin[dam],category[men_accessories_jewellery],type[DESCRIPTIVESTILLLIFE],res[m],hmver[1]&call=url[file:/product/main]'
              : ''
        });

        newProduct.save();
        console.log('Added entry to DB');
      }
    });
  });
};

mongoose.connect(`mongodb://localhost:27017/ecommerce-v2`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  createIndexes: true
});

db = mongoose.connection;

db.on('error', () => console.log('Connection error'));
db.once('open', () => {
  console.log('Connected to the DB');
  console.log('Populating...');
  populateProducts();
});

exports.populateProducts;
