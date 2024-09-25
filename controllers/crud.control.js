     const OziqOvqatAdd = require("../module/oziq-ovqat")
     const SotilganMaxsulot = require("../module/sold-product")
const jwt = require("jsonwebtoken")
     
const addProduct = async (req, res) => {
     try {
          const { nomi, kelgannarxi, sotishnarxi, soni, barcode, unit } = req.body;
          const newProduct = new OziqOvqatAdd({ nomi, kelgannarxi, sotishnarxi, soni, barcode, unit });
          await newProduct.save();
          res.status(201).json(newProduct);
     } catch (error) {
          res.status(500).json({ message: "Ошибка при добавлении продукта", error });
     }
};

     const getAllProduct = async (req, res) => {
          try {
               const products = await OziqOvqatAdd.find()
               res.status(200).json(products)
          } catch (error) {
               res.status(500).json({ message: "Ошибка при получении продуктов", error })
          }
     }


     const deleteProduct = async (req, res) => {
          try {
               const { id } = req.params;
               const deletedProduct = await OziqOvqatAdd.findByIdAndDelete(id);
               if (!deletedProduct) {
                    return res.status(404).json({ message: "Продукт не найден" });
               }
               res.status(200).json({ message: "Продукт успешно удален" });
          } catch (error) {
               res.status(500).json({ message: "Ошибка при удалении продукта", error });
          }
     };


const updateProduct = async (req, res) => {
     try {
          const { id } = req.params;
          const { nomi, kelgannarxi, sotishnarxi, soni, barcode, unit } = req.body;

          const updatedProduct = await OziqOvqatAdd.findByIdAndUpdate(
               id,
               { nomi, kelgannarxi, sotishnarxi, soni, barcode, unit },
               { new: true }
          );

          if (!updatedProduct) {
               return res.status(404).json({ message: "Продукт не найден" });
          }

          res.status(200).json(updatedProduct);
     } catch (error) {
          res.status(500).json({ message: "Ошибка при обновлении продукта", error });
     }
};

const sellProduct = async (req, res) => {
     try {
          const { nomi, kelgannarxi, sotishnarxi, soni, barcode, unit } = req.body;

          // Проверяем, существует ли продукт в инвентаре
          const existingProduct = await OziqOvqatAdd.findOne({ barcode });
          if (!existingProduct) {
               return res.status(404).json({ message: "Продукт не найден в инвентаре" });
          }

          // Проверяем, достаточно ли товара для продажи
          if (existingProduct.soni < soni) {
               return res.status(400).json({ message: "Недостаточно товара для продажи" });
          }

          // Создание нового документа в коллекции SotilganMaxsulot с учетом единицы измерения
          const newSotilganMaxsulot = new SotilganMaxsulot({ nomi, kelgannarxi, sotishnarxi, soni, barcode, unit });
          await newSotilganMaxsulot.save();

          // Обновляем количество товара в инвентаре
          existingProduct.soni -= soni;
          await existingProduct.save();

          res.status(201).json(newSotilganMaxsulot);
     } catch (error) {
          res.status(500).json({ message: "Ошибка при сохранении проданного товара", error });
     }
};


     loginAdmin = async (req, res) => {
          const { login, password } = req.body;

          let role;
          if (login === 'admin' && password === 'admin') {
               role = 'admin';
          } else if (login === 'user' && password === 'user') {
               role = 'user';
          } else {
               return res.status(401).json({ message: 'Login yoki parol noto\'g\'ri' });
          }

          const secretKey = 'banan';
          const token = jwt.sign({ role }, secretKey, { expiresIn: '7d' });

          return res.status(200).json({ token });
     };

     checkToken = (req, res) => {
          const token = req.headers.authorization?.split(' ')[1];
          const secretKey = 'banan';

          if (!token) {
               return res.status(401).json({ message: 'Token topilmadi' });
          }

          try {
               const decoded = jwt.verify(token, secretKey);
               return res.status(200).json({ role: decoded.role });
          } catch (err) {
               return res.status(401).json({ message: 'Token yaroqsiz' });
          }
     };
const getSoldItems = async (req, res) => {
     try {
          const soldItems = await SotilganMaxsulot.find();
          res.status(200).json(soldItems);
     } catch (error) {
          res.status(500).json({ message: "Ошибка при получении проданных товаров", error });
     }
};

module.exports = { addProduct, getAllProduct, deleteProduct, updateProduct, sellProduct, getSoldItems, loginAdmin, checkToken };



// module.exports = { addProduct, getAllProduct, deleteProduct, updateProduct, sellProduct, loginAdmin, checkToken };
