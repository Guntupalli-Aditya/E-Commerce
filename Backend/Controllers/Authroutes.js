const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require("../Models/UserSchema.js");
const productsses = require("../Models/ProductSchema.js");
const orders = require("../Models/OrderSchema.js");


const AuthenticationRouter = express.Router();


const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};
const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
const generateToken = (userId) =>{
  const secretKey  = 'secret-key';
  return jwt.sign({userId} , secretKey);
}
const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization; 
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access. User not authenticated.",
      });
    }
    const decoded = jwt.verify(token, 'secret-key');
    const user = await users.findById(decoded.userId);

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access. User not found.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Unauthorized Access. Authentication error.",
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, 'secret-key');
    const user = await users.findById(decoded.userId);
    
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access. Admin access required.",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};
// Register Page
AuthenticationRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, address, answer, bs } = req.body;

    
    if (!name || !email || !password || !phone || !address || !answer || !bs) {
      return res.status(400).send({ error: "All fields are required" });
    }
    
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered. Please login.",
      });
    }
    let role;
    if (bs === "buyer" || bs == "Buyer" || bs == "BUYER") {
      role = 0;
    } else if (bs === "seller" || bs == "Seller" || bs == "SELLER") {
      role = 1;
    } else {
      return res.status(400).send({ error: "Invalid bs value" });
    }
    
    const hashedPassword = await hashPassword(password);
    const user = await new users({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
      bs,
      role,
    }).save();
    const token = generateToken(user._id);
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
});

//login 
AuthenticationRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    const token = generateToken(user._id);
    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        bs:user.bs,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
});
AuthenticationRouter.get("/test", requireSignIn, isAdmin, async (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
});
// forgot Password
AuthenticationRouter.get('/user-auth', requireSignIn, (req, res) => {
  res.status(200).send({ok :true})
})
AuthenticationRouter.post("/forgot-password",async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email || !answer || !newPassword) {
      return res.status(400).send({ error: "All fields are required" });
    }
    
    const user = await users.findOne({ email, answer });
    
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await users.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
});
AuthenticationRouter.get('/admin-auth', isAdmin, (req, res) => {
  res.status(200).send({ok :true})
})
//profile page
AuthenticationRouter.put('/profile', requireSignIn, async (req, res) => {
  try {
    const { name, email, password, address, phone, answer } = req.body;
    const user = await users.findById(req.user._id);
    
    if (password && password.length > 4) {
      return res.json({ error: "Passsword is required" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await users.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        email: email || user.email,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
        answer:answer || user.answer,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while Updating profile",
      error,
    });
  }
});

// orders
AuthenticationRouter.get('/orders', requireSignIn, async (req, res) => {
  try {
    const ordersData = await orders
      .find({ buyer: req.user._id })
      .populate("products", "-photo") 
      .populate("buyer", "name");

    
    const transformedOrders = ordersData
      .flatMap((ord) => {
        return ord.products.map((product) => {
          const updatedProduct = !product ? { unavailable: true } : product;
          return {
            _id: `${ord._id}_${product?._id || 'unavailable'}`, 
            originalOrderId: ord._id,
            products: [updatedProduct], 
            payment: ord.payment,
            buyer: ord.buyer,
            status: ord.status,
            createdAt: ord.createdAt,
          };
        });
      });

    res.json(transformedOrders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While getting Orders",
      error,
    });
  }
});

//All - orders
AuthenticationRouter.get('/all-orders', requireSignIn, isAdmin, async (req, res) => {
  try {
    
    const allOrders = await orders
      .find({})
      .populate("products", "-photo") 
      .populate("buyer", "name")
      .sort({ createdAt: -1 });

    
    const filteredOrders = allOrders
      .map((ord) => {
        
        const filteredProducts = ord.products
          .map((product) => {
            if (!product) {
              return { unavailable: true }; 
            }
            
            if (product.createdBy && product.createdBy.toString() === req.user._id.toString()) {
              return product; 
            }
            return null; 
          })
          .filter((product) => product !== null); 

        
        if (filteredProducts.length > 0) {
          return { ...ord._doc, products: filteredProducts };
        }
        return null;
      })
      .filter((ord) => ord !== null); 

    res.json(filteredOrders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While getting Orders",
      error,
    });
  }
});


AuthenticationRouter.put('/order-status/:orderId', requireSignIn, isAdmin, async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    
    const validStatuses = ["Not Process", "Processing", "Shipping", "Out for Delivery", "Delivered", "Cancel"];
    if (!validStatuses.includes(status)) {
      return res.status(400).send({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const order = await orders.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updating Order",
      error,
    });
  }
});
module.exports = AuthenticationRouter;
