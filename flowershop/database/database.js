import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('flowershop_.db', "0.0.1");

const createTables = async () => {
  try {
    await db.transactionAsync(async tx => {
      await tx.executeSqlAsync(`
        CREATE TABLE IF NOT EXISTS Customers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          address TEXT NOT NULL,
          phone TEXT NOT NULL,
          email TEXT NOT NULL,
          password TEXT NOT NULL,
          role TEXT DEFAULT 'user'
        );
      `);
      await tx.executeSqlAsync(`
        CREATE TABLE IF NOT EXISTS Flowers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name_of_item TEXT NOT NULL,
          category TEXT NOT NULL,
          price INTEGER NOT NULL,
          image TEXT NOT NULL,
          availability INTEGER NOT NULL,
          description TEXT NOT NULL,
          discount TEXT NOT NULL
        );
      `);
      await tx.executeSqlAsync(`
        CREATE TABLE IF NOT EXISTS Sales (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          id_of_item INTEGER NOT NULL,
          name TEXT NOT NULL,
          price INTEGER NOT NULL,
          data TEXT NOT NULL,
          FOREIGN KEY(id_of_item) REFERENCES Flowers(id)
        );
      `);
      await tx.executeSqlAsync(`
        CREATE TABLE IF NOT EXISTS Orders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          customer_id INTEGER NOT NULL,
          item_id INTEGER NOT NULL,
          price INTEGER NOT NULL,
          data TEXT NOT NULL,
          status TEXT,
          FOREIGN KEY(customer_id) REFERENCES Customers(id),
          FOREIGN KEY(item_id) REFERENCES Flowers(id)
        );
      `);
      await tx.executeSqlAsync(`
        CREATE TABLE IF NOT EXISTS WishList (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          customer_id INTEGER NOT NULL,
          item_id INTEGER NOT NULL,
          FOREIGN KEY(customer_id) REFERENCES Customers(id),
          FOREIGN KEY(item_id) REFERENCES Flowers(id)
        );
      `);
    });
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Failed to create tables:', error);
  }
};


const saveToDatabase = async (name, address, phone, email, password) => {
  try {
    const db = SQLite.openDatabase('flowershop_.db', "0.0.1");

    await db.transactionAsync(async tx => {
      await tx.executeSqlAsync(
        `
        CREATE TABLE IF NOT EXISTS Customers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          address TEXT NOT NULL,
          phone TEXT NOT NULL,
          email TEXT NOT NULL,
          password TEXT NOT NULL,
          role TEXT DEFAULT 'user'
        );
       `,
        [],
        (_, result) => {
          console.log('Table "Customers" created successfully');
        },
        (_, error) => {
          console.error('Failed to create table "Customers":', error);
        }
      );
      const insertResult = await tx.executeSqlAsync(
        'INSERT INTO Customers (name, address, phone, email, password, role) VALUES (?, ?, ?, ?, ?, ?)',
        [name, address, phone, email, password, 'user']
      );
      console.log('Rows affected:', insertResult.rowsAffected);
      if (insertResult.rowsAffected > 0) {
        console.log('Data inserted successfully');
      } else {
        console.log('Failed to insert data');
      }
      const selectResult = await tx.executeSqlAsync('SELECT COUNT(*) FROM Customers', []);
      console.log('Count:', selectResult.rows[0]['COUNT(*)']);
    });
    await db.closeAsync();
  } catch (error) {
    console.error('Failed to save to database:', error);
  }
};

const loginUser = async (username, password) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Customers WHERE name = ? AND password = ?',
        [username, password],
        (_, results) => {
          if (results.rows.length > 0) {
            resolve(results.rows.item(0));
          } else {
            reject(new Error('Пользователь с указанным именем и паролем не найден'));
          }
        },
        error => {
          console.error('Failed to execute SQL statement:', error);
          reject(error);
        }
      );
    });
  });
};
const GetAllUsers = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Customers',
        [],
        (_, results) => {
          if (results.rows.length > 0) {
            resolve(results.rows._array);
          } else {
            reject(new Error('Пользователь с указанным именем и паролем не найден'));
          }
        },
        error => {
          console.error('Failed to execute SQL statement:', error);
          reject(error);
        }
      );
    });
  });
};
const deleteCustomersTable = () => {
  db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      'DROP TABLE IF EXISTS Customers',
      [],
      (_, result) => {
        console.log('Table "Customers" dropped successfully');
      },
      (_, error) => {
        console.error('Failed to drop table "Customers":', error);
      }
    );
  });
};


const createOrder = async (data) => {
  try {
    const db = SQLite.openDatabase('flowershop_.db', "0.0.1");
    await db.transactionAsync(async tx => {
      await tx.executeSqlAsync(
        `
        CREATE TABLE IF NOT EXISTS Orders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          customer_id INTEGER NOT NULL,
          item_id INTEGER NOT NULL,
          price INTEGER NOT NULL,
          data TEXT NOT NULL,
          status TEXT,
          FOREIGN KEY(customer_id) REFERENCES Customers(id),
          FOREIGN KEY(item_id) REFERENCES Flowers(id)
        );
       `,
        [],
        (_, result) => {
          console.log('Table "Customers" created successfully');
        },
        (_, error) => {
          console.error('Failed to create table "Customers":', error);
        }
      );
      const currentDate = new Date().toISOString();
      data.map(async (item) => {
        const insertResult = await tx.executeSqlAsync(
          `INSERT INTO Orders (customer_id, item_id, price, data, status) VALUES (?, ?, ?, ?, ?)`,
          [item.customer_id, item.id, item.price, currentDate, "part order"],
        );
        console.log('Rows affected:', insertResult.rowsAffected);
        console.log('Rows affected:', insertResult.rowsAffected);
        if (insertResult.rowsAffected > 0) {
          console.log('Data inserted successfully');
        } else {
          console.log('Failed to insert data');
        }
      })
      const selectResult = await tx.executeSqlAsync('SELECT COUNT(*) FROM Orders', []);
      console.log('Count:', selectResult.rows[0]['COUNT(*)']);
    });
    await db.closeAsync();
  } catch (error) {
    console.error('Failed to save to database:', error);
  }
};

const updateOrderStatus = async (orderId, newStatus) => {
  try {
      await db.transactionAsync(async tx => {
          await tx.executeSqlAsync(
              `UPDATE Orders SET status = ? WHERE id = ?`,
              [newStatus, orderId],
              (_, result) => {
                  console.log('Order status updated successfully');
              },
              (_, error) => {
                  console.error('Failed to update order status:', error);
              }
          );
      });
  } catch (error) {
      console.error('Failed to update order status:', error);
  }
};

const deleteOrder = async (orderId) => {
  try {
      await db.transactionAsync(async tx => {
          await tx.executeSqlAsync(
              `DELETE FROM Orders WHERE id = ?`,
              [orderId],
              (_, result) => {
                  console.log('Order deleted successfully');
              },
              (_, error) => {
                  console.error('Failed to delete order:', error);
              }
          );
      });
  } catch (error) {
      console.error('Failed to delete order:', error);
  }
};

const createSale = async (itemId, name, price, data) => {
  try {
      await db.transactionAsync(async tx => {
          await tx.executeSqlAsync(
              `INSERT INTO Sales (id_of_item, name, price, data) VALUES (?, ?, ?, ?)`,
              [itemId, name, price, data],
              (_, result) => {
                  console.log('Sale created successfully');
              },
              (_, error) => {
                  console.error('Failed to create sale:', error);
              }
          );
      });
  } catch (error) {
      console.error('Failed to create sale:', error);
  }
};

const getAllOrders = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT Orders.*, Customers.name AS customer_name, Flowers.availability AS availability , Flowers.name_of_item AS item_name
        FROM Orders
        INNER JOIN Customers ON Orders.customer_id = Customers.id
        INNER JOIN Flowers ON Orders.item_id = Flowers.id`,
        [],
        (_, results) => {
          if (results.rows.length > 0) {
            resolve(results.rows._array);
          } else {
            reject(new Error('Нет заказов'));
          }
        },
        error => {
          console.error('Failed to execute SQL statement:', error);
          reject(error);
        }
      );
    });
  });
};
const updateSalePrice = async (saleId, newPrice) => {
  try {
      await db.transactionAsync(async tx => {
          await tx.executeSqlAsync(
              `UPDATE Sales SET price = ? WHERE id = ?`,
              [newPrice, saleId],
              (_, result) => {
                  console.log('Sale price updated successfully');
              },
              (_, error) => {
                  console.error('Failed to update sale price:', error);
              }
          );
      });
  } catch (error) {
      console.error('Failed to update sale price:', error);
  }
};

const deleteSale = async (saleId) => {
  try {
      await db.transactionAsync(async tx => {
          await tx.executeSqlAsync(
              `DELETE FROM Sales WHERE id = ?`,
              [saleId],
              (_, result) => {
                  console.log('Sale deleted successfully');
              },
              (_, error) => {
                  console.error('Failed to delete sale:', error);
              }
          );
      });
  } catch (error) {
      console.error('Failed to delete sale:', error);
  }
};

const createFlower = async (name, category, price, image, availability, description, discount) => {
  try{
  const db = SQLite.openDatabase('flowershop_.db', "0.0.1");
    await db.transactionAsync(async tx => {
      await tx.executeSqlAsync(
        `
        CREATE TABLE IF NOT EXISTS Flowers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name_of_item TEXT NOT NULL,
          category TEXT NOT NULL,
          price INTEGER NOT NULL,
          image TEXT NOT NULL,
          availability INTEGER NOT NULL,
          description TEXT NOT NULL,
          discount TEXT NOT NULL
        );
       `,
        [],
        (_, result) => {
          console.log('Table "Flowers" created successfully');
        },
        (_, error) => {
          console.error('Failed to create table "Flowers":', error);
        }
      );
      const insertResult = await tx.executeSqlAsync(
        'INSERT INTO Flowers (name_of_item, category, price, image, availability, description, discount) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, category, price, image, availability, description, discount]
      );
      console.log('Rows affected:', insertResult.rowsAffected);
      if (insertResult.rowsAffected > 0) {
        console.log('Data inserted successfully');
      } else {
        console.log('Failed to insert data');
      }
      const selectResult = await tx.executeSqlAsync('SELECT COUNT(*) FROM Flowers', []);
      console.log('Count:', selectResult.rows[0]['COUNT(*)']);
    });
    await db.closeAsync();
  } catch (error) {
    console.error('Failed to save to database:', error);
  }
};

const addToWhishList = async (user_id, flower_id, isFav) => {
  try {
    const db = SQLite.openDatabase('flowershop_.db', "0.0.1");
    await db.transactionAsync(async tx => {
      await tx.executeSqlAsync(
        `
        CREATE TABLE IF NOT EXISTS WishList (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          customer_id INTEGER NOT NULL,
          item_id INTEGER NOT NULL,
          FOREIGN KEY(customer_id) REFERENCES Customers(id),
          FOREIGN KEY(item_id) REFERENCES Flowers(id)
        );
       `,
        [],
        (_, result) => {
          console.log('Table "WishList" created successfully');
        },
        (_, error) => {
          console.error('Failed to create table "WishList":', error);
        }
      );
      if (isFav) {
        const insertResult = await tx.executeSqlAsync(
          'INSERT INTO WishList (customer_id, item_id) VALUES (?, ?)',
          [user_id, flower_id]
        );
        console.log('Rows affected:', insertResult.rowsAffected);
        if (insertResult.rowsAffected > 0) {
          console.log('Data inserted successfully');
        } else {
          console.log('Failed to insert data');
        }
        const selectResult = await tx.executeSqlAsync('SELECT COUNT(*) FROM Flowers', []);
        console.log('Count:', selectResult.rows[0]['COUNT(*)']);
      } else {
        const deleteResult = await tx.executeSqlAsync(
          'DELETE FROM WishList WHERE customer_id = ? AND item_id = ?',
          [user_id, flower_id]
        );
        console.log('Rows affected:', deleteResult.rowsAffected);
        if (deleteResult.rowsAffected > 0) {
          console.log('Data deleted successfully');
        } else {
          console.log('Failed to delete data');
        }
      }
    });
    await db.closeAsync();
  } catch (error) {
    console.error('Failed to save to database:', error);
  }
};

const getUserWishlist = async (user_id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `
        SELECT Flowers.*
        FROM WishList
        JOIN Flowers ON WishList.item_id = Flowers.id
        WHERE WishList.customer_id = ?
        `,
        [user_id],
        (_, results) => {
          if (results.rows.length > 0) {
            resolve(results.rows._array);
          } else {
            reject(new Error('Нет ничего в листе'));
          }
        },
        error => {
          console.error('Failed to execute SQL statement:', error);
          reject(error);
        }
      );
    });
  });
};

const getAllFlowers = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Flowers',
        [],
        (_, results) => {
          if (results.rows.length > 0) {
            resolve(results.rows._array);
          } else {
            reject(new Error('Пользователь с указанным именем и паролем не найден'));
          }
        },
        error => {
          console.error('Failed to execute SQL statement:', error);
          reject(error);
        }
      );
    });
  });
};
const updateFlowerAvailability = async (flowerId, newAvailability) => {
  try {
      await db.transactionAsync(async tx => {
          await tx.executeSqlAsync(
              `UPDATE Flowers SET availability = ? WHERE id = ?`,
              [newAvailability, flowerId],
              (_, result) => {
                  console.log('Flower availability updated successfully');
              },
              (_, error) => {
                  console.error('Failed to update flower availability:', error);
              }
          );
      });
  } catch (error) {
      console.error('Failed to update flower availability:', error);
  }
};
const updateFlower = async (flowerId, title, category, price, image, quantity, description, discount) => {
  try {
    await db.transactionAsync(async tx => {
      await tx.executeSqlAsync(
        `
        UPDATE Flowers 
        SET name_of_item = ?, category = ?, price = ?, image = ?, availability = ?, description = ?, discount = ? 
        WHERE id = ?
        `,
        [title, category, price, image, quantity, description, discount, flowerId],
        (_, result) => {
          console.log('Flower updated successfully');
        },
        (_, error) => {
          console.error('Failed to update flower:', error);
        }
      );
    });
  } catch (error) {
    console.error('Failed to update flower:', error);
    throw error; // Пробросить ошибку для обработки на вызывающей стороне
  }
};

const deleteFlower = async (flowerId) => {
  try {
      await db.transactionAsync(async tx => {
          await tx.executeSqlAsync(
              `DELETE FROM Flowers WHERE id = ?`,
              [flowerId],
              (_, result) => {
                  console.log('Flower deleted successfully');
              },
              (_, error) => {
                  console.error('Failed to delete flower:', error);
              }
          );
      });
  } catch (error) {
      console.error('Failed to delete flower:', error);
  }
};

export { GetAllUsers, saveToDatabase, loginUser , deleteCustomersTable, createOrder, getAllOrders, updateOrderStatus, deleteOrder, createSale, updateSalePrice, deleteSale, createFlower, getAllFlowers, updateFlowerAvailability, updateFlower, deleteFlower, createTables, addToWhishList, getUserWishlist };

