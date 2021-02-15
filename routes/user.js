const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');

const { userById,productById, read,readUsers,readSellers,readsingle, update, purchaseHistory,addToWishlist,wishlist, removeFromWishlist } = require('../controllers/user');

router.get('/secret', requireSignin, (req, res) => {
    res.json({
        user: 'got here yay'
    });
});

router.get('/user/:userId', requireSignin, isAuth, read);
router.get('/singleuser/:userId',  readsingle);

router.get('/users/list/:userId', requireSignin, isAuth,isAdmin, readUsers);
router.get('/sellers/list/:userId', requireSignin, isAuth,isAdmin, readSellers);
router.put('/user/:userId', requireSignin, isAuth, update);
router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory);
router.post("/user/wishlist/:productId/:userId", requireSignin,isAuth, addToWishlist);
router.get("/wishlist/:userId", requireSignin,isAuth, wishlist);
router.put("/remove/wishlist/:productId/:userId", requireSignin,isAuth,removeFromWishlist);

router.param('userId', userById);
router.param("productId", productById);

module.exports = router;